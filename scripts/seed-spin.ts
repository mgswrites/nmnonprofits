import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error('ERROR: DATABASE_URL not set'); process.exit(1); }
const sql = neon(DATABASE_URL);

const MISSION = 'Behavioral health nonprofit providing recovery housing, emergency shelter, case management, and specialized therapies for people experiencing homelessness and mental illness in Silver City, NM.';

const DESCRIPTION = `SPIN, which stands for Supporting People In Need, is a nonprofit behavioral health organization based in Silver City, New Mexico, serving individuals who are experiencing homelessness, mental illness, and substance use challenges in Grant County and the surrounding southwestern New Mexico region.

The organization operates a range of interconnected programs designed to meet people at different points on the path from crisis to stability. The Seasonal Overnight Shelter, known as SOS, provides emergency overnight accommodation for people of all genders and ages during periods when outdoor conditions are dangerous. This low-barrier emergency shelter is a critical safety net in a rural area where alternatives are scarce and distances to other resources can be significant.

Beyond emergency shelter, SPIN runs recovery homes for individuals in sustained recovery from substance use. These residences offer structured, supportive housing that bridges the gap between acute treatment and independent living, a stage in recovery where many people are vulnerable without appropriate support. Access to stable, sober housing is widely recognized as one of the strongest predictors of lasting recovery, and SPIN works to provide this foundation.

Case management is central to the organization's model. Staff work individually with clients navigating mental illness, connecting them to services, helping them manage daily life, and advocating for their needs within systems that can be difficult to access. SPIN also provides representative payee services, managing Social Security and other benefits for individuals who need assistance handling their finances, as well as disability advocacy services that help clients understand and assert their rights.

Therapeutic services at SPIN include intensive outpatient mental health programming, life skills groups, and specialized therapies such as EMDR, which is used to treat trauma, and DBT, a skills-based approach used for emotional regulation and interpersonal effectiveness. These clinical offerings distinguish SPIN from organizations that provide housing or shelter alone, reflecting a commitment to addressing the underlying conditions that contribute to instability.

The organization also maintains a shelter garden and engages the Silver City community through fundraising and awareness efforts. In a small city with limited public infrastructure for behavioral health and homelessness, SPIN fills an essential role, operating at the intersection of housing, mental health, and community care in one of New Mexico's more isolated rural settings.`;

async function main() {
  const sectors = await sql<{ id: number; slug: string }[]>`SELECT id, slug FROM sectors`;
  const sectorMap = new Map(sectors.map((s) => [s.slug, s.id]));

  const cities = await sql<{ id: number; slug: string }[]>`SELECT id, slug FROM cities`;
  const cityId = cities.find((c) => c.slug === 'silver-city')?.id ?? null;

  const [row] = await sql<{ id: number }[]>`
    INSERT INTO listings (
      slug, name, org_type,
      city_id, region_code, city_name,
      website_url, address_line1, zip_code, phone,
      mission, full_description,
      serves_statewide, status, is_verified
    ) VALUES (
      'spin-supporting-people-in-need',
      'SPIN: Supporting People In Need',
      'nonprofit_501c3',
      ${cityId}, 'southern_nm', 'Silver City',
      'https://spinhousingnm.org',
      '1620 E Pine St',
      '88062',
      '(575) 494-1128',
      ${MISSION},
      ${DESCRIPTION},
      false, 'approved', false
    )
    ON CONFLICT (slug) DO UPDATE SET
      name             = EXCLUDED.name,
      mission          = EXCLUDED.mission,
      full_description = EXCLUDED.full_description,
      updated_at       = now()
    RETURNING id
  `;

  const listingId = row.id;
  await sql`DELETE FROM listing_sectors WHERE listing_id = ${listingId}`;

  const sectorSlugs = ['housing-homelessness', 'health-human-services', 'substance-use-recovery'];
  for (let i = 0; i < sectorSlugs.length; i++) {
    const sid = sectorMap.get(sectorSlugs[i]);
    if (sid) {
      await sql`
        INSERT INTO listing_sectors (listing_id, sector_id, is_primary)
        VALUES (${listingId}, ${sid}, ${i === 0})
        ON CONFLICT DO NOTHING
      `;
    }
  }

  await sql`
    UPDATE cities SET org_count = (
      SELECT COUNT(*) FROM listings
      WHERE city_id = (SELECT id FROM cities WHERE slug = 'silver-city')
        AND status = 'approved' AND deleted_at IS NULL
    ) WHERE slug = 'silver-city'
  `;

  console.log('Added SPIN id=' + listingId);
}

main().catch((e) => { console.error(e); process.exit(1); });

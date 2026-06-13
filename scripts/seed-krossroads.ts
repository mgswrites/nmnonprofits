import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error('ERROR: DATABASE_URL not set'); process.exit(1); }

const sql = neon(DATABASE_URL);

const ORGS = [
  {
    slug: 'krossroads-las-vegas-nm',
    name: 'Krossroads Integrative Health and Recovery Solutions',
    city_name: 'Las Vegas',
    city_slug: 'las-vegas',
    region_code: 'northern_nm',
    mission: 'Comprehensive, evidence-based integrative behavioral health and substance use recovery services, including MAT, IOP, psychiatric evaluation, and community support in Las Vegas, NM.',
    sectors: ['substance-use-recovery', 'health-human-services'],
    website_url: 'https://krossroadsnm.org',
    phone: '(505) 715-4610',
    email: 'info@krossroadsnm.org',
    ein: '86-3320635',
    year_founded: 2021,
    executive_director: 'Kathleen Webb',
  },
  {
    slug: 'krossroads-raton-nm',
    name: 'Krossroads Integrative Health and Recovery Solutions',
    city_name: 'Raton',
    city_slug: null,
    region_code: 'northern_nm',
    mission: 'Comprehensive, evidence-based integrative behavioral health and substance use recovery services, including MAT, IOP, psychiatric evaluation, and community support in Raton, NM.',
    sectors: ['substance-use-recovery', 'health-human-services'],
    website_url: 'https://krossroadsnm.org',
    phone: '(505) 715-4610',
    email: 'info@krossroadsnm.org',
    ein: '86-3320635',
    year_founded: 2021,
    executive_director: 'Kathleen Webb',
  },
];

async function main() {
  const sectors = await sql<{ id: number; slug: string }[]>`SELECT id, slug FROM sectors`;
  const sectorMap = new Map(sectors.map((s) => [s.slug, s.id]));

  const cities = await sql<{ id: number; slug: string }[]>`SELECT id, slug FROM cities`;
  const cityMap = new Map(cities.map((c) => [c.slug, c.id]));

  for (const org of ORGS) {
    const cityId = org.city_slug ? (cityMap.get(org.city_slug) ?? null) : null;

    const [row] = await sql<{ id: number }[]>`
      INSERT INTO listings (
        slug, name, org_type,
        city_id, region_code, city_name,
        website_url, phone, email, ein, year_founded, executive_director,
        mission, serves_statewide, status, is_verified
      ) VALUES (
        ${org.slug}, ${org.name}, 'nonprofit_501c3',
        ${cityId}, ${org.region_code}, ${org.city_name},
        ${org.website_url}, ${org.phone}, ${org.email}, ${org.ein},
        ${org.year_founded}, ${org.executive_director},
        ${org.mission}, false, 'approved', true
      )
      ON CONFLICT (slug) DO UPDATE SET
        name             = EXCLUDED.name,
        city_id          = EXCLUDED.city_id,
        city_name        = EXCLUDED.city_name,
        mission          = EXCLUDED.mission,
        website_url      = EXCLUDED.website_url,
        phone            = EXCLUDED.phone,
        email            = EXCLUDED.email,
        ein              = EXCLUDED.ein,
        year_founded     = EXCLUDED.year_founded,
        executive_director = EXCLUDED.executive_director,
        updated_at       = now()
      RETURNING id
    `;

    const listingId = row.id;
    await sql`DELETE FROM listing_sectors WHERE listing_id = ${listingId}`;

    for (let i = 0; i < org.sectors.length; i++) {
      const sectorId = sectorMap.get(org.sectors[i]);
      if (!sectorId) { console.warn(`Unknown sector: ${org.sectors[i]}`); continue; }
      await sql`
        INSERT INTO listing_sectors (listing_id, sector_id, is_primary)
        VALUES (${listingId}, ${sectorId}, ${i === 0})
        ON CONFLICT DO NOTHING
      `;
    }

    console.log(`  ok  [${listingId}] ${org.name} — ${org.city_name}`);
  }

  // Refresh denormalized counts
  await sql`
    UPDATE sectors s SET org_count = (
      SELECT COUNT(DISTINCT ls.listing_id) FROM listing_sectors ls
      JOIN listings l ON l.id = ls.listing_id
      WHERE ls.sector_id = s.id AND l.status = 'approved' AND l.deleted_at IS NULL
    )
  `;
  await sql`
    UPDATE cities c SET org_count = (
      SELECT COUNT(*) FROM listings l
      WHERE l.city_id = c.id AND l.status = 'approved' AND l.deleted_at IS NULL
    )
  `;

  console.log('Done.');
}

main().catch((e) => { console.error(e); process.exit(1); });

import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { join } from 'path';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error('ERROR: DATABASE_URL not set'); process.exit(1); }
const sql = neon(DATABASE_URL);

// NTEE code prefix → sector slug(s)
const NTEE_MAP: Record<string, string[]> = {
  A: ['arts-culture'],
  B: ['education-youth'],
  C: ['environment-conservation'],
  D: ['animal-welfare'],
  E: ['health-human-services'],
  F: ['health-human-services'],
  G: ['health-human-services'],
  H: ['health-human-services'],
  I: ['civic-engagement'],
  J: ['economic-development'],
  K: ['food-agriculture'],
  L: ['housing-homelessness'],
  M: ['civic-engagement'],
  N: ['education-youth'],
  O: ['education-youth'],
  P: ['health-human-services'],
  Q: ['civic-engagement'],
  R: ['civic-engagement'],
  S: ['economic-development'],
  T: ['civic-engagement'],
  U: ['civic-engagement'],
  V: ['civic-engagement'],
  W: ['civic-engagement'],
  X: ['civic-engagement'],
  Y: ['civic-engagement'],
  Z: ['civic-engagement'],
};

// City name → { citySlug, regionCode }
const CITY_MAP: Record<string, { citySlug: string | null; regionCode: string }> = {
  albuquerque: { citySlug: 'albuquerque', regionCode: 'albuquerque_metro' },
  'rio rancho': { citySlug: 'rio-rancho', regionCode: 'albuquerque_metro' },
  bernalillo: { citySlug: 'bernalillo', regionCode: 'albuquerque_metro' },
  corrales: { citySlug: null, regionCode: 'albuquerque_metro' },
  placitas: { citySlug: null, regionCode: 'albuquerque_metro' },
  'los ranchos de albuquerque': { citySlug: null, regionCode: 'albuquerque_metro' },
  'los ranchos': { citySlug: null, regionCode: 'albuquerque_metro' },
  'los lunas': { citySlug: null, regionCode: 'albuquerque_metro' },
  belen: { citySlug: null, regionCode: 'albuquerque_metro' },
  socorro: { citySlug: null, regionCode: 'albuquerque_metro' },
  'santa fe': { citySlug: 'santa-fe', regionCode: 'northern_nm' },
  'los alamos': { citySlug: 'los-alamos', regionCode: 'northern_nm' },
  espanola: { citySlug: 'espanola', regionCode: 'northern_nm' },
  española: { citySlug: 'espanola', regionCode: 'northern_nm' },
  'el prado': { citySlug: null, regionCode: 'northern_nm' },
  chama: { citySlug: null, regionCode: 'northern_nm' },
  taos: { citySlug: 'taos', regionCode: 'northern_nm' },
  'angel fire': { citySlug: null, regionCode: 'northern_nm' },
  'las vegas': { citySlug: 'las-vegas', regionCode: 'northern_nm' },
  raton: { citySlug: null, regionCode: 'northern_nm' },
  cimarron: { citySlug: null, regionCode: 'northern_nm' },
  mora: { citySlug: null, regionCode: 'northern_nm' },
  'las cruces': { citySlug: 'las-cruces', regionCode: 'southern_nm' },
  alamogordo: { citySlug: 'alamogordo', regionCode: 'southern_nm' },
  'silver city': { citySlug: 'silver-city', regionCode: 'southern_nm' },
  'truth or consequences': { citySlug: null, regionCode: 'southern_nm' },
  deming: { citySlug: null, regionCode: 'southern_nm' },
  reserve: { citySlug: null, regionCode: 'southern_nm' },
  ruidoso: { citySlug: null, regionCode: 'southern_nm' },
  cloudcroft: { citySlug: null, regionCode: 'southern_nm' },
  'hot springs': { citySlug: null, regionCode: 'southern_nm' },
  roswell: { citySlug: 'roswell', regionCode: 'southern_nm' },
  carlsbad: { citySlug: 'carlsbad', regionCode: 'eastern_nm' },
  hobbs: { citySlug: null, regionCode: 'eastern_nm' },
  artesia: { citySlug: null, regionCode: 'eastern_nm' },
  clovis: { citySlug: 'clovis', regionCode: 'eastern_nm' },
  portales: { citySlug: 'portales', regionCode: 'eastern_nm' },
  lovington: { citySlug: null, regionCode: 'eastern_nm' },
  tucumcari: { citySlug: null, regionCode: 'eastern_nm' },
  farmington: { citySlug: 'farmington', regionCode: 'four_corners' },
  aztec: { citySlug: 'aztec', regionCode: 'four_corners' },
  gallup: { citySlug: 'gallup', regionCode: 'four_corners' },
  bloomfield: { citySlug: null, regionCode: 'four_corners' },
  'four corners': { citySlug: null, regionCode: 'four_corners' },
};

function cityLookup(rawCity: string): { citySlug: string | null; regionCode: string } {
  const key = rawCity.toLowerCase().trim();
  return CITY_MAP[key] ?? { citySlug: null, regionCode: 'albuquerque_metro' };
}

function nteeToSectors(ntee: string): string[] {
  const prefix = (ntee || '').trim().charAt(0).toUpperCase();
  return NTEE_MAP[prefix] ?? ['civic-engagement'];
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function buildDescription(org: {
  name: string;
  city: string;
  mission: string;
  programs: string;
  ntee: string;
  annual_budget: string;
  executive_director: string;
}): string {
  const parts: string[] = [];
  if (org.mission) parts.push(org.mission.trim());
  if (org.programs) parts.push(org.programs.trim());
  const combined = parts.join('\n\n');
  if (combined.length >= 150) return combined;
  // Pad with generic sentence if very short
  const sector = nteeToSectors(org.ntee)[0]?.replace(/-/g, ' ') ?? 'community services';
  const city = org.city || 'New Mexico';
  const extra = `${org.name} is a nonprofit organization based in ${city}, New Mexico, working in the area of ${sector}. The organization serves the local community through programs and services that address key needs in the region.`;
  return combined ? `${combined}\n\n${extra}` : extra;
}

async function main() {
  const raw: Array<{
    id: string; name: string; city: string; state: string; zip: string;
    address: string; county: string; phone: string; email: string; website: string;
    ntee: string; mission: string; programs: string; year_founded: number | null;
    annual_budget: string; executive_director: string;
  }> = JSON.parse(readFileSync(join(import.meta.dirname, 'groundworks-new.json'), 'utf-8'));

  // Filter NM only
  const orgs = raw.filter(o => !o.state || o.state === 'NM');
  console.log(`Importing ${orgs.length} NM orgs...`);

  const cities = await sql<{ id: number; slug: string }[]>`SELECT id, slug FROM cities`;
  const cityIdMap = new Map(cities.map(c => [c.slug, c.id]));

  const sectors = await sql<{ id: number; slug: string }[]>`SELECT id, slug FROM sectors`;
  const sectorIdMap = new Map(sectors.map(s => [s.slug, s.id]));

  // Build set of existing slugs to avoid conflicts
  const existingSlugs = await sql<{ slug: string }[]>`SELECT slug FROM listings WHERE deleted_at IS NULL`;
  const slugSet = new Set(existingSlugs.map(r => r.slug));

  let inserted = 0;
  let skipped = 0;
  let errors = 0;

  for (const org of orgs) {
    if (!org.name?.trim()) { skipped++; continue; }

    // Generate unique slug
    let slug = toSlug(org.name);
    if (slugSet.has(slug)) {
      const city = org.city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      slug = toSlug(`${org.name}-${city}`);
    }
    if (slugSet.has(slug)) { slug = `${slug}-${org.id}`; }
    if (slugSet.has(slug)) { skipped++; console.log(`  SKIP  ${org.name} (slug conflict)`); continue; }

    const { citySlug, regionCode } = cityLookup(org.city);
    const cityId = citySlug ? (cityIdMap.get(citySlug) ?? null) : null;
    const full_description = buildDescription(org);
    const sectorSlugs = nteeToSectors(org.ntee);

    try {
      const [row] = await sql<{ id: number }[]>`
        INSERT INTO listings (
          slug, name, org_type,
          city_id, region_code, city_name,
          website_url, address_line1, zip_code, phone, email,
          year_founded, executive_director,
          mission, full_description,
          serves_statewide, status, is_verified
        ) VALUES (
          ${slug}, ${org.name.trim()}, 'nonprofit_501c3',
          ${cityId}, ${regionCode}, ${org.city || null},
          ${org.website || null}, ${org.address || null}, ${org.zip || null},
          ${org.phone || null}, ${org.email || null},
          ${org.year_founded}, ${org.executive_director || null},
          ${org.mission || null}, ${full_description},
          false, 'approved', false
        )
        ON CONFLICT (slug) DO NOTHING
        RETURNING id
      `;

      if (!row) { skipped++; continue; }
      slugSet.add(slug);

      for (let i = 0; i < sectorSlugs.length; i++) {
        const sid = sectorIdMap.get(sectorSlugs[i]);
        if (sid) {
          await sql`
            INSERT INTO listing_sectors (listing_id, sector_id, is_primary)
            VALUES (${row.id}, ${sid}, ${i === 0})
            ON CONFLICT DO NOTHING
          `;
        }
      }

      inserted++;
      if (inserted % 50 === 0) console.log(`  [${inserted}/${orgs.length}] inserted so far...`);
    } catch (e) {
      errors++;
      console.error(`  ERR  ${org.name}:`, (e as Error).message?.slice(0, 80));
    }
  }

  console.log(`\nDone: ${inserted} inserted, ${skipped} skipped, ${errors} errors`);
}

main().catch(e => { console.error(e); process.exit(1); });

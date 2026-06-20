/**
 * Scrapes all NM 501(c)(3) nonprofits from ProPublica Nonprofit Explorer API
 * and imports them as approved listings into the DB.
 *
 * Run: npx tsx --env-file=.env scripts/scrape-propublica.ts
 */
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error('ERROR: DATABASE_URL not set'); process.exit(1); }
const sql = neon(DATABASE_URL);

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

const CITY_MAP: Record<string, string> = {
  albuquerque: 'albuquerque_metro',
  'rio rancho': 'albuquerque_metro',
  bernalillo: 'albuquerque_metro',
  corrales: 'albuquerque_metro',
  placitas: 'albuquerque_metro',
  'los ranchos de albuquerque': 'albuquerque_metro',
  'los ranchos': 'albuquerque_metro',
  'los lunas': 'albuquerque_metro',
  belen: 'albuquerque_metro',
  socorro: 'albuquerque_metro',
  edgewood: 'albuquerque_metro',
  moriarty: 'albuquerque_metro',
  'east mountains': 'albuquerque_metro',
  tijeras: 'albuquerque_metro',
  'santa fe': 'northern_nm',
  'los alamos': 'northern_nm',
  espanola: 'northern_nm',
  española: 'northern_nm',
  'el prado': 'northern_nm',
  chama: 'northern_nm',
  taos: 'northern_nm',
  'angel fire': 'northern_nm',
  'las vegas': 'northern_nm',
  raton: 'northern_nm',
  cimarron: 'northern_nm',
  mora: 'northern_nm',
  'red river': 'northern_nm',
  abiquiu: 'northern_nm',
  'ojo caliente': 'northern_nm',
  'chimayo': 'northern_nm',
  'chimayó': 'northern_nm',
  'pecos': 'northern_nm',
  'pojoaque': 'northern_nm',
  tesuque: 'northern_nm',
  'velarde': 'northern_nm',
  dixon: 'northern_nm',
  'eagle nest': 'northern_nm',
  'las cruces': 'southern_nm',
  alamogordo: 'southern_nm',
  'silver city': 'southern_nm',
  'truth or consequences': 'southern_nm',
  deming: 'southern_nm',
  reserve: 'southern_nm',
  ruidoso: 'southern_nm',
  cloudcroft: 'southern_nm',
  roswell: 'southern_nm',
  'white sands': 'southern_nm',
  'tularosa': 'southern_nm',
  'carrizozo': 'southern_nm',
  'lordsburg': 'southern_nm',
  bayard: 'southern_nm',
  'santa teresa': 'southern_nm',
  sunland: 'southern_nm',
  'sunland park': 'southern_nm',
  'anthony': 'southern_nm',
  'hatch': 'southern_nm',
  elephantbutte: 'southern_nm',
  'elephant butte': 'southern_nm',
  carlsbad: 'eastern_nm',
  hobbs: 'eastern_nm',
  artesia: 'eastern_nm',
  clovis: 'eastern_nm',
  portales: 'eastern_nm',
  lovington: 'eastern_nm',
  tucumcari: 'eastern_nm',
  'alamogordo': 'southern_nm',
  'ruidoso downs': 'southern_nm',
  eunice: 'eastern_nm',
  jal: 'eastern_nm',
  'lovington': 'eastern_nm',
  'fort sumner': 'eastern_nm',
  'santa rosa': 'eastern_nm',
  'vaughn': 'eastern_nm',
  'las vegas': 'northern_nm',
  farmington: 'four_corners',
  aztec: 'four_corners',
  gallup: 'four_corners',
  bloomfield: 'four_corners',
  'four corners': 'four_corners',
  'shiprock': 'four_corners',
  'crownpoint': 'four_corners',
  'zuni': 'four_corners',
  'grants': 'four_corners',
  milan: 'four_corners',
  'cuba': 'four_corners',
  'dulce': 'four_corners',
  'navajo': 'four_corners',
  'tohatchi': 'four_corners',
  'window rock': 'four_corners',
};

function cityToRegion(rawCity: string): string {
  const key = rawCity.toLowerCase().trim();
  return CITY_MAP[key] ?? 'albuquerque_metro';
}

function nteeToSectors(ntee: string | null): string[] {
  if (!ntee) return ['civic-engagement'];
  const prefix = ntee.trim().charAt(0).toUpperCase();
  return NTEE_MAP[prefix] ?? ['civic-engagement'];
}

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

interface PropublicaOrg {
  ein: number;
  strein: string;
  name: string;
  city: string;
  state: string;
  ntee_code: string | null;
}

async function fetchPage(page: number): Promise<PropublicaOrg[]> {
  const url = `https://projects.propublica.org/nonprofits/api/v2/search.json?state%5Bid%5D=NM&c_code%5Bid%5D=3&per_page=100&page=${page}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'nmnonprofits.com directory (mgswrites@gmail.com)' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} on page ${page}`);
  const data = await res.json();
  return (data.organizations ?? []) as PropublicaOrg[];
}

async function main() {
  console.log('Loading existing data from DB...');

  const [existingRows, slugRows, sectorRows, cityRows] = await Promise.all([
    sql<{ ein: string }[]>`SELECT ein FROM listings WHERE ein IS NOT NULL`,
    sql<{ slug: string }[]>`SELECT slug FROM listings`,
    sql<{ id: number; slug: string }[]>`SELECT id, slug FROM sectors`,
    sql<{ id: number; name: string }[]>`SELECT id, LOWER(name) AS name FROM cities`,
  ]);

  const existingEINs = new Set(existingRows.map(r => r.ein));
  const existingSlugs = new Set(slugRows.map(r => r.slug));
  const sectorMap = new Map(sectorRows.map(s => [s.slug, s.id]));
  const cityIdMap = new Map(cityRows.map(c => [c.name, c.id]));

  console.log(`Existing: ${existingEINs.size} EINs, ${existingSlugs.size} slugs`);

  let imported = 0;
  let skipped = 0;
  let errors = 0;
  const CONCURRENCY = 5;
  const TOTAL_PAGES = 100;

  for (let startPage = 0; startPage < TOTAL_PAGES; startPage += CONCURRENCY) {
    const pageNums = Array.from(
      { length: Math.min(CONCURRENCY, TOTAL_PAGES - startPage) },
      (_, i) => startPage + i,
    );

    const results = await Promise.allSettled(pageNums.map(fetchPage));
    const orgs: PropublicaOrg[] = [];

    for (const r of results) {
      if (r.status === 'fulfilled') orgs.push(...r.value);
      else { console.error('  Page fetch failed:', r.reason); errors++; }
    }

    for (const org of orgs) {
      if (!org.name?.trim() || !org.city?.trim()) { skipped++; continue; }

      const einStr = String(org.ein);
      if (existingEINs.has(einStr)) { skipped++; continue; }

      // Resolve slug: name → name-city → name-ein
      let slug = toSlug(org.name);
      if (existingSlugs.has(slug)) slug = `${toSlug(org.name)}-${toSlug(org.city)}`;
      if (existingSlugs.has(slug)) slug = `${toSlug(org.name)}-${einStr}`;
      if (existingSlugs.has(slug)) { skipped++; continue; }

      const regionCode = cityToRegion(org.city);
      const cityId = cityIdMap.get(org.city.toLowerCase().trim()) ?? null;
      const sectorSlugs = nteeToSectors(org.ntee_code);

      try {
        const [listing] = await sql<{ id: number }[]>`
          INSERT INTO listings (
            slug, name, org_type, region_code, city_id, city_name,
            ein, status, is_verified
          ) VALUES (
            ${slug}, ${org.name}, 'nonprofit_501c3', ${regionCode},
            ${cityId}, ${org.city},
            ${einStr}, 'approved', false
          )
          ON CONFLICT (slug) DO NOTHING
          RETURNING id
        `;

        if (!listing) { skipped++; continue; }

        existingSlugs.add(slug);
        existingEINs.add(einStr);

        for (let i = 0; i < sectorSlugs.length; i++) {
          const sid = sectorMap.get(sectorSlugs[i]);
          if (sid) {
            await sql`
              INSERT INTO listing_sectors (listing_id, sector_id, is_primary)
              VALUES (${listing.id}, ${sid}, ${i === 0})
              ON CONFLICT DO NOTHING
            `;
          }
        }

        imported++;
      } catch (err) {
        console.error(`  Error importing "${org.name}":`, (err as Error).message);
        errors++;
      }
    }

    if ((startPage / CONCURRENCY) % 4 === 0) {
      console.log(`Pages ${startPage}-${startPage + pageNums.length - 1} done — imported: ${imported}, skipped: ${skipped}`);
    }

    // Polite delay between batches
    await new Promise(r => setTimeout(r, 750));
  }

  console.log(`\nFinished. Imported: ${imported} | Skipped: ${skipped} | Errors: ${errors}`);
}

main().catch(err => { console.error(err); process.exit(1); });

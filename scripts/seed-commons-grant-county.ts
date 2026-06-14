import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error('ERROR: DATABASE_URL not set'); process.exit(1); }
const sql = neon(DATABASE_URL);

const MISSION = 'Cultivating food security, self-sufficiency, and sustainability in Grant County through food distribution, community gardens, youth programs, and a countywide volunteer center.';

const DESCRIPTION = `The Commons Grant County, whose full name is the Center for Food Security and Sustainability, is a Silver City nonprofit founded in 2004 with a mission to cultivate food security, self-sufficiency, and sustainability across Grant County. The organization addresses hunger and food access through a layered set of programs that range from emergency food distribution to culinary education, youth development, and community organizing.

Food access is the core of what The Commons does. A community food pantry at their facility on East 13th Street distributes groceries to households facing food insecurity, while mobile pantry operations extend that reach to residents who cannot easily travel to a fixed site. Emergency food bags provide rapid assistance for individuals in immediate need, and the Alimento backpack program places food in the hands of students so they have reliable nutrition over weekends and school breaks. This continuum of food support acknowledges that hunger shows up differently across a community and requires multiple responses.

The Commons also invests in food production as a path toward long-term self-sufficiency. Community garden programming gives residents space to grow their own food, building skills, reducing grocery costs, and strengthening connections to the land. In a region with a strong agricultural heritage, this work carries cultural as well as practical weight.

The Gather and Grow Kitchen extends the food mission into education and economic development. Community dinners bring people together around shared meals, while cooking classes build practical culinary skills. Entrepreneurship training in the kitchen creates pathways for residents to start or grow food-based businesses, connecting food security to economic opportunity in a rural economy where such opportunities are limited.

Youth are a particular focus. The Rooted Youth programs include a Youth Conservation Corps, which connects young people to land stewardship and outdoor work experience, and a Summer Garden Kids Camp that combines gardening, nutrition education, and seasonal programming for children. These initiatives build skills, environmental awareness, and community ties among the next generation.

The Commons also operates a Volunteer Center that coordinates volunteer opportunities across more than 38 Grant County organizations. This function makes The Commons a connective tissue organization for the broader nonprofit sector in the region, channeling civic energy and time into community needs across multiple causes. Under the leadership of Executive Director Ben Rasmussen, the organization continues to expand its reach in one of New Mexico's most rural and geographically isolated counties.`;

async function main() {
  const sectors = await sql<{ id: number; slug: string }[]>`SELECT id, slug FROM sectors`;
  const sectorMap = new Map(sectors.map((s) => [s.slug, s.id]));

  const cities = await sql<{ id: number; slug: string }[]>`SELECT id, slug FROM cities`;
  const cityId = cities.find((c) => c.slug === 'silver-city')?.id ?? null;

  const [row] = await sql<{ id: number }[]>`
    INSERT INTO listings (
      slug, name, org_type,
      city_id, region_code, city_name,
      website_url, address_line1, zip_code, phone, email,
      year_founded, executive_director,
      mission, full_description,
      serves_statewide, status, is_verified
    ) VALUES (
      'the-commons-grant-county',
      'The Commons Grant County',
      'nonprofit_501c3',
      ${cityId}, 'southern_nm', 'Silver City',
      'https://thecommonsgrantcounty.org',
      '501 E. 13th St.',
      '88061',
      '(575) 388-2988',
      'info@thecommonsgc.org',
      2004,
      'Ben Rasmussen',
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

  const sectorSlugs = ['food-agriculture', 'education-youth', 'environment-conservation'];
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

  console.log('Added The Commons Grant County id=' + listingId);
}

main().catch((e) => { console.error(e); process.exit(1); });

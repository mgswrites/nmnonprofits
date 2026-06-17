import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error('ERROR: DATABASE_URL not set'); process.exit(1); }
const sql = neon(DATABASE_URL);

const MARKETS = [
  {
    slug: 'tesoros-del-valle-farmers-market',
    name: 'Tesoros del Valle Farmers Market',
    city_slug: null,
    city_name: 'Villanueva',
    region_code: 'northern_nm',
    website_url: 'https://www.tesorosdelvalle.org',
    address_line1: '11 Los Pueblos Rd',
    zip_code: '87583',
    email: 'tesorosfarmersmarket@gmail.com',
    year_founded: 2024,
    executive_director: 'Jason Lee Gonzalez',
    ein: '41-4545513',
    sectors: ['food-agriculture'],
    mission: 'Community farmers market serving the Pecos River Valley food desert, organized under Nuevo Mexico Fresco, a 501(c)(3) connecting Villanueva-area growers and makers with residents every Sunday and Thursday through the growing season.',
    full_description: `Tesoros del Valle, which means "treasures of the valley," is a community farmers market serving the Pecos River Valley in San Miguel County, one of the most food-insecure and geographically isolated communities in northern New Mexico. The market is organized under Nuevo Mexico Fresco, a 501(c)(3) nonprofit based in Ribera that received its tax-exempt status in 2026, and operates with support from the New Mexico Farmers' Marketing Association.

The market was founded by Jason Lee Gonzalez, a small farmer and community leader who recognized that residents of the Villanueva area faced a food desert with the nearest grocery store roughly an hour and a half away. Tesoros del Valle operates at two locations during the growing season: Sundays at the El Valle Community Center at 11 Los Pueblos Road in Villanueva, and Thursdays at the San Miguel Senior Center at 279 NM-3 in Ribera. The Sunday market runs June through October; the Thursday market runs June through late October.

The market brings together local producers growing and making a range of products including microgreens, beef, eggs, dairy, jams, herbs, flowers, seeds, plant starts, breads, and handcrafted goods. Named farming partners include Steve and Francis Montoya, and Gonzalez has articulated a vision of growing the farming community by inspiring young people to take up agriculture and increasing local food crop production in the valley.

Tesoros del Valle accepts SNAP and EBT, participates in the Double Up Food Bucks program, and accepts WIC and Senior Farmers Market Nutrition Program vouchers, ensuring that federal nutrition assistance dollars can flow directly to local producers. The market received a $25,000 grant from the Las Vegas NM Community Foundation's Anchorum Community Health Fund to build capacity and strengthen local food access and economic opportunity in the Pecos River Valley communities.

The El Valle Community Center, which hosts the Sunday market, also operates the El Toro Food Pantry, making the market location a hub for multiple food security programs in a community with significant unmet need.`,
  },
  {
    slug: 'tri-county-farmers-market',
    name: 'Tri-County Farmers Market',
    city_slug: 'las-vegas',
    city_name: 'Las Vegas',
    region_code: 'northern_nm',
    website_url: 'https://lvnmfarmersmarket.com',
    address_line1: '6 E University Ave',
    zip_code: '87701',
    phone: '(505) 718-2110',
    email: 'gmascarenas11@gmail.com',
    executive_director: 'Gwen Mascarenas',
    sectors: ['food-agriculture'],
    mission: 'One of New Mexico\'s oldest farmers markets, operating year-round every Saturday in Las Vegas and serving Mora, San Miguel, and Guadalupe counties for more than fifty years.',
    full_description: `The Tri-County Farmers Market is one of New Mexico's oldest and most enduring community markets, with roots in the early 1970s and more than fifty years of continuous Saturday operation in Las Vegas, New Mexico. The market serves Mora, San Miguel, and Guadalupe counties, a three-county territory that spans some of the most rural and historically significant communities in the northeastern part of the state. It is listed and supported by the New Mexico Farmers' Marketing Association and governed by a volunteer board of directors elected annually by vendors.

The market operates year-round at the corner of 6th Street and University Avenue in Las Vegas, adjacent to Semilla Natural Foods. Summer hours bring vendors out early in the morning, with 30 or more producers and makers offering fresh produce, plant starts, eggs, meat, milk and cheese, baked goods, canned goods, herbal remedies, soaps, ready-to-eat foods, fresh-cut flowers, jewelry, and crafts. Winter operations continue on a reduced schedule, sustaining a direct market connection between producers and community members through the colder months.

The market accepts SNAP and EBT, participates in the Double Up Food Bucks program that matches SNAP spending on New Mexico-grown fruits and vegetables, and accepts WIC and Senior Farmers Market Nutrition Program vouchers. These programs make the market a food access resource as well as a commercial venue, particularly important in a region with persistent economic hardship and limited grocery options.

Las Vegas is the county seat of San Miguel County and a historic hub for northeastern New Mexico. The Tri-County Farmers Market has been a fixture of the city's Saturday life for generations, surviving changes in location and leadership while maintaining its character as a producer-driven community institution. Market manager Gwen Mascarenas oversees current operations, carrying forward a tradition that stretches back more than half a century and continues to serve as a gathering point for producers and residents across three counties.`,
  },
];

async function main() {
  const cities = await sql<{ id: number; slug: string }[]>`SELECT id, slug FROM cities`;
  const cityMap = new Map(cities.map(c => [c.slug, c.id]));

  const sectors = await sql<{ id: number; slug: string }[]>`SELECT id, slug FROM sectors`;
  const sectorMap = new Map(sectors.map(s => [s.slug, s.id]));

  for (const m of MARKETS) {
    const cityId = m.city_slug ? (cityMap.get(m.city_slug) ?? null) : null;

    const [row] = await sql<{ id: number; xmax: string }[]>`
      INSERT INTO listings (
        slug, name, org_type,
        city_id, region_code, city_name,
        website_url, address_line1, zip_code,
        phone, email, ein,
        year_founded, executive_director,
        mission, full_description,
        serves_statewide, status, is_verified
      ) VALUES (
        ${m.slug}, ${m.name}, 'nonprofit_501c3',
        ${cityId}, ${m.region_code}, ${m.city_name},
        ${m.website_url}, ${m.address_line1 ?? null}, ${m.zip_code ?? null},
        ${m.phone ?? null}, ${m.email ?? null}, ${m.ein ?? null},
        ${m.year_founded ?? null}, ${m.executive_director ?? null},
        ${m.mission}, ${m.full_description},
        false, 'approved', false
      )
      ON CONFLICT (slug) DO UPDATE SET
        name             = EXCLUDED.name,
        mission          = EXCLUDED.mission,
        full_description = EXCLUDED.full_description,
        website_url      = EXCLUDED.website_url,
        updated_at       = now()
      RETURNING id, xmax::text
    `;

    const isUpdate = row.xmax !== '0';
    await sql`DELETE FROM listing_sectors WHERE listing_id = ${row.id}`;
    for (let i = 0; i < m.sectors.length; i++) {
      const sid = sectorMap.get(m.sectors[i]);
      if (sid) {
        await sql`
          INSERT INTO listing_sectors (listing_id, sector_id, is_primary)
          VALUES (${row.id}, ${sid}, ${i === 0})
          ON CONFLICT DO NOTHING
        `;
      }
    }
    console.log(`  ${isUpdate ? 'updated' : 'inserted'}  [${row.id}]  ${m.name}`);
  }
  console.log('\nDone.');
}

main().catch(e => { console.error(e); process.exit(1); });

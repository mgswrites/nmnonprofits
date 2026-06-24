import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

const BASE = '?w=1200&h=500&fit=crop&auto=format';
const U = (id: string) => `https://images.unsplash.com/photo-${id}${BASE}`;

// slug → Unsplash URL
const cityImages: Record<string, string> = {
  'roswell':                   U('1654450706032-46e2a14d6c91'),  // UFO/alien neon, Roswell
  'farmington':                U('1562705859-72842cf88fd1'),     // Shiprock
  'aztec':                     U('1562705859-72842cf88fd1'),     // Shiprock (Four Corners)
  'carlsbad':                  U('1637047868520-b0081dd1c11a'),  // Carlsbad Caverns
  'rio-rancho':                U('1596466738386-42fcaf328caa'),  // Sandia Mountains
  'los-alamos':                U('1577141137960-e9a942eb036a'),  // Jemez Mountains
  'alamogordo':                U('1628328052245-6a16b95499ef'),  // White Sands
  'clovis':                    U('1646173391429-d6ed210a7e06'),  // Eastern NM plains
  'portales':                  U('1613939599818-a8b12ebbcfa9'),  // Eastern NM desert
  'hobbs':                     U('1613939599818-a8b12ebbcfa9'),  // Eastern NM desert
  'ruidoso':                   U('1610657269529-cce0608d4ca9'),  // Cimarron Canyon forest
  'raton':                     U('1610657269529-cce0608d4ca9'),  // Cimarron Canyon / Raton Pass
  'truth-or-consequences':     U('1619059426109-317721f88604'),  // Bosque del Apache
  'espanola':                  U('1589691135456-1a204ce45fb0'),  // Rio Chama valley
  'tucumcari':                 U('1703009512285-cb0ca125438d'),  // Route 66, Tucumcari
  'bernalillo':                U('1590617400285-4c3c4e37eb88'),  // Bernalillo / Sandia
  'corrales':                  U('1532447205654-faa2fc530316'),  // Rio Grande Gorge
  'socorro':                   U('1619921845646-6216752a036c'),  // Very Large Array
  'deming':                    U('1594996895104-bf00a88d33e6'),  // Southern NM landscape
};

async function run() {
  let updated = 0;
  for (const [slug, url] of Object.entries(cityImages)) {
    const rows = await sql`
      UPDATE cities SET hero_image_url = ${url}
      WHERE slug = ${slug} AND (hero_image_url IS NULL OR hero_image_url NOT LIKE 'https://images.unsplash.com%')
      RETURNING id, name, slug
    `;
    if (rows.length > 0) {
      console.log(`  updated: ${rows[0].name} (${slug})`);
      updated++;
    } else {
      // Check if city exists at all
      const exists = await sql`SELECT id, name FROM cities WHERE slug = ${slug} LIMIT 1`;
      if (exists.length === 0) {
        console.log(`  not found: ${slug}`);
      } else {
        console.log(`  skipped (already has URL): ${exists[0].name}`);
      }
    }
  }
  console.log(`\nDone. ${updated} cities updated.`);
}

run().catch(console.error);

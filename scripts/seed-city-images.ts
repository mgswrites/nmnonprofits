import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

const BASE = '?w=1200&h=500&fit=crop&auto=format';
const U = (id: string) => `https://images.unsplash.com/photo-${id}${BASE}`;

// slug → Unsplash CDN URL (all IDs verified 200)
const cityImages: Record<string, string> = {
  // Batch 1 — previously seeded
  'roswell':                   U('1654450706032-46e2a14d6c91'),  // UFO/alien neon
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
  'tucumcari':                 U('1703009512285-cb0ca125438d'),  // Route 66 neon signs
  'bernalillo':                U('1590617400285-4c3c4e37eb88'),  // Bernalillo / Sandia backdrop
  'corrales':                  U('1532447205654-faa2fc530316'),  // Rio Grande Gorge
  'socorro':                   U('1619921845646-6216752a036c'),  // Very Large Array
  'deming':                    U('1594996895104-bf00a88d33e6'),  // Southern NM landscape

  // Batch 2 — new
  'artesia':                   U('1600698196587-e9206aacb442'),  // NM plains road
  'los-lunas':                 U('1603491203882-7b3ecd8daa6c'),  // Bosque / cottonwood
  'belen':                     U('1604668681236-52c0f67c142b'),  // Rio Grande / Abiquiu Valley
  'placitas':                  U('1596466738386-42fcaf328caa'),  // Sandia Mountains foothills
  'el-prado':                  U('1532447205654-faa2fc530316'),  // Rio Grande Gorge Bridge (El Prado location)
  'lovington':                 U('1516199423456-1f1e91b06f25'),  // Oil pump jack at sunset
  'angel-fire':                U('1605293087581-281f9323547a'),  // Meadow, tagged Angel Fire NM
  'grants':                    U('1646173391429-d6ed210a7e06'),  // San Mateo Mountains, central NM
  'shiprock':                  U('1637981107571-de24baf9a2b0'),  // Shiprock formation at dusk (drone)
  'chimayo':                   U('1695596255935-7bcba9a8f719'),  // Santuario de Chimayo chapel
  'abiquiu':                   U('1634093732105-9abb5ef09930'),  // Ghost Ranch red rock
  'cloudcroft':                U('1616880482867-cc621b103c11'),  // Osha Trail forest near Cloudcroft
  'chama':                     U('1705868259681-b37d0f33cb14'),  // Cumbres & Toltec steam train
  'hatch':                     U('1727153488884-9a2cd3005478'),  // Hatch chile sign
  'zuni':                      U('1634051360372-b21f31fe14aa'),  // Rocky mesas, Gallup NM
  'bloomfield':                U('1670884061517-644a13c0ee73'),  // NM desert landscape
};

async function run() {
  let updated = 0;
  let skipped = 0;
  let notFound = 0;

  for (const [slug, url] of Object.entries(cityImages)) {
    const rows = await sql`
      UPDATE cities SET hero_image_url = ${url}
      WHERE slug = ${slug}
      RETURNING id, name, slug
    `;
    if (rows.length > 0) {
      console.log(`  updated: ${rows[0].name} (${slug})`);
      updated++;
    } else {
      console.log(`  not found: ${slug}`);
      notFound++;
    }
  }
  console.log(`\nDone. ${updated} updated, ${skipped} skipped, ${notFound} not found.`);
}

run().catch(console.error);

import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error('ERROR: DATABASE_URL not set'); process.exit(1); }
const sql = neon(DATABASE_URL);

const MARKETS = [
  {
    slug: 'nm-farmers-marketing-association',
    name: "New Mexico Farmers' Marketing Association",
    city_slug: 'santa-fe',
    city_name: 'Santa Fe',
    region_code: 'northern_nm',
    website_url: 'https://farmersmarketsnm.org',
    address_line1: '1919 Fifth Street, Suite H',
    zip_code: '87505',
    phone: '(505) 983-4010',
    ein: '85-0430744',
    year_founded: 1994,
    serves_statewide: true,
    sectors: ['food-agriculture', 'economic-development'],
    mission: "Statewide nonprofit supporting New Mexico farmers markets and producers through advocacy, SNAP incentive programs, nutrition programs, and technical assistance since 1994.",
    full_description: `The New Mexico Farmers' Marketing Association is a statewide 501(c)(3) nonprofit founded in 1994 and headquartered in Santa Fe. The organization serves as the primary network and advocacy body for farmers markets and direct-market producers across New Mexico, working to strengthen local food systems, support agricultural producers, and expand access to fresh food for all New Mexicans.

The NMFMA's programs address both the supply and demand sides of the local food economy. The Double Up Food Bucks program provides SNAP recipients with matching funds to spend on New Mexico-grown produce, doubling the purchasing power of food assistance dollars at participating farmers markets. The WIC Farmers Market Nutrition Program and Senior Farmers Market Nutrition Program distribute vouchers that allow low-income families and older adults to purchase fresh fruits and vegetables directly from local farmers. The FreshRx produce prescription program connects healthcare providers with local food access, enabling doctors to prescribe produce to patients with diet-related health conditions.

Beyond consumer-facing programs, the NMFMA provides technical assistance to market managers, supports vendor outreach, and advocates at the state and federal level for policies that benefit small-scale agricultural producers. The organization maintains relationships with farmers markets across all regions of the state, from urban markets in Albuquerque and Santa Fe to rural and tribal community markets in some of New Mexico's most food-insecure areas.

With annual revenues of roughly three million dollars, the NMFMA is one of the larger food-system nonprofits in New Mexico and plays an essential coordinating role in a sector where most individual markets operate with very small staffs and budgets.`,
  },
  {
    slug: 'santa-fe-farmers-market-institute',
    name: "Santa Fe Farmers' Market Institute",
    city_slug: 'santa-fe',
    city_name: 'Santa Fe',
    region_code: 'northern_nm',
    website_url: 'https://farmersmarketinstitute.org',
    address_line1: '1607 Paseo de Peralta, Suite A',
    zip_code: '87501',
    phone: '(505) 983-7726',
    ein: '30-0124953',
    year_founded: 2002,
    serves_statewide: false,
    sectors: ['food-agriculture', 'economic-development'],
    mission: "Santa Fe nonprofit owning and operating the year-round Santa Fe Farmers' Market venue in the Railyard, supporting local farmers, ranchers, and land-based producers.",
    full_description: `The Santa Fe Farmers' Market Institute is a 501(c)(3) nonprofit founded in 2002 that owns and operates the year-round Santa Fe Farmers' Market in the city's historic Railyard district. The institute was established to provide a permanent, stable home for one of New Mexico's most celebrated farmers markets, ensuring that direct-market agriculture has a lasting physical and institutional infrastructure in the state capital.

The Santa Fe Farmers' Market has operated for decades as one of the premier markets in the Southwest, drawing producers from across northern New Mexico and attracting both local shoppers and visitors. The institute's ownership of the Railyard venue gives the market a degree of stability that many farmers markets lack, protecting it from the lease uncertainties and displacement pressures that have ended or diminished markets in other cities.

The institute's mission extends beyond market operations to advocacy for the broader community of farmers, ranchers, and land-based producers who depend on direct sales for their livelihoods. This includes supporting policies that protect agricultural land, sustain small farm viability, and expand consumer access to locally grown food. Programs address the economic sustainability of farming as a livelihood in a region where agricultural land is under development pressure and farm succession is a persistent challenge.

With annual revenues approaching one million dollars, the Santa Fe Farmers' Market Institute operates at a scale that allows it to maintain professional staff, invest in market infrastructure, and pursue advocacy alongside its core market management function.`,
  },
  {
    slug: 'rail-yards-market',
    name: 'Rail Yards Market',
    city_slug: 'albuquerque',
    city_name: 'Albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://railyardsmarket.org',
    address_line1: '777 1st Street SW',
    zip_code: '87102',
    phone: '(505) 600-1109',
    ein: '85-1171319',
    year_founded: 2020,
    serves_statewide: false,
    sectors: ['food-agriculture', 'arts-culture'],
    mission: "Community farmers and artisan market in Albuquerque's historic Barelas Railyards, connecting local farmers, food producers, and artists with shoppers every Sunday May through October.",
    full_description: `Rail Yards Market is a volunteer-founded 501(c)(3) nonprofit operating a vibrant farmers and artisan market in Albuquerque's historic Barelas neighborhood, at the site of the city's iconic Rio Grande Railyards. The market runs Sundays from 10am to 2pm, May through October, drawing more than 175 vendors who bring together locally grown food, New Mexico cuisine, handmade art, and live music in a setting that reflects the cultural richness of the South Valley and surrounding communities.

The market's setting in the Railyards connects it to a significant chapter of Albuquerque history. The site served as the central maintenance and repair facility for the Atchison, Topeka and Santa Fe Railway, and its massive historic structures have become a backdrop for community life and creative reuse. Rail Yards Market contributes to ongoing revitalization of this neighborhood anchor while centering local food, culture, and small business development.

Vendors at Rail Yards Market include small-scale farmers and ranchers, prepared food makers, bakers, and artists and craftspeople working in a wide range of media. The market accepts SNAP and EBT and participates in programs to expand food access for low-income shoppers. The emphasis on New Mexico-made and New Mexico-grown products gives the market a strong local identity and creates direct economic connections between producers and the communities they serve.

Founded in 2020, Rail Yards Market has grown quickly into one of Albuquerque's most attended seasonal markets, building a loyal community of vendors and shoppers who return week after week throughout the growing season.`,
  },
  {
    slug: 'farmers-and-crafts-market-las-cruces',
    name: 'Farmers and Crafts Market of Las Cruces',
    city_slug: 'las-cruces',
    city_name: 'Las Cruces',
    region_code: 'southern_nm',
    website_url: 'https://www.farmersandcraftsmarketoflascruces.com',
    address_line1: '221 N. Main Street, Suite B',
    zip_code: '88001',
    phone: '(575) 201-3853',
    ein: '46-1273809',
    year_founded: 1971,
    serves_statewide: false,
    sectors: ['food-agriculture', 'economic-development'],
    mission: "Producers-only year-round market operating since 1971 along seven blocks of downtown Las Cruces, named the top large farmers market in the nation by America's Farmland Trust.",
    full_description: `The Farmers and Crafts Market of Las Cruces is one of the oldest and most celebrated farmers markets in New Mexico, operating since 1971 and incorporated as a 501(c)(3) nonprofit in 2012 under a board of directors elected from its vendor community. The market runs every Wednesday and Saturday year-round along seven blocks of Main Street in downtown Las Cruces, making it one of the few all-weather, all-year markets in the state and a defining fixture of the city's civic life.

The market operates on a producers-only model, requiring vendors to grow, raise, or make what they sell. This commitment to direct-from-producer sales distinguishes the market from general craft fairs or reseller markets and ensures that buyers are connecting directly with the farmers, ranchers, bakers, and artisans behind the goods. The southern New Mexico growing region, with its long growing season and agricultural heritage in chile, pecans, and other crops, provides a steady supply of distinctive local products throughout the year.

In 2011, America's Farmland Trust named the Farmers and Crafts Market of Las Cruces the top large farmers market in the nation, recognition that reflects decades of consistent operation and a deep commitment to the producer-consumer relationship at the heart of farmers market culture. The market accepts SNAP and EBT and participates in nutrition incentive programs to ensure access for low-income shoppers.

Governance by a vendor-elected board gives the market a democratic, community-rooted character that has sustained it across more than five decades and multiple generations of participants.`,
  },
  {
    slug: 'downtown-growers-market',
    name: "Downtown Growers' Market",
    city_slug: 'albuquerque',
    city_name: 'Albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://www.downtowngrowers.org',
    address_line1: '115 Gold Ave SW, Suite 205',
    zip_code: '87125',
    phone: '(505) 252-2959',
    year_founded: null,
    serves_statewide: false,
    sectors: ['food-agriculture', 'economic-development'],
    mission: "Albuquerque's largest Saturday farmers market, operating at Robinson Park downtown April through November, supporting local agriculture and small business in the heart of the city.",
    full_description: `The Downtown Growers' Market is a 501(c)(3) program of the DowntownAbq MainStreet Initiative, operating as Albuquerque's premier downtown farmers market at historic Robinson Park at 8th Street and Central Avenue. The market runs every Saturday from 8am to noon, April through November, bringing together local farmers, food producers, and small businesses in the heart of the city's urban core.

The market's location in Robinson Park, steps from Central Avenue and the historic downtown corridor, makes it a weekly gathering point for a wide cross-section of Albuquerque residents. Vendors include farmers and ranchers from the Rio Grande valley and surrounding agricultural areas, prepared food makers, bakers, coffee roasters, and specialty producers. The market accepts SNAP and EBT and participates in nutrition incentive programs, expanding access to fresh local food for shoppers of all income levels.

As the largest program of DowntownAbq MainStreet Initiative, the Downtown Growers' Market serves a dual function: providing a reliable market for agricultural producers and contributing to the economic vitality and foot traffic of Albuquerque's downtown. The Saturday market draws consistent crowds and supports the kind of regular community activation that is central to downtown revitalization efforts.

The market operates with a commitment to supporting local and regional growers, prioritizing vendors who grow or produce what they sell and maintaining the character of a true farmers market rather than a general retail event. This focus on agriculture and local production gives the Downtown Growers' Market its identity as a community anchor for Albuquerque's food system.`,
  },
  {
    slug: 'la-familia-growers-market',
    name: "La Familia Growers Market",
    city_slug: 'albuquerque',
    city_name: 'Albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://www.lafamiliagrowersmarket.org',
    address_line1: '100 Isleta Blvd SW',
    zip_code: '87105',
    phone: '(505) 400-3635',
    year_founded: 2016,
    serves_statewide: false,
    sectors: ['food-agriculture', 'civic-engagement'],
    mission: "Community farmers market and mercado in Albuquerque's South Valley, operated by South Valley MainStreet to connect residents with local farmers, food, music, and culture.",
    full_description: `La Familia Growers Market is a community farmers market and mercado in Albuquerque's South Valley, operated as a program of South Valley MainStreet, a 501(c)(3) nonprofit serving one of the city's most historically rooted and culturally distinctive neighborhoods. The market has been operating since 2016 and reflects the South Valley's identity as an agricultural community with deep acequia traditions and a predominantly Hispanic working-class population.

The market brings together local farmers and food vendors with musicians and artists, creating a weekly gathering that is as much cultural event as marketplace. This integration of food, music, and community engagement reflects a deliberate approach to market design that centers the South Valley's culture rather than simply replicating a generic farmers market format. Vendors include growers from the neighborhood and surrounding valley communities, prepared food makers specializing in New Mexican and regional cuisine, and artisans working in traditional and contemporary forms.

La Familia Growers Market accepts SNAP and EBT, participates in the Double Up Food Bucks program, and accepts WIC vouchers, making local fresh food accessible to the South Valley's largely working-class and food-insecure population. The market's location on Isleta Blvd serves residents who may not easily travel to markets in other parts of the city.

Operating within South Valley MainStreet's broader mission of neighborhood economic development, La Familia Growers Market connects the local food system with community organizing, small business support, and cultural programming that strengthens the South Valley as a place to live and work.`,
  },
  {
    slug: 'taos-farmers-market',
    name: "Taos Farmers Market",
    city_slug: 'taos',
    city_name: 'Taos',
    region_code: 'northern_nm',
    website_url: 'http://taosfarmersmarket.org',
    address_line1: '105 Albright St',
    zip_code: '87571',
    year_founded: 1973,
    serves_statewide: false,
    sectors: ['food-agriculture'],
    mission: "One of New Mexico's oldest farmers markets, operating in Taos since 1973 and recently organized as a 501(c)(3), connecting northern NM producers with the community every Saturday through the growing season.",
    full_description: `The Taos Farmers Market is one of New Mexico's oldest farmers markets, operating since 1973 in the mountain community of Taos and recently achieving 501(c)(3) nonprofit status. The market runs every Saturday from 8am to 12:30pm, mid-May through late November, at the Taos County Courthouse parking lot on Albright Street, drawing farmers, food producers, and artisans from across the Taos area and the surrounding northern New Mexico valleys.

At its peak, the market draws more than 1,000 visitors per week and hosts up to 71 vendors, making it the largest weekly gathering of its kind in Taos County. The market provides a critical direct sales outlet for small-scale farmers and ranchers in a mountain and high-desert region where the growing season is shorter than in the Rio Grande valley but where producers grow a distinctive range of high-altitude vegetables, heritage grains, and regionally specific products.

Taos's position as a cultural and tourist destination gives the market a broad audience that includes both year-round residents and seasonal visitors, providing producers with access to buyers who value local and artisan food. The market also serves the local community's food access needs, accepting SNAP and EBT and participating in nutrition incentive programs to ensure that fresh local produce is available to shoppers of all economic backgrounds.

The market is currently raising funds to secure a permanent location, a goal that reflects its community's commitment to ensuring that this fifty-year-old institution has stable infrastructure for the future. The recently obtained 501(c)(3) status will support fundraising and grant-seeking efforts toward that goal.`,
  },
  {
    slug: 'questa-farmers-market',
    name: "Questa Farmers Market",
    city_slug: null,
    city_name: 'Questa',
    region_code: 'northern_nm',
    website_url: 'https://questafarmersmarket.org',
    address_line1: 'Hwy 38 and Hwy 522, Questa Visitor Center',
    zip_code: '87556',
    phone: '(575) 425-0650',
    year_founded: null,
    serves_statewide: false,
    sectors: ['food-agriculture', 'education-youth'],
    mission: "Seasonal farmers market in Questa serving northern Taos County, operated by Localogy as part of its cross-sector community development work in the Sangre de Cristo foothills.",
    full_description: `The Questa Farmers Market is a seasonal community market in Questa, a small village in the Sangre de Cristo foothills of northern Taos County, operated as a program of Localogy, a 501(c)(3) nonprofit recognized as the Taos Community Foundation's Nonprofit of the Year. The market runs Sundays from 10am to 2pm, Memorial Day weekend through early October, at the Questa Visitor Center near the intersection of Highways 38 and 522.

Localogy describes itself as an award-winning cross-sector collaborative working to build community resilience and economic opportunity in rural northern New Mexico. The Questa Farmers Market operates within this broader framework, providing a platform for local food producers while also supporting youth development through market internships that give young people hands-on experience with small farm and food business operations.

The Questa area, located at the foot of the Wheeler Peak Wilderness and near the Latir Peak Wilderness, is one of the more rural and geographically isolated communities in northern New Mexico. Access to fresh local food and direct connections to local producers are limited in this area, making the weekly market an important community resource during the growing season.

The market serves a community with deep roots in the land, including acequia irrigation traditions and a history of small-scale agriculture in the valley communities along the Red River. By supporting local food producers and creating a weekly gathering point, the Questa Farmers Market contributes to the economic and social fabric of one of New Mexico's smallest and most distinctive rural communities.`,
  },
  {
    slug: 'espanola-farmers-market',
    name: "Española Farmers Market",
    city_slug: 'espanola',
    city_name: 'Española',
    region_code: 'northern_nm',
    website_url: 'https://espanolafarmersmarket.com',
    address_line1: '1005 N. Railroad Ave',
    zip_code: '87532',
    year_founded: null,
    serves_statewide: false,
    sectors: ['food-agriculture'],
    mission: "Community farmers market operating in Española for over thirty years, connecting Rio Arriba County producers with local residents and accepting SNAP, EBT, and WIC.",
    full_description: `The Española Farmers Market is a community farmers market that has operated in Española, in Rio Arriba County, for more than thirty years, serving as a consistent direct-market outlet for agricultural producers and food makers in the northern Rio Grande valley. The market operates at 1005 N. Railroad Ave and accepts SNAP, EBT, and WIC, reflecting a commitment to food access that goes beyond a typical retail market environment.

Northern New Mexico's agricultural traditions run deep in the Española Valley, where acequia irrigation has sustained small farms for generations and where the surrounding Pueblo communities and Hispanic villages have maintained connections to the land and to local food production. The Española Farmers Market provides a marketplace for this agricultural heritage, bringing together growers from the immediate valley and from surrounding communities in the Jemez and Sangre de Cristo foothills.

The market serves a community with significant food insecurity and limited access to fresh produce through conventional grocery retail. By accepting federal nutrition program benefits and operating as an accessible community gathering point, the Española Farmers Market functions as both a local food economy anchor and a food access resource for families in one of New Mexico's most economically challenged counties.

Rio Arriba County's combination of rural geography, limited grocery infrastructure, and a predominantly low-income population makes direct-market food access points like the Española Farmers Market especially important. The market's three-decade presence in the community reflects strong ties between producers and residents in the Española Valley.`,
  },
  {
    slug: 'silver-city-farmers-market',
    name: "Silver City Farmers' Market",
    city_slug: 'silver-city',
    city_name: 'Silver City',
    region_code: 'southern_nm',
    website_url: 'https://www.silvercityfarmersmarket.info',
    address_line1: '1120 N Main St',
    zip_code: '88038',
    year_founded: null,
    serves_statewide: false,
    sectors: ['food-agriculture'],
    mission: "Year-round Saturday farmers market in Silver City connecting Grant County producers with local residents and supporting the local food economy in southwestern New Mexico.",
    full_description: `The Silver City Farmers' Market is a year-round Saturday market operating in Silver City, serving as the primary direct-market food outlet for Grant County producers and providing fresh local food to residents of one of New Mexico's more geographically isolated small cities. The market operates at 1120 N Main St and runs throughout the year, a commitment that reflects both the mild winters of southwestern New Mexico and the steady community demand for local produce and food products.

Grant County's agricultural landscape includes ranching, small-scale farming, and food production suited to the high desert and mountain terrain of the Gila region. The Silver City Farmers' Market connects these producers directly with consumers in the city and surrounding area, supporting livelihoods that depend on direct sales in a county with limited distribution infrastructure. The market accepts SNAP and EBT, expanding access to fresh food for lower-income households in a region where grocery options are limited and fresh produce can be expensive.

Silver City's character as a small arts and college town, anchored by Western New Mexico University, gives the market a community of engaged shoppers who value local and artisan products. The market operates in the context of a town that prizes independence, creativity, and connection to the land, values that align well with the farmers market model.

As a year-round institution, the Silver City Farmers' Market provides producers with consistent income across seasons rather than limiting their direct sales to the summer and fall. This year-round structure is unusual among New Mexico markets and reflects a community commitment to sustaining local food systems beyond the peak growing season.`,
  },
  {
    slug: 'corrales-growers-market',
    name: "Corrales Growers' Market",
    city_slug: null,
    city_name: 'Corrales',
    region_code: 'albuquerque_metro',
    website_url: 'https://corralesgrowersmarket.com',
    address_line1: '500 Jones Rd',
    zip_code: '87048',
    phone: '(505) 898-6336',
    year_founded: null,
    serves_statewide: false,
    sectors: ['food-agriculture'],
    mission: "Community nonprofit market in Corrales operating Wednesdays and Sundays, connecting local growers and producers with residents of the historic agricultural village along the Rio Grande.",
    full_description: `The Corrales Growers' Market is a community nonprofit market in the Village of Corrales, a historic agricultural community on the west bank of the Rio Grande just north of Albuquerque. The market operates both Wednesdays and Sundays at 500 Jones Rd, offering two market days per week that reflect the strength of community support in a village with deep roots in small-scale farming and a culture of local self-sufficiency.

Corrales is one of the most distinctive communities in the Albuquerque metro area, a village that has maintained its agricultural character and acequia traditions despite being surrounded by suburban development. The Corrales Growers' Market fits naturally within this context, providing a marketplace that reflects the village's values and supports the farmers, orchardists, and food producers who continue working the land in one of New Mexico's most historic agricultural communities.

The market brings together growers from Corrales and the broader middle Rio Grande valley, along with food makers, bakers, and artisans who reflect the community's creative and agricultural character. Operating twice a week gives producers more selling opportunities and gives shoppers more flexibility in when they can visit, deepening the market's integration into the rhythms of daily village life.

Corrales's location between Albuquerque and Bernalillo, along the Rio Grande bosque, gives the market a setting that combines agricultural heritage with natural beauty. The market serves a community that is actively invested in preserving the character of the village against development pressure, and the Corrales Growers' Market is one of the institutions through which that investment takes practical form.`,
  },
];

async function main() {
  const cities = await sql<{ id: number; slug: string }[]>`SELECT id, slug FROM cities`;
  const cityMap = new Map(cities.map(c => [c.slug, c.id]));

  const sectors = await sql<{ id: number; slug: string }[]>`SELECT id, slug FROM sectors`;
  const sectorMap = new Map(sectors.map(s => [s.slug, s.id]));

  let inserted = 0;
  let updated = 0;

  for (const m of MARKETS) {
    const cityId = m.city_slug ? (cityMap.get(m.city_slug) ?? null) : null;

    const [row] = await sql<{ id: number; xmax: string }[]>`
      INSERT INTO listings (
        slug, name, org_type,
        city_id, region_code, city_name,
        website_url, address_line1, zip_code, phone,
        ein, year_founded, serves_statewide,
        mission, full_description,
        status, is_verified
      ) VALUES (
        ${m.slug}, ${m.name}, 'nonprofit_501c3',
        ${cityId}, ${m.region_code}, ${m.city_name},
        ${m.website_url}, ${m.address_line1 ?? null}, ${m.zip_code ?? null}, ${m.phone ?? null},
        ${m.ein ?? null}, ${m.year_founded ?? null}, ${m.serves_statewide ?? false},
        ${m.mission}, ${m.full_description},
        'approved', false
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
    if (isUpdate) updated++; else inserted++;

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

    console.log(`  ${isUpdate ? 'updated' : 'inserted'}  ${m.name} (${m.city_name})`);
  }

  console.log(`\nDone: ${inserted} inserted, ${updated} updated`);
}

main().catch(e => { console.error(e); process.exit(1); });

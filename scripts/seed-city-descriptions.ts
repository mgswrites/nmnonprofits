import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error('ERROR: DATABASE_URL not set'); process.exit(1); }
const sql = neon(DATABASE_URL);

const CITY_DESCRIPTIONS: Record<string, string> = {
  'albuquerque': `Albuquerque is New Mexico's largest city and its economic and cultural hub, home to roughly a third of the state's population. Sitting along the Rio Grande between the volcanic mesas of the West Side and the Sandia Mountains, the city brings together a deeply rooted Hispanic and Nuevomexicano population, a large urban Indigenous community drawn from Pueblos and the Navajo Nation, and growing immigrant and refugee populations. This diversity shapes a nonprofit sector that is both large and varied, ranging from neighborhood mutual aid efforts to statewide institutions headquartered in the metro area.

Many Albuquerque nonprofits respond to persistent economic hardship. Poverty rates in parts of the city run well above national averages, and housing instability and homelessness have become defining civic concerns. Organizations operate shelters, transitional housing, food pantries, and street outreach, often coordinating with city and county programs and with the University of New Mexico's health system. Behavioral health, addiction recovery, and harm reduction draw significant nonprofit energy, reflecting the toll of substance use and a stretched public health infrastructure.

Health disparities are a major issue area. Nonprofits work on diabetes prevention, maternal and child health, access to care for uninsured residents, and culturally grounded wellness programming for Indigenous and Hispanic communities. Education-focused groups support early childhood learning, after-school enrichment, college access for first-generation students, and adult literacy, frequently partnering with Albuquerque Public Schools, one of the largest districts in the country.

The arts are central to the city's identity, and the nonprofit ecosystem reflects that. Galleries, theaters, music organizations, film initiatives, and cultural centers operate across neighborhoods, with particular concentrations downtown, in the Sawmill and Wells Park areas, and along Central Avenue. Indigenous and Chicano arts movements have long histories here, and many cultural nonprofits double as workforce, youth development, and community organizing spaces.

Funding for Albuquerque nonprofits comes from a mix of local family foundations, the Albuquerque Community Foundation, state appropriations, federal grants, and individual giving. National foundations also fund work in the city, especially around health equity, immigration, and Indigenous-led initiatives. Competition for resources is real, and smaller grassroots groups often operate on lean budgets and volunteer labor.

Albuquerque also serves as an organizing center for the state. Advocacy coalitions on issues such as immigrant rights, criminal justice reform, environmental justice, and economic policy are often based in or coordinated from the city, given its population and proximity to the Roundhouse in Santa Fe. The South Valley, International District, and other historically underserved areas have produced strong community-led organizations that combine service delivery with advocacy.`,

  'santa-fe': `Santa Fe, New Mexico's capital and one of the oldest cities in the United States, occupies an unusual position for a place of its modest size. It is a center of state government, a globally recognized arts market, and a major tourist destination, all set against a high desert landscape and the foothills of the Sangre de Cristo Mountains. The region's history is layered: Pueblo peoples have lived in the surrounding area for centuries, Spanish colonial settlement shaped its plaza and traditions, and successive waves of artists, retirees, and wealthy newcomers have reshaped its economy. This mix gives the nonprofit sector a distinctive character.

The arts dominate much of Santa Fe's nonprofit life. Museums, galleries, the opera, music and dance organizations, literary programs, and cultural institutions anchor both the economy and civic identity. Many of these organizations are well endowed and professionally staffed, while others, particularly those rooted in Hispanic and Pueblo traditional arts, operate closer to the grassroots. Cultural preservation, traditional crafts, and support for working artists are recurring themes.

Beneath the prosperity lies significant inequality. Santa Fe has some of the state's highest housing costs, and the gap between affluent residents and the service workers who sustain the tourism and hospitality economy is stark. As a result, a substantial portion of nonprofit activity addresses affordable housing, food security, immigrant and worker support, early childhood education, and youth opportunity. Organizations serving low-income families often work in the shadow of the city's wealth, raising funds from the same donors who support the arts.

Santa Fe has an unusually strong philanthropic presence for its size. The Santa Fe Community Foundation, numerous private and family foundations, and a concentration of donors with national reach make the city a notable funding hub. Statewide foundations and intermediaries are often based here, and the proximity to the legislature makes Santa Fe a center for policy advocacy on health, education, the environment, and Indigenous affairs.

Health and human services nonprofits address behavioral health, aging, and access to care, while environmental and land-based organizations focus on water, forests, acequias, and climate. Pueblo connections remain important, and a number of organizations work in partnership with nearby tribal communities or are Indigenous-led, addressing language, culture, sovereignty, and economic development. The combination of wealth, government, and deep cultural roots makes Santa Fe both a generous and a complicated place to do nonprofit work.`,

  'taos': `Taos is a small mountain community in northern New Mexico known far beyond its size for its art, its landscape, and its layered cultural history. Set on a high plateau beneath Wheeler Peak, the state's tallest mountain, the town sits beside Taos Pueblo, a continuously inhabited Indigenous community and World Heritage site whose presence has shaped the region for roughly a thousand years. Hispanic families with centuries of roots, an established artist colony, and newer arrivals drawn by recreation and natural beauty round out a community that is culturally rich but economically uneven.

The arts are foundational to Taos and to its nonprofit sector. Galleries, museums, artist organizations, music and film initiatives, and historic preservation efforts reflect the town's century-long reputation as an arts destination. Many cultural nonprofits work to support living artists, preserve traditional Hispanic and Pueblo art forms, and maintain historic sites. Because tourism and the arts drive much of the local economy, cultural organizations often intersect with economic development and education.

Rural poverty is a defining challenge. Taos County has high rates of low-income households, and seasonal tourism work, limited industry, and geographic isolation make economic security difficult for many residents. Nonprofits respond with food assistance, housing support, behavioral health and recovery services, youth programming, and aid for elders. The distance from larger cities means local organizations frequently fill gaps in services that would elsewhere be provided by government or larger institutions.

Taos Pueblo and the broader Indigenous community are central to the area's identity, and a number of organizations work on cultural preservation, language, land, and tribal wellbeing, often in ways led by community members themselves. Acequia associations, land grant heirs, and traditional Hispanic agricultural communities also sustain organizations focused on water, farming, and cultural continuity.

Outdoor recreation shapes both the economy and the nonprofit landscape. The mountains, the Rio Grande Gorge, and surrounding public lands draw conservation and stewardship groups, trail and watershed organizations, and outdoor education programs. Funding comes from a combination of local giving, regional and statewide foundations, the arts market, and grants, though small organizations often operate with limited staff and depend heavily on volunteers and seasonal support.`,

  'las-vegas': `Las Vegas, New Mexico, not to be confused with the Nevada city of the same name, is a historic small city in the northern part of the state, set where the Great Plains meet the southern Rocky Mountains. Once one of the largest and most prosperous towns in the territory thanks to the railroad, Las Vegas retains an extraordinary stock of historic architecture and a deep sense of place. Its population is predominantly Hispanic, with family roots that often stretch back many generations, and the surrounding area includes ranching communities, land grant heirs, and acequia-based agricultural traditions.

The local economy has faced long-term challenges. The decline of the railroad, limited industry, and rural isolation have contributed to persistent poverty and population loss, and public institutions are among the largest employers. New Mexico Highlands University anchors the community, bringing students, faculty, cultural programming, and a degree of economic stability. State facilities and the regional medical and educational infrastructure also play important roles.

Nonprofits in Las Vegas tend to focus on basic needs and community resilience. Food security, housing, services for elders and youth, behavioral health, and support for families navigating economic hardship are common areas of work. Because the city serves as a hub for a large rural region, local organizations often extend their reach into surrounding villages and counties where services are scarce.

Cultural and historic preservation is a notable thread. Given the city's remarkable collection of historic buildings and its place in Nuevomexicano history, organizations work to maintain landmarks, document local heritage, and sustain traditional arts and music. Acequia associations and land-based groups carry forward agricultural and water traditions that remain central to community identity.

The region has also faced acute environmental stress, including major wildfires and their aftermath in the surrounding mountains, which have prompted nonprofit and mutual aid responses around disaster recovery, watershed health, and forest stewardship. Funding for local nonprofits comes largely from statewide foundations, government grants, the university community, and individual giving, and organizations frequently operate on modest budgets sustained by strong community ties and volunteer commitment.`,

  'las-cruces': `Las Cruces is the largest city in southern New Mexico and the second largest in the state, set in the Mesilla Valley along the Rio Grande beneath the dramatic Organ Mountains. The region has a strong agricultural identity, with chile, pecans, and other crops central to the local economy, and a predominantly Hispanic population with deep cultural roots and close ties across the nearby border with Mexico and the El Paso region. This border context shapes much of the area's civic and nonprofit life.

New Mexico State University is a defining institution, bringing students, research, agricultural extension, and a steady professional community to the city. The university's presence supports education-focused nonprofits, civic engagement, and partnerships on health, agriculture, and economic development. Nearby military and federal installations also influence the regional economy and population.

Nonprofits in Las Cruces address a broad range of needs. Poverty and food insecurity are significant concerns, and organizations operate food banks, housing programs, and services for low-income families, farmworkers, and people experiencing homelessness. Immigration and border issues draw substantial nonprofit attention, including legal aid, humanitarian assistance, and support for migrants and mixed-status families. Health organizations work on access to care, behavioral health, and the particular challenges of serving a dispersed rural and border population.

The agricultural economy creates its own set of community organizations, from those supporting farmworkers and rural communities to groups focused on water, land, and food systems in a region defined by scarcity of water and the demands of irrigation. Acequia traditions and the historic village of Mesilla add cultural depth to this work.

Arts and culture have a growing presence, with organizations supporting visual arts, music, theater, and cultural festivals that reflect the area's Hispanic and borderland heritage. Funding for Las Cruces nonprofits comes from a mix of local and statewide foundations, the Community Foundation of Southern New Mexico, government grants, university partnerships, and individual donors. As the anchor city for a large southern region, Las Cruces organizations often serve communities well beyond the city limits, including colonias and small towns with limited infrastructure.`,

  'silver-city': `Silver City is a small city in the southwestern corner of New Mexico, the county seat of Grant County and the state's oldest incorporated community. Born from a silver strike in 1870 and shaped by generations of copper and other mining, the town carries a layered history of boom and bust that still influences its economy and its environment. Today Silver City blends a working-class mining region with a vibrant arts community and a college town atmosphere, set at the edge of vast public lands.

Western New Mexico University anchors the community, providing education, employment, cultural programming, and a museum known for its significant collection of Mimbres pottery. The university supports a range of nonprofit and civic activity and draws students and faculty who contribute to local organizations. The mining industry, while reduced from its peak, remains an economic and political force in the surrounding area.

Silver City's reputation as an arts town shapes much of its nonprofit life. Galleries, artist collectives, music and theater organizations, and a walkable historic downtown support a creative economy that has helped diversify the area beyond mining. Cultural and historic preservation efforts work to maintain the town's distinctive architecture and heritage.

The region's relationship to the land defines another major cluster of nonprofit work. Silver City is a gateway to the Gila Wilderness, designated in 1924 as the world's first wilderness area, and to the broader Gila National Forest. Conservation, watershed protection, outdoor recreation, and environmental advocacy organizations are active here, including long-standing groups focused on the environmental impacts of mining and on protecting water and public lands in the borderlands region.

Economic and human service needs are real in a rural area with a history of extractive boom and bust cycles. Nonprofits address food security, housing, behavioral health, services for elders and youth, and support for low-income families. Funding comes from statewide and regional foundations, government grants, the university community, and individual giving, with many organizations operating at a small scale and relying on volunteers and the strong sense of community that characterizes the town.`,

  'gallup': `Gallup sits in western New Mexico along old Route 66 and the railroad, serving as a regional hub for an enormous and largely rural area. Often described as a border town to the Navajo Nation and close to Zuni Pueblo and other Indigenous communities, Gallup has a population and economy shaped overwhelmingly by its Indigenous neighbors. It functions as a commercial, medical, and service center for Diné and Zuni residents from across the surrounding region, and its identity as a trading center, including a long history in the trade of Indigenous arts and jewelry, is central to its character.

This regional role places Indigenous wellbeing at the heart of Gallup's nonprofit ecosystem. Many organizations work on health, housing, food access, and social services for Diné and Zuni communities, often confronting deep disparities. Health challenges, including diabetes, behavioral health needs, and the legacy of limited rural health infrastructure, draw significant nonprofit and tribal effort, frequently in coordination with the Indian Health Service and tribal programs. Some communities in the surrounding area still lack reliable running water or electricity, and organizations work on infrastructure, home repair, and emergency assistance.

Housing instability and homelessness are persistent concerns in Gallup itself, and the city has long grappled with the visible effects of poverty and addiction. Nonprofits operate shelters, recovery programs, and outreach services, and many emphasize culturally grounded approaches that respect Diné and Zuni traditions and language. Youth programming, education support, and workforce development aim to expand opportunity in a region with limited employment.

Indigenous arts are both an economic foundation and a focus of cultural organizations. Silversmithing, weaving, pottery, and other traditional arts sustain many families, and nonprofits work on fair markets for artists, cultural preservation, and language revitalization. Events and cultural institutions celebrate the region's Indigenous heritage and draw visitors along the Route 66 corridor.

Funding for Gallup-area nonprofits comes from statewide foundations, federal and tribal sources, national funders with an interest in Indigenous communities, and individual giving. Because the organizations here often serve a vast and underserved territory, they tend to stretch limited resources across great distances, and partnerships among tribal governments, the Indian Health Service, and community groups are essential to the work.`,
};

async function main() {
  let updated = 0;
  for (const [slug, description] of Object.entries(CITY_DESCRIPTIONS)) {
    const result = await sql`
      UPDATE cities SET description = ${description}
      WHERE slug = ${slug}
      RETURNING name
    `;
    if (result.length === 0) {
      console.warn(`  WARN  city not found: ${slug}`);
    } else {
      console.log(`  ok  ${result[0].name}`);
      updated++;
    }
  }
  console.log(`\nUpdated: ${updated} cities`);
}

main().catch((e) => { console.error(e); process.exit(1); });

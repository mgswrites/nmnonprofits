import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error('ERROR: DATABASE_URL not set'); process.exit(1); }
const sql = neon(DATABASE_URL);

const ORGS: {
  slug: string;
  name: string;
  city_slug: string | null;
  city_name: string;
  region_code: string;
  website_url: string;
  address_line1: string | null;
  zip_code: string;
  phone: string | null;
  year_founded: number | null;
  logo_url: string | null;
  sectors: string[];
  mission: string;
  full_description: string;
}[] = [
  {
    slug: 'safe-haven-animal-sanctuary',
    name: 'Safe Haven Animal Sanctuary',
    city_slug: 'las-cruces',
    city_name: 'Las Cruces',
    region_code: 'southern_nm',
    website_url: 'https://shaspets.com',
    address_line1: 'P.O. Box 16227',
    zip_code: '88004',
    phone: '(575) 527-4544',
    year_founded: null,
    logo_url: '/images/logos/safe-haven-animal-sanctuary.png',
    sectors: ['animal-welfare'],
    mission: 'No-kill adoption center providing shelter, care, and permanent placement for dogs and cats in the Las Cruces area for more than thirty years.',
    full_description: `Safe Haven Animal Sanctuary is a no-kill adoption center in Las Cruces that has been finding homes for dogs and cats in the Mesilla Valley for more than thirty years. Founded as a 501(c)(3) nonprofit, the organization operates an adoption facility where animals receive shelter, medical care, and socialization while they wait to be matched with permanent families. Safe Haven does not euthanize animals for space or time, a commitment that has shaped its approach to intake and placement since its founding.

The organization takes in surrendered pets, strays, and animals transferred from overcrowded facilities, then works to find adopters through an open shelter model where prospective families can visit and interact with animals before making a commitment. Dogs and cats receive health assessments, vaccinations, spaying or neutering, and behavioral evaluation as part of the adoption process.

Safe Haven funds its operations largely through a thrift store, which gives the community a way to support animal welfare through everyday purchases of donated goods. This model has provided a stable funding base and kept the organization independent of shifting grant cycles. Donations, adoption fees, and community fundraising events round out the revenue picture.

The Las Cruces area is home to a significant stray and shelter animal population, and Safe Haven's three decades of operation have placed thousands of animals in homes across southern New Mexico. For people in the Mesilla Valley looking to adopt a pet or support local animal welfare, Safe Haven is one of the region's anchor organizations.`,
  },
  {
    slug: 'action-programs-for-animals',
    name: 'ACTion Programs for Animals',
    city_slug: 'las-cruces',
    city_name: 'Las Cruces',
    region_code: 'southern_nm',
    website_url: 'https://apalascruces.org',
    address_line1: '537 N. Solano Dr.',
    zip_code: '88001',
    phone: '(575) 571-4654',
    year_founded: null,
    logo_url: '/images/logos/action-programs-for-animals.png',
    sectors: ['animal-welfare'],
    mission: 'Nonprofit adoption center dedicated to reducing companion animal overpopulation and finding permanent homes for dogs and cats in the Las Cruces area.',
    full_description: `ACTion Programs for Animals, operating as APA Las Cruces, is a 501(c)(3) nonprofit adoption center dedicated to reducing companion animal overpopulation in the Las Cruces area and throughout southern New Mexico. The organization runs an adoption facility on North Solano Drive where dogs and cats from various backgrounds are housed, cared for, and matched with prospective adopters.

APA Las Cruces approaches pet overpopulation as a systemic issue requiring education, accessibility, and consistent community engagement alongside direct shelter services. The organization accepts animals that are surrendered by owners or transferred from other facilities, working to move animals into homes as quickly and thoughtfully as possible rather than holding them in long-term shelter situations.

Animals in APA Las Cruces's care receive veterinary screening, vaccinations, and spay and neuter services before adoption. The adoption process is designed to set both animals and families up for success, with staff available to help match adopters with pets that fit their households and lifestyles.

The organization relies on community support through donations, adoption fees, and volunteer engagement. Las Cruces's population and geography, serving both the city itself and surrounding communities in Dona Ana County, create a steady and significant demand for animal placement services. APA Las Cruces operates alongside other animal welfare groups in the city, and the presence of multiple nonprofits reflects both the scale of the need and the strength of community commitment to companion animal welfare in the region.`,
  },
  {
    slug: 'humane-society-of-southern-new-mexico',
    name: 'Humane Society of Southern New Mexico',
    city_slug: 'las-cruces',
    city_name: 'Las Cruces',
    region_code: 'southern_nm',
    website_url: 'https://www.hssnm.org',
    address_line1: 'PO Box 13826',
    zip_code: '88013',
    phone: '(575) 523-8020',
    year_founded: 2007,
    logo_url: null,
    sectors: ['animal-welfare'],
    mission: 'Member-based coalition advocating for animal welfare across southern New Mexico through policy, education, and coordination among rescue organizations.',
    full_description: `The Humane Society of Southern New Mexico is a 501(c)(3) member organization founded in Las Cruces in 2007 with a mission to save animal lives across the southern New Mexico region through advocacy, education, and coordination with other animal welfare groups. Unlike direct-service shelters, the organization functions as a coalition and advocacy hub, working to improve outcomes for animals by influencing policy, raising public awareness, and supporting the broader network of rescue organizations and shelters operating in the region.

The organization advocates for stronger animal protection laws and responsible pet ownership, addressing the conditions that lead to animal suffering at a systemic level. By coordinating among the various rescues, shelters, and humane groups operating in southern New Mexico, the Humane Society of Southern New Mexico works to reduce duplication of effort and strengthen collective impact across the region.

Membership is central to the organization's model, engaging community members as active stakeholders in animal welfare rather than passive donors. Members receive information about animal welfare issues, policy developments, and opportunities to take action at the local and state level.

The southern New Mexico region includes Dona Ana County and several surrounding counties, a substantial and in some areas underserved territory where resources for animal welfare are unevenly distributed. The organization's focus on systemic change and coalition-building complements the direct adoption and shelter services offered by other groups in Las Cruces and addresses needs that individual shelters are not positioned to fill alone.`,
  },
  {
    slug: 'stray-hearts-animal-shelter',
    name: 'Stray Hearts Animal Shelter',
    city_slug: 'taos',
    city_name: 'Taos',
    region_code: 'northern_nm',
    website_url: 'https://www.strayhearts.org',
    address_line1: '1200 Saint Francis Ln',
    zip_code: '87571',
    phone: '(575) 758-2981',
    year_founded: 1999,
    logo_url: '/images/logos/stray-hearts-animal-shelter.png',
    sectors: ['animal-welfare'],
    mission: 'No-kill shelter operating as the Humane Society of Taos, providing shelter, care, and adoption services for companion animals in Taos County since 1999.',
    full_description: `Stray Hearts Animal Shelter, which operates as the Humane Society of Taos, is a no-kill 501(c)(3) shelter serving animals and the community in Taos County since 1999. Located on Saint Francis Lane in Taos, the organization provides shelter, medical care, and adoption services for lost, surrendered, and stray companion animals in a region that is both geographically isolated and economically diverse.

Stray Hearts operates under a no-kill philosophy, committing to find placement for all healthy and treatable animals rather than relying on euthanasia for population management. Animals in the shelter's care receive medical evaluation, vaccinations, spay and neuter services, and behavioral assessment before adoption. The organization maintains a welcoming shelter environment where families can meet animals in person and find companions that fit their homes.

Beyond adoption, Stray Hearts provides reunification services to help lost pets find their way back to their families, a critical function in a rural mountain community where animals can travel significant distances before being found. The organization also engages the Taos community through events, volunteering opportunities, and education on responsible pet ownership.

Taos County includes the town of Taos, Taos Pueblo, and a number of smaller communities spread across mountain and high desert terrain. The region's mix of year-round residents, seasonal visitors, and Indigenous community members creates a varied environment for animal welfare services. Stray Hearts serves this full community, providing a consistent safety net for animals in need across the county.`,
  },
  {
    slug: 'san-juan-animal-league',
    name: 'San Juan Animal League',
    city_slug: 'farmington',
    city_name: 'Farmington',
    region_code: 'four_corners',
    website_url: 'https://sanjuananimalleague.org',
    address_line1: null,
    zip_code: '87499',
    phone: '(505) 635-1836',
    year_founded: 1974,
    logo_url: '/images/logos/san-juan-animal-league.png',
    sectors: ['animal-welfare'],
    mission: 'All-volunteer humane society founded in 1974 serving San Juan County through vaccine clinics and low-cost spay and neuter programs to reduce animal suffering in the Four Corners region.',
    full_description: `The San Juan Animal League is an all-volunteer 501(c)(3) humane society based in Farmington, New Mexico, serving the Four Corners region since its founding in 1974. One of the longest-running animal welfare organizations in northwestern New Mexico, the league has operated for five decades through the commitment of community volunteers dedicated to reducing animal suffering and improving outcomes for companion animals in San Juan County.

The organization focuses on reducing pet overpopulation through accessible veterinary services. Vaccination clinics and low-cost spay and neuter programs are central to the league's work, reaching pet owners in Farmington and the surrounding communities of San Juan County who might not otherwise have access to affordable veterinary care. Spay and neuter services are widely recognized as the most effective long-term intervention for reducing shelter intake and euthanasia rates, and the league's sustained focus on this work over decades has contributed meaningfully to animal welfare outcomes in the region.

San Juan County encompasses the Farmington metro area as well as smaller communities and stretches toward the Navajo Nation and neighboring Colorado and Utah, making it a geographically substantial service territory. The Four Corners region's combination of rural distance, limited veterinary infrastructure, and a significant free-roaming dog population creates persistent challenges for companion animal welfare.

Operating entirely on volunteer labor keeps the San Juan Animal League lean and community-rooted, though it also creates capacity constraints. The organization depends on donations and event fundraising to sustain its veterinary programs and remains one of the primary community-based animal welfare resources in the Farmington area.`,
  },
  {
    slug: 'gallup-mckinley-county-humane-society',
    name: 'Gallup McKinley County Humane Society',
    city_slug: 'gallup',
    city_name: 'Gallup',
    region_code: 'four_corners',
    website_url: 'https://www.gmchumanesociety.org',
    address_line1: '1273 Balok St',
    zip_code: '87301',
    phone: '(505) 863-2616',
    year_founded: 1993,
    logo_url: '/images/logos/gallup-mckinley-county-humane-society.png',
    sectors: ['animal-welfare'],
    mission: 'The only animal shelter in New Mexico\'s largest county, serving Gallup and surrounding communities with adoptions and weekly low-cost spay and neuter clinics since 1993.',
    full_description: `The Gallup McKinley County Humane Society is a 501(c)(3) nonprofit founded in 1993 and the only animal shelter serving McKinley County, the largest county in New Mexico by area. Located in Gallup on Balok Street, the organization operates in one of the state's most challenging environments for animal welfare, serving a vast geographic territory that includes the city of Gallup and surrounding communities near the Navajo Nation and Zuni Pueblo.

The scale of need in this region is significant. The humane society intakes more than 500 animals per month, a volume that reflects both the region's large free-roaming animal population and the limited alternatives available to pet owners and strays in the surrounding rural area. Animals enter from city animal control transfers, owner surrenders, and community drop-offs, and the organization works to move them into adoption or rescue placement as efficiently as possible.

Spay and neuter access is a particular priority. The organization operates discounted weekly spay and neuter clinics, making high-volume, low-cost surgical sterilization available to Gallup residents and surrounding community members on a regular basis. Reducing the reproduction rate of the local free-roaming and owned animal population is essential to managing intake at a facility that already operates at high capacity.

The Gallup area's proximity to the Navajo Nation means the humane society serves communities that face significant barriers to veterinary care, including distance, transportation challenges, and cost. Many of the animals the organization intakes originate from reservation communities. Operating at the intersection of urban services and vast rural need, the Gallup McKinley County Humane Society occupies a critical position in the regional animal welfare landscape.`,
  },
  {
    slug: 'roswell-humane-society',
    name: 'Roswell Humane Society',
    city_slug: 'roswell',
    city_name: 'Roswell',
    region_code: 'southern_nm',
    website_url: 'https://roswellhumanesociety.org',
    address_line1: '703 East McGaffey Street',
    zip_code: '88203',
    phone: '(575) 622-8950',
    year_founded: null,
    logo_url: null,
    sectors: ['animal-welfare'],
    mission: 'Nonprofit shelter providing care and adoption services for lost, abandoned, and surrendered companion animals in Roswell and southeastern New Mexico.',
    full_description: `The Roswell Humane Society is a 501(c)(3) nonprofit shelter serving southeastern New Mexico, providing a safe haven for lost, abandoned, and owner-surrendered companion animals in the Roswell area and surrounding Chaves County. Located on East McGaffey Street, the organization operates the primary nonprofit animal shelter in a region that is largely rural and where alternative placement options are limited.

The shelter accepts dogs and cats from various circumstances, including animals transferred from community members, strays brought in by residents or municipal animal control, and pets whose owners can no longer care for them. Animals receive veterinary attention, vaccinations, and spay or neuter services as part of the intake and care process, preparing them for adoption into permanent homes.

Adoption is the core outcome the Roswell Humane Society works toward for every animal in its care. The organization matches animals with adopters across the Roswell community and, where possible, facilitates transfers to rescue partners in other regions when local adoption opportunities are limited. For southeastern New Mexico, where the next nearest shelter resources are often many miles away, the humane society serves as an essential anchor organization.

Fundraising events, individual donations, and adoption fees support the shelter's operations. The Roswell community has a long relationship with the organization, and local engagement through volunteering and fostering helps extend the shelter's capacity beyond what a permanent facility alone can provide. For animals in need in the Pecos Valley and the surrounding high plains region, the Roswell Humane Society remains a primary resource.`,
  },
  {
    slug: 'friends-of-roswell-animals',
    name: 'Friends of Roswell Animals',
    city_slug: 'roswell',
    city_name: 'Roswell',
    region_code: 'southern_nm',
    website_url: 'https://forarescue.org',
    address_line1: null,
    zip_code: '88202',
    phone: '(575) 208-4869',
    year_founded: 2015,
    logo_url: '/images/logos/friends-of-roswell-animals.png',
    sectors: ['animal-welfare'],
    mission: 'All-volunteer 501(c)(3) rescue saving dogs and cats in southeastern New Mexico through foster care, medical support, and transport to adopters in other regions.',
    full_description: `Friends of Roswell Animals, known as FORA, is an all-volunteer 501(c)(3) rescue organization founded in Roswell in 2015 with a mission to save dogs and cats in southeastern New Mexico through direct rescue, foster placement, and advocacy. Unlike a brick-and-mortar shelter, FORA operates through a network of foster families who provide temporary homes for animals rescued from the Roswell area while the organization works to find permanent placements.

FORA works alongside and in partnership with the municipal animal shelter in Roswell, pulling animals that are at risk and placing them into foster care where they receive individualized attention, medical support, and socialization. This model allows FORA to take in animals that might not thrive in a shelter environment, including those who need medical treatment, behavioral support, or simply a quieter home setting before adoption.

The organization coordinates transport to other regions when local adoption demand is insufficient, connecting Roswell-area animals with adopters in larger markets who are actively seeking pets. This transport network is a common strategy for rescue groups in rural areas with high intake and relatively small local populations.

FORA relies entirely on volunteers and community fundraising to sustain its work. Donations fund veterinary care, transport costs, and supplies for foster families. Founded less than a decade ago, the organization has become an important complement to the Roswell Humane Society, adding capacity and flexibility to the regional animal welfare system through its foster-based model. FORA's work reflects a growing model of volunteer-driven rescue that has expanded animal welfare capacity in communities across the country.`,
  },
  {
    slug: 'desert-willow-wildlife-rehabilitation-center',
    name: 'Desert Willow Wildlife Rehabilitation Center',
    city_slug: 'carlsbad',
    city_name: 'Carlsbad',
    region_code: 'eastern_nm',
    website_url: 'https://dwwrc.org',
    address_line1: '516 E. Fiesta',
    zip_code: '88220',
    phone: '(575) 689-6711',
    year_founded: null,
    logo_url: '/images/logos/desert-willow-wildlife-rehabilitation-center.png',
    sectors: ['animal-welfare', 'environment-conservation'],
    mission: 'Wildlife rehabilitation center in Carlsbad providing medical care for injured and orphaned native wildlife across southeastern New Mexico, including a full surgery area.',
    full_description: `Desert Willow Wildlife Rehabilitation Center is a 501(c)(3) nonprofit wildlife rehabilitation organization based in Carlsbad, New Mexico, dedicated to the care of injured and orphaned native wildlife in southeastern New Mexico. Located on East Fiesta Street, the center provides specialized medical treatment and rehabilitation for a wide range of native species, from songbirds and small mammals to birds of prey, reptiles, and other wildlife indigenous to the Chihuahuan Desert region.

The organization's facility includes a full surgery area, allowing veterinary professionals and trained rehabilitators to perform surgical interventions for animals with injuries that would not otherwise survive without medical care. This level of infrastructure distinguishes Desert Willow from smaller wildlife care operations and allows the center to take on more complex and serious cases from across southeastern New Mexico.

Animals in rehabilitation receive care appropriate to their species and the nature of their injuries, with the goal of returning them to the wild whenever possible. When an animal's injuries prevent release, the center may retain it for educational use or seek placement with a licensed facility. Public education about native wildlife, the hazards animals face from human activity, and how to respond when encountering injured wildlife is part of the organization's broader mission.

The Carlsbad area sits near Carlsbad Caverns National Park and the Guadalupe Mountains within a biologically rich region with significant native wildlife diversity. Desert Willow fills a critical gap in the southeastern corner of the state, where wildlife rehabilitation resources are otherwise scarce and the nearest alternatives are many hours away.`,
  },
  {
    slug: 'espanola-valley-humane-society',
    name: 'Espanola Valley Humane Society',
    city_slug: 'espanola',
    city_name: 'Española',
    region_code: 'northern_nm',
    website_url: 'https://www.espanolahumane.org',
    address_line1: '108 Hamm Parkway',
    zip_code: '87532',
    phone: '(505) 753-8662',
    year_founded: null,
    logo_url: null,
    sectors: ['animal-welfare'],
    mission: 'Shelter and low-cost veterinary services for animals in Espanola, Rio Arriba County, and surrounding Pueblo communities, with a focus on spay, neuter, and vaccination access.',
    full_description: `The Espanola Valley Humane Society is a 501(c)(3) nonprofit shelter serving the Espanola area and the surrounding communities of northern New Mexico, including Rio Arriba County and neighboring Pueblos. Located on Hamm Parkway in Espanola, the organization provides animal shelter, low-cost veterinary services, and adoption programs for a region that is economically challenged and geographically remote from larger urban animal welfare resources.

Reducing pet overpopulation through accessible spay and neuter services is central to the organization's approach. Low-cost spay and neuter clinics bring surgical sterilization within reach for families in Espanola and in the surrounding communities, including the Pueblo communities of northern New Mexico, where access to veterinary care has historically been limited by both geography and cost. The organization also provides vaccinations to help protect the health of the local pet population.

Shelter operations provide a safety net for stray, abandoned, and surrendered animals in the Espanola Valley, with the goal of placing animals into permanent homes through adoption. The organization serves a community that reflects the demographics of northern New Mexico, with a significant population of Hispanic families with deep generational roots in the region and Pueblo communities with their own traditions and relationships to animals and land.

Espanola sits near the confluence of the Rio Grande and the Chama River in a valley surrounded by mesas and mountains. The region's rural character, scattered small communities, and limited local infrastructure make animal welfare services here both more necessary and more logistically complex than in urban settings. The Espanola Valley Humane Society operates at the center of this geography, reaching beyond the town itself into the communities that surround it.`,
  },
  {
    slug: 'new-mexico-wildlife-center',
    name: 'New Mexico Wildlife Center',
    city_slug: 'espanola',
    city_name: 'Española',
    region_code: 'northern_nm',
    website_url: 'https://newmexicowildlifecenter.org',
    address_line1: '19 Wheat Street',
    zip_code: '87532',
    phone: '(505) 753-9505',
    year_founded: null,
    logo_url: '/images/logos/new-mexico-wildlife-center.png',
    sectors: ['animal-welfare', 'environment-conservation'],
    mission: 'Licensed wildlife hospital in Espanola caring for up to 1,000 native animals per year, from songbirds to mountain lions, through rehabilitation, conservation, and public education.',
    full_description: `The New Mexico Wildlife Center is a 501(c)(3) nonprofit wildlife hospital based in Espanola, New Mexico, dedicated to the rehabilitation, conservation, and protection of native wildlife across the state. Founded as a professional wildlife care facility, the center cares for up to 1,000 animals per year, representing a wide range of New Mexico's native species, from small songbirds and raptors to larger mammals including mountain lions, coyotes, and mule deer.

The center operates as a licensed wildlife rehabilitation hospital, providing medical treatment, surgical care, and species-appropriate rehabilitation for injured and orphaned animals brought in from across northern and central New Mexico. Trained staff and veterinary professionals evaluate each animal, administer necessary treatment, and develop individualized care plans aimed at recovery and return to the wild. Animals that cannot be safely released due to the nature of their injuries may be retained as education ambassadors or transferred to appropriate facilities.

Conservation and public education are integral parts of the organization's mission. The center works to protect wildlife populations not just through individual care but through community engagement about the threats native animals face, including vehicle strikes, habitat loss, human-wildlife conflict, and illegal capture. Programming reaches schools, community groups, and the public to build understanding of and appreciation for New Mexico's native wildlife.

Espanola's location in the northern Rio Grande corridor places the center within reach of diverse ecosystems, from the high Jemez and Sangre de Cristo mountains to the river valley and surrounding mesas. This geographic position means the center receives animals from a broad swath of the state, making it one of the most significant wildlife care resources in New Mexico.`,
  },
  {
    slug: 'wildlife-rescue-inc-new-mexico',
    name: 'Wildlife Rescue, Inc. of New Mexico',
    city_slug: 'albuquerque',
    city_name: 'Albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://wildliferescuenm.org',
    address_line1: '2901 Candelaria Rd NW',
    zip_code: '87197',
    phone: '(505) 344-2500',
    year_founded: 1981,
    logo_url: '/images/logos/wildlife-rescue-inc-new-mexico.png',
    sectors: ['animal-welfare', 'environment-conservation'],
    mission: 'All-volunteer wildlife rehabilitation and education organization founded in 1981, operating a clinic at Rio Grande Nature Center State Park and caring for over 2,000 animals annually.',
    full_description: `Wildlife Rescue, Inc. of New Mexico is an all-volunteer 501(c)(3) wildlife rehabilitation and education organization founded in Albuquerque in 1981. One of the oldest wildlife rescue organizations in the state, Wildlife Rescue has spent more than four decades caring for injured and orphaned native wildlife and educating the public about New Mexico's diverse native species.

The organization operates a rehabilitation clinic located at Rio Grande Nature Center State Park in Albuquerque, a partnership that situates it within one of the city's most significant natural areas along the Rio Grande bosque. The clinic processes upwards of 2,000 animals annually, representing a wide range of species native to the middle Rio Grande Valley and the surrounding high desert, mountains, and riparian habitat. From songbirds and raptors to small mammals and reptiles, Wildlife Rescue cares for the breadth of wildlife that Albuquerque-area residents encounter.

As an all-volunteer organization, Wildlife Rescue depends entirely on community participation, from licensed wildlife rehabilitators who provide direct animal care to administrative volunteers who support operations and outreach. This model has sustained the organization for more than forty years and kept it deeply connected to the Albuquerque community.

Public education about native wildlife, how to respond to injured animals, and the importance of habitat conservation accompanies the clinic's direct care work. Community members often first encounter Wildlife Rescue when they find an injured animal and need guidance on how to help. This point of contact has built long-term relationships between the organization and the broader Albuquerque community, creating a base of supporters and volunteers who understand the work firsthand.`,
  },
  {
    slug: 'animal-welfare-coalition-northeastern-nm',
    name: 'Animal Welfare Coalition of Northeastern New Mexico',
    city_slug: 'las-vegas',
    city_name: 'Las Vegas',
    region_code: 'northern_nm',
    website_url: 'https://www.animalwelfarenewmexico.org',
    address_line1: null,
    zip_code: '87701',
    phone: '(505) 652-4366',
    year_founded: 2008,
    logo_url: '/images/logos/animal-welfare-coalition-northeastern-nm.png',
    sectors: ['animal-welfare'],
    mission: 'Community coalition in Las Vegas, NM providing adoptions, monthly spay and neuter clinics, a pet food pantry, and vaccinations for animals in northeastern New Mexico since 2008.',
    full_description: `The Animal Welfare Coalition of Northeastern New Mexico is a 501(c)(3) nonprofit founded in Las Vegas, New Mexico, in 2008, providing adoption services, spay and neuter access, and community support programs for animals and pet owners in the northeastern corner of the state. Based in San Miguel County, the coalition serves a region that is largely rural, economically challenged, and distant from the larger animal welfare infrastructure concentrated in Albuquerque and Santa Fe.

Adoption services connect dogs and cats in the organization's care with families in Las Vegas and the surrounding region. Monthly spay and neuter clinics bring affordable surgical sterilization to pet owners in an area where private veterinary access can be limited by both geography and cost, addressing one of the root causes of animal overpopulation in rural communities.

A pet food pantry is among the coalition's most distinctive programs, providing food assistance to low-income pet owners who might otherwise be unable to afford to keep their animals. Keeping pets with their families through periods of financial hardship prevents owner surrenders and the disruption that comes with it, both for the animals and for the people who care for them. Vaccination services complement the food pantry, supporting the health of owned pets across the community.

Las Vegas, New Mexico, is the county seat of San Miguel County and serves as a regional hub for a dispersed rural population across the Sangre de Cristo foothills and eastern plains. The coalition's programs reflect the particular needs of this geography, where small households, limited incomes, and distances to services create conditions that require locally rooted, community-accessible responses.`,
  },
  {
    slug: 'spay-neuter-coalition-new-mexico',
    name: 'Spay-Neuter Coalition of New Mexico',
    city_slug: null,
    city_name: 'Los Lunas',
    region_code: 'albuquerque_metro',
    website_url: 'https://spayneuternm.org',
    address_line1: null,
    zip_code: '87031',
    phone: '(505) 922-5490',
    year_founded: 2015,
    logo_url: '/images/logos/spay-neuter-coalition-new-mexico.avif',
    sectors: ['animal-welfare'],
    mission: 'Valencia County nonprofit founded in 2015 providing low-cost spay and neuter vouchers, vaccines, and microchipping to reduce companion animal overpopulation among low-income families.',
    full_description: `The Spay-Neuter Coalition of New Mexico is a 501(c)(3) nonprofit based in Los Lunas, in Valencia County south of Albuquerque, founded in 2015 with a focused mission: ending companion animal overpopulation in Valencia County through affordable spay and neuter access. Unlike broad-mission shelters, the coalition concentrates entirely on surgical sterilization and associated veterinary services as the most direct and lasting solution to reducing shelter intake, stray populations, and animal euthanasia.

The organization's primary program provides low-cost spay and neuter vouchers to income-qualifying families in Valencia County, making the cost of surgical sterilization manageable for households that would otherwise be unable to afford the procedure. Vouchers are redeemable at participating veterinary clinics, allowing the coalition to extend its reach without operating a surgical facility of its own. Vaccines and microchipping accompany spay and neuter services, rounding out the preventive care package.

Valencia County's geography and demographics create strong demand for these services. The county includes Los Lunas, Belen, and smaller communities along the Rio Grande south of Albuquerque, with a significant population of working-class and rural households. Companion animal overpopulation is a persistent challenge in the area, and the valley's low-income communities have historically had limited access to affordable veterinary care.

By concentrating specifically on sterilization, the Spay-Neuter Coalition of New Mexico applies its resources where research consistently shows the greatest long-term impact. A single spayed or neutered animal represents not just that animal but all of its potential offspring, making surgical prevention a highly leveraged intervention. The organization's county-specific focus allows it to build relationships with local veterinary partners and track impact in a defined community over time.`,
  },
];

async function main() {
  const cities = await sql<{ id: number; slug: string }[]>`SELECT id, slug FROM cities`;
  const cityMap = new Map(cities.map((c) => [c.slug, c.id]));

  const sectors = await sql<{ id: number; slug: string }[]>`SELECT id, slug FROM sectors`;
  const sectorMap = new Map(sectors.map((s) => [s.slug, s.id]));

  let inserted = 0;
  let updated = 0;

  for (const org of ORGS) {
    const cityId = org.city_slug ? (cityMap.get(org.city_slug) ?? null) : null;

    const [row] = await sql<{ id: number; xmax: string }[]>`
      INSERT INTO listings (
        slug, name, org_type,
        city_id, region_code, city_name,
        website_url, address_line1, zip_code, phone,
        year_founded, logo_url,
        mission, full_description,
        serves_statewide, status, is_verified
      ) VALUES (
        ${org.slug}, ${org.name}, 'nonprofit_501c3',
        ${cityId}, ${org.region_code}, ${org.city_name},
        ${org.website_url}, ${org.address_line1}, ${org.zip_code}, ${org.phone},
        ${org.year_founded}, ${org.logo_url},
        ${org.mission}, ${org.full_description},
        false, 'approved', false
      )
      ON CONFLICT (slug) DO UPDATE SET
        name             = EXCLUDED.name,
        city_id          = EXCLUDED.city_id,
        region_code      = EXCLUDED.region_code,
        city_name        = EXCLUDED.city_name,
        website_url      = EXCLUDED.website_url,
        address_line1    = EXCLUDED.address_line1,
        phone            = EXCLUDED.phone,
        year_founded     = EXCLUDED.year_founded,
        logo_url         = EXCLUDED.logo_url,
        mission          = EXCLUDED.mission,
        full_description = EXCLUDED.full_description,
        updated_at       = now()
      RETURNING id, xmax::text
    `;

    const isUpdate = row.xmax !== '0';
    if (isUpdate) updated++; else inserted++;

    await sql`DELETE FROM listing_sectors WHERE listing_id = ${row.id}`;
    for (let i = 0; i < org.sectors.length; i++) {
      const sid = sectorMap.get(org.sectors[i]);
      if (sid) {
        await sql`
          INSERT INTO listing_sectors (listing_id, sector_id, is_primary)
          VALUES (${row.id}, ${sid}, ${i === 0})
          ON CONFLICT DO NOTHING
        `;
      }
    }

    console.log(`  ${isUpdate ? 'updated' : 'inserted'}  [${row.id}]  ${org.name}`);
  }

  console.log(`\nDone: ${inserted} inserted, ${updated} updated`);
}

main().catch((e) => { console.error(e); process.exit(1); });

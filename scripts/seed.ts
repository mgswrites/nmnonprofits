/**
 * Seeds 73 curated New Mexico nonprofit organizations from the launch seed list.
 * Safe to re-run — uses ON CONFLICT DO UPDATE on slug so data is refreshed each run.
 * Sector associations are deleted and re-inserted to stay in sync.
 *
 * Usage: npm run db:seed
 */
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL is not set.');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip diacritics (é→e, ñ→n, etc.)
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

type OrgType =
  | 'nonprofit_501c3' | 'nonprofit_501c4' | 'fiscal_sponsor'
  | 'tribal_organization' | 'government_agency' | 'community_foundation'
  | 'private_foundation' | 'corporate_funder' | 'collaborative_fund' | 'resource_hub';

type NmRegion =
  | 'albuquerque_metro' | 'northern_nm' | 'southern_nm'
  | 'eastern_nm' | 'four_corners' | 'statewide';

interface OrgSeed {
  name: string;
  org_type: OrgType;
  city_name: string;
  /** Slug used to look up cities table. null = city not seeded; city_name still stored. */
  city_slug: string | null;
  region_code: NmRegion;
  website_url: string | null;
  /** Max ~160 chars — used in cards + meta descriptions. */
  mission: string;
  /** Sector slugs in priority order; first is marked is_primary. */
  sectors: string[];
  serves_statewide: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// SEED DATA — 73 orgs
// ─────────────────────────────────────────────────────────────────────────────
const ORGS: OrgSeed[] = [

  // ── FOOD & AGRICULTURE ──────────────────────────────────────────────────────
  {
    name: 'Roadrunner Food Bank',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://rrfb.org',
    mission: "New Mexico's only Feeding America food bank, distributing groceries to more than 70,000 people every week across all 33 counties.",
    sectors: ['food-agriculture'],
    serves_statewide: true,
  },
  {
    name: 'The Food Depot',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://thefooddepot.org',
    mission: "Northern New Mexico's food bank, serving individuals and families across eight counties through a network of partner agencies and pantries.",
    sectors: ['food-agriculture'],
    serves_statewide: false,
  },
  {
    name: 'Storehouse New Mexico',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://storehousenwm.org',
    mission: "Faith-based food pantry network providing emergency food assistance to families across the Albuquerque metropolitan area.",
    sectors: ['food-agriculture'],
    serves_statewide: false,
  },
  {
    name: 'Blessing Ranch',
    org_type: 'nonprofit_501c3',
    city_name: 'Estancia',
    city_slug: null,
    region_code: 'eastern_nm',
    website_url: null,
    mission: "Rural food access and agricultural support serving the Estancia Valley and surrounding Torrance County communities.",
    sectors: ['food-agriculture'],
    serves_statewide: false,
  },
  {
    name: 'Reunity Resources',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://reunityresources.org',
    mission: "Urban farming and food sovereignty programs cultivating healthy food, community resilience, and ecological literacy in Santa Fe.",
    sectors: ['food-agriculture', 'environment-conservation'],
    serves_statewide: false,
  },

  // ── HOUSING & HOMELESSNESS ──────────────────────────────────────────────────
  {
    name: 'Homewise',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://homewise.org',
    mission: "Helping New Mexicans become successful homeowners through financial education, affordable lending, and community-rooted housing development.",
    sectors: ['housing-homelessness', 'economic-development'],
    serves_statewide: true,
  },
  {
    name: 'YES Housing',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://yeshousing.org',
    mission: "Developing and managing affordable multi-family housing communities across New Mexico for families and individuals with limited incomes.",
    sectors: ['housing-homelessness'],
    serves_statewide: true,
  },
  {
    name: 'Ventana Fund',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://ventanafund.org',
    mission: "Community development financial institution financing affordable housing and economic opportunity for underserved New Mexicans statewide.",
    sectors: ['housing-homelessness', 'economic-development'],
    serves_statewide: true,
  },
  {
    name: 'St. Elizabeth Shelter',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://saintelizabethshelter.org',
    mission: "Emergency shelter, transitional housing, and wrap-around services for individuals and families experiencing homelessness in Santa Fe.",
    sectors: ['housing-homelessness'],
    serves_statewide: false,
  },
  {
    name: 'Joy Junction',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://joyjunction.org',
    mission: "New Mexico's largest emergency homeless shelter, providing food, safe lodging, and supportive services to families and individuals in Albuquerque.",
    sectors: ['housing-homelessness'],
    serves_statewide: false,
  },
  {
    name: 'La Casa Family Advocacy Center',
    org_type: 'nonprofit_501c3',
    city_name: 'Las Cruces',
    city_slug: 'las-cruces',
    region_code: 'southern_nm',
    website_url: 'https://lacasadv.org',
    mission: "Comprehensive shelter, counseling, and legal advocacy for survivors of domestic violence in southern New Mexico.",
    sectors: ['housing-homelessness', 'health-human-services'],
    serves_statewide: false,
  },
  {
    name: 'DreamTree Project',
    org_type: 'nonprofit_501c3',
    city_name: 'Taos',
    city_slug: 'taos',
    region_code: 'northern_nm',
    website_url: 'https://dreamtreeproject.org',
    mission: "Emergency youth shelter, transitional housing, and social enterprise employment for young people across five northern New Mexico counties.",
    sectors: ['housing-homelessness', 'education-youth'],
    serves_statewide: false,
  },

  // ── HEALTH & HUMAN SERVICES ─────────────────────────────────────────────────
  {
    name: 'La Familia Medical Center',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://lafamiliamedical.org',
    mission: "Federally qualified health center providing affordable primary, dental, and behavioral health care to Santa Fe's most vulnerable communities.",
    sectors: ['health-human-services'],
    serves_statewide: false,
  },
  {
    name: 'Presbyterian Medical Services',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://pmsnm.org',
    mission: "New Mexico's largest FQHC network, delivering primary and behavioral health care to rural and frontier communities statewide.",
    sectors: ['health-human-services'],
    serves_statewide: true,
  },
  {
    name: 'La Clínica de Familia',
    org_type: 'nonprofit_501c3',
    city_name: 'Las Cruces',
    city_slug: 'las-cruces',
    region_code: 'southern_nm',
    website_url: 'https://laclinica.org',
    mission: "Comprehensive primary, dental, and behavioral health services for southern New Mexico's underserved families regardless of ability to pay.",
    sectors: ['health-human-services'],
    serves_statewide: false,
  },
  {
    name: 'Southwest CARE Center',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://southwestcare.org',
    mission: "HIV/AIDS primary care, prevention, and supportive services in Santa Fe and Albuquerque, serving New Mexico's most marginalized communities.",
    sectors: ['health-human-services'],
    serves_statewide: false,
  },
  {
    name: 'Amador Health Center',
    org_type: 'nonprofit_501c3',
    city_name: 'Las Cruces',
    city_slug: 'las-cruces',
    region_code: 'southern_nm',
    website_url: null,
    mission: "Integrated health care services for people experiencing homelessness and poverty in the Las Cruces area.",
    sectors: ['health-human-services', 'housing-homelessness'],
    serves_statewide: false,
  },
  {
    name: 'Ben Archer Health Center',
    org_type: 'nonprofit_501c3',
    city_name: 'Hatch',
    city_slug: null,
    region_code: 'southern_nm',
    website_url: 'https://benarcher.org',
    mission: "Rural primary and dental care for residents of Luna County and southern Doña Ana County regardless of ability to pay.",
    sectors: ['health-human-services'],
    serves_statewide: false,
  },
  {
    name: 'Crossroads Community Health Clinic',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://crossroadscommhealth.org',
    mission: "High-quality, low-cost primary care for low-income and uninsured residents of Santa Fe and surrounding communities.",
    sectors: ['health-human-services'],
    serves_statewide: false,
  },
  {
    name: 'SHE RECOVERS Foundation',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://sherecovers.org',
    mission: "Global recovery community for women and non-binary people navigating addiction, mental health, and trauma — headquartered in Santa Fe.",
    sectors: ['substance-use-recovery', 'health-human-services'],
    serves_statewide: true,
  },
  {
    name: 'Solace Crisis Treatment Center',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://solacenm.org',
    mission: "Sexual assault crisis intervention, counseling, and prevention education for survivors and communities across northern New Mexico.",
    sectors: ['health-human-services'],
    serves_statewide: false,
  },
  {
    name: 'Cancer Foundation for New Mexico',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://cancerfnm.org',
    mission: "Patient support, navigation, and financial assistance for New Mexicans facing a cancer diagnosis, regardless of income or insurance.",
    sectors: ['health-human-services'],
    serves_statewide: true,
  },

  // ── EDUCATION & YOUTH ───────────────────────────────────────────────────────
  {
    name: 'Communities in Schools of New Mexico',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://cisnm.org',
    mission: "Dropout prevention and student support services in New Mexico public schools, connecting students with community resources inside the classroom.",
    sectors: ['education-youth'],
    serves_statewide: true,
  },
  {
    name: 'National Dance Institute New Mexico',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://ndi-nm.org',
    mission: "Arts-integrated education reaching 14,500 K–12 students annually in New Mexico schools through dance, music, and creative expression.",
    sectors: ['education-youth', 'arts-culture'],
    serves_statewide: false,
  },
  {
    name: 'YouthWorks',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://youthworksnm.org',
    mission: "Paid job training in construction, culinary arts, and green industries for Albuquerque's opportunity youth ages 16–24.",
    sectors: ['education-youth', 'economic-development'],
    serves_statewide: false,
  },
  {
    name: 'Rocky Mountain Youth Corps',
    org_type: 'nonprofit_501c3',
    city_name: 'Taos',
    city_slug: 'taos',
    region_code: 'northern_nm',
    website_url: 'https://rmyc.org',
    mission: "Conservation corps and workforce development programs for youth on northern New Mexico's public lands, forests, and community green spaces.",
    sectors: ['education-youth', 'environment-conservation'],
    serves_statewide: false,
  },
  {
    name: 'Boys & Girls Club of Albuquerque',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://bgcabq.org',
    mission: "After-school and summer programs for Albuquerque youth providing safe spaces, academic support, mentorship, and healthy activities.",
    sectors: ['education-youth'],
    serves_statewide: false,
  },
  {
    name: 'Boys & Girls Club of Las Cruces',
    org_type: 'nonprofit_501c3',
    city_name: 'Las Cruces',
    city_slug: 'las-cruces',
    region_code: 'southern_nm',
    website_url: 'https://bgclc.org',
    mission: "Youth development programs offering safe, enriching after-school and summer experiences for children and teens in Las Cruces.",
    sectors: ['education-youth'],
    serves_statewide: false,
  },
  {
    name: 'The Bridges Project for Education',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://bridgesprojectnm.org',
    mission: "College access, mentoring, and financial support for first-generation college students across northern New Mexico.",
    sectors: ['education-youth'],
    serves_statewide: false,
  },
  {
    name: 'Think New Mexico',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://thinknewmexico.org',
    mission: "Nonpartisan think tank advancing evidence-based solutions to New Mexico's most pressing education, tax, and public policy challenges.",
    sectors: ['education-youth', 'civic-engagement'],
    serves_statewide: true,
  },
  {
    name: 'Girls Inc. of Santa Fe',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://girlsincsantafe.org',
    mission: "Empowering Santa Fe girls through programs in STEM, financial literacy, health, and leadership development.",
    sectors: ['education-youth'],
    serves_statewide: false,
  },
  {
    name: 'Adaptive Sports Program New Mexico',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://adaptivesportsnm.org',
    mission: "Adaptive recreation, sport, and therapeutic outdoor programs for people with physical disabilities across New Mexico.",
    sectors: ['education-youth', 'health-human-services'],
    serves_statewide: true,
  },

  // ── ARTS & CULTURE ──────────────────────────────────────────────────────────
  {
    name: "Georgia O'Keeffe Museum",
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://okeeffemuseum.org',
    mission: "Dedicated to the life and art of Georgia O'Keeffe, inspiring creativity through world-class exhibitions, education, and scholarship in Santa Fe.",
    sectors: ['arts-culture'],
    serves_statewide: false,
  },
  {
    name: 'Lensic Performing Arts Center',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://lensic.org',
    mission: "Santa Fe's historic performing arts venue presenting world-class music, dance, film, and arts education programs for all ages.",
    sectors: ['arts-culture', 'education-youth'],
    serves_statewide: false,
  },
  {
    name: 'Museum of New Mexico Foundation',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://museumfoundation.org',
    mission: "Supporting the collections, programs, and community engagement of New Mexico's four state museums and four state monuments.",
    sectors: ['arts-culture'],
    serves_statewide: true,
  },
  {
    name: 'National Institute of Flamenco',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://nationalinstituteofflamenco.org',
    mission: "Preserving and presenting flamenco as a living art form through education, performance, and the annual Globalquerque world music festival.",
    sectors: ['arts-culture'],
    serves_statewide: false,
  },
  {
    name: '516 ARTS',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://516arts.org',
    mission: "Contemporary art museum in downtown Albuquerque presenting socially engaged exhibitions connecting art, community, and justice.",
    sectors: ['arts-culture', 'civic-engagement'],
    serves_statewide: false,
  },
  {
    name: 'Cornerstones Community Partnerships',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://cstones.org',
    mission: "Preserving historic adobe churches and community buildings across New Mexico and the Southwest through hands-on, community-led restoration.",
    sectors: ['arts-culture'],
    serves_statewide: true,
  },
  {
    name: 'New Mexico Jazz Workshop',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://nmjazz.org',
    mission: "Nurturing jazz artists, educators, and audiences across New Mexico through performance, workshops, and school-based jazz education.",
    sectors: ['arts-culture', 'education-youth'],
    serves_statewide: false,
  },

  // ── ENVIRONMENT & CONSERVATION ─────────────────────────────────────────────
  {
    name: 'WildEarth Guardians',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://wildearthguardians.org',
    mission: "Protecting and restoring wildlife, wild rivers, wild places, and the climate of the American West through litigation, science, and advocacy.",
    sectors: ['environment-conservation'],
    serves_statewide: false,
  },
  {
    name: 'The Nature Conservancy New Mexico',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://www.nature.org/en-us/about-us/where-we-work/united-states/new-mexico/',
    mission: "Conserving the lands and waters New Mexico depends on through science, partnerships, and collaborative community stewardship.",
    sectors: ['environment-conservation'],
    serves_statewide: true,
  },
  {
    name: 'Santa Fe Watershed Association',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://santafewatershed.org',
    mission: "Restoring and protecting the Santa Fe watershed's forests, waters, and ecosystems through community stewardship and applied science.",
    sectors: ['environment-conservation'],
    serves_statewide: false,
  },
  {
    name: 'Taos Land Trust',
    org_type: 'nonprofit_501c3',
    city_name: 'Taos',
    city_slug: 'taos',
    region_code: 'northern_nm',
    website_url: 'https://taoslandtrust.org',
    mission: "Permanently protecting working farms, ranches, forests, and open space in Taos County for the benefit of people and future generations.",
    sectors: ['environment-conservation'],
    serves_statewide: false,
  },
  {
    name: 'New Mexico Wilderness Alliance',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://nmwild.org',
    mission: "Protecting and restoring New Mexico's wilderness areas and public lands through advocacy, community organizing, and on-the-ground stewardship.",
    sectors: ['environment-conservation'],
    serves_statewide: true,
  },
  {
    name: 'Acequia Madre del Llano',
    org_type: 'nonprofit_501c3',
    city_name: 'Las Vegas',
    city_slug: 'las-vegas',
    region_code: 'northern_nm',
    website_url: null,
    mission: "Stewarding traditional acequia water rights and agricultural heritage in northern New Mexico's Mora Valley communities.",
    sectors: ['environment-conservation', 'food-agriculture'],
    serves_statewide: false,
  },

  // ── INDIGENOUS COMMUNITIES ─────────────────────────────────────────────────
  {
    name: 'NAEVA — New Mexico Alliance for Environmental Action',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://naeva.org',
    mission: "Indigenous-led environmental justice and civic engagement serving 20 Pueblo nations, Diné Nation, and Mescalero Apache communities.",
    sectors: ['indigenous-communities', 'environment-conservation', 'civic-engagement'],
    serves_statewide: true,
  },
  {
    name: 'Native Forward Scholars Fund',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://nativeforward.org',
    mission: "Scholarships, mentorship, and graduate fellowships for Indigenous students pursuing higher education — the nation's largest Indigenous scholarship fund.",
    sectors: ['indigenous-communities', 'education-youth'],
    serves_statewide: true,
  },
  {
    name: 'Indigenous Women Rising',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://indigenouswomenrising.org',
    mission: "Indigenous women's health, reproductive justice, and community wellbeing led by and for Indigenous women and two-spirit people.",
    sectors: ['indigenous-communities', 'health-human-services'],
    serves_statewide: true,
  },
  {
    name: 'Pueblo of Acoma Cultural Center',
    org_type: 'tribal_organization',
    city_name: 'Acoma Pueblo',
    city_slug: null,
    region_code: 'four_corners',
    website_url: 'https://acomaculturalcenter.org',
    mission: "Preserving and sharing the history, language, and living culture of the Acoma Pueblo people at one of North America's oldest continuously inhabited communities.",
    sectors: ['indigenous-communities', 'arts-culture'],
    serves_statewide: false,
  },
  {
    name: 'Eight Northern Indian Pueblos Council',
    org_type: 'tribal_organization',
    city_name: 'Ohkay Owingeh',
    city_slug: null,
    region_code: 'northern_nm',
    website_url: 'https://enipc.org',
    mission: "Collaborative advocacy, economic development, and cultural programming for eight Tewa and Tiwa Pueblo communities in northern New Mexico.",
    sectors: ['indigenous-communities', 'economic-development'],
    serves_statewide: false,
  },
  {
    name: 'Navajo Nation Human Rights Commission',
    org_type: 'tribal_organization',
    city_name: 'Gallup',
    city_slug: 'gallup',
    region_code: 'four_corners',
    website_url: null,
    mission: "Documenting and advocating for the human rights of Diné people across the Navajo Nation through investigation, education, and policy engagement.",
    sectors: ['indigenous-communities', 'civic-engagement'],
    serves_statewide: false,
  },
  {
    name: 'Jicarilla Apache Nation Education Department',
    org_type: 'tribal_organization',
    city_name: 'Dulce',
    city_slug: null,
    region_code: 'northern_nm',
    website_url: null,
    mission: "Supporting the educational success of Jicarilla Apache youth from early childhood through higher education in the Dulce community.",
    sectors: ['indigenous-communities', 'education-youth'],
    serves_statewide: false,
  },

  // ── CIVIC ENGAGEMENT & ADVOCACY ────────────────────────────────────────────
  {
    name: 'New Mexico Voices for Children',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://nmvoices.org',
    mission: "Statewide policy advocacy and research advancing the well-being and economic security of New Mexico children and families.",
    sectors: ['civic-engagement', 'education-youth'],
    serves_statewide: true,
  },
  {
    name: 'Common Cause New Mexico',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://commoncause.org/new-mexico',
    mission: "Nonpartisan democracy reform organization working for fair elections, ethical government, and equal voting rights in New Mexico.",
    sectors: ['civic-engagement'],
    serves_statewide: true,
  },
  {
    name: 'Center for Civic Policy',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://civicpolicynm.org',
    mission: "Building civic participation and community power in New Mexico through organizing, training, and nonpartisan voter engagement.",
    sectors: ['civic-engagement'],
    serves_statewide: true,
  },
  {
    name: 'ACLU of New Mexico',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://aclu-nm.org',
    mission: "Defending civil liberties and equal justice for all New Mexicans through litigation, advocacy, and public education.",
    sectors: ['civic-engagement'],
    serves_statewide: true,
  },
  {
    name: 'Santa Fe Dreamers Project',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://santafedreamersproject.org',
    mission: "Free immigration legal services, community education, and integration support for immigrants and their families in northern New Mexico.",
    sectors: ['immigration-refugee', 'civic-engagement'],
    serves_statewide: false,
  },

  // ── ECONOMIC DEVELOPMENT & WORKFORCE ───────────────────────────────────────
  {
    name: 'WESST',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://wesst.org',
    mission: "Small business training, microloans, and business development services for women and underserved entrepreneurs across New Mexico.",
    sectors: ['economic-development'],
    serves_statewide: true,
  },
  {
    name: 'Accion Opportunity Fund',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://accionopportunityfund.org',
    mission: "Small business lending and coaching for entrepreneurs who lack access to traditional capital, with strong presence in New Mexico.",
    sectors: ['economic-development'],
    serves_statewide: false,
  },
  {
    name: 'Community Action Agency of Southern New Mexico',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://caasnm.org',
    mission: "Community Action Agency network coordinating poverty reduction, energy assistance, and essential human services for low-income New Mexicans.",
    sectors: ['economic-development', 'health-human-services'],
    serves_statewide: true,
  },
  {
    name: 'Goodwill Industries of New Mexico',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://goodwillnm.org',
    mission: "Job training, employment services, and thrift retail operations creating pathways to work for New Mexicans facing employment barriers.",
    sectors: ['economic-development'],
    serves_statewide: true,
  },
  {
    name: 'Vida Mejor Capital',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://vidamejorcapital.org',
    mission: "Affordable consumer lending and financial empowerment programs helping low-to-moderate income New Mexicans build lasting financial stability.",
    sectors: ['economic-development'],
    serves_statewide: false,
  },

  // ── ANIMAL WELFARE ──────────────────────────────────────────────────────────
  {
    name: 'Animal Humane New Mexico',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://animalhumanenm.org',
    mission: "New Mexico's largest animal shelter providing adoption services, spay/neuter programs, and community outreach across the Albuquerque metro.",
    sectors: ['animal-welfare'],
    serves_statewide: false,
  },
  {
    name: 'Santa Fe Animal Shelter & Humane Society',
    org_type: 'nonprofit_501c3',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://sfhumanesociety.org',
    mission: "High-volume animal shelter providing adoption, a veterinary safety net, and humane education in northern New Mexico.",
    sectors: ['animal-welfare'],
    serves_statewide: false,
  },
  {
    // Covers both the shelter and the pet food bank (#6 and #67 in source list — same org)
    name: 'High Desert Humane Society',
    org_type: 'nonprofit_501c3',
    city_name: 'Silver City',
    city_slug: 'silver-city',
    region_code: 'southern_nm',
    website_url: 'https://hdhs.org',
    mission: "Animal shelter and pet food bank serving Silver City and the greater Grant County region of southwest New Mexico.",
    sectors: ['animal-welfare', 'food-agriculture'],
    serves_statewide: false,
  },

  // ── CAPACITY-BUILDING & SECTOR INFRASTRUCTURE ──────────────────────────────
  {
    name: 'New Mexico Association of Nonprofits',
    org_type: 'resource_hub',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://nmanp.org',
    mission: "Statewide membership organization providing training, advocacy, and networking to strengthen New Mexico's nonprofit sector.",
    sectors: ['civic-engagement'],
    serves_statewide: true,
  },
  {
    name: 'Groundworks New Mexico',
    org_type: 'resource_hub',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://groundworksnm.org',
    mission: "Supporting New Mexico nonprofits and grantmakers through capacity-building, research, and sector-wide learning and collaboration.",
    sectors: ['civic-engagement', 'economic-development'],
    serves_statewide: true,
  },
  {
    name: 'Center for Nonprofit Excellence',
    org_type: 'resource_hub',
    city_name: 'Santa Fe',
    city_slug: 'santa-fe',
    region_code: 'northern_nm',
    website_url: 'https://centerfornpe.org',
    mission: "Training, consulting, and peer learning for nonprofit leaders across New Mexico to build stronger, more effective organizations.",
    sectors: ['civic-engagement'],
    serves_statewide: true,
  },
  {
    name: 'New Mexico Association of Grantmakers',
    org_type: 'resource_hub',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'statewide',
    website_url: null,
    mission: "Peer learning and collaboration network for foundations and funders working in and for New Mexico communities.",
    sectors: ['civic-engagement'],
    serves_statewide: true,
  },
  {
    name: 'New Mexico Center on Law and Poverty',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://nmlawpoverty.org',
    mission: "Legal advocacy and policy reform advancing the rights and economic security of low-income New Mexicans statewide.",
    sectors: ['civic-engagement', 'economic-development'],
    serves_statewide: true,
  },

  // ── SPIRITUAL / UNIQUE NM ORGS ─────────────────────────────────────────────
  {
    name: 'Center for Action and Contemplation',
    org_type: 'nonprofit_501c3',
    city_name: 'Albuquerque',
    city_slug: 'albuquerque',
    region_code: 'albuquerque_metro',
    website_url: 'https://cac.org',
    mission: "Rooted in the Christian mystical tradition, CAC integrates contemplative practice and social justice through education, publishing, and community.",
    sectors: ['civic-engagement', 'education-youth'],
    serves_statewide: false,
  },
  {
    name: 'Ghost Ranch Education and Retreat Center',
    org_type: 'nonprofit_501c3',
    city_name: 'Abiquiú',
    city_slug: null,
    region_code: 'northern_nm',
    website_url: 'https://ghostranch.org',
    mission: "Presbyterian retreat and education center in the high desert of Abiquiú offering spiritual formation, arts, science, and land stewardship programs.",
    sectors: ['arts-culture', 'environment-conservation'],
    serves_statewide: false,
  },
  {
    name: 'Taos Ski Valley Foundation',
    org_type: 'nonprofit_501c3',
    city_name: 'Taos',
    city_slug: 'taos',
    region_code: 'northern_nm',
    website_url: 'https://tsvfoundation.org',
    mission: "Conservation, education, and community grants supporting the mountain communities and natural landscapes of the greater Taos region.",
    sectors: ['environment-conservation', 'education-youth'],
    serves_statewide: false,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SEED RUNNER
// ─────────────────────────────────────────────────────────────────────────────
async function seed() {
  console.log(`Seeding ${ORGS.length} organizations…\n`);

  // 1. Build lookup maps from the DB
  const sectorRows = await sql<{ id: number; slug: string }[]>`
    SELECT id, slug FROM sectors
  `;
  const sectorMap = new Map(sectorRows.map((r) => [r.slug, r.id]));

  // Key: "region_code:city_slug" → city id
  const cityRows = await sql<{ id: number; slug: string; region_code: string }[]>`
    SELECT id, slug, region_code FROM cities
  `;
  const cityMap = new Map(cityRows.map((r) => [`${r.region_code}:${r.slug}`, r.id]));

  let upserted = 0;
  let skippedSectors = 0;

  for (const org of ORGS) {
    const slug = slugify(org.name);

    // Resolve city_id (null when the city isn't seeded — city_name is still stored)
    const cityId: number | null =
      org.city_slug != null
        ? (cityMap.get(`${org.region_code}:${org.city_slug}`) ?? null)
        : null;

    // Upsert listing — refresh all fields on re-run
    const [row] = await sql<{ id: number }[]>`
      INSERT INTO listings (
        slug, name, org_type,
        city_id, region_code, city_name,
        website_url, mission,
        serves_statewide, status, is_verified
      ) VALUES (
        ${slug},
        ${org.name},
        ${org.org_type},
        ${cityId},
        ${org.region_code},
        ${org.city_name},
        ${org.website_url ?? null},
        ${org.mission},
        ${org.serves_statewide},
        'approved',
        false
      )
      ON CONFLICT (slug) DO UPDATE SET
        name             = EXCLUDED.name,
        org_type         = EXCLUDED.org_type,
        city_id          = EXCLUDED.city_id,
        region_code      = EXCLUDED.region_code,
        city_name        = EXCLUDED.city_name,
        website_url      = EXCLUDED.website_url,
        mission          = EXCLUDED.mission,
        serves_statewide = EXCLUDED.serves_statewide,
        updated_at       = now()
      RETURNING id
    `;

    const listingId = row.id;

    // Replace sector associations cleanly on every run
    await sql`DELETE FROM listing_sectors WHERE listing_id = ${listingId}`;

    for (let i = 0; i < org.sectors.length; i++) {
      const sectorId = sectorMap.get(org.sectors[i]);
      if (!sectorId) {
        console.warn(`  WARN  unknown sector slug "${org.sectors[i]}" for "${org.name}"`);
        skippedSectors++;
        continue;
      }
      await sql`
        INSERT INTO listing_sectors (listing_id, sector_id, is_primary)
        VALUES (${listingId}, ${sectorId}, ${i === 0})
        ON CONFLICT DO NOTHING
      `;
    }

    console.log(`  ok    [${String(listingId).padStart(3)}] ${org.name}`);
    upserted++;
  }

  // Refresh denormalized org_count on sectors table
  await sql`
    UPDATE sectors s
    SET org_count = (
      SELECT COUNT(DISTINCT ls.listing_id)
      FROM listing_sectors ls
      JOIN listings l ON l.id = ls.listing_id
      WHERE ls.sector_id = s.id
        AND l.status = 'approved'
        AND l.deleted_at IS NULL
    )
  `;

  // Refresh denormalized org_count on cities table
  await sql`
    UPDATE cities c
    SET org_count = (
      SELECT COUNT(*)
      FROM listings l
      WHERE l.city_id = c.id
        AND l.status = 'approved'
        AND l.deleted_at IS NULL
    )
  `;

  console.log(`\nDone. ${upserted} orgs upserted.${skippedSectors > 0 ? ` ${skippedSectors} sector(s) skipped (unknown slug).` : ''}`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

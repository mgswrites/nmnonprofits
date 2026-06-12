/**
 * Seeds verified New Mexico grant opportunities.
 * Safe to re-run — uses ON CONFLICT DO UPDATE on slug.
 *
 * Usage: npm run db:seed-grants
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
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

type GrantStatus = 'open' | 'closed' | 'rolling' | 'upcoming';
type NmRegion = 'albuquerque_metro' | 'northern_nm' | 'southern_nm' | 'eastern_nm' | 'four_corners' | 'statewide';

interface GrantSeed {
  title: string;
  funder_name: string;
  description: string;
  min_amount: number | null;
  max_amount: number | null;
  deadline_date: string | null;
  is_rolling: boolean;
  status: GrantStatus;
  apply_url: string;
  eligible_regions: NmRegion[];
  sectors: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// GRANT DATA — 20 verified NM grants
// ─────────────────────────────────────────────────────────────────────────────
const GRANTS: GrantSeed[] = [
  {
    title: 'Con Alma Health Foundation Annual Grants',
    funder_name: 'Con Alma Health Foundation',
    description: 'Statewide grants to 501(c)(3) nonprofits working to improve health and advance health equity in New Mexico, with priority for projects benefiting marginalized, immigrant, rural, and low-income communities. Applicants may request fixed amounts of $15,000, $20,000, $25,000, or $30,000 for one year of support. The 2026 cycle closed in May; the next cycle typically opens in spring.',
    min_amount: 15000,
    max_amount: 30000,
    deadline_date: null,
    is_rolling: false,
    status: 'upcoming',
    apply_url: 'https://www.conalma.org/annual-grants',
    eligible_regions: ['statewide'],
    sectors: ['health-human-services', 'indigenous-communities', 'immigration-refugee'],
  },
  {
    title: 'Con Alma Health Foundation Multi-Year Grants',
    funder_name: 'Con Alma Health Foundation',
    description: 'Multi-year grants of up to three years for New Mexico nonprofits addressing health equity and access. Applicants may request $30,000–$50,000 annually, totaling up to $150,000 per organization. Priority is given to organizations serving rural, tribal, immigrant, and racially diverse communities across all 33 New Mexico counties.',
    min_amount: 30000,
    max_amount: 150000,
    deadline_date: null,
    is_rolling: false,
    status: 'upcoming',
    apply_url: 'https://www.conalma.org/grant-making',
    eligible_regions: ['statewide'],
    sectors: ['health-human-services', 'indigenous-communities', 'immigration-refugee'],
  },
  {
    title: 'Albuquerque Community Foundation Annual Grant Cycle',
    funder_name: 'Albuquerque Community Foundation',
    description: 'Annual competitive grants to nonprofits serving the Greater Albuquerque Metropolitan Area across seven fields of interest: animal welfare, arts & culture, education, environmental & historic preservation, economic & workforce development, human services, and health. Organizations must have been in existence at least three years and have an annual operating budget of $8 million or less. Awards typically range from $10,000 to $20,000.',
    min_amount: 10000,
    max_amount: 20000,
    deadline_date: null,
    is_rolling: false,
    status: 'upcoming',
    apply_url: 'https://abqcf.org/grants/',
    eligible_regions: ['albuquerque_metro'],
    sectors: ['arts-culture', 'education-youth', 'health-human-services', 'economic-development', 'environment-conservation', 'animal-welfare'],
  },
  {
    title: 'Albuquerque Community Foundation Need to Know Grants',
    funder_name: 'Albuquerque Community Foundation',
    description: 'A rolling grant program for nonprofits serving Bernalillo, Sandoval, Torrance, and Valencia counties that need flexible, timely funding. The foundation reviews requests monthly with no fixed deadline. Grant requests in the $5,000–$10,000 range are suggested.',
    min_amount: 5000,
    max_amount: 10000,
    deadline_date: null,
    is_rolling: true,
    status: 'rolling',
    apply_url: 'https://abqcf.org/grants/',
    eligible_regions: ['albuquerque_metro'],
    sectors: ['health-human-services', 'education-youth', 'arts-culture', 'economic-development', 'animal-welfare'],
  },
  {
    title: 'Santa Fe Community Foundation Fall 2026 Community Grants',
    funder_name: 'Santa Fe Community Foundation',
    description: 'Competitive grants of $5,000–$20,000 to organizations serving Santa Fe, Mora, Rio Arriba, and San Miguel counties. The fall 2026 cycle (July 13–August 16) supports animal welfare, arts & culture, education, and environment, plus the Envision Fund (LGBTQ+), Native American Advised Fund, and Santa Fe Baby Fund.',
    min_amount: 5000,
    max_amount: 20000,
    deadline_date: '2026-08-16',
    is_rolling: false,
    status: 'upcoming',
    apply_url: 'https://www.santafecf.org/nonprofits/grantseekers',
    eligible_regions: ['northern_nm'],
    sectors: ['arts-culture', 'education-youth', 'environment-conservation', 'animal-welfare', 'health-human-services', 'indigenous-communities'],
  },
  {
    title: 'New Mexico Community Foundation Northeastern Regional Health Fund',
    funder_name: 'New Mexico Community Foundation',
    description: 'Grants up to $5,000 for organizations doing health-related work in San Miguel, Mora, Guadalupe, Colfax, Harding, Union, and Quay counties. Priority areas include food security, access to healthcare (including mental health), and health education. Both program and general operating support are eligible. Next deadline: November 16, 2026.',
    min_amount: null,
    max_amount: 5000,
    deadline_date: '2026-11-16',
    is_rolling: false,
    status: 'upcoming',
    apply_url: 'https://newmexicofoundation.org/we-build-and-fund/grants/',
    eligible_regions: ['eastern_nm', 'northern_nm'],
    sectors: ['health-human-services', 'food-agriculture'],
  },
  {
    title: 'New Mexico Community Foundation Sustaining New Mexico Fund',
    funder_name: 'New Mexico Community Foundation',
    description: 'Grants of $3,000–$40,000 to support the long-term sustainability of nonprofits throughout New Mexico, with preference for rural organizations. Priority areas are community resilience, educational opportunities, environmental adaptability, healthy communities, and rural infrastructure. Both program and general operating support are eligible. Next deadline: September 15, 2026.',
    min_amount: 3000,
    max_amount: 40000,
    deadline_date: '2026-09-15',
    is_rolling: false,
    status: 'upcoming',
    apply_url: 'https://newmexicofoundation.org/we-build-and-fund/grants/sustaining-new-mexico-fund/',
    eligible_regions: ['statewide'],
    sectors: ['health-human-services', 'education-youth', 'environment-conservation', 'economic-development', 'civic-engagement'],
  },
  {
    title: 'McCune Charitable Foundation 2027 Grant Cycle',
    funder_name: 'McCune Charitable Foundation',
    description: 'Annual open application cycle for New Mexico 501(c)(3) nonprofits, federally recognized tribal nations, public schools, and governmental agencies across health, education, arts, environment, economic development, and rural development. The application cycle for 2027 funding opens August 15 and closes September 15, 2026. Cultivate Grants provide up to $15,000 for unrestricted operating support.',
    min_amount: null,
    max_amount: 15000,
    deadline_date: '2026-09-15',
    is_rolling: false,
    status: 'upcoming',
    apply_url: 'https://nmmccune.org/apply/',
    eligible_regions: ['statewide'],
    sectors: ['health-human-services', 'education-youth', 'arts-culture', 'environment-conservation', 'economic-development', 'indigenous-communities'],
  },
  {
    title: 'Community Foundation of Southern NM — Devasthali Family Foundation Grant',
    funder_name: 'Community Foundation of Southern New Mexico',
    description: 'Grants of $1,500–$4,000 for nonprofits supporting arts, education, and child hunger across 12 counties of southern New Mexico. The fall 2026 cycle runs August 1–October 5. Eligible counties: Catron, Chaves, Doña Ana, Eddy, Grant, Hidalgo, Lea, Lincoln, Luna, Otero, Sierra, and Socorro.',
    min_amount: 1500,
    max_amount: 4000,
    deadline_date: '2026-10-05',
    is_rolling: false,
    status: 'upcoming',
    apply_url: 'https://www.communityfoundationofsouthernnewmexico.org/apply-for-a-grant/',
    eligible_regions: ['southern_nm'],
    sectors: ['arts-culture', 'education-youth', 'food-agriculture'],
  },
  {
    title: 'Community Foundation of Southern NM — Wellness Fund Grant',
    funder_name: 'Community Foundation of Southern New Mexico',
    description: 'Annual grants of $3,000–$10,000 (up to $30,000 multi-year) to nonprofits improving maternal and child health and wellness outcomes in southern New Mexico. Eligible counties include Doña Ana, Hidalgo, Grant, Lincoln, Luna, Otero, and Sierra. The fall 2026 cycle runs August 1–October 5.',
    min_amount: 3000,
    max_amount: 10000,
    deadline_date: '2026-10-05',
    is_rolling: false,
    status: 'upcoming',
    apply_url: 'https://www.communityfoundationofsouthernnewmexico.org/apply-for-a-grant/',
    eligible_regions: ['southern_nm'],
    sectors: ['health-human-services'],
  },
  {
    title: 'Gila Community Foundation Southline Grant',
    funder_name: 'Gila Community Foundation',
    description: 'Competitive grants for nonprofits, faith-based organizations, and public entities serving Grant, Hidalgo, Luna, and Doña Ana counties in southwest New Mexico. Grants address critical needs across education, health, social services, arts, and community development. Watch the foundation website for the next cycle announcement.',
    min_amount: null,
    max_amount: null,
    deadline_date: null,
    is_rolling: false,
    status: 'upcoming',
    apply_url: 'https://gilacf.org/grants/',
    eligible_regions: ['southern_nm'],
    sectors: ['health-human-services', 'education-youth', 'arts-culture', 'economic-development'],
  },
  {
    title: 'Taos Community Foundation Impact Grants',
    funder_name: 'Taos Community Foundation',
    description: 'Annual competitive grants of $2,000–$5,000 to 501(c)(3) nonprofits, governmental agencies, and federally recognized tribes providing services in Taos and western Colfax County. Supports animal welfare, arts & culture, basic needs, community advocacy, environmental sustainability, health, education, and youth. Next cycle opens February 2027.',
    min_amount: 2000,
    max_amount: 5000,
    deadline_date: null,
    is_rolling: false,
    status: 'upcoming',
    apply_url: 'https://www.taoscf.org/grants/impact/',
    eligible_regions: ['northern_nm'],
    sectors: ['arts-culture', 'health-human-services', 'education-youth', 'environment-conservation', 'animal-welfare', 'civic-engagement'],
  },
  {
    title: 'Las Vegas NM Community Foundation Health & Wellness Grant',
    funder_name: 'Las Vegas NM Community Foundation',
    description: 'Competitive grants for 501(c)(3) organizations serving residents of San Miguel and Mora counties, funded through Anchorum Health Foundation\'s $25 million investment in northern New Mexico. Grants support innovative projects addressing health outcomes and social determinants including food security, housing, and transportation. Watch for the next cycle announcement.',
    min_amount: null,
    max_amount: null,
    deadline_date: null,
    is_rolling: false,
    status: 'upcoming',
    apply_url: 'https://www.lvnmcf.com/grants/',
    eligible_regions: ['northern_nm', 'eastern_nm'],
    sectors: ['health-human-services', 'food-agriculture', 'housing-homelessness'],
  },
  {
    title: 'PNM/TNMP Foundation Power Grant',
    funder_name: 'PNM/TNMP Foundation',
    description: 'Flexible grants for eligible New Mexico nonprofits advancing education, environmental stewardship, and economic vitality. The foundation awards more than $1 million annually across its grant programs using a trust-based philanthropy approach, providing targeted and flexible support that strengthens organizations holistically.',
    min_amount: null,
    max_amount: null,
    deadline_date: null,
    is_rolling: false,
    status: 'open',
    apply_url: 'https://www.pnm.com/apply-for-grant',
    eligible_regions: ['statewide'],
    sectors: ['education-youth', 'environment-conservation', 'economic-development'],
  },
  {
    title: 'Walmart Spark Good Local Grants',
    funder_name: 'Walmart Foundation',
    description: 'Local grants of $250–$5,000 for nonprofits and public entities creating economic opportunity, reducing food or textile waste, and supporting community resilience near participating Walmart and Sam\'s Club locations in New Mexico. Cycle 2 runs May 1–July 15, 2026. Organizations must have a verified Spark Good account.',
    min_amount: 250,
    max_amount: 5000,
    deadline_date: '2026-07-15',
    is_rolling: false,
    status: 'open',
    apply_url: 'https://walmart.com/nonprofits',
    eligible_regions: ['statewide'],
    sectors: ['food-agriculture', 'economic-development', 'health-human-services', 'environment-conservation'],
  },
  {
    title: 'USDA Rural Business Development Grants — New Mexico',
    funder_name: 'USDA Rural Development',
    description: 'Federal grants for public bodies, federally recognized tribes, and nonprofit entities primarily serving rural areas of New Mexico to promote economic development and job creation. Smaller requests receive higher priority. Check the USDA New Mexico state office for the next cycle announcement.',
    min_amount: null,
    max_amount: null,
    deadline_date: null,
    is_rolling: false,
    status: 'upcoming',
    apply_url: 'https://www.rd.usda.gov/programs-services/business-programs/rural-business-development-grants',
    eligible_regions: ['statewide'],
    sectors: ['economic-development', 'indigenous-communities', 'food-agriculture'],
  },
  {
    title: 'New Mexico Arts Grants Program (FY2027)',
    funder_name: 'New Mexico Arts',
    description: 'State arts agency grants for 501(c)(3) nonprofits, government entities, schools, and tribal entities for arts activities across performing, visual, literary, media, and interdisciplinary disciplines in New Mexico. Maximum awards range from $15,000–$20,000 with a required 50% match. New applicants may apply when the portal opens in September 2026.',
    min_amount: 1000,
    max_amount: 20000,
    deadline_date: null,
    is_rolling: false,
    status: 'upcoming',
    apply_url: 'https://nmarts.org/grants/apply-for-a-grant/',
    eligible_regions: ['statewide'],
    sectors: ['arts-culture'],
  },
  {
    title: 'NM Creative Industries Public Development Projects',
    funder_name: 'NM Economic Development Department',
    description: 'Grants up to $150,000 for county, municipal, and tribal governments to support creative industries infrastructure and public development in New Mexico. Applications are reviewed July through September 2026. A full funding round is anticipated in fall 2026.',
    min_amount: null,
    max_amount: 150000,
    deadline_date: '2026-06-30',
    is_rolling: false,
    status: 'open',
    apply_url: 'https://creativeindustriesdivision.submittable.com/submit',
    eligible_regions: ['statewide'],
    sectors: ['arts-culture', 'economic-development'],
  },
  {
    title: 'AARP Community Challenge Grants — New Mexico',
    funder_name: 'AARP',
    description: 'Quick-action grants for 501(c)(3), 501(c)(4), and 501(c)(6) nonprofits and government entities in New Mexico to improve livability by enhancing public places, transportation, housing, digital connections, and disaster resilience. Flagship awards range up to $15,000; capacity-building microgrants are $2,500. The 2027 cycle typically opens in January.',
    min_amount: 250,
    max_amount: 15000,
    deadline_date: null,
    is_rolling: false,
    status: 'upcoming',
    apply_url: 'https://www.aarp.org/livable-communities/community-challenge/',
    eligible_regions: ['statewide'],
    sectors: ['civic-engagement', 'housing-homelessness', 'health-human-services', 'economic-development'],
  },
  {
    title: 'New Mexico Community Foundation Tribal Futures Fund',
    funder_name: 'New Mexico Community Foundation',
    description: 'Grants supporting Indigenous-led nonprofits and tribal entities working to strengthen Native communities across New Mexico through cultural preservation, health, education, and economic self-determination. Rolling applications are reviewed quarterly. Contact the foundation directly to discuss eligibility.',
    min_amount: null,
    max_amount: null,
    deadline_date: null,
    is_rolling: true,
    status: 'rolling',
    apply_url: 'https://newmexicofoundation.org/we-build-and-fund/grants/',
    eligible_regions: ['statewide'],
    sectors: ['indigenous-communities', 'education-youth', 'health-human-services'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SEED RUNNER
// ─────────────────────────────────────────────────────────────────────────────
async function seedGrants() {
  console.log(`Seeding ${GRANTS.length} grants…\n`);

  const sectorRows = await sql<{ id: number; slug: string }[]>`SELECT id, slug FROM sectors`;
  const sectorMap = new Map(sectorRows.map((r) => [r.slug, r.id]));

  let upserted = 0;

  for (const grant of GRANTS) {
    const slug = slugify(grant.title);
    const regions = `{${grant.eligible_regions.join(',')}}`;

    const [row] = await sql<{ id: number }[]>`
      INSERT INTO grants (
        slug, title, description,
        min_amount, max_amount,
        deadline_date, is_rolling, status,
        apply_url, eligible_regions, serves_statewide
      ) VALUES (
        ${slug},
        ${grant.title},
        ${grant.description},
        ${grant.min_amount},
        ${grant.max_amount},
        ${grant.deadline_date},
        ${grant.is_rolling},
        ${grant.status}::grant_status,
        ${grant.apply_url},
        ${regions}::nm_region[],
        ${grant.eligible_regions.includes('statewide')}
      )
      ON CONFLICT (slug) DO UPDATE SET
        title            = EXCLUDED.title,
        description      = EXCLUDED.description,
        min_amount       = EXCLUDED.min_amount,
        max_amount       = EXCLUDED.max_amount,
        deadline_date    = EXCLUDED.deadline_date,
        is_rolling       = EXCLUDED.is_rolling,
        status           = EXCLUDED.status,
        apply_url        = EXCLUDED.apply_url,
        eligible_regions = EXCLUDED.eligible_regions,
        serves_statewide = EXCLUDED.serves_statewide,
        updated_at       = now()
      RETURNING id
    `;

    const grantId = row.id;

    await sql`DELETE FROM grant_sectors WHERE grant_id = ${grantId}`;

    for (const sectorSlug of grant.sectors) {
      const sectorId = sectorMap.get(sectorSlug);
      if (!sectorId) {
        console.warn(`  WARN  unknown sector "${sectorSlug}" for "${grant.title}"`);
        continue;
      }
      await sql`
        INSERT INTO grant_sectors (grant_id, sector_id)
        VALUES (${grantId}, ${sectorId})
        ON CONFLICT DO NOTHING
      `;
    }

    console.log(`  ok    [${String(grantId).padStart(3)}] ${grant.title}`);
    upserted++;
  }

  console.log(`\nDone. ${upserted} grants upserted.`);
}

seedGrants().catch((err) => {
  console.error(err);
  process.exit(1);
});

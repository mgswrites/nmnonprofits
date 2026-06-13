/**
 * Seeds verified New Mexico funders and backfills funder_id on grants.
 * Safe to re-run — uses ON CONFLICT DO UPDATE on slug.
 *
 * Usage: npm run db:seed-funders
 */
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL is not set.');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

type FunderType =
  | 'community_foundation'
  | 'private_foundation'
  | 'family_foundation'
  | 'corporate_foundation'
  | 'government_grant'
  | 'tribal_grant'
  | 'federal_pass_through';

type NmRegion =
  | 'albuquerque_metro'
  | 'northern_nm'
  | 'southern_nm'
  | 'eastern_nm'
  | 'four_corners'
  | 'statewide';

interface FunderSeed {
  slug: string;
  name: string;
  funder_type: FunderType;
  region_code: NmRegion | null;
  funds_statewide: boolean;
  funds_national: boolean;
  year_founded: number | null;
  ein: string | null;
  description: string;
  website_url: string;
  grants_page_url: string | null;
  phone: string | null;
  email: string | null;
  min_grant: number | null;
  max_grant: number | null;
  annual_giving: number | null;
  accepts_unsolicited: boolean | null;
  sectors: string[];
  // slug(s) of grants to backfill with this funder_id
  backfill_grant_slugs: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// FUNDER DATA
// ─────────────────────────────────────────────────────────────────────────────
const FUNDERS: FunderSeed[] = [
  {
    slug: 'nm-creative-industries',
    name: 'New Mexico Creative Industries Division',
    funder_type: 'government_grant',
    region_code: 'statewide',
    funds_statewide: true,
    funds_national: false,
    year_founded: 2003,
    ein: null,
    description: 'State agency within the NM Economic Development Department that funds and grows New Mexico\'s creative economy through grants to local governments and tribal entities for public development projects.',
    website_url: 'https://www.edd.newmexico.gov/creative-industries/',
    grants_page_url: 'https://creativeindustriesdivision.submittable.com/submit',
    phone: '(505) 827-0300',
    email: null,
    min_grant: null,
    max_grant: 150000,
    annual_giving: null,
    accepts_unsolicited: true,
    sectors: ['arts-culture', 'economic-development'],
    backfill_grant_slugs: ['nm-creative-industries-public-development-projects'],
  },
  {
    slug: 'new-mexico-arts',
    name: 'New Mexico Arts',
    funder_type: 'government_grant',
    region_code: 'statewide',
    funds_statewide: true,
    funds_national: false,
    year_founded: 1966,
    ein: null,
    description: 'The state arts agency of New Mexico, a division of the NM Department of Cultural Affairs. Distributes federal and state arts funding to nonprofit organizations, government entities, schools, and tribal entities for arts programming throughout New Mexico.',
    website_url: 'https://nmarts.org/',
    grants_page_url: 'https://nmarts.org/grants/apply-for-a-grant/',
    phone: '(505) 827-6490',
    email: 'nmarts@state.nm.us',
    min_grant: 1000,
    max_grant: 20000,
    annual_giving: null,
    accepts_unsolicited: true,
    sectors: ['arts-culture'],
    backfill_grant_slugs: ['new-mexico-arts-grants-program-fy2027'],
  },
  {
    slug: 'con-alma-health-foundation',
    name: 'Con Alma Health Foundation',
    funder_type: 'private_foundation',
    region_code: 'statewide',
    funds_statewide: true,
    funds_national: false,
    year_founded: 1992,
    ein: '85-0402296',
    description: 'New Mexico\'s only foundation dedicated solely to improving health and advancing health equity statewide. Funds 501(c)(3) nonprofits working with marginalized, rural, immigrant, and low-income communities across all 33 NM counties.',
    website_url: 'https://www.conalma.org/',
    grants_page_url: 'https://www.conalma.org/grant-making',
    phone: '(505) 797-8990',
    email: null,
    min_grant: 15000,
    max_grant: 150000,
    annual_giving: 3000000,
    accepts_unsolicited: true,
    sectors: ['health-human-services', 'indigenous-communities', 'immigration-refugee'],
    backfill_grant_slugs: [
      'con-alma-health-foundation-annual-grants',
      'con-alma-health-foundation-multi-year-grants',
    ],
  },
  {
    slug: 'albuquerque-community-foundation',
    name: 'Albuquerque Community Foundation',
    funder_type: 'community_foundation',
    region_code: 'albuquerque_metro',
    funds_statewide: false,
    funds_national: false,
    year_founded: 1981,
    ein: '85-0295444',
    description: 'Serving the Greater Albuquerque Metropolitan Area, the Albuquerque Community Foundation administers competitive grant cycles and donor-advised funds across seven fields of interest: animal welfare, arts & culture, education, environment & historic preservation, economic & workforce development, human services, and health.',
    website_url: 'https://abqcf.org/',
    grants_page_url: 'https://abqcf.org/grants/',
    phone: '(505) 883-6240',
    email: null,
    min_grant: 5000,
    max_grant: 20000,
    annual_giving: 10000000,
    accepts_unsolicited: true,
    sectors: ['arts-culture', 'education-youth', 'health-human-services', 'economic-development', 'environment-conservation', 'animal-welfare'],
    backfill_grant_slugs: [
      'albuquerque-community-foundation-annual-grant-cycle',
      'albuquerque-community-foundation-need-to-know-grants',
    ],
  },
  {
    slug: 'santa-fe-community-foundation',
    name: 'Santa Fe Community Foundation',
    funder_type: 'community_foundation',
    region_code: 'northern_nm',
    funds_statewide: false,
    funds_national: false,
    year_founded: 1981,
    ein: '85-0285919',
    description: 'Serving Santa Fe, Mora, Rio Arriba, and San Miguel counties, the Santa Fe Community Foundation administers competitive grants, donor-advised funds, and special-purpose funds including the Envision Fund (LGBTQ+ focused), Native American Advised Fund, and Santa Fe Baby Fund.',
    website_url: 'https://www.santafecf.org/',
    grants_page_url: 'https://www.santafecf.org/nonprofits/grantseekers',
    phone: '(505) 988-9715',
    email: null,
    min_grant: 500,
    max_grant: 20000,
    annual_giving: 10000000,
    accepts_unsolicited: true,
    sectors: ['arts-culture', 'education-youth', 'environment-conservation', 'animal-welfare', 'health-human-services', 'indigenous-communities'],
    backfill_grant_slugs: ['santa-fe-community-foundation-fall-2026-community-grants'],
  },
  {
    slug: 'new-mexico-community-foundation',
    name: 'New Mexico Community Foundation',
    funder_type: 'community_foundation',
    region_code: 'statewide',
    funds_statewide: true,
    funds_national: false,
    year_founded: 1983,
    ein: '85-0313797',
    description: 'One of the largest community foundations in New Mexico, NMCF administers regional funds, the Sustaining New Mexico Fund, and the Tribal Futures Fund. Strong focus on rural communities, northeastern New Mexico health, and Indigenous-led organizations.',
    website_url: 'https://newmexicofoundation.org/',
    grants_page_url: 'https://newmexicofoundation.org/we-build-and-fund/grants/',
    phone: '(505) 820-6860',
    email: null,
    min_grant: null,
    max_grant: 40000,
    annual_giving: 5000000,
    accepts_unsolicited: true,
    sectors: ['health-human-services', 'education-youth', 'environment-conservation', 'economic-development', 'indigenous-communities', 'civic-engagement'],
    backfill_grant_slugs: [
      'new-mexico-community-foundation-northeastern-regional-health-fund',
      'new-mexico-community-foundation-sustaining-new-mexico-fund',
      'new-mexico-community-foundation-tribal-futures-fund',
    ],
  },
  {
    slug: 'mccune-charitable-foundation',
    name: 'McCune Charitable Foundation',
    funder_type: 'private_foundation',
    region_code: 'statewide',
    funds_statewide: true,
    funds_national: false,
    year_founded: 1990,
    ein: '85-0398372',
    description: 'One of New Mexico\'s largest private foundations, McCune funds nonprofits, tribal nations, public schools, and government agencies across health, education, arts, environment, economic development, and rural development. Known for its trust-based, relationship-oriented approach.',
    website_url: 'https://nmmccune.org/',
    grants_page_url: 'https://nmmccune.org/apply/',
    phone: '(505) 983-8300',
    email: null,
    min_grant: null,
    max_grant: 15000,
    annual_giving: 6000000,
    accepts_unsolicited: true,
    sectors: ['health-human-services', 'education-youth', 'arts-culture', 'environment-conservation', 'economic-development', 'indigenous-communities'],
    backfill_grant_slugs: ['mccune-charitable-foundation-2027-grant-cycle'],
  },
  {
    slug: 'community-foundation-of-southern-nm',
    name: 'Community Foundation of Southern New Mexico',
    funder_type: 'community_foundation',
    region_code: 'southern_nm',
    funds_statewide: false,
    funds_national: false,
    year_founded: 2003,
    ein: '85-0478558',
    description: 'Serving 12 counties of southern New Mexico, CFSNM administers competitive grants including the Devasthali Family Foundation Grant (arts, education, child hunger) and the Wellness Fund (maternal and child health). Also administers the LGBTQIA+ Grant.',
    website_url: 'https://www.communityfoundationofsouthernnewmexico.org/',
    grants_page_url: 'https://www.communityfoundationofsouthernnewmexico.org/apply-for-a-grant/',
    phone: '(575) 521-4794',
    email: null,
    min_grant: 500,
    max_grant: 10000,
    annual_giving: 1000000,
    accepts_unsolicited: true,
    sectors: ['arts-culture', 'education-youth', 'health-human-services', 'food-agriculture', 'civic-engagement'],
    backfill_grant_slugs: [
      'community-foundation-of-southern-nm--devasthali-family-foundation-grant',
      'community-foundation-of-southern-nm--wellness-fund-grant',
    ],
  },
  {
    slug: 'gila-community-foundation',
    name: 'Gila Community Foundation',
    funder_type: 'community_foundation',
    region_code: 'southern_nm',
    funds_statewide: false,
    funds_national: false,
    year_founded: 2004,
    ein: null,
    description: 'Grant City-based community foundation serving Grant, Hidalgo, Luna, and Doña Ana counties in the Gila/southwest corner of New Mexico. Awards the Southline Grant to nonprofits, faith-based organizations, and public entities for education, health, social services, arts, and community development.',
    website_url: 'https://gilacf.org/',
    grants_page_url: 'https://gilacf.org/grants/',
    phone: '(575) 538-2558',
    email: null,
    min_grant: null,
    max_grant: null,
    annual_giving: null,
    accepts_unsolicited: true,
    sectors: ['health-human-services', 'education-youth', 'arts-culture', 'economic-development'],
    backfill_grant_slugs: ['gila-community-foundation-southline-grant'],
  },
  {
    slug: 'taos-community-foundation',
    name: 'Taos Community Foundation',
    funder_type: 'community_foundation',
    region_code: 'northern_nm',
    funds_statewide: false,
    funds_national: false,
    year_founded: 1994,
    ein: '85-0425060',
    description: 'Serving Taos County and western Colfax County, the Taos Community Foundation awards annual Impact Grants across animal welfare, arts & culture, basic needs, community advocacy, environmental sustainability, health, education, and youth development.',
    website_url: 'https://www.taoscf.org/',
    grants_page_url: 'https://www.taoscf.org/grants/impact/',
    phone: '(575) 737-9300',
    email: null,
    min_grant: 2000,
    max_grant: 5000,
    annual_giving: null,
    accepts_unsolicited: true,
    sectors: ['arts-culture', 'health-human-services', 'education-youth', 'environment-conservation', 'animal-welfare', 'civic-engagement'],
    backfill_grant_slugs: ['taos-community-foundation-impact-grants'],
  },
  {
    slug: 'las-vegas-nm-community-foundation',
    name: 'Las Vegas NM Community Foundation',
    funder_type: 'community_foundation',
    region_code: 'northern_nm',
    funds_statewide: false,
    funds_national: false,
    year_founded: 2022,
    ein: null,
    description: 'Established through Anchorum Health Foundation\'s $25 million investment in northern New Mexico, the Las Vegas NM Community Foundation awards grants to organizations serving San Miguel and Mora counties. Focuses on health outcomes and social determinants including food security, housing, and transportation.',
    website_url: 'https://www.lvnmcf.com/',
    grants_page_url: 'https://www.lvnmcf.com/grants/',
    phone: null,
    email: null,
    min_grant: null,
    max_grant: null,
    annual_giving: null,
    accepts_unsolicited: true,
    sectors: ['health-human-services', 'food-agriculture', 'housing-homelessness'],
    backfill_grant_slugs: ['las-vegas-nm-community-foundation-health--wellness-grant'],
  },
  {
    slug: 'pnm-tnmp-foundation',
    name: 'PNM/TNMP Foundation',
    funder_type: 'corporate_foundation',
    region_code: 'statewide',
    funds_statewide: true,
    funds_national: false,
    year_founded: null,
    ein: null,
    description: 'Corporate foundation of PNM Resources (New Mexico\'s largest electric utility) awarding more than $1 million annually to New Mexico nonprofits in education, environmental stewardship, and economic vitality. Uses a trust-based philanthropy approach with targeted and flexible support.',
    website_url: 'https://www.pnm.com/community-giving',
    grants_page_url: 'https://www.pnm.com/apply-for-grant',
    phone: null,
    email: null,
    min_grant: null,
    max_grant: null,
    annual_giving: 1000000,
    accepts_unsolicited: true,
    sectors: ['education-youth', 'environment-conservation', 'economic-development'],
    backfill_grant_slugs: ['pnmtnmp-foundation-power-grant'],
  },
  {
    slug: 'anchorum-health-foundation',
    name: 'Anchorum Health Foundation',
    funder_type: 'private_foundation',
    region_code: 'northern_nm',
    funds_statewide: false,
    funds_national: false,
    year_founded: 2021,
    ein: '87-2186742',
    description: 'Santa Fe-based health conversion foundation created to improve health and well-being in northern New Mexico, with a focus on San Miguel and Mora counties. Committed a $25 million investment in the Las Vegas NM Community Foundation and funds health equity and social determinant initiatives region-wide.',
    website_url: 'https://www.anchorumhf.org/',
    grants_page_url: 'https://www.anchorumhf.org/grants',
    phone: '(505) 989-3336',
    email: null,
    min_grant: null,
    max_grant: null,
    annual_giving: 3000000,
    accepts_unsolicited: false,
    sectors: ['health-human-services'],
    backfill_grant_slugs: [],
  },
  {
    slug: 'aarp-foundation',
    name: 'AARP Foundation',
    funder_type: 'private_foundation',
    region_code: null,
    funds_statewide: true,
    funds_national: true,
    year_founded: 1963,
    ein: '52-0794300',
    description: 'National charitable affiliate of AARP. The Community Challenge grant program funds quick-action projects nationwide, including in New Mexico, that create vibrant, livable communities for people of all ages by improving public spaces, transportation, housing, digital inclusion, and disaster resilience.',
    website_url: 'https://www.aarp.org/livable-communities/community-challenge/',
    grants_page_url: 'https://www.aarp.org/livable-communities/community-challenge/',
    phone: null,
    email: null,
    min_grant: 250,
    max_grant: 15000,
    annual_giving: null,
    accepts_unsolicited: true,
    sectors: ['civic-engagement', 'housing-homelessness', 'health-human-services', 'economic-development'],
    backfill_grant_slugs: ['aarp-community-challenge-grants--new-mexico'],
  },
  {
    slug: 'walmart-foundation',
    name: 'Walmart Foundation',
    funder_type: 'corporate_foundation',
    region_code: null,
    funds_statewide: true,
    funds_national: true,
    year_founded: 1979,
    ein: '13-3441466',
    description: 'Corporate foundation of Walmart Inc. The Spark Good Local Grants program provides community grants of $250–$5,000 to nonprofits and public entities near Walmart and Sam\'s Club locations, focused on economic opportunity, food and textile waste reduction, and community resilience.',
    website_url: 'https://walmart.org/',
    grants_page_url: 'https://walmart.com/nonprofits',
    phone: null,
    email: null,
    min_grant: 250,
    max_grant: 5000,
    annual_giving: null,
    accepts_unsolicited: true,
    sectors: ['food-agriculture', 'economic-development', 'health-human-services', 'environment-conservation'],
    backfill_grant_slugs: ['walmart-spark-good-local-grants'],
  },
  {
    slug: 'usda-rural-development-nm',
    name: 'USDA Rural Development: New Mexico',
    funder_type: 'federal_pass_through',
    region_code: 'statewide',
    funds_statewide: true,
    funds_national: false,
    year_founded: 1994,
    ein: null,
    description: 'USDA Rural Development\'s New Mexico state office administers federal grants and loans for rural economic development, infrastructure, housing, utilities, and business creation. The Rural Business Development Grant program is one of several programs available to nonprofits and tribal entities in rural New Mexico.',
    website_url: 'https://www.rd.usda.gov/nm',
    grants_page_url: 'https://www.rd.usda.gov/programs-services/business-programs/rural-business-development-grants',
    phone: '(505) 761-4950',
    email: null,
    min_grant: null,
    max_grant: null,
    annual_giving: null,
    accepts_unsolicited: true,
    sectors: ['economic-development', 'indigenous-communities', 'food-agriculture', 'housing-homelessness'],
    backfill_grant_slugs: ['usda-rural-business-development-grants--new-mexico'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SEED RUNNER
// ─────────────────────────────────────────────────────────────────────────────
async function seedFunders() {
  console.log(`Seeding ${FUNDERS.length} funders…\n`);

  const sectorRows = await sql<{ id: number; slug: string }[]>`SELECT id, slug FROM sectors`;
  const sectorMap = new Map(sectorRows.map((r) => [r.slug, r.id]));

  let upserted = 0;

  for (const funder of FUNDERS) {
    const [row] = await sql<{ id: number }[]>`
      INSERT INTO funders (
        slug, name, funder_type,
        region_code, funds_statewide, funds_national,
        year_founded, ein,
        description, website_url, grants_page_url,
        phone, email,
        min_grant, max_grant, annual_giving,
        accepts_unsolicited,
        status, is_verified
      ) VALUES (
        ${funder.slug},
        ${funder.name},
        ${funder.funder_type}::funder_type,
        ${funder.region_code}::nm_region,
        ${funder.funds_statewide},
        ${funder.funds_national},
        ${funder.year_founded},
        ${funder.ein},
        ${funder.description},
        ${funder.website_url},
        ${funder.grants_page_url},
        ${funder.phone},
        ${funder.email},
        ${funder.min_grant},
        ${funder.max_grant},
        ${funder.annual_giving},
        ${funder.accepts_unsolicited},
        'approved',
        true
      )
      ON CONFLICT (slug) DO UPDATE SET
        name                = EXCLUDED.name,
        funder_type         = EXCLUDED.funder_type,
        region_code         = EXCLUDED.region_code,
        funds_statewide     = EXCLUDED.funds_statewide,
        funds_national      = EXCLUDED.funds_national,
        year_founded        = EXCLUDED.year_founded,
        ein                 = EXCLUDED.ein,
        description         = EXCLUDED.description,
        website_url         = EXCLUDED.website_url,
        grants_page_url     = EXCLUDED.grants_page_url,
        phone               = EXCLUDED.phone,
        email               = EXCLUDED.email,
        min_grant           = EXCLUDED.min_grant,
        max_grant           = EXCLUDED.max_grant,
        annual_giving       = EXCLUDED.annual_giving,
        accepts_unsolicited = EXCLUDED.accepts_unsolicited,
        status              = EXCLUDED.status,
        is_verified         = EXCLUDED.is_verified,
        updated_at          = now()
      RETURNING id
    `;

    const funderId = row.id;

    await sql`DELETE FROM funder_sectors WHERE funder_id = ${funderId}`;
    for (const sectorSlug of funder.sectors) {
      const sectorId = sectorMap.get(sectorSlug);
      if (!sectorId) {
        console.warn(`  WARN  unknown sector "${sectorSlug}" for "${funder.name}"`);
        continue;
      }
      await sql`
        INSERT INTO funder_sectors (funder_id, sector_id)
        VALUES (${funderId}, ${sectorId})
        ON CONFLICT DO NOTHING
      `;
    }

    // Backfill funder_id on linked grants
    for (const grantSlug of funder.backfill_grant_slugs) {
      await sql`UPDATE grants SET funder_id = ${funderId} WHERE slug = ${grantSlug}`;
    }

    console.log(`  ok    [${String(funderId).padStart(3)}] ${funder.name}`);
    upserted++;
  }

  console.log(`\nDone. ${upserted} funders upserted.`);
}

seedFunders().catch((err) => {
  console.error(err);
  process.exit(1);
});

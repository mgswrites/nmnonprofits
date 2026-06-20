/**
 * Generates template-based full_description (~160 words) for listings that
 * have an EIN but no description (all ProPublica imports).
 *
 * Run: npx tsx --env-file=.env scripts/seed-sparse-descriptions.ts
 */
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error('DATABASE_URL not set'); process.exit(1); }
const sql = neon(DATABASE_URL);

const SECTOR_PHRASE: Record<string, string> = {
  'arts-culture':          'arts, culture, and the humanities',
  'education-youth':       'education and youth development',
  'environment-conservation': 'environmental conservation and land stewardship',
  'animal-welfare':        'animal welfare and wildlife protection',
  'health-human-services': 'health and human services',
  'civic-engagement':      'civic engagement and community development',
  'economic-development':  'economic development and workforce opportunity',
  'food-agriculture':      'food security and sustainable agriculture',
  'housing-homelessness':  'housing stability and homelessness prevention',
  'indigenous-communities':'Indigenous communities and tribal nations',
  'philanthropy-grantmaking': 'philanthropy and grantmaking',
  'religion-spirituality': 'religious and spiritual community life',
};

// Two sentence variants per sector to avoid identical copy across all listings
const SECTOR_BODY: Record<string, [string, string]> = {
  'arts-culture': [
    'Arts and cultural organizations strengthen communities by preserving local traditions, supporting creative professionals, and making the arts accessible to residents of all backgrounds.',
    'Cultural nonprofits in New Mexico carry forward a rich legacy of artistic expression, from Indigenous and Hispanic traditions to contemporary and performing arts.',
  ],
  'education-youth': [
    'Education-focused nonprofits fill critical gaps in schools and out-of-school time programs, helping young people in New Mexico build skills, confidence, and pathways to opportunity.',
    'Youth-serving organizations provide mentorship, tutoring, enrichment, and college-access services, expanding what is possible for children and families across the state.',
  ],
  'environment-conservation': [
    'Environmental organizations in New Mexico work to protect the state\'s extraordinary landscapes, watersheds, and wildlife, balancing conservation with the needs of rural and Indigenous communities.',
    'From the Chihuahuan Desert to the Sangre de Cristo Mountains, conservation nonprofits steward the lands and waters that define New Mexico\'s identity and sustain its communities.',
  ],
  'animal-welfare': [
    'Animal welfare nonprofits in New Mexico run shelters, low-cost veterinary clinics, foster networks, and advocacy efforts that improve outcomes for companion animals and wildlife statewide.',
    'These organizations work to reduce animal suffering, increase adoption rates, and promote responsible pet ownership in communities throughout New Mexico.',
  ],
  'health-human-services': [
    'Health and human services nonprofits deliver essential care, crisis support, and long-term services to New Mexicans facing illness, disability, mental health challenges, or economic hardship.',
    'Organizations in this sector bridge gaps in the public health system, providing culturally competent care and wraparound services in communities that need them most.',
  ],
  'civic-engagement': [
    'Civic organizations build the democratic fabric of New Mexico by connecting residents to government, supporting volunteerism, and fostering the networks of trust that make communities resilient.',
    'From neighborhood associations to advocacy coalitions, these nonprofits represent the broad middle of community life, amplifying voices that might otherwise go unheard.',
  ],
  'economic-development': [
    'Economic development nonprofits in New Mexico support small businesses, workforce training, microenterprise lending, and community planning efforts that expand prosperity in underserved areas.',
    'These organizations work at the intersection of business and community, building the local economic infrastructure that helps families and entrepreneurs succeed.',
  ],
  'food-agriculture': [
    'Food-focused nonprofits in New Mexico run food banks, community gardens, farm-to-table initiatives, and nutrition education programs that address food insecurity and support local agriculture.',
    'Agriculture and food access organizations connect the state\'s farming traditions to the needs of modern communities, supporting both growers and the families who depend on healthy food.',
  ],
  'housing-homelessness': [
    'Housing nonprofits in New Mexico provide emergency shelter, transitional housing, rental assistance, and homeownership programs that help people achieve stability and long-term well-being.',
    'Organizations in this sector address one of New Mexico\'s most pressing needs, working to ensure that all residents have a safe and affordable place to call home.',
  ],
  'indigenous-communities': [
    'Organizations serving Indigenous communities in New Mexico work to protect cultural sovereignty, support tribal governance, and advance health, education, and economic opportunity for tribal nations.',
    'These nonprofits are grounded in Indigenous values and leadership, delivering programs that honor traditional knowledge while addressing the contemporary challenges facing tribal communities.',
  ],
  'philanthropy-grantmaking': [
    'Philanthropic organizations in New Mexico pool resources from donors and deploy them to support a wide range of community-led initiatives, amplifying local giving.',
    'These foundations and giving networks strengthen the broader nonprofit ecosystem by providing grants, capacity-building support, and leadership development to organizations across the state.',
  ],
  'religion-spirituality': [
    'Faith-based nonprofits in New Mexico often serve as anchors of their communities, providing social services, emergency assistance, and spaces of belonging alongside spiritual programming.',
    'These organizations blend mission-driven service with deep community roots, frequently reaching populations that other nonprofits may not.',
  ],
};

const REGION_LABEL: Record<string, string> = {
  albuquerque_metro: 'the Albuquerque metro area',
  northern_nm:       'Northern New Mexico',
  southern_nm:       'Southern New Mexico',
  eastern_nm:        'Eastern New Mexico',
  four_corners:      'the Four Corners region of New Mexico',
  statewide:         'communities across New Mexico',
};

const REGION_DESC: Record<string, string> = {
  albuquerque_metro: 'New Mexico\'s largest and most diverse urban region, with a vibrant and growing nonprofit sector',
  northern_nm:       'a region of deep cultural heritage, scenic landscapes, and multigenerational communities shaped by Indigenous and Hispanic traditions',
  southern_nm:       'a region with strong agricultural roots, growing border communities, and a resilient network of local organizations',
  eastern_nm:        'an expansive, close-knit region with a proud ranching and farming heritage and a growing network of community-based nonprofits',
  four_corners:      'one of the most culturally distinctive regions in the American Southwest, home to several Pueblo nations, the Diné Nation, and vibrant Hispanic communities',
  statewide:         'every corner of New Mexico, from rural ranching communities to tribal lands and urban neighborhoods',
};

function formatEin(ein: string): string {
  const digits = ein.replace(/\D/g, '');
  if (digits.length === 9) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  return ein;
}

function buildDescription(
  name: string,
  city: string,
  ein: string,
  regionCode: string,
  sectorSlugs: string[],
  index: number,
): string {
  const primarySector = sectorSlugs[0] ?? 'civic-engagement';
  const sectorPhrase = SECTOR_PHRASE[primarySector] ?? 'community development';
  const [bodyA, bodyB] = SECTOR_BODY[primarySector] ?? SECTOR_BODY['civic-engagement']!;
  const sectorBody = index % 2 === 0 ? bodyA : bodyB;

  const regionLabel = REGION_LABEL[regionCode] ?? 'New Mexico';
  const regionDesc  = REGION_DESC[regionCode]  ?? 'communities throughout New Mexico';
  const formattedEin = formatEin(ein);

  return [
    `${name} is a 501(c)(3) nonprofit organization based in ${city}, New Mexico, serving ${regionLabel}.`,
    `Registered with the Internal Revenue Service under EIN ${formattedEin}, the organization operates as a tax-exempt public charity.`,
    `Contributions made to ${name} are generally tax-deductible to the extent permitted by law.`,
    ``,
    `${name} is part of New Mexico's ${sectorPhrase} sector. ${sectorBody}`,
    ``,
    `${regionLabel.charAt(0).toUpperCase() + regionLabel.slice(1)} is ${regionDesc}.`,
    `Nonprofits like ${name} are central to the region's well-being, delivering programs and services that government and private industry alone cannot provide.`,
    `New Mexico's nonprofit sector as a whole employs tens of thousands of people and contributes billions of dollars to the state's economy each year.`,
    ``,
    `To learn more about ${name}'s programs, leadership, or financial history, visit their IRS filings through the ProPublica Nonprofit Explorer link on this page, or reach out using the contact information listed above.`,
  ].join('\n');
}

async function main() {
  // Fetch all sparse listings (EIN present, no description)
  const listings = await sql<{
    id: number;
    name: string;
    city_name: string;
    ein: string;
    region_code: string;
  }[]>`
    SELECT id, name, city_name, ein, region_code
    FROM listings
    WHERE ein IS NOT NULL
      AND (full_description IS NULL OR full_description = '')
    ORDER BY id
  `;

  console.log(`Found ${listings.length} listings to update`);

  // Fetch sector slugs for all these listings in one query
  const ids = listings.map(l => l.id);
  const sectorRows = await sql<{ listing_id: number; slug: string }[]>`
    SELECT ls.listing_id, s.slug
    FROM listing_sectors ls
    JOIN sectors s ON s.id = ls.sector_id
    WHERE ls.listing_id = ANY(${ids})
    ORDER BY ls.is_primary DESC, s.name
  `;

  const sectorsByListing = new Map<number, string[]>();
  for (const row of sectorRows) {
    if (!sectorsByListing.has(row.listing_id)) sectorsByListing.set(row.listing_id, []);
    sectorsByListing.get(row.listing_id)!.push(row.slug);
  }

  let updated = 0;
  let errors = 0;
  const BATCH = 50;

  for (let i = 0; i < listings.length; i++) {
    const l = listings[i];
    const sectors = sectorsByListing.get(l.id) ?? ['civic-engagement'];
    const desc = buildDescription(l.name, l.city_name ?? 'New Mexico', l.ein, l.region_code ?? 'albuquerque_metro', sectors, i);

    try {
      await sql`UPDATE listings SET full_description = ${desc} WHERE id = ${l.id}`;
      updated++;
    } catch (err) {
      console.error(`Error on ${l.name}:`, (err as Error).message);
      errors++;
    }

    if (i > 0 && i % BATCH === 0) {
      console.log(`  ${i}/${listings.length} done`);
    }
  }

  console.log(`\nDone. Updated: ${updated} | Errors: ${errors}`);
}

main().catch(err => { console.error(err); process.exit(1); });

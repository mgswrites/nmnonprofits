import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error('ERROR: DATABASE_URL not set'); process.exit(1); }
const sql = neon(DATABASE_URL);

const SECTORS = [
  {
    slug: 'animal-welfare',
    meta_title: 'Animal Welfare Nonprofits in New Mexico | NM Nonprofits',
    meta_description: 'Find animal welfare nonprofits in New Mexico including humane societies, shelters, spay-neuter coalitions, and wildlife rehabilitation centers.',
  },
  {
    slug: 'arts-culture',
    meta_title: 'Arts and Culture Nonprofits in New Mexico | NM Nonprofits',
    meta_description: 'Explore New Mexico arts and culture nonprofits across Santa Fe, Albuquerque, Taos, and beyond. From Indigenous arts to contemporary galleries.',
  },
  {
    slug: 'civic-engagement',
    meta_title: 'Civic Engagement Nonprofits in New Mexico | NM Nonprofits',
    meta_description: 'Find civic engagement and advocacy nonprofits in New Mexico working on voting rights, policy advocacy, and community organizing.',
  },
  {
    slug: 'economic-development',
    meta_title: 'Economic Development Nonprofits in New Mexico | NM Nonprofits',
    meta_description: 'Browse economic development nonprofits in New Mexico: CDFIs, small business support, workforce development, and rural economic organizations.',
  },
  {
    slug: 'education-youth',
    meta_title: 'Education and Youth Nonprofits in New Mexico | NM Nonprofits',
    meta_description: 'Find education and youth nonprofits in New Mexico working on early childhood, K-12 success, after-school programs, and college access.',
  },
  {
    slug: 'environment-conservation',
    meta_title: 'Environment and Conservation Nonprofits in New Mexico | NM Nonprofits',
    meta_description: 'Browse environmental nonprofits in New Mexico working on water rights, land conservation, climate resilience, and environmental justice.',
  },
  {
    slug: 'food-agriculture',
    meta_title: 'Food and Agriculture Nonprofits in New Mexico | NM Nonprofits',
    meta_description: 'Find food access, farmers markets, food banks, and agricultural nonprofits in New Mexico supporting food sovereignty and local food systems.',
  },
  {
    slug: 'health-human-services',
    meta_title: 'Health and Human Services Nonprofits in New Mexico | NM Nonprofits',
    meta_description: 'Browse health and human services nonprofits in New Mexico: community health centers, mental health providers, social services, and more.',
  },
  {
    slug: 'housing-homelessness',
    meta_title: 'Housing and Homelessness Nonprofits in New Mexico | NM Nonprofits',
    meta_description: 'Find affordable housing and homelessness nonprofits in New Mexico: shelters, permanent supportive housing, homeownership programs, and housing development.',
  },
  {
    slug: 'immigration-refugee',
    meta_title: 'Immigration and Refugee Nonprofits in New Mexico | NM Nonprofits',
    meta_description: 'Browse immigration legal aid, refugee resettlement, and immigrant advocacy nonprofits in New Mexico.',
  },
  {
    slug: 'indigenous-communities',
    meta_title: 'Indigenous Community Nonprofits in New Mexico | NM Nonprofits',
    meta_description: 'Find nonprofits serving Indigenous communities in New Mexico, including Pueblo nations, Navajo Nation, and Apache tribes.',
  },
  {
    slug: 'substance-use-recovery',
    meta_title: 'Substance Use and Recovery Nonprofits in New Mexico | NM Nonprofits',
    meta_description: 'Browse substance use prevention, harm reduction, treatment, and recovery support nonprofits in New Mexico.',
  },
];

async function main() {
  for (const s of SECTORS) {
    await sql`
      UPDATE sectors
      SET meta_title = ${s.meta_title}, meta_description = ${s.meta_description}
      WHERE slug = ${s.slug}
    `;
    console.log('updated', s.slug);
  }
  console.log('\nDone.');
}

main().catch(e => { console.error(e); process.exit(1); });

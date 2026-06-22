import { getDb } from './db';
import type {
  Listing, ListingCard, Funder, Grant, GrantCard,
  Sector, SectorSummary, City, Region, Post, NmRegion,
  JobCard, JobPosting,
} from './types';

// ----------------------------------------------------------------
// Sectors
// ----------------------------------------------------------------

export async function getAllSectors(): Promise<Sector[]> {
  const sql = getDb();
  return sql<Sector[]>`SELECT * FROM sectors ORDER BY name`;
}

export async function getSectorSummaries(): Promise<SectorSummary[]> {
  const sql = getDb();
  return sql<SectorSummary[]>`SELECT * FROM sector_summary ORDER BY name`;
}

export async function getSectorBySlug(slug: string): Promise<Sector | null> {
  const sql = getDb();
  const rows = await sql<Sector[]>`SELECT * FROM sectors WHERE slug = ${slug} LIMIT 1`;
  return rows[0] ?? null;
}

// ----------------------------------------------------------------
// Geography
// ----------------------------------------------------------------

export async function getAllCities(): Promise<City[]> {
  const sql = getDb();
  return sql<City[]>`SELECT * FROM cities ORDER BY name`;
}

export async function getCitiesWithOrgs(): Promise<City[]> {
  const sql = getDb();
  return sql<City[]>`
    SELECT c.*, COUNT(l.id)::int AS org_count
    FROM cities c
    JOIN listings l ON l.city_id = c.id AND l.status = 'approved' AND l.deleted_at IS NULL
    GROUP BY c.id
    HAVING COUNT(l.id) > 0
    ORDER BY COUNT(l.id) DESC, c.name
  `;
}

export async function getCityBySlug(slug: string): Promise<City | null> {
  const sql = getDb();
  const rows = await sql<City[]>`SELECT * FROM cities WHERE slug = ${slug} LIMIT 1`;
  return rows[0] ?? null;
}

export async function getAllRegions(): Promise<Region[]> {
  const sql = getDb();
  return sql<Region[]>`SELECT * FROM regions ORDER BY name`;
}

const REGION_PAGE_SLUGS: Record<string, string> = {
  albuquerque_metro: 'albuquerque-metro',
  northern_nm:       'northern-new-mexico',
  southern_nm:       'southern-new-mexico',
  four_corners:      'four-corners',
  eastern_nm:        'eastern-new-mexico',
};

export interface RegionSummary {
  code: string;
  name: string;
  pageSlug: string;
  org_count: number;
}

export async function getRegionSummaries(): Promise<RegionSummary[]> {
  const sql = getDb();
  const rows = await sql<{ code: string; name: string; org_count: number }[]>`
    SELECT r.code, r.name, COUNT(l.id)::int AS org_count
    FROM regions r
    LEFT JOIN listings l
      ON l.region_code = r.code
      AND l.status = 'approved'
      AND l.deleted_at IS NULL
    WHERE r.code != 'statewide'
    GROUP BY r.code, r.name
    ORDER BY org_count DESC
  `;
  return rows.map(r => ({ ...r, pageSlug: REGION_PAGE_SLUGS[r.code] ?? r.code }));
}

// ----------------------------------------------------------------
// Listings
// ----------------------------------------------------------------

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const sql = getDb();
  const rows = await sql<Listing[]>`
    SELECT * FROM listings
    WHERE slug = ${slug} AND deleted_at IS NULL AND status = 'approved'
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function getListingCards(opts: {
  q?: string;
  sectorSlug?: string;
  citySlug?: string;
  regionCode?: NmRegion;
  limit?: number;
  offset?: number;
}): Promise<ListingCard[]> {
  const sql = getDb();
  const { q, sectorSlug, citySlug, regionCode, limit = 100, offset = 0 } = opts;
  const search = q ? `%${q}%` : null;

  return sql<ListingCard[]>`
    SELECT
      l.id, l.slug, l.name, l.mission, l.city_name, l.region_code,
      l.logo_url, l.tier, l.is_verified,
      COALESCE(
        json_agg(
          json_build_object('id', s.id, 'name', s.name, 'slug', s.slug)
        ) FILTER (WHERE s.id IS NOT NULL),
        '[]'
      ) AS sectors
    FROM listings l
    LEFT JOIN listing_sectors ls ON ls.listing_id = l.id
    LEFT JOIN sectors s          ON s.id = ls.sector_id
    LEFT JOIN cities c           ON c.id = l.city_id
    WHERE l.deleted_at IS NULL
      AND l.status = 'approved'
      AND (${search}::text IS NULL OR l.name ILIKE ${search} OR l.mission ILIKE ${search})
      AND (${sectorSlug ?? null}::text IS NULL OR s.slug = ${sectorSlug ?? null})
      AND (${citySlug   ?? null}::text IS NULL OR c.slug = ${citySlug   ?? null})
      AND (${regionCode ?? null}::text IS NULL OR l.region_code::text = ${regionCode ?? null})
    GROUP BY l.id
    ORDER BY l.tier DESC, l.is_verified DESC, l.name
    LIMIT  ${limit}
    OFFSET ${offset}
  `;
}

export async function getFeaturedListings(limit = 6): Promise<ListingCard[]> {
  return getListingCards({ limit });
}

export async function getRelatedListings(opts: {
  listingId: number;
  cityName: string | null;
  regionCode: NmRegion | null;
  limit?: number;
}): Promise<ListingCard[]> {
  const sql = getDb();
  const { listingId, cityName, regionCode, limit = 6 } = opts;

  // Prefer same city; fall back to same region
  const byCityOrRegion = cityName
    ? sql`(l.city_name = ${cityName} OR l.region_code::text = ${regionCode ?? null})`
    : sql`l.region_code::text = ${regionCode ?? null}`;

  return sql<ListingCard[]>`
    SELECT
      l.id, l.slug, l.name, l.mission, l.city_name, l.region_code,
      l.logo_url, l.tier, l.is_verified,
      COALESCE(
        json_agg(json_build_object('id', s.id, 'name', s.name, 'slug', s.slug))
        FILTER (WHERE s.id IS NOT NULL),
        '[]'
      ) AS sectors
    FROM listings l
    LEFT JOIN listing_sectors ls ON ls.listing_id = l.id
    LEFT JOIN sectors s          ON s.id = ls.sector_id
    WHERE l.deleted_at IS NULL
      AND l.status = 'approved'
      AND l.id != ${listingId}
      AND ${byCityOrRegion}
    GROUP BY l.id
    ORDER BY l.city_name = ${cityName ?? ''} DESC, l.tier DESC, l.is_verified DESC, RANDOM()
    LIMIT ${limit}
  `;
}

// ----------------------------------------------------------------
// Funders
// ----------------------------------------------------------------

export async function getFunderBySlug(slug: string): Promise<Funder | null> {
  const sql = getDb();
  const rows = await sql<Funder[]>`
    SELECT * FROM funders
    WHERE slug = ${slug} AND deleted_at IS NULL AND status = 'approved'
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function getFunders(opts: {
  sectorSlug?: string;
  regionCode?: NmRegion;
  limit?: number;
  offset?: number;
} = {}): Promise<Funder[]> {
  const sql = getDb();
  const { sectorSlug, regionCode, limit = 24, offset = 0 } = opts;
  return sql<Funder[]>`
    SELECT DISTINCT f.*
    FROM funders f
    LEFT JOIN funder_sectors fs ON fs.funder_id = f.id
    LEFT JOIN sectors s         ON s.id = fs.sector_id
    WHERE f.deleted_at IS NULL
      AND f.status = 'approved'
      AND (${sectorSlug  ?? null}::text IS NULL OR s.slug = ${sectorSlug  ?? null})
      AND (${regionCode  ?? null}::text IS NULL OR f.region_code::text = ${regionCode  ?? null} OR f.funds_statewide = true)
    ORDER BY f.tier DESC, f.is_verified DESC, f.name
    LIMIT  ${limit}
    OFFSET ${offset}
  `;
}

// ----------------------------------------------------------------
// Grants
// ----------------------------------------------------------------

export async function getGrantBySlug(slug: string): Promise<Grant | null> {
  const sql = getDb();
  const rows = await sql<Grant[]>`
    SELECT * FROM grants WHERE slug = ${slug} AND deleted_at IS NULL LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function getGrantCards(opts: {
  sectorSlug?: string;
  regionCode?: NmRegion;
  status?: 'open' | 'rolling';
  funderId?: number;
  limit?: number;
  offset?: number;
} = {}): Promise<GrantCard[]> {
  const sql = getDb();
  const { sectorSlug, regionCode, status, funderId, limit = 24, offset = 0 } = opts;
  return sql<GrantCard[]>`
    SELECT
      g.id, g.slug, g.title, g.deadline_date, g.status,
      g.min_amount, g.max_amount,
      f.name AS funder_name, f.slug AS funder_slug,
      COALESCE(
        json_agg(
          json_build_object('id', s.id, 'name', s.name, 'slug', s.slug)
        ) FILTER (WHERE s.id IS NOT NULL),
        '[]'
      ) AS sectors
    FROM grants g
    LEFT JOIN funders f       ON f.id = g.funder_id
    LEFT JOIN grant_sectors gs ON gs.grant_id = g.id
    LEFT JOIN sectors s       ON s.id = gs.sector_id
    WHERE g.deleted_at IS NULL
      AND (${status      ?? null}::text IS NULL OR g.status::text = ${status      ?? null})
      AND (${sectorSlug  ?? null}::text IS NULL OR s.slug   = ${sectorSlug  ?? null})
      AND (${funderId    ?? null}::int  IS NULL OR g.funder_id   = ${funderId  ?? null})
      AND (${regionCode  ?? null}::text IS NULL
           OR ${regionCode ?? null} = ANY(g.eligible_regions)
           OR g.serves_statewide = true)
    GROUP BY g.id, f.name, f.slug
    ORDER BY g.deadline_date ASC NULLS LAST
    LIMIT  ${limit}
    OFFSET ${offset}
  `;
}

export async function getOpenGrants(limit = 6): Promise<GrantCard[]> {
  return getGrantCards({ status: 'open', limit });
}

// ----------------------------------------------------------------
// Editorial posts
// ----------------------------------------------------------------

export async function getPublishedPosts(limit = 10): Promise<Post[]> {
  const sql = getDb();
  return sql<Post[]>`
    SELECT * FROM posts
    WHERE is_published = true AND published_at <= now()
    ORDER BY published_at DESC
    LIMIT ${limit}
  `;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const sql = getDb();
  const rows = await sql<Post[]>`
    SELECT * FROM posts WHERE slug = ${slug} AND is_published = true LIMIT 1
  `;
  return rows[0] ?? null;
}

// ----------------------------------------------------------------
// Jobs
// ----------------------------------------------------------------

export async function getJobCards({ jobType, regionCode, limit = 50, offset = 0 }: {
  jobType?: string;
  regionCode?: string;
  limit?: number;
  offset?: number;
} = {}): Promise<JobCard[]> {
  const sql = getDb();
  const jt = jobType || null;
  const rc = regionCode || null;
  return sql<JobCard[]>`
    SELECT
      j.id, j.slug, j.title, j.org_name,
      l.slug AS listing_slug,
      j.city_name, j.region_code, j.job_type,
      j.salary_min, j.salary_max, j.salary_note,
      j.deadline, j.created_at
    FROM job_postings j
    LEFT JOIN listings l ON l.id = j.listing_id AND l.deleted_at IS NULL
    WHERE j.deleted_at IS NULL
      AND j.status = 'approved'
      AND (${jt}::text IS NULL OR j.job_type = ${jt})
      AND (${rc}::text IS NULL OR j.region_code = ${rc})
    ORDER BY j.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;
}

export async function getJobBySlug(slug: string): Promise<JobPosting | null> {
  const sql = getDb();
  const rows = await sql<JobPosting[]>`
    SELECT * FROM job_postings
    WHERE slug = ${slug} AND deleted_at IS NULL AND status = 'approved'
    LIMIT 1
  `;
  return rows[0] ?? null;
}

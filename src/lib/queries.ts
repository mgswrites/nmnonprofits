import { getDb } from './db';
import type {
  Listing, ListingCard, Funder, Grant, GrantCard,
  Sector, SectorSummary, City, Region, Post, NmRegion,
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
  return sql<City[]>`SELECT * FROM cities WHERE org_count > 0 ORDER BY org_count DESC, name`;
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

import { getDb } from './db';

// Slug lists used by getStaticPaths() so public content pages are generated
// once at build time instead of querying the database on every visit.
// Filters match the visibility rules in queries.ts (getXBySlug).

export async function listingSlugs(): Promise<string[]> {
  const sql = getDb();
  const rows = await sql<{ slug: string }[]>`
    SELECT slug FROM listings WHERE deleted_at IS NULL AND status = 'approved'
  `;
  return rows.map(r => r.slug);
}

export async function funderSlugs(): Promise<string[]> {
  const sql = getDb();
  const rows = await sql<{ slug: string }[]>`
    SELECT slug FROM funders WHERE deleted_at IS NULL AND status = 'approved'
  `;
  return rows.map(r => r.slug);
}

export async function citySlugs(): Promise<string[]> {
  const sql = getDb();
  const rows = await sql<{ slug: string }[]>`SELECT slug FROM cities`;
  return rows.map(r => r.slug);
}

export async function sectorSlugs(): Promise<string[]> {
  const sql = getDb();
  const rows = await sql<{ slug: string }[]>`SELECT slug FROM sectors`;
  return rows.map(r => r.slug);
}

export async function postSlugs(): Promise<string[]> {
  const sql = getDb();
  const rows = await sql<{ slug: string }[]>`SELECT slug FROM posts WHERE is_published = true`;
  return rows.map(r => r.slug);
}

export async function resourceSlugs(): Promise<string[]> {
  const sql = getDb();
  const rows = await sql<{ slug: string }[]>`SELECT slug FROM resources WHERE is_published = true`;
  return rows.map(r => r.slug);
}

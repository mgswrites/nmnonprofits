export const prerender = false;

import type { APIRoute } from 'astro';
import { getDb } from '../../../../../lib/db';

function toSlug(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export const POST: APIRoute = async ({ params, redirect }) => {
  const id = Number(params.id);
  if (!id) return new Response('Bad request', { status: 400 });

  const sql = getDb();

  const [sub] = await sql<{
    id: number; name: string; org_type: string; region_code: string; city_name: string;
    website_url: string | null; ein: string | null; mission: string | null;
    logo_url: string | null; sectors: string[];
  }[]>`SELECT * FROM listing_submissions WHERE id = ${id} LIMIT 1`;

  if (!sub) return new Response('Not found', { status: 404 });

  // Generate unique slug
  const baseSlug = toSlug(sub.name);
  let slug = baseSlug;
  const [existing] = await sql<{ slug: string }[]>`SELECT slug FROM listings WHERE slug = ${slug} LIMIT 1`;
  if (existing) slug = `${baseSlug}-${toSlug(sub.city_name)}`;
  const [existing2] = await sql<{ slug: string }[]>`SELECT slug FROM listings WHERE slug = ${slug} LIMIT 1`;
  if (existing2) slug = `${baseSlug}-${id}`;

  // Find city_id if possible
  const [city] = await sql<{ id: number }[]>`
    SELECT id FROM cities WHERE LOWER(name) = LOWER(${sub.city_name}) LIMIT 1
  `;

  const [listing] = await sql<{ id: number }[]>`
    INSERT INTO listings (
      slug, name, org_type, region_code, city_id, city_name,
      website_url, ein, mission, logo_url, status, is_verified
    ) VALUES (
      ${slug}, ${sub.name}, ${sub.org_type}, ${sub.region_code},
      ${city?.id ?? null}, ${sub.city_name},
      ${sub.website_url ?? null}, ${sub.ein ?? null}, ${sub.mission ?? null},
      ${sub.logo_url ?? null}, 'approved', false
    )
    RETURNING id
  `;

  // Link sectors
  if (sub.sectors?.length > 0) {
    const sectorRows = await sql<{ id: number; slug: string }[]>`SELECT id, slug FROM sectors`;
    const sectorMap = new Map(sectorRows.map(s => [s.slug, s.id]));
    for (let i = 0; i < sub.sectors.length; i++) {
      const sid = sectorMap.get(sub.sectors[i]);
      if (sid) {
        await sql`
          INSERT INTO listing_sectors (listing_id, sector_id, is_primary)
          VALUES (${listing.id}, ${sid}, ${i === 0})
          ON CONFLICT DO NOTHING
        `;
      }
    }
  }

  // Mark submission approved
  await sql`
    UPDATE listing_submissions
    SET status = 'approved', reviewed_at = now(), created_listing_id = ${listing.id}
    WHERE id = ${id}
  `;

  return redirect('/admin/submissions/', 303);
};

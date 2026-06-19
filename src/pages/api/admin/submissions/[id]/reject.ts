export const prerender = false;

import type { APIRoute } from 'astro';
import { getDb } from '../../../../../lib/db';

export const POST: APIRoute = async ({ params, redirect }) => {
  const id = Number(params.id);
  if (!id) return new Response('Bad request', { status: 400 });

  const sql = getDb();
  await sql`
    UPDATE listing_submissions
    SET status = 'rejected', reviewed_at = now()
    WHERE id = ${id}
  `;

  return redirect('/admin/submissions/', 303);
};

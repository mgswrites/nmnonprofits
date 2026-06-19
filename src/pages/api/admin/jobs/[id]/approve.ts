export const prerender = false;

import type { APIRoute } from 'astro';
import { getDb } from '../../../../../lib/db';

export const POST: APIRoute = async ({ params, redirect }) => {
  const id = Number(params.id);
  if (!id) return new Response('Bad request', { status: 400 });

  const sql = getDb();
  await sql`
    UPDATE job_postings
    SET status = 'approved', updated_at = now()
    WHERE id = ${id}
  `;

  return redirect('/admin/jobs/', 303);
};

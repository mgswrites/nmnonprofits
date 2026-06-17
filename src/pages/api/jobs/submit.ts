export const prerender = false;

import type { APIRoute } from 'astro';
import { getDb } from '../../../lib/db';

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const f = await request.formData();

  const title          = (f.get('title') as string)?.trim();
  const org_name       = (f.get('org_name') as string)?.trim();
  const job_type       = (f.get('job_type') as string) ?? 'full_time';
  const city_name      = (f.get('city_name') as string)?.trim();
  const region_code    = (f.get('region_code') as string)?.trim();
  const submitter_email = (f.get('submitter_email') as string)?.trim();

  if (!title || !org_name || !city_name || !submitter_email) {
    return new Response('Missing required fields', { status: 400 });
  }

  const salary_min_raw = f.get('salary_min') as string;
  const salary_max_raw = f.get('salary_max') as string;
  const salary_min = salary_min_raw ? parseInt(salary_min_raw) || null : null;
  const salary_max = salary_max_raw ? parseInt(salary_max_raw) || null : null;

  const deadline_raw = f.get('deadline') as string;
  const deadline = deadline_raw || null;

  // Unique slug: title-orgname-timestamp
  const base = `${toSlug(title)}-${toSlug(org_name)}`;
  const slug = `${base}-${Date.now().toString(36)}`;

  const sql = getDb();

  await sql`
    INSERT INTO job_postings (
      slug, title, org_name, job_type,
      city_name, region_code,
      salary_min, salary_max, salary_note,
      description, how_to_apply,
      application_url, contact_email,
      deadline, submitter_email,
      status
    ) VALUES (
      ${slug}, ${title}, ${org_name}, ${job_type},
      ${city_name}, ${region_code || null},
      ${salary_min}, ${salary_max}, ${(f.get('salary_note') as string) || null},
      ${(f.get('description') as string) || null},
      ${(f.get('how_to_apply') as string) || null},
      ${(f.get('application_url') as string) || null},
      ${(f.get('contact_email') as string) || null},
      ${deadline}, ${submitter_email},
      'pending'
    )
  `;

  return redirect('/jobs/submit/confirm/', 303);
};

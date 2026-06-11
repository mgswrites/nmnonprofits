export const prerender = false;

import type { APIRoute } from 'astro';
import { getDb } from '../../lib/db';
import type { ListingSubmissionPayload } from '../../lib/types';

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();

  const payload: ListingSubmissionPayload = {
    name:            formData.get('name')           as string,
    org_type:        formData.get('org_type')        as ListingSubmissionPayload['org_type'],
    region_code:     formData.get('region_code')     as ListingSubmissionPayload['region_code'],
    city_name:       formData.get('city_name')       as string,
    website_url:     formData.get('website_url')     as string | undefined ?? undefined,
    ein:             formData.get('ein')             as string | undefined ?? undefined,
    mission:         formData.get('mission')         as string | undefined ?? undefined,
    submitter_name:  formData.get('submitter_name')  as string | undefined ?? undefined,
    submitter_email: formData.get('submitter_email') as string,
    submitter_note:  formData.get('submitter_note')  as string | undefined ?? undefined,
    sectors:         formData.getAll('sectors')      as string[],
  };

  // Basic validation
  if (!payload.name || !payload.city_name || !payload.submitter_email) {
    return new Response('Missing required fields', { status: 400 });
  }

  const sql = getDb();

  await sql`
    INSERT INTO listing_submissions (
      name, org_type, region_code, city_name,
      website_url, ein, mission, sectors,
      submitter_name, submitter_email, submitter_note
    ) VALUES (
      ${payload.name},
      ${payload.org_type},
      ${payload.region_code},
      ${payload.city_name},
      ${payload.website_url ?? null},
      ${payload.ein ?? null},
      ${payload.mission ?? null},
      ${payload.sectors},
      ${payload.submitter_name ?? null},
      ${payload.submitter_email},
      ${payload.submitter_note ?? null}
    )
  `;

  return redirect('/submit/confirm/', 303);
};

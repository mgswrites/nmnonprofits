export const prerender = false;

import type { APIRoute } from 'astro';
import { getDb } from '../../lib/db';
import { put } from '@vercel/blob';
import { Resend } from 'resend';
import type { ListingSubmissionPayload } from '../../lib/types';

async function sendAdminNotification(name: string, city: string, submitterEmail: string, note?: string) {
  const key = import.meta.env.RESEND_API_KEY;
  if (!key || key.startsWith('re_...')) return;
  const resend = new Resend(key);
  await resend.emails.send({
    from: 'NM Nonprofits <noreply@nmnonprofits.com>',
    to: 'mgswrites@gmail.com',
    subject: `New submission: ${name}`,
    text: [
      `A new organization has been submitted to NM Nonprofits.`,
      ``,
      `Organization: ${name}`,
      `City: ${city}`,
      `Submitted by: ${submitterEmail}`,
      note ? `Note: ${note}` : '',
      ``,
      `Review at: https://nmnonprofits.com/admin/submissions/`,
    ].filter(l => l !== undefined).join('\n'),
  });
}

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

  if (!payload.name || !payload.city_name || !payload.submitter_email) {
    return new Response('Missing required fields', { status: 400 });
  }

  // Handle optional logo upload
  let logo_url: string | null = null;
  const logoFile = formData.get('logo_file') as File | null;
  if (logoFile && logoFile.size > 0) {
    if (logoFile.size > 5 * 1024 * 1024) {
      return new Response('Image must be 5 MB or smaller', { status: 400 });
    }
    const ext = logoFile.name.split('.').pop()?.toLowerCase() ?? 'jpg';
    const safeName = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
    const filename = `submissions/${safeName}-${Date.now()}.${ext}`;
    const blob = await put(filename, logoFile, { access: 'public' });
    logo_url = blob.url;
  }

  const sql = getDb();

  await sql`
    INSERT INTO listing_submissions (
      name, org_type, region_code, city_name,
      website_url, ein, mission, sectors,
      submitter_name, submitter_email, submitter_note,
      logo_url
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
      ${payload.submitter_note ?? null},
      ${logo_url}
    )
  `;

  // Fire-and-forget — never block the redirect on email delivery
  sendAdminNotification(payload.name, payload.city_name, payload.submitter_email, payload.submitter_note).catch(() => {});

  return redirect('/submit/confirm/', 303);
};

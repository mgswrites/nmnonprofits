export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const email = (data.get('email') as string)?.trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 });
  }

  const key = import.meta.env.RESEND_API_KEY;
  if (!key || key.startsWith('re_...')) {
    // Resend not configured — acknowledge gracefully
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  const resend = new Resend(key);

  // Add to Resend audience (create one in Resend dashboard and paste the ID here)
  const audienceId = import.meta.env.RESEND_AUDIENCE_ID ?? '';
  if (audienceId) {
    await resend.contacts.create({
      audienceId,
      email,
      unsubscribed: false,
    });
  }

  // Notify admin
  await resend.emails.send({
    from: 'NM Nonprofits <noreply@nmnonprofits.com>',
    to: 'mgswrites@gmail.com',
    subject: 'New newsletter subscriber',
    text: `${email} subscribed to the NM Nonprofits newsletter.`,
  }).catch(() => {});

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};

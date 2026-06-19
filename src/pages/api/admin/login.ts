export const prerender = false;

import type { APIRoute } from 'astro';

async function tokenFor(password: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const password = form.get('password') as string;
  const adminPassword = import.meta.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return redirect('/admin/login/?error=1', 303);
  }

  const token = await tokenFor(adminPassword);
  cookies.set('admin_tok', token, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
  });

  return redirect('/admin/', 303);
};

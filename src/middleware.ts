import { defineMiddleware } from 'astro:middleware';

const COOKIE = 'admin_tok';

async function tokenFor(password: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export const onRequest = defineMiddleware(async (ctx, next) => {
  if (!ctx.url.pathname.startsWith('/admin')) return next();

  const password = import.meta.env.ADMIN_PASSWORD;
  if (!password) return new Response('ADMIN_PASSWORD not set', { status: 500 });

  // Allow login page through
  if (ctx.url.pathname === '/admin/login/' || ctx.url.pathname === '/admin/login') {
    return next();
  }

  const cookie = ctx.cookies.get(COOKIE)?.value;
  const expected = await tokenFor(password);

  if (cookie !== expected) {
    return ctx.redirect('/admin/login/');
  }

  return next();
});

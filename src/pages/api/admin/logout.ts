export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete('admin_tok', { path: '/' });
  return redirect('/admin/login/', 303);
};

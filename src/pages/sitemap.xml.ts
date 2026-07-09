export const prerender = false;

import type { APIRoute } from 'astro';
import { getDb } from '../lib/db';

const SITE = 'https://nmnonprofits.com';

const STATIC_PAGES = [
  { url: '/',                              priority: '1.0', changefreq: 'daily'   },
  { url: '/nonprofits/',                   priority: '0.9', changefreq: 'daily'   },
  { url: '/funders/',                      priority: '0.8', changefreq: 'weekly'  },
  { url: '/grants/',                       priority: '0.8', changefreq: 'daily'   },
  { url: '/jobs/',                         priority: '0.8', changefreq: 'daily'   },
  { url: '/sectors/',                      priority: '0.7', changefreq: 'monthly' },
  { url: '/guides/',                       priority: '0.6', changefreq: 'weekly'  },
  { url: '/regions/albuquerque-metro/',    priority: '0.7', changefreq: 'weekly'  },
  { url: '/regions/northern-new-mexico/',  priority: '0.7', changefreq: 'weekly'  },
  { url: '/regions/southern-new-mexico/',  priority: '0.7', changefreq: 'weekly'  },
  { url: '/regions/four-corners/',         priority: '0.7', changefreq: 'weekly'  },
  { url: '/regions/eastern-new-mexico/',   priority: '0.7', changefreq: 'weekly'  },
  { url: '/about/',                        priority: '0.4', changefreq: 'monthly' },
  { url: '/contact/',                      priority: '0.3', changefreq: 'monthly' },
  { url: '/privacy/',                      priority: '0.2', changefreq: 'yearly'  },
  { url: '/terms/',                        priority: '0.2', changefreq: 'yearly'  },
];

function entry(url: string, priority: string, changefreq: string, lastmod?: string) {
  return `  <url>
    <loc>${SITE}${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
  </url>`;
}

export const GET: APIRoute = async () => {
  const sql = getDb();

  const [listings, jobs, cities, sectors, funders, guides] = await Promise.all([
    sql<{ slug: string; updated_at: string }[]>`
      SELECT slug, updated_at FROM listings
      WHERE status = 'approved' AND deleted_at IS NULL
        AND mission IS NOT NULL AND mission <> ''
      ORDER BY slug`,
    sql<{ slug: string; updated_at: string }[]>`
      SELECT slug, updated_at FROM job_postings
      WHERE status = 'approved' AND deleted_at IS NULL
      ORDER BY slug`,
    sql<{ slug: string }[]>`
      SELECT DISTINCT c.slug FROM cities c
      INNER JOIN listings l ON l.city_id = c.id
      WHERE l.status = 'approved' AND l.deleted_at IS NULL
      ORDER BY c.slug`,
    sql<{ slug: string }[]>`SELECT slug FROM sectors ORDER BY slug`,
    sql<{ slug: string; updated_at: string }[]>`
      SELECT slug, updated_at FROM funders
      WHERE deleted_at IS NULL
      ORDER BY slug`,
    sql<{ slug: string; updated_at: string }[]>`
      SELECT slug, updated_at FROM posts
      WHERE is_published = true
      ORDER BY slug`,
  ]);

  const entries = [
    ...STATIC_PAGES.map(p => entry(p.url, p.priority, p.changefreq)),
    ...listings.map(r => entry(`/listing/${r.slug}/`, '0.7', 'monthly',
      r.updated_at ? new Date(r.updated_at).toISOString().slice(0, 10) : undefined)),
    ...jobs.map(r => entry(`/jobs/${r.slug}/`, '0.6', 'weekly',
      r.updated_at ? new Date(r.updated_at).toISOString().slice(0, 10) : undefined)),
    ...cities.map(r => entry(`/cities/${r.slug}/`, '0.6', 'monthly')),
    ...sectors.map(r => entry(`/sectors/${r.slug}/`, '0.5', 'weekly')),
    ...funders.map(r => entry(`/funders/${r.slug}/`, '0.6', 'monthly',
      r.updated_at ? new Date(r.updated_at).toISOString().slice(0, 10) : undefined)),
    ...guides.map(r => entry(`/guides/${r.slug}/`, '0.6', 'weekly',
      r.updated_at ? new Date(r.updated_at).toISOString().slice(0, 10) : undefined)),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

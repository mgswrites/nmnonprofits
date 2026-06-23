/**
 * Replaces template-generated full_description on ProPublica-imported listings
 * with unique AI-written descriptions via Claude Haiku.
 *
 * Run: npx tsx --env-file=.env scripts/gen-ai-descriptions.ts
 */
import Anthropic from '@anthropic-ai/sdk';
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!DATABASE_URL) { console.error('DATABASE_URL not set'); process.exit(1); }
if (!ANTHROPIC_API_KEY) { console.error('ANTHROPIC_API_KEY not set'); process.exit(1); }

const sql = neon(DATABASE_URL);
const ai = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

async function generateDescription(
  name: string,
  city: string,
  ein: string,
  region: string,
  sectors: string[],
): Promise<string> {
  const regionLabel: Record<string, string> = {
    albuquerque_metro: 'the Albuquerque metro area',
    northern_nm: 'Northern New Mexico',
    southern_nm: 'Southern New Mexico',
    eastern_nm: 'Eastern New Mexico',
    four_corners: 'the Four Corners region of New Mexico',
    statewide: 'communities statewide',
  };

  const prompt = `Write a directory listing description for this New Mexico nonprofit. Target length: 175 to 210 words. You must write at least 170 words.

Organization: ${name}
City: ${city}, New Mexico
Region: ${regionLabel[region] ?? 'New Mexico'}
Issue areas: ${sectors.join(', ')}
EIN: ${ein}
Tax status: 501(c)(3) public charity

Structure (four paragraphs, each 2–3 sentences):
1. Introduce the organization — name, city, region, and the issue area it works in.
2. Explain why this type of work matters specifically in New Mexico (use regional context, not invented facts about this org).
3. Note the 501(c)(3) status and that donations are tax-deductible. Add one sentence about the value of community support for nonprofits like this one.
4. Close by inviting visitors to learn more, reach out, or get involved.

Do not invent programs, staff names, founding dates, or impact numbers. Do not use em dashes.`;

  const msg = await ai.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 400,
    system: 'You write plain prose directory listings. No markdown. No headers. No bullet points. No bold or italic text. No em dashes. Write in flowing paragraphs only.',
    messages: [{ role: 'user', content: prompt }],
  });

  const text = msg.content[0].type === 'text' ? msg.content[0].text.trim() : '';
  return text;
}

async function main() {
  // Regenerate all ProPublica-imported listings (have EIN, no mission, short description)
  const listings = await sql<{
    id: number; name: string; city_name: string; ein: string; region_code: string;
  }[]>`
    SELECT id, name, city_name, ein, region_code
    FROM listings
    WHERE ein IS NOT NULL
      AND (mission IS NULL OR mission = '')
      AND char_length(full_description) < 900
    ORDER BY id
  `;

  console.log(`Found ${listings.length} listings to regenerate`);

  // Fetch sector slugs for all these listings
  const ids = listings.map(l => l.id);
  const sectorRows = await sql<{ listing_id: number; slug: string }[]>`
    SELECT ls.listing_id, s.slug
    FROM listing_sectors ls
    JOIN sectors s ON s.id = ls.sector_id
    WHERE ls.listing_id = ANY(${ids})
    ORDER BY ls.is_primary DESC
  `;
  const sectorsByListing = new Map<number, string[]>();
  for (const r of sectorRows) {
    if (!sectorsByListing.has(r.listing_id)) sectorsByListing.set(r.listing_id, []);
    sectorsByListing.get(r.listing_id)!.push(r.slug.replace(/-/g, ' '));
  }

  let done = 0;
  let errors = 0;
  const CONCURRENCY = 5;

  for (let i = 0; i < listings.length; i += CONCURRENCY) {
    const batch = listings.slice(i, i + CONCURRENCY);

    await Promise.all(batch.map(async (l) => {
      const sectors = sectorsByListing.get(l.id) ?? ['community development'];
      try {
        const desc = await generateDescription(
          l.name,
          l.city_name ?? 'New Mexico',
          l.ein,
          l.region_code ?? 'albuquerque_metro',
          sectors,
        );
        if (desc.length > 50) {
          await sql`UPDATE listings SET full_description = ${desc} WHERE id = ${l.id}`;
          done++;
        } else {
          console.warn(`  Short response for ${l.name}: "${desc}"`);
          errors++;
        }
      } catch (err) {
        console.error(`  Error on ${l.name}:`, (err as Error).message);
        errors++;
      }
    }));

    if (i % 100 === 0 && i > 0) {
      console.log(`  ${done}/${listings.length} done`);
    }

    // Small pause between batches to respect rate limits
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\nDone. Generated: ${done} | Errors: ${errors}`);
}

main().catch(err => { console.error(err); process.exit(1); });

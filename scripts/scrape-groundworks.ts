import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const LIST_FILE = '/Users/laresistenciapress/.claude/projects/-Users-laresistenciapress-southwest-galleries/912fb9f2-bf55-48de-bb0a-b8c4dbf2c95b/tool-results/toolu_01Lk8RXhnSvn9Z8a4sLvykdt.txt';
const OUTPUT_FILE = join(import.meta.dirname, 'groundworks-data.json');
const CONCURRENCY = 8;
const DELAY_MS = 300;

function cfDecode(encoded: string): string {
  const key = parseInt(encoded.slice(0, 2), 16);
  let email = '';
  for (let n = 2; n < encoded.length; n += 2) {
    email += String.fromCharCode(parseInt(encoded.slice(n, n + 2), 16) ^ key);
  }
  return email;
}

function extractField(html: string, cssClass: string): string {
  const re = new RegExp(`views-field-${cssClass}[^>]*>[\\s\\S]*?<span class="views-label[^"]*">[^<]*<\\/span>[\\s\\S]*?<(?:span|div) class="field-content">([\s\S]*?)<\/(?:span|div)>\\s*<\/div>`, 'i');
  const m = html.match(re);
  if (!m) return '';
  return m[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').trim();
}

function extractFieldRaw(html: string, fieldPart: string): string {
  // More targeted extractor using views-label pattern
  const re = new RegExp(
    `class="views-label[^"]*">[^<]*<\/span>\\s*<(?:span|div)[^>]*class="field-content">([\s\S]*?)<\/(?:span|div)>\\s*<\/div>`,
    'gi'
  );
  const labelRe = new RegExp(`views-field-${fieldPart}`, 'i');
  // Find the block containing this field
  const blockRe = new RegExp(
    `<div class="views-field views-field-${fieldPart}"[^>]*>([\\s\\S]*?)<\\/div>\\s*(?=<div|$)`,
    'i'
  );
  const block = html.match(blockRe);
  if (!block) return '';
  const content = block[1].match(/<(?:span|div)[^>]*class="field-content">([\s\S]*?)<\/(?:span|div)>/i);
  if (!content) return '';
  return content[1]
    .replace(/<p>/gi, '').replace(/<\/p>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function parseHtml(html: string, orgId: string, listCity: string) {
  // Name
  const nameM = html.match(/<h1 class="page__title title"[^>]*>([\s\S]*?)<\/h1>/i);
  const name = nameM ? nameM[1].replace(/<[^>]+>/g, '').trim() : '';

  // Address
  const addrM = html.match(/views-field-postal-code[\s\S]*?field-content">([\s\S]*?)<\/span>/i);
  const address = addrM ? addrM[1].replace(/<[^>]+>/g, '').trim() : '';

  // County
  const countyM = html.match(/views-field-county-of-location[\s\S]*?field-content">([\s\S]*?)<\/span>/i);
  const county = countyM ? countyM[1].replace(/<[^>]+>/g, '').trim() : '';

  // Phone
  const phoneM = html.match(/views-field-phone[\s\S]*?field-content">([\s\S]*?)<\/span>/i);
  const phone = phoneM ? phoneM[1].replace(/<[^>]+>/g, '').trim() : '';

  // Email (Cloudflare obfuscated)
  const emailM = html.match(/data-cfemail="([a-f0-9]+)"/i);
  const email = emailM ? cfDecode(emailM[1]) : '';

  // Website
  const websiteM = html.match(/views-field-url[\s\S]*?href="([^"]+)"[^>]*>/i);
  const website = websiteM ? websiteM[1].trim() : '';

  // NTEE code
  const nteeM = html.match(/views-field-ntee-code[\s\S]*?field-content">([\s\S]*?)<\/span>/i);
  const ntee = nteeM ? nteeM[1].replace(/<[^>]+>/g, '').trim() : '';

  // Mission
  const missionM = html.match(/views-field-mission[\s\S]*?field-content">([\s\S]*?)<\/div>\s*<\/div>/i);
  const mission = missionM
    ? missionM[1].replace(/<p>/gi, '').replace(/<\/p>/gi, ' ').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').trim()
    : '';

  // Programs
  const programsM = html.match(/views-field-programs[\s\S]*?field-content">([\s\S]*?)<\/div>\s*<\/div>/i);
  const programs = programsM
    ? programsM[1].replace(/<p>/gi, '').replace(/<\/p>/gi, '\n').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/\n{3,}/g, '\n\n').trim()
    : '';

  // Year founded
  const yearM = html.match(/views-field-year-founded[\s\S]*?field-content">([\s\S]*?)<\/div>\s*<\/div>/i);
  const yearFounded = yearM ? yearM[1].replace(/<[^>]+>/g, '').trim() : '';

  // Annual budget
  const budgetM = html.match(/views-field-annual-budget[\s\S]*?field-content">([\s\S]*?)<\/span>/i);
  const annualBudget = budgetM ? budgetM[1].replace(/<[^>]+>/g, '').trim() : '';

  // Executive director
  const edM = html.match(/views-field-executive-director[\s\S]*?field-content">([\s\S]*?)<\/span>/i);
  const executiveDirector = edM ? edM[1].replace(/<[^>]+>/g, '').trim() : '';

  // Parse city/state/zip from address
  let city = listCity.trim();
  let state = 'NM';
  let zip = '';
  const addrParts = address.match(/,\s*([^,]+),\s*([A-Z]{2})\s+(\d{5}(?:-\d{4})?)?\s*$/);
  if (addrParts) {
    if (!city) city = addrParts[1].trim();
    state = addrParts[2].trim();
    zip = addrParts[3]?.trim() ?? '';
  }

  // Format phone
  const phoneDigits = phone.replace(/\D/g, '');
  const phoneFormatted = phoneDigits.length === 10
    ? `(${phoneDigits.slice(0,3)}) ${phoneDigits.slice(3,6)}-${phoneDigits.slice(6)}`
    : phone;

  return {
    id: orgId,
    name,
    address,
    city,
    state,
    zip,
    county,
    phone: phoneFormatted,
    email,
    website,
    ntee,
    mission,
    programs,
    year_founded: yearFounded ? parseInt(yearFounded) || null : null,
    annual_budget: annualBudget,
    executive_director: executiveDirector,
  };
}

async function fetchWithRetry(url: string, retries = 3): Promise<string | null> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NMNonprofits-Directory-Scraper)' },
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) return null;
      return await res.text();
    } catch {
      if (i < retries - 1) await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
  return null;
}

async function main() {
  // Parse the list file
  const listRaw = readFileSync(LIST_FILE, 'utf-8');
  const entries: { id: string; listCity: string }[] = [];
  for (const line of listRaw.split('\n')) {
    const m = line.match(/\/nonprofit-directory\/nonprofit\/(\d+)\s*\|\s*(.*)?$/);
    if (m) entries.push({ id: m[1], listCity: (m[2] ?? '').trim() });
  }
  console.log(`Total entries: ${entries.length}`);

  // Load existing data if resuming
  let existing: Record<string, unknown>[] = [];
  const doneIds = new Set<string>();
  if (existsSync(OUTPUT_FILE)) {
    existing = JSON.parse(readFileSync(OUTPUT_FILE, 'utf-8'));
    for (const r of existing) doneIds.add((r as { id: string }).id);
    console.log(`Resuming: ${doneIds.size} already done`);
  }

  const results: Record<string, unknown>[] = [...existing];
  const todo = entries.filter(e => !doneIds.has(e.id));
  console.log(`Remaining: ${todo.length}`);

  // Process in batches
  let done = 0;
  for (let i = 0; i < todo.length; i += CONCURRENCY) {
    const batch = todo.slice(i, i + CONCURRENCY);
    const fetched = await Promise.all(
      batch.map(async ({ id, listCity }) => {
        const url = `https://www.groundworksnm.org/nonprofit-directory/nonprofit/${id}`;
        const html = await fetchWithRetry(url);
        if (!html) { console.log(`  FAIL  ${id}`); return null; }
        return parseHtml(html, id, listCity);
      })
    );
    for (const r of fetched) {
      if (r) { results.push(r); done++; }
    }
    // Save progress every batch
    writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
    console.log(`  [${done}/${todo.length}] batch ${Math.floor(i/CONCURRENCY)+1} done`);
    if (i + CONCURRENCY < todo.length) await new Promise(r => setTimeout(r, DELAY_MS));
  }

  console.log(`\nComplete: ${results.length} orgs saved to ${OUTPUT_FILE}`);

  // Summary
  const nm = results.filter((r: any) => r.state === 'NM' || !r.state);
  const withWebsite = results.filter((r: any) => r.website);
  const withMission = results.filter((r: any) => r.mission);
  console.log(`NM-based: ${nm.length} | With website: ${withWebsite.length} | With mission: ${withMission.length}`);
}

main().catch(e => { console.error(e); process.exit(1); });

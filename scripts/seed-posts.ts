/**
 * Seeds editorial guides/posts.
 * Safe to re-run — uses ON CONFLICT DO UPDATE on slug.
 *
 * Usage: npm run db:seed-posts
 */
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL is not set.');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

interface PostSeed {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  hero_image_url: string | null;
  author_name: string;
  published_at: string;
  meta_title: string | null;
  meta_description: string | null;
}

const POSTS: PostSeed[] = [
  {
    slug: 'what-is-a-donor-advised-fund',
    title: 'What Is a Donor-Advised Fund — and How Can Your Nonprofit Benefit?',
    excerpt: 'Donor-advised funds (DAFs) are one of the fastest-growing vehicles for charitable giving in the U.S. Here is what New Mexico nonprofits need to know to attract and steward DAF dollars.',
    hero_image_url: '/images/guides-daf.jpg',
    author_name: 'NM Nonprofits Editorial',
    published_at: '2026-06-12T12:00:00Z',
    meta_title: 'Donor-Advised Funds for NM Nonprofits | NM Nonprofits Guide',
    meta_description: 'Learn how donor-advised funds (DAFs) work, why they matter, and how New Mexico nonprofits can attract and steward DAF gifts.',
    content: `
<h2>What Is a Donor-Advised Fund?</h2>
<p>A donor-advised fund (DAF) is a charitable giving account sponsored by a public charity. A donor makes an irrevocable, tax-deductible contribution — cash, stock, real estate, or other assets — into the account, receives an immediate tax deduction, and then recommends grants to nonprofit organizations over time.</p>
<p>Think of it as a personal charitable savings account: the money goes in when the donor is ready to give, and the grants go out to nonprofits when the donor decides where they want to make an impact.</p>

<h2>Why DAFs Matter for New Mexico Nonprofits</h2>
<p>DAFs have become the fastest-growing charitable giving vehicle in the United States. According to the National Philanthropic Trust, Americans hold more than <strong>$229 billion</strong> in donor-advised funds — and that number grows every year. In New Mexico, community foundations including the Albuquerque Community Foundation, the Santa Fe Community Foundation, and the New Mexico Community Foundation all offer DAF programs to local donors.</p>
<p>For nonprofits, DAFs represent a massive and underleveraged source of funding. Many organizations focus their fundraising efforts on direct asks, events, and foundation grants — but DAF donors are actively looking to give. They have already committed the money to charity. Your job is simply to make sure they know about you.</p>

<h2>How Donor-Advised Funds Work</h2>
<ol>
  <li><strong>Donor opens an account</strong> with a DAF sponsor — either a community foundation (like the Santa Fe Community Foundation) or a national financial institution (like Fidelity Charitable, Schwab Charitable, or Vanguard Charitable).</li>
  <li><strong>Donor contributes assets</strong> — cash, appreciated stock, mutual funds, or other property — and takes a tax deduction in the year of the contribution.</li>
  <li><strong>The DAF sponsor invests the assets</strong>, often allowing the balance to grow tax-free.</li>
  <li><strong>Donor recommends grants</strong> to IRS-recognized 501(c)(3) public charities, including your organization. The sponsor vets the recommendation and sends the check.</li>
</ol>
<p>The key detail: the grant arrives from the DAF sponsor (e.g., "Fidelity Charitable Gift Fund"), not directly from the individual donor. The donor's name may or may not appear on the grant letter, depending on their preference.</p>

<h2>New Mexico Community Foundations That Offer DAFs</h2>
<p>If your donors work with a local community foundation, the relationship can be especially valuable — community foundation staff often advise donors on where to give locally.</p>
<ul>
  <li><strong>Albuquerque Community Foundation</strong> — serves Greater Albuquerque; donors include many longtime ABQ philanthropists</li>
  <li><strong>Santa Fe Community Foundation</strong> — serves northern New Mexico; includes the Envision Fund (LGBTQ+ focus) and Native American Advised Fund</li>
  <li><strong>New Mexico Community Foundation</strong> — statewide with strong rural and tribal focus</li>
  <li><strong>Taos Community Foundation</strong> — serves Taos and western Colfax County</li>
  <li><strong>Community Foundation of Southern NM</strong> — serves 12 counties in southern New Mexico</li>
</ul>
<p>Cultivating relationships with program officers at these foundations can put your organization on their radar when they advise donors.</p>

<h2>How to Position Your Nonprofit to Receive DAF Gifts</h2>
<p>Receiving a DAF grant requires no special application. Any IRS-recognized 501(c)(3) in good standing is eligible. But there are concrete steps you can take to increase your share of DAF dollars.</p>

<h3>1. Make sure your EIN is current on GuideStar / Candid</h3>
<p>DAF sponsors verify your nonprofit's status before approving a grant. If your GuideStar (now Candid) profile is outdated or your organization doesn't appear in their database, the grant may be delayed or denied. Claim your Candid profile and keep it current with financials, leadership, and a clear mission statement.</p>

<h3>2. Add a DAF-specific option to your donation page</h3>
<p>Many donors do not know they can make a DAF gift directly through your website. Add language like: <em>"You can also give through your donor-advised fund. Search for [Your Organization Name] using our EIN: [XX-XXXXXXX]."</em> Tools like DAF Direct (free) let you add a DAF giving widget to your site.</p>

<h3>3. Acknowledge DAF gifts properly</h3>
<p>When a DAF check arrives from Fidelity Charitable or a community foundation, the acknowledgment letter should go to the individual donor — not to the sponsoring organization. Include language like: <em>"We understand this gift was recommended through your donor-advised fund. Thank you for directing your generosity to us."</em> This maintains the personal relationship even when the check comes from a third party.</p>

<h3>4. Communicate in your year-end appeals</h3>
<p>Many donors fund their DAFs in November and December to maximize that year's tax deduction. Add a DAF callout to your year-end fundraising emails and letters: <em>"If you have a donor-advised fund, now is a great time to recommend a grant to [Your Organization]."</em></p>

<h3>5. Cultivate relationships with community foundation staff</h3>
<p>New Mexico's community foundations have program officers and donor services staff who work closely with local DAF donors. Introduce yourself, share your impact data, and ask to be included in any roundtables or site visits they organize for donors. A trusted referral from a program officer can unlock significant DAF dollars.</p>

<h2>Common Myths About Donor-Advised Funds</h2>
<p><strong>Myth: DAF gifts can only go to large organizations.</strong><br />False. Any 501(c)(3) in good standing can receive a DAF grant — including small grassroots organizations with budgets under $50,000.</p>
<p><strong>Myth: You have to apply for DAF grants.</strong><br />False. There is no application. The donor recommends the grant; the sponsor sends the check. Your job is to make sure donors know about you and feel compelled to give.</p>
<p><strong>Myth: You can negotiate or thank the DAF sponsor.</strong><br />Incorrect framing. The DAF sponsor (Fidelity Charitable, etc.) is just the conduit. Your relationship is with the individual donor. Thank them, steward them, and communicate impact to them — not to the sponsoring organization.</p>
<p><strong>Myth: DAF donors are only wealthy individuals.</strong><br />Increasingly, middle-income donors use DAFs for the tax efficiency and flexibility. Donors at every giving level may have a fund.</p>

<h2>The Bottom Line</h2>
<p>Donor-advised funds represent one of the most significant untapped opportunities for New Mexico nonprofits. The donors are already committed to giving — they just need to find you. By making your organization easy to find (strong Candid profile, clear EIN on your website), easy to fund (DAF-friendly donation page), and easy to love (strong impact communications and proper acknowledgment), you position yourself to capture a growing share of this philanthropy.</p>
<p>Start with the low-hanging fruit: update your Candid profile, add your EIN to your donation page, and add one sentence about DAFs to your next year-end appeal. Then begin building relationships with the program officers at New Mexico's community foundations — they are some of the most important connectors in the state's philanthropic ecosystem.</p>

<h2>Resources</h2>
<ul>
  <li><a href="https://www.nptrust.org/what-is-a-donor-advised-fund/" target="_blank" rel="noopener noreferrer">National Philanthropic Trust — What Is a DAF?</a></li>
  <li><a href="https://www.dafdirect.org/" target="_blank" rel="noopener noreferrer">DAF Direct — free DAF giving widget for your website</a></li>
  <li><a href="https://candid.org/" target="_blank" rel="noopener noreferrer">Candid (GuideStar) — claim and update your nonprofit profile</a></li>
  <li><a href="https://abqcf.org/" target="_blank" rel="noopener noreferrer">Albuquerque Community Foundation — DAF program</a></li>
  <li><a href="https://www.santafecf.org/" target="_blank" rel="noopener noreferrer">Santa Fe Community Foundation — DAF program</a></li>
</ul>
`,
  },
];

async function seedPosts() {
  console.log(`Seeding ${POSTS.length} posts…\n`);
  let upserted = 0;

  for (const post of POSTS) {
    const [row] = await sql<{ id: number }[]>`
      INSERT INTO posts (
        slug, title, excerpt, content,
        hero_image_url, author_name, published_at,
        is_published, meta_title, meta_description
      ) VALUES (
        ${post.slug},
        ${post.title},
        ${post.excerpt},
        ${post.content},
        ${post.hero_image_url},
        ${post.author_name},
        ${post.published_at}::timestamptz,
        true,
        ${post.meta_title},
        ${post.meta_description}
      )
      ON CONFLICT (slug) DO UPDATE SET
        title             = EXCLUDED.title,
        excerpt           = EXCLUDED.excerpt,
        content           = EXCLUDED.content,
        hero_image_url    = EXCLUDED.hero_image_url,
        author_name       = EXCLUDED.author_name,
        published_at      = EXCLUDED.published_at,
        is_published      = EXCLUDED.is_published,
        meta_title        = EXCLUDED.meta_title,
        meta_description  = EXCLUDED.meta_description,
        updated_at        = now()
      RETURNING id
    `;
    console.log(`  ok    [${String(row.id).padStart(3)}] ${post.title}`);
    upserted++;
  }

  console.log(`\nDone. ${upserted} posts upserted.`);
}

seedPosts().catch((err) => {
  console.error(err);
  process.exit(1);
});

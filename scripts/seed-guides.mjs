import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// Archive oldest 3 guides
await sql`UPDATE posts SET is_published = false WHERE id IN (1, 4, 5)`;
console.log('Archived 3 oldest guides (IDs 1, 4, 5)');

const guides = [
  {
    slug: 'grant-writing-essentials',
    title: 'Grant-Writing Essentials for New Mexico Nonprofits',
    excerpt: 'A step-by-step guide to writing compelling grant proposals that win funding for your organization.',
    author_name: 'NM Nonprofits Editorial Team',
    published_at: new Date().toISOString(),
    content: `
<p>Grant writing is one of the most valuable skills a New Mexico nonprofit can develop. A well-crafted proposal can open doors to foundation funding, government grants, and corporate partnerships that sustain your mission for years. This guide walks you through every stage of the process, from identifying the right opportunities to submitting a proposal that stands out.</p>

<h2>Start with the right funders</h2>
<p>The most common grant-writing mistake is applying to every funder you can find. Reviewers can tell when a proposal was written generically, and it rarely wins. Before you write a word, research whether the funder is a genuine fit for your organization.</p>
<ul>
  <li><strong>Review their guidelines carefully.</strong> Most funders publish detailed eligibility requirements, geographic priorities, and issue area focus. If your work does not align with at least two of those, move on.</li>
  <li><strong>Study recent grantees.</strong> Many foundations publish lists of past awards. If you see organizations similar to yours in size and focus, that is a positive signal.</li>
  <li><strong>Check the grant size.</strong> Applying for $100,000 from a foundation whose average award is $5,000 wastes both your time and theirs.</li>
  <li><strong>Look for New Mexico funders first.</strong> Local funders like the McCune Charitable Foundation, Thornburg Foundation, and Albuquerque Community Foundation understand the unique context of working in New Mexico and often prefer organizations with deep local roots.</li>
</ul>

<h2>Understand what funders are really asking</h2>
<p>Grant applications are essentially structured conversations. Funders are asking: Can this organization solve a problem we care about? Are they credible? Will our money be used wisely? Every section of your proposal should answer those questions, even when the form is asking something more specific.</p>

<h3>The statement of need</h3>
<p>This section establishes why the problem you are addressing matters. Use local data wherever possible. New Mexico-specific statistics about poverty rates, health outcomes, educational attainment, or environmental conditions are far more persuasive to a New Mexico funder than national averages. Cite your sources, keep it tight, and connect the data directly to your organization's work.</p>

<h3>Goals and objectives</h3>
<p>Goals are broad directional statements ("Improve access to mental health services in rural New Mexico"). Objectives are specific, measurable, time-bound targets ("Provide 500 individual counseling sessions to residents of Mora and Colfax counties by December 31, 2027"). Funders need both. Goals show you understand the big picture; objectives show you know how to execute.</p>

<h3>Program description</h3>
<p>Describe exactly what you will do with the grant funds. Walk the reviewer through your program step by step. Who will you serve? How will you reach them? What activities will take place, and on what timeline? Avoid jargon. Write for a smart reader who knows nothing about your specific program.</p>

<h3>Evaluation</h3>
<p>How will you know if your program worked? Funders want to see that you take learning seriously. Describe the data you will collect, how you will collect it, and how you will use the results to improve your work. If you have an external evaluator or established measurement tool, mention it.</p>

<h3>Budget</h3>
<p>Your budget should tell a story that matches your narrative. If you describe a robust community outreach program, the budget should show staff time for outreach. Line items that appear without explanation raise red flags. Include a budget narrative — a brief paragraph or table explaining each major expense — even when it is not required.</p>

<h2>Common grant-writing mistakes to avoid</h2>
<ul>
  <li><strong>Submitting without proofreading.</strong> Typos and grammatical errors signal carelessness. Have someone outside your organization read the proposal before you submit.</li>
  <li><strong>Ignoring the page limit.</strong> If the funder says two pages, submit two pages. Going over suggests you cannot follow directions.</li>
  <li><strong>Burying the ask.</strong> State clearly, early, and specifically what you are requesting. "We are requesting $25,000 to support our youth mentorship program serving 150 Albuquerque students in the 2027 program year" is far stronger than a vague request buried in the third paragraph.</li>
  <li><strong>Writing about your organization instead of the community.</strong> The best proposals center the people being served, not the organization doing the serving. Lead with community need, not organizational history.</li>
  <li><strong>Applying only once.</strong> Most grants are competitive. Rejection is normal. Track your applications, request feedback when possible, and reapply to promising funders in future cycles.</li>
</ul>

<h2>Build funder relationships before you apply</h2>
<p>The strongest grant applications come from organizations that already have a relationship with the funder. Before submitting a major proposal, consider attending a funder's informational webinar, connecting at a New Mexico nonprofit conference, or sending a brief letter of inquiry to gauge interest. Program officers are generally approachable, and a five-minute conversation can tell you whether your project is a real fit.</p>

<h2>After you submit</h2>
<p>Once your proposal is in, resist the urge to follow up immediately. Give the funder time to complete their review process. If you are awarded funding, send a prompt thank-you and comply carefully with all reporting requirements — your track record as a grantee directly affects your chances in future cycles. If you are declined, a brief, gracious note asking for feedback can open a relationship that leads to funding down the road.</p>

<p>Grant writing improves with practice. Every proposal you write teaches you something about how to communicate your organization's value. Keep a shared folder of strong language from past applications — a compelling needs statement, a tight program description, a clear budget narrative — and build on it over time.</p>

<p>For help finding New Mexico-specific grant opportunities, browse the <a href="/grants/">open grants</a> listed in our directory, or explore funders by <a href="/sectors/">issue area</a>.</p>
    `.trim(),
  },
  {
    slug: 'basic-nonprofit-marketing-tips',
    title: 'Basic Marketing Tips for New Mexico Nonprofits',
    excerpt: 'Low-cost, practical marketing strategies to grow your nonprofit\'s visibility and reach more people across New Mexico.',
    author_name: 'NM Nonprofits Editorial Team',
    published_at: new Date().toISOString(),
    content: `
<p>Marketing often feels like a luxury for under-resourced nonprofits, but it is actually a necessity. Without visibility, even the most effective programs struggle to attract donors, recruit volunteers, and reach the people they exist to serve. The good news is that effective nonprofit marketing does not require a large budget. It requires clarity, consistency, and a willingness to show up regularly in the places where your community is paying attention.</p>

<h2>Start with your message</h2>
<p>Before you choose a channel or write a post, you need to be clear about what you are saying. Many nonprofits make the mistake of leading with organizational descriptions ("We are a 501(c)(3) founded in 2008...") when they should be leading with impact ("Last year, we helped 400 Albuquerque families stay housed during a housing crisis"). Your message should answer three questions clearly and quickly:</p>
<ul>
  <li>What problem do you solve?</li>
  <li>Who do you serve?</li>
  <li>Why should someone care right now?</li>
</ul>
<p>Write a one-sentence version of your mission that a community member — not a grant reviewer — would actually understand. Test it on people outside your organization. If they can repeat it back to you accurately, you have a working message.</p>

<h2>Own your Google presence</h2>
<p>The first thing anyone does when they hear about your organization is search for it online. Make sure they find something credible and up to date.</p>
<ul>
  <li><strong>Claim your Google Business Profile.</strong> It is free, and it puts your organization's name, address, phone number, and website in front of anyone who searches for you or searches for nonprofits in your area. Add photos, your hours, and a brief description of your work.</li>
  <li><strong>Keep your website current.</strong> An outdated website with a 2021 news page and broken links signals an inactive organization. At minimum, make sure your contact information, mission statement, and a recent impact statement are accurate.</li>
  <li><strong>Collect Google reviews.</strong> Ask board members, volunteers, and program participants to leave an honest review. Reviews build credibility and improve your search visibility.</li>
</ul>

<h2>Use social media strategically, not frantically</h2>
<p>You do not need to be on every platform. Pick one or two where your audience actually spends time and show up there consistently. For most New Mexico nonprofits, Facebook and Instagram provide the best reach-to-effort ratio for community engagement. LinkedIn is worth maintaining for professional credibility and donor outreach. TikTok can work well for organizations that serve or involve younger audiences.</p>

<h3>What to post</h3>
<p>The most common mistake on social media is posting only when you need something — donations, volunteers, event attendees. Instead, aim for a mix of content types:</p>
<ul>
  <li><strong>Stories from the field.</strong> A brief story about someone your organization helped (with permission) is more compelling than any statistic.</li>
  <li><strong>Behind-the-scenes content.</strong> Photos from a volunteer day, a staff member explaining their role, a peek at program preparation. These build trust and humanize your organization.</li>
  <li><strong>Timely news hooks.</strong> Connect your work to relevant local news, awareness months (Mental Health Awareness Month, Hunger Action Month), or community events.</li>
  <li><strong>Impact updates.</strong> Brief data points ("We served 50 families this month") show that you are active and accountable.</li>
  <li><strong>Asks.</strong> Donation requests, volunteer calls, event promotions. Keep these to no more than 20% of your content.</li>
</ul>

<h2>Build and use an email list</h2>
<p>Email is consistently the highest-return marketing channel for nonprofits. Unlike social media, where an algorithm controls who sees your content, email goes directly to people who have opted in to hear from you. A list of 500 engaged local supporters is worth more than 5,000 indifferent social media followers.</p>
<p>Start collecting emails now if you are not already. Add a simple signup form to your website. Collect business cards at events. Ask program participants for their preferred contact method. Once a month, send a brief update — what you did, who you helped, what is coming up. Keep it short, personal, and specific to New Mexico.</p>

<h2>Partner with other organizations</h2>
<p>New Mexico's nonprofit community is relatively small and interconnected. Collaboration and cross-promotion cost nothing and reach audiences you might not otherwise access. Co-host an event with a complementary organization, swap newsletter features, or ask a peer organization to share your social posts. The New Mexico Association of Nonprofits and regional community foundations often facilitate these connections.</p>

<h2>Tell your story in local media</h2>
<p>Local journalists, particularly at community newspapers and Spanish-language outlets, are actively looking for stories about organizations doing meaningful work in their coverage area. A one-page media pitch describing a compelling program, an unusual event, or a significant milestone can land coverage that no advertising budget could buy. Keep a list of local reporters who cover the nonprofit and community beat, and reach out with a specific, timely story idea rather than a general press release.</p>

<h2>Measure what matters</h2>
<p>Marketing without measurement is guessing. Track a small number of meaningful metrics: website visits, email open rates, social media reach, and — most importantly — what actions people take after they encounter your content. Do they donate? Sign up to volunteer? Share your posts? Focus your energy on the channels and content types that drive the actions you care about most.</p>

<p>Marketing is a long game. The organizations with the strongest community presence did not build it overnight. They showed up consistently, told good stories, and made it easy for supporters to stay connected. Start with one thing you can do this week — update your Google Business Profile, send one email to your list, or post one story from your work — and build from there.</p>
    `.trim(),
  },
  {
    slug: 'fundraising-event-success-tips',
    title: 'Fundraising Event Success Tips for New Mexico Nonprofits',
    excerpt: 'How to plan, promote, and run fundraising events that delight your donors and consistently hit your revenue goals.',
    author_name: 'NM Nonprofits Editorial Team',
    published_at: new Date().toISOString(),
    content: `
<p>Fundraising events are one of the most visible things a nonprofit does. Done well, they raise money, deepen donor relationships, and generate the kind of energy that keeps a community invested in your mission. Done poorly, they drain staff capacity, frustrate volunteers, and sometimes lose money. The difference between the two usually comes down to planning, clarity of purpose, and honest assessment of your organization's capacity.</p>

<h2>Define success before you start planning</h2>
<p>The first question to answer is not "What kind of event should we do?" It is "What does success look like, and is an event the right tool to get there?" Be specific:</p>
<ul>
  <li>How much net revenue do you need to raise (after expenses)?</li>
  <li>How many new donors do you want to acquire?</li>
  <li>What do you want existing donors to feel when they leave?</li>
  <li>Is there a cultivation or stewardship goal beyond the immediate revenue?</li>
</ul>
<p>If you cannot answer these questions concretely, planning will be unfocused and measuring success afterward will be impossible. A gala that raises $50,000 gross but costs $45,000 to produce is a very different outcome than a smaller, lower-cost event that nets $30,000 and introduces 40 new donors to your mission.</p>

<h2>Choose the right event format for your organization</h2>
<p>Not every organization should run a gala. Match your event format to your donor base, your staff capacity, and your community context.</p>
<ul>
  <li><strong>Annual galas and dinners</strong> work well for organizations with established major donor relationships, a board willing to sell tables, and staff capacity to manage complex logistics. They are expensive to produce and high-stakes.</li>
  <li><strong>Community events</strong> (festivals, walks, rides, cook-offs) work well for organizations with broad community support rather than a concentrated major donor base. They build visibility and can attract first-time supporters.</li>
  <li><strong>House parties and small salons</strong> are low-cost, high-intimacy events typically hosted by a board member or major donor. They work exceptionally well for cultivation — introducing a small group of prospects to your executive director and mission in a personal setting.</li>
  <li><strong>Online events</strong> and hybrid formats expand geographic reach and can significantly reduce venue costs. They require a different set of production skills but can be highly effective, especially for organizations with a statewide or national supporter base.</li>
</ul>

<h2>Build a realistic budget and work backward from net revenue</h2>
<p>Most event budgets fail because they start with a wishlist of expenses rather than a revenue target. Flip this process:</p>
<ol>
  <li>Determine your net revenue goal (what you need after expenses).</li>
  <li>Estimate your revenue sources: ticket sales, table sponsorships, auction proceeds, paddle raises, online donations during the event.</li>
  <li>Set a hard cap on expenses at no more than 30–40% of gross revenue for an established event, less for a first-year event.</li>
  <li>Build your event within that expense budget, not around it.</li>
</ol>
<p>Common budget line items to account for: venue rental, catering, audio/visual and production, printing and signage, event software, entertainment or speakers, auction item procurement costs, and staff time (even if staff are salaried, time spent on events has an opportunity cost).</p>

<h2>Secure sponsorships before you sell tickets</h2>
<p>Event sponsorships from local businesses and foundations dramatically improve your financial position. A $5,000 presenting sponsor covers a significant portion of most small-event expenses before you sell a single ticket. Approach sponsors early — ideally three to four months before the event — with a clear, tiered sponsorship menu that spells out exactly what each level of support provides: logo placement, table seats, speaking opportunity, social media recognition.</p>
<p>In New Mexico, local businesses — particularly in Albuquerque, Santa Fe, and Las Cruces — are generally receptive to nonprofit sponsorship asks, especially when the organization has a clear community presence and the event offers genuine brand visibility in return.</p>

<h2>Make the ask clear and easy</h2>
<p>The biggest event revenue mistake is not making a clear ask. Guests should never leave wondering how to give. Whether you use a live paddle raise, an auction, a text-to-give campaign, or QR codes at every table, the giving mechanism should be obvious, simple, and introduced early. Train your emcee or executive director to make the ask confidently and specifically: "Tonight we are asking each of you to consider a gift of $250, which provides three months of after-school programming for one student. Raise your paddle if you are with us."</p>

<h2>Steward your donors immediately after the event</h2>
<p>The event is not over when the last guest leaves. What happens in the 48 hours after your event often determines whether first-time attendees become long-term supporters.</p>
<ul>
  <li>Send a personal thank-you to every donor within 24 hours, referencing something specific about the event.</li>
  <li>Process donation acknowledgment letters within one week.</li>
  <li>Send a post-event impact update one to two weeks later: how much was raised, what it will fund, who it will help.</li>
  <li>Identify your top prospects from the event — people who gave generously or asked meaningful questions — and schedule personal follow-up calls within 30 days.</li>
</ul>

<h2>Debrief and document everything</h2>
<p>Run a structured debrief with your team and key volunteers within two weeks of the event. What went well? What would you change? What did the budget versus actuals look like? Document your vendor contacts, timeline, run-of-show, and lessons learned in a shared folder so next year's planning does not start from scratch.</p>
<p>The best fundraising events get better every year because the organization treats each one as a learning opportunity. Track not just revenue but donor retention: how many guests from last year came back? That number is one of the clearest measures of how well your event is building community.</p>

<p>Looking for New Mexico-based trainings on event fundraising? Check our <a href="/events/">Events & Trainings</a> calendar for upcoming workshops from WESST, SCORE, and other NM nonprofit support organizations.</p>
    `.trim(),
  },
];

for (const guide of guides) {
  const result = await sql`
    INSERT INTO posts (slug, title, excerpt, content, author_name, published_at, is_published, created_at, updated_at)
    VALUES (
      ${guide.slug}, ${guide.title}, ${guide.excerpt}, ${guide.content},
      ${guide.author_name}, ${guide.published_at}, true, NOW(), NOW()
    )
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title, excerpt = EXCLUDED.excerpt,
      content = EXCLUDED.content, published_at = EXCLUDED.published_at,
      is_published = true, updated_at = NOW()
    RETURNING id
  `;
  console.log(`Inserted: ${guide.title} (id ${result[0].id})`);
}

const all = await sql`SELECT id, title, is_published FROM posts ORDER BY id`;
console.log('\nAll posts:');
all.forEach(p => console.log(`  [${p.id}] [${p.is_published ? 'pub' : 'archived'}] ${p.title}`));

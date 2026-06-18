import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error('ERROR: DATABASE_URL not set'); process.exit(1); }
const sql = neon(DATABASE_URL);

const GUIDES = [
  {
    slug: 'how-to-start-a-nonprofit-in-new-mexico',
    title: 'How to Start a Nonprofit in New Mexico',
    excerpt: 'A step-by-step guide to forming a 501(c)(3) in New Mexico, from incorporation to IRS recognition to state registration.',
    author_name: 'NM Nonprofits Editorial',
    meta_title: 'How to Start a Nonprofit in New Mexico: Step-by-Step Guide',
    meta_description: 'Learn how to start a nonprofit in New Mexico, from incorporating with the Secretary of State to filing for 501(c)(3) status with the IRS.',
    content: `<h2>Overview</h2>
<p>Starting a nonprofit in New Mexico involves several distinct steps: incorporating as a nonprofit corporation with the New Mexico Secretary of State, adopting bylaws and forming a board of directors, applying for federal 501(c)(3) tax-exempt status with the IRS, and registering with the New Mexico Attorney General's office if you plan to solicit donations. The process typically takes four to nine months from start to finish, with most of the time spent waiting for IRS review.</p>

<h2>Step 1: Define Your Mission and Test Your Idea</h2>
<p>Before filing any paperwork, invest time in defining your organization's mission clearly and researching what other organizations are doing in your issue area. The New Mexico nonprofit sector is well-developed in most issue areas, and a new organization will have the most impact if it fills a genuine gap rather than duplicating existing services. Talk to potential beneficiaries, community partners, and funders about whether your proposed organization meets a real need.</p>
<p>A strong mission statement is specific, actionable, and describes who you serve and what change you aim to create. Avoid vague language. "Improving lives in New Mexico" is not a mission. "Providing free after-school tutoring in math and reading to elementary students in rural San Miguel County" is a mission.</p>

<h2>Step 2: Recruit a Board of Directors</h2>
<p>New Mexico law requires a nonprofit corporation to have at least three directors. Your founding board should include people with relevant expertise, community connections, and genuine commitment to the organization's mission. Look for diversity of skills: financial management, legal knowledge, fundraising experience, and subject matter expertise in your issue area. Board members are legally responsible for the organization's governance and financial integrity.</p>
<p>Avoid common board composition mistakes: do not fill your board entirely with family members or personal friends, do not make the Executive Director a voting board member, and do not recruit board members who cannot or will not attend meetings and fulfill their duties.</p>

<h2>Step 3: Incorporate with the New Mexico Secretary of State</h2>
<p>File Articles of Incorporation with the New Mexico Secretary of State's office. For a nonprofit corporation, you will use the Articles of Incorporation for a Nonprofit Corporation form, available on the Secretary of State's website. The filing fee is $25. Your Articles must include your organization's name, a statement of purpose consistent with tax-exempt status, a dissolution clause specifying that assets will go to another charitable organization if you dissolve, and the names and addresses of your initial directors.</p>
<p>Choose your organization's name carefully. The name must be distinguishable from other entities registered in New Mexico, and it will be part of your public identity for years. Check the Secretary of State's business name database before committing to a name.</p>

<h2>Step 4: Obtain an Employer Identification Number (EIN)</h2>
<p>Apply for an EIN from the IRS. This is free and can be done online at IRS.gov in minutes. You will need the EIN to open a bank account, file tax forms, and apply for 501(c)(3) status. Apply for the EIN as a nonprofit corporation, not as an individual.</p>

<h2>Step 5: Adopt Bylaws and Hold Your First Board Meeting</h2>
<p>Bylaws are the internal governing document of your nonprofit. They specify how the board operates, how officers are elected, how meetings are called and conducted, and how the organization makes decisions. The IRS will review your bylaws when you apply for tax-exempt status, so they should be thorough and clearly consistent with charitable purposes. Templates are available from the New Mexico Association of Nonprofits (NMAN), which is an excellent resource for new organizations.</p>
<p>At your first board meeting, adopt the bylaws, elect officers (President, Secretary, and Treasurer at minimum), open a bank account, and begin planning your program and fundraising activities.</p>

<h2>Step 6: Apply for 501(c)(3) Status</h2>
<p>Most new nonprofits apply for 501(c)(3) status using IRS Form 1023-EZ (for organizations expecting less than $250,000 in annual gross receipts in their first three years) or the longer Form 1023 (for larger organizations or those with more complex structures). The Form 1023-EZ costs $275 to file; the full Form 1023 costs $600.</p>
<p>The IRS typically processes Form 1023-EZ applications within four to six weeks and full Form 1023 applications within three to six months, though processing times vary. During this waiting period, you can operate and even collect donations, but donors cannot deduct their gifts as charitable contributions until the IRS approves your application.</p>

<h2>Step 7: Register with the New Mexico Attorney General</h2>
<p>If your organization solicits charitable contributions from New Mexico residents, you must register with the New Mexico Attorney General's Charitable Organizations program and file annual reports. Registration is free for organizations with annual contributions under $25,000 and $20 for larger organizations. This registration is separate from your IRS filing and is required by state law.</p>

<h2>Step 8: Register for State Taxes</h2>
<p>Even though you are tax-exempt for federal purposes, you may need to register with the New Mexico Taxation and Revenue Department and apply for gross receipts tax (GRT) exemption on sales related to your charitable activities. New Mexico's GRT applies to most business transactions, and the rules for nonprofit exemptions are complex. Consult with an accountant or attorney familiar with New Mexico nonprofit tax law.</p>

<h2>Resources for New Mexico Nonprofits</h2>
<p>The New Mexico Association of Nonprofits (NMAN) offers training, consulting, and peer connections for new and established nonprofits throughout the state. The New Mexico Community Foundation and local community foundations in Albuquerque, Santa Fe, Taos, and elsewhere provide capacity-building grants and fiscal sponsorship for organizations not yet incorporated. The Nonprofit Finance Fund offers financial management training and consulting for nonprofits at all stages of development.</p>`,
  },
  {
    slug: 'finding-grants-for-new-mexico-nonprofits',
    title: 'Finding Grants for New Mexico Nonprofits',
    excerpt: 'A practical guide to identifying grant opportunities for New Mexico nonprofits, from local foundations to federal programs.',
    author_name: 'NM Nonprofits Editorial',
    meta_title: 'Finding Grants for New Mexico Nonprofits: A Practical Guide',
    meta_description: 'Learn how to find grants for your New Mexico nonprofit, including local foundations, state programs, and federal funding opportunities.',
    content: `<h2>Start Local</h2>
<p>The most accessible grants for most New Mexico nonprofits are from local and state-level funders who already understand the New Mexico context, have relationships with local organizations, and prioritize New Mexico communities. Before chasing national foundations, build relationships with the funders closest to home.</p>
<p>New Mexico has an active community foundation sector. The New Mexico Community Foundation, Albuquerque Community Foundation, Santa Fe Community Foundation, Taos Community Foundation, and Las Vegas New Mexico Community Foundation all make grants to local nonprofits. These foundations are particularly accessible to smaller organizations and often have open application processes. Many also offer donor-advised funds that can be a source of more flexible support.</p>

<h2>Know the Major New Mexico Grantmakers</h2>
<p>Several private foundations focus primarily or exclusively on New Mexico:</p>
<ul>
<li><strong>McCune Charitable Foundation</strong> is one of the largest private foundations in New Mexico, with a focus on arts, education, environment, health, and civic engagement. They accept letters of inquiry year-round and have a multi-stage application process.</li>
<li><strong>Thornburg Foundation</strong> focuses on education and economic mobility in New Mexico, with a particular interest in rural communities and workforce development.</li>
<li><strong>Con Alma Health Foundation</strong> focuses exclusively on health equity in New Mexico, with a particular interest in rural health, Indigenous health, and the social determinants of health.</li>
<li><strong>New Mexico First</strong> runs a statewide civic engagement and policy process that sometimes includes grantmaking aligned with their priorities.</li>
<li><strong>Nusenda Foundation</strong> makes grants to community organizations with a focus on financial literacy and economic development.</li>
</ul>

<h2>State Government Funding</h2>
<p>The New Mexico Legislature appropriates funds for nonprofit services in every budget cycle, both through state agency contracts and through direct legislative appropriations (often called "capital outlay" or "member items"). State agency contracts are the most significant source of government funding for most nonprofits, particularly in health, human services, early childhood, and housing. Key state agencies that contract with nonprofits include the Human Services Department, Children Youth and Families Department, Behavioral Health Services Division, Early Childhood Education and Care Department, Department of Health, and Aging and Long-Term Services Department.</p>
<p>Building relationships with legislators and state agency staff is important for both legislative appropriations and contract opportunities. The New Mexico Association of Nonprofits tracks legislative budget developments and can help member organizations navigate the state funding landscape.</p>

<h2>Federal Grant Programs</h2>
<p>Federal grants are available to New Mexico nonprofits through dozens of agencies and programs. The most accessible federal funding typically flows through state agencies as pass-through grants rather than directly from federal agencies to nonprofits. Key federal funding streams include:</p>
<ul>
<li>Community Services Block Grant (CSBG), administered by Community Action agencies</li>
<li>Community Development Block Grant (CDBG), administered by the New Mexico Mortgage Finance Authority for rural areas and by Albuquerque, Santa Fe, and other entitlement cities directly</li>
<li>HUD programs for housing and homelessness, including the Continuum of Care program</li>
<li>USDA Rural Development programs for rural nonprofit facilities and services</li>
<li>Department of Justice programs for victim services, justice reform, and public safety</li>
<li>AmeriCorps, which funds volunteer and national service programs</li>
</ul>
<p>Grants.gov is the authoritative source for federal grant announcements, and setting up alerts for your issue area is worthwhile even if federal grants are not your primary target.</p>

<h2>National Foundations Active in New Mexico</h2>
<p>Several national foundations make significant investments in New Mexico:</p>
<ul>
<li><strong>W.K. Kellogg Foundation</strong> has a long history of grantmaking in New Mexico, particularly in early childhood education, food systems, and racial equity.</li>
<li><strong>Robert Wood Johnson Foundation</strong> focuses on health and health equity, with funding for organizations addressing social determinants of health in New Mexico communities.</li>
<li><strong>Ford Foundation</strong> supports economic equity, arts, and civic engagement work in New Mexico.</li>
<li><strong>Lannan Foundation</strong>, based in Santa Fe, supports literary arts and Indigenous rights nationally and makes grants in New Mexico.</li>
</ul>

<h2>Building a Grant Prospect List</h2>
<p>Use the following tools to identify foundations that might fund your work:</p>
<ul>
<li>Candid (formerly Foundation Center) has a grants database that allows filtering by geography and issue area. Access is available free at many public libraries.</li>
<li>The IRS 990 database, accessible through ProPublica's Nonprofit Explorer, shows what foundations have funded in the past.</li>
<li>Ask peer organizations in your issue area who their funders are. Funders who support similar work in New Mexico are often the most promising prospects.</li>
<li>NM Nonprofits' Grants section lists currently open opportunities for New Mexico organizations.</li>
</ul>

<h2>Grant Readiness</h2>
<p>Before applying for significant grants, make sure your organization has the basic infrastructure that funders expect: current financial statements or audits, a board-approved budget, a clear articulation of your programs and outcomes, and systems for tracking and reporting on your work. Most funders will ask for these materials, and disorganized or incomplete applications signal that an organization is not ready to manage grant funds responsibly.</p>`,
  },
  {
    slug: 'new-mexico-nonprofit-board-governance',
    title: 'Board Governance for New Mexico Nonprofits',
    excerpt: 'What every New Mexico nonprofit board member needs to know about their legal duties, financial oversight, and organizational leadership.',
    author_name: 'NM Nonprofits Editorial',
    meta_title: 'Nonprofit Board Governance in New Mexico: Duties and Best Practices',
    meta_description: 'A guide to nonprofit board governance in New Mexico, covering legal duties, financial oversight, conflict of interest, and best practices for effective boards.',
    content: `<h2>The Three Legal Duties of Nonprofit Board Members</h2>
<p>Every member of a New Mexico nonprofit board has three fundamental legal duties that define their responsibilities and personal liability:</p>
<ul>
<li><strong>Duty of Care</strong>: Board members must act in good faith and with the care that a reasonably prudent person would use in similar circumstances. This means attending meetings, reading financial reports, asking questions, and making informed decisions. You cannot fulfill your duty of care by simply rubber-stamping whatever the Executive Director proposes.</li>
<li><strong>Duty of Loyalty</strong>: Board members must act in the interests of the organization, not their own personal interests or the interests of another organization. This requires disclosing conflicts of interest and recusing yourself from decisions where you have a financial or personal stake.</li>
<li><strong>Duty of Obedience</strong>: Board members must ensure the organization operates consistently with its stated mission and complies with applicable laws. This includes compliance with IRS requirements, state registration requirements, employment law, and the organization's own bylaws.</li>
</ul>

<h2>Financial Oversight</h2>
<p>The board is ultimately responsible for the financial health of the organization. This responsibility cannot be fully delegated to the Executive Director or finance staff. Board members should understand financial statements well enough to identify problems, and the board as a whole should review financial reports at every meeting.</p>
<p>Key financial oversight responsibilities include:</p>
<ul>
<li>Approving an annual budget before the fiscal year begins</li>
<li>Reviewing monthly or quarterly financial statements and asking questions when expenses are over or under budget</li>
<li>Ensuring an annual audit or financial review is conducted by an independent CPA for organizations with significant revenue</li>
<li>Reviewing and approving the annual IRS Form 990 before it is filed</li>
<li>Establishing and maintaining an executive compensation process that is documented, reasonable, and defensible</li>
<li>Ensuring the organization has adequate internal financial controls to prevent fraud and errors</li>
</ul>

<h2>The Board-Executive Director Relationship</h2>
<p>The board is responsible for hiring, evaluating, and if necessary terminating the Executive Director. This is one of the board's most important governance functions. The Executive Director manages the day-to-day operations of the organization and reports to the board. The board sets direction and provides oversight; the Executive Director implements.</p>
<p>A healthy board-Executive Director relationship is characterized by clear role boundaries, mutual respect, open communication, and regular performance evaluation. Common problems arise when boards micromanage operations (undermining the Executive Director's authority) or when boards disengage entirely and allow the Executive Director to operate without accountability.</p>
<p>Executive Director evaluations should be conducted at least annually and should include clear goals and metrics established at the beginning of the evaluation period. The process should be led by the board chair or a designated committee, not the Executive Director themselves.</p>

<h2>Conflict of Interest</h2>
<p>New Mexico law requires nonprofit boards to have a conflict of interest policy, and the IRS asks about such policies on the Form 990. A conflict of interest exists when a board member has a personal financial interest in a decision the board is making: for example, if a board member owns a business that is bidding on a contract with the nonprofit, or if a board member's family member is being considered for employment.</p>
<p>The proper procedure when a conflict arises is: (1) the interested board member discloses the conflict, (2) the interested member leaves the room for the discussion and vote, (3) the remaining board members discuss and vote, (4) the decision and the interested member's absence are documented in the minutes.</p>
<p>Annual conflict of interest disclosures, where all board members certify that they have no undisclosed conflicts, are a best practice.</p>

<h2>Board Recruitment and Succession</h2>
<p>Strong boards recruit intentionally, with a matrix identifying the skills, backgrounds, and community connections the board needs and using that matrix to guide recruitment. New members should receive a thorough orientation to the organization, including its history, programs, finances, and their legal responsibilities as board members.</p>
<p>Term limits are a best practice. Without term limits, boards can become stagnant and resistant to change. Most good governance frameworks recommend two-year or three-year terms with a maximum of two or three consecutive terms, after which a board member must take at least a year off before rejoining.</p>

<h2>New Mexico-Specific Requirements</h2>
<p>New Mexico's Nonprofit Corporation Act establishes baseline requirements for nonprofit governance in the state. Key requirements include maintaining registered agent status, filing annual reports with the Secretary of State (currently $10), keeping adequate corporate records, and holding annual meetings of the board. Organizations that solicit donations must also file annual reports with the New Mexico Attorney General's Charitable Organizations program.</p>
<p>The New Mexico Association of Nonprofits offers governance training, board retreats, and consulting to help boards strengthen their practices. Many community foundations also offer governance education as a nonprofit capacity-building service.</p>`,
  },
  {
    slug: 'new-mexico-nonprofit-fundraising-basics',
    title: 'Fundraising Basics for New Mexico Nonprofits',
    excerpt: 'Core fundraising strategies for New Mexico nonprofits, from individual donor cultivation to event fundraising to planned giving.',
    author_name: 'NM Nonprofits Editorial',
    meta_title: 'Nonprofit Fundraising Basics for New Mexico Organizations',
    meta_description: 'Learn fundraising fundamentals for New Mexico nonprofits: individual giving, major donors, events, online fundraising, and building sustainable revenue.',
    content: `<h2>The Importance of Diverse Revenue</h2>
<p>The most financially sustainable nonprofits do not rely on any single funding source. Organizations that depend entirely on government contracts are vulnerable to budget cuts and policy changes. Organizations that depend entirely on one or two major donors are vulnerable to donor fatigue or shifting priorities. The goal of a fundraising program is to build a diverse portfolio of revenue that can absorb shocks and grow over time.</p>
<p>A healthy revenue mix for a mature New Mexico nonprofit might include individual donations (20-40% of revenue), foundation grants (20-30%), government contracts (20-40%), earned income from fees or services (10-20%), and special events (5-10%). Early-stage organizations often rely more heavily on grants, but building individual donor relationships from the beginning creates long-term resilience.</p>

<h2>Individual Donors: Your Most Sustainable Base</h2>
<p>Individual donations are the largest source of charitable giving in the United States, and they are often more flexible and renewable than foundation grants. Building a base of individual donors, even small ones, creates an organization that is owned and supported by its community rather than dependent on outside funders.</p>
<p>Start with the people closest to your organization: board members, staff, volunteers, program participants and their families, and community members who have directly benefited from your work. These people are your most natural donors and your best ambassadors to others.</p>
<p>Donor cultivation is a relationship, not a transaction. Donors give more and give longer when they feel connected to an organization's work and confident that their gifts are making a difference. Regular communication, personal acknowledgment, and authentic stories of impact are more effective than sophisticated marketing. Send thank-you letters within 48 hours of every gift, and make a call to first-time donors above a certain threshold.</p>

<h2>Major Gifts</h2>
<p>Most nonprofits derive a disproportionate share of their individual giving revenue from a small number of larger donors. Identifying, cultivating, and stewarding major donors is worth significant staff and board time. A major gift threshold depends on your organization's scale; for a small community organization, a $1,000 gift might be major, while for a large institution, the threshold might be $10,000 or $25,000.</p>
<p>Board members play a critical role in major gift fundraising. Most major donors give because of a personal relationship, and board members' networks are the primary source of major gift prospects. Boards that will not participate in fundraising are a significant constraint on organizational growth.</p>

<h2>Annual Appeals and Campaigns</h2>
<p>An annual appeal is a direct solicitation to your entire donor list asking for a gift. Most organizations send their annual appeal in late November or early December, when giving is seasonally elevated and the tax year is ending. A well-crafted annual appeal tells a compelling story, makes a clear and specific ask, and makes it easy to give (include a return envelope and a link to your online giving page).</p>
<p>New Mexico Gives Day, the statewide online giving day run by the New Mexico Association of Nonprofits on the first Tuesday of December, is an excellent opportunity to raise funds and acquire new donors. Many corporate and foundation sponsors provide matching funds that can significantly amplify what donors give.</p>

<h2>Events</h2>
<p>Fundraising events are expensive to produce and labor-intensive, and they often generate less net revenue than organizations expect. Before investing heavily in an annual gala or auction, calculate the true cost: staff time, venue, catering, entertainment, decorations, printing, and the opportunity cost of board and staff time spent on event logistics rather than other fundraising activities.</p>
<p>Events can be valuable for donor acquisition, community visibility, and cultivating relationships, even when the net revenue is modest. The best events are those that both raise money and deepen donors' connection to the organization's mission.</p>

<h2>Online Fundraising</h2>
<p>Online giving has grown dramatically and now accounts for a significant and growing share of nonprofit revenue. A functional, mobile-responsive online giving page is essential. Platforms like Stripe, PayPal Giving Fund, and nonprofit-focused tools like Little Green Light, Bloomerang, and Salesforce Nonprofit offer varying combinations of donor management and online giving functionality.</p>
<p>Social media fundraising through Facebook Fundraisers, Instagram Donations, and similar tools can generate small gifts from a wide audience. Peer-to-peer fundraising, where supporters create their own fundraising pages on your behalf, can extend your reach to new audiences.</p>

<h2>Corporate Partnerships in New Mexico</h2>
<p>New Mexico has a relatively small corporate sector compared to larger states, but local companies are often deeply engaged in their communities. Financial institutions, utility companies, healthcare systems, and local businesses are the most active corporate donors and sponsors. Albuquerque has the largest concentration of corporate philanthropy, with the Albuquerque Community Foundation's Raise the Region campaign serving as a useful entry point for corporate partnerships.</p>
<p>In-kind donations of goods, services, and space can be as valuable as cash for many organizations. Do not overlook the possibility of asking companies for pro bono professional services, donated products for programs or auctions, or use of their facilities for meetings and events.</p>`,
  },
  {
    slug: 'understanding-form-990-new-mexico-nonprofits',
    title: 'Understanding the Form 990 for New Mexico Nonprofits',
    excerpt: 'What the IRS Form 990 is, why it matters for your organization, and how it affects your public reputation and funding relationships.',
    author_name: 'NM Nonprofits Editorial',
    meta_title: 'Understanding Form 990 for New Mexico Nonprofits',
    meta_description: 'A guide to the IRS Form 990 for New Mexico nonprofits: what it is, who must file, what information it contains, and why it matters to donors and funders.',
    content: `<h2>What Is the Form 990?</h2>
<p>The IRS Form 990 is the annual information return that most tax-exempt organizations must file with the Internal Revenue Service. Despite being a tax form, it is not primarily about paying taxes. Rather, it is a public accountability document that discloses your organization's finances, programs, governance practices, and key personnel to the IRS, to state regulators, and to the general public.</p>
<p>The Form 990 is public information. Any member of the public, donor, funder, journalist, or watchdog can access your 990 through the IRS website or through services like ProPublica's Nonprofit Explorer or Candid's GuideStar database. Your 990 is, in effect, your organization's most widely read document. How you present your programs, finances, and governance in the 990 directly affects how donors and funders perceive your organization.</p>

<h2>Who Must File, and Which Form?</h2>
<p>The form you file depends on your organization's size and type:</p>
<ul>
<li><strong>Form 990-N (e-Postcard)</strong>: For organizations with annual gross receipts normally under $50,000. This is a simple online filing with basic information about the organization.</li>
<li><strong>Form 990-EZ</strong>: For organizations with gross receipts under $200,000 and total assets under $500,000. A shorter version of the full 990.</li>
<li><strong>Form 990</strong>: For organizations with gross receipts of $200,000 or more, or total assets of $500,000 or more. The full form includes detailed schedules on compensation, fundraising, governance, and other topics.</li>
<li><strong>Form 990-PF</strong>: For private foundations, regardless of size.</li>
</ul>
<p>The filing deadline is the 15th day of the fifth month after the end of your fiscal year. For organizations with a December 31 fiscal year end, that is May 15. Extensions of six months are available by filing Form 8868.</p>

<h2>What the 990 Discloses</h2>
<p>The full Form 990 requires detailed disclosure of:</p>
<ul>
<li><strong>Revenue</strong>: All sources of income, including grants, contributions, program service revenue, investment income, and special event proceeds</li>
<li><strong>Expenses</strong>: Broken down by program, management and general, and fundraising, and by type (salaries, occupancy, printing, etc.)</li>
<li><strong>Program accomplishments</strong>: A description of your three largest programs, including the number of people served and key accomplishments</li>
<li><strong>Key employees and compensation</strong>: The names and compensation of your five highest-paid employees, your board officers, and any employee earning more than $100,000</li>
<li><strong>Board governance</strong>: Whether you have a conflict of interest policy, whistleblower policy, and document retention policy; whether the board reviewed the 990 before filing</li>
<li><strong>Independent contractor compensation</strong>: Service providers paid more than $100,000</li>
</ul>

<h2>Why the 990 Matters for Fundraising</h2>
<p>Many foundations require a copy of your most recent 990 as part of grant applications, and sophisticated individual donors increasingly use 990 data to evaluate organizations before giving. Charity watchdogs like Charity Navigator and GiveWell use 990 data to rate nonprofits' financial health and efficiency.</p>
<p>Common things funders look for in a 990:</p>
<ul>
<li>Reasonable ratio of program expenses to total expenses (most watchdogs suggest 75% or more going to programs)</li>
<li>Whether the organization is growing or declining and whether it has adequate reserves</li>
<li>Executive compensation that is reasonable relative to the organization's size and the market for similar roles</li>
<li>Good governance practices: conflict of interest policy, independent board, appropriate financial controls</li>
</ul>

<h2>New Mexico Filing Requirements</h2>
<p>In addition to the federal 990, New Mexico nonprofits that solicit charitable contributions must file annual reports with the New Mexico Attorney General's Charitable Organizations program. These reports typically include financial information and are due within six months of your fiscal year end. The Attorney General's office uses these reports to monitor compliance with state charitable solicitation laws.</p>
<p>New Mexico also requires nonprofit corporations to file annual reports with the Secretary of State, currently a $10 filing, to maintain good standing as a corporation. Failure to file can result in administrative dissolution, which can have serious consequences for the organization's legal status and its ability to enter contracts or receive grants.</p>

<h2>Preparing a Good 990</h2>
<p>The 990 should be prepared by or in close consultation with a CPA experienced in nonprofit accounting. The board should review the completed 990 before it is filed, not just sign off on it without reading it. The 990 is a legal document signed under penalty of perjury by an authorized officer, so it is important that it accurately represents the organization's activities and finances.</p>
<p>The program description section of the 990 is an opportunity to communicate the value of your work to the public. Write clear, compelling descriptions of your programs that explain what you do, how many people you serve, and what impact you achieve. These descriptions are often the first thing a potential donor or funder reads about your organization.</p>`,
  },
];

function toSlug(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function main() {
  for (const g of GUIDES) {
    await sql`
      INSERT INTO posts (
        slug, title, excerpt, content,
        author_name, is_published, published_at,
        meta_title, meta_description
      ) VALUES (
        ${g.slug}, ${g.title}, ${g.excerpt}, ${g.content},
        ${g.author_name}, true, now(),
        ${g.meta_title}, ${g.meta_description}
      )
      ON CONFLICT (slug) DO UPDATE SET
        title            = EXCLUDED.title,
        excerpt          = EXCLUDED.excerpt,
        content          = EXCLUDED.content,
        meta_title       = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description,
        updated_at       = now()
    `;
    console.log('upserted guide:', g.slug);
  }
  console.log('\nDone.');
}

main().catch(e => { console.error(e); process.exit(1); });

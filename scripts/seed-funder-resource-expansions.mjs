import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

const funders = [
  {
    slug: 'aarp-foundation',
    full_description: `AARP Foundation's Community Challenge is a national quick-turnaround grant program now in its ninth year, awarding $8.3 million in 2026 to roughly 750 projects nationwide, including several in New Mexico. Grants fund small, visible improvements to the built environment and civic life: pop-up plazas, protected bike lanes, community gardens, senior transportation pilots, digital literacy programs, and disaster-preparedness projects for older adults. Most awards are modest and meant to demonstrate a concept quickly rather than fund long-term operations, which makes the program a good fit for New Mexico nonprofits and municipalities testing a new idea before seeking larger capital funding.`,
    application_process: `Applications open in spring through an online form linked from the AARP Livable Communities site; exact dates and an FAQ are posted at aarp.org/livable-communities/community-challenge. Eligible applicants include 501(c)(3) nonprofits, government entities, and other tax-exempt organizations. No letter of intent is required, but proposals should name a specific, completable project rather than a general program, since AARP evaluates applications on how quickly and visibly the funded work can be finished.`,
  },
  {
    slug: 'albuquerque-community-foundation',
    full_description: `The Albuquerque Community Foundation's Annual Grant Cycle is its primary competitive funding round, open to organizations with a physical presence in Bernalillo, Sandoval, Torrance, or Valencia counties and at least three years of operating history. Beyond the main cycle, the Foundation runs Need to Know Grants, a rolling $5,000 to $10,000 program reviewed monthly for time-sensitive requests, and an Emergency Action Fund for food insecurity. The Foundation manages more than $10 million in annual giving across donor-advised funds and its own competitive grantmaking, and it explicitly prioritizes organizations serving traditionally underserved populations.`,
    application_process: `Grant seekers apply through the Foundation's online Grant Portal at grantinterface.com. There's no letter of intent requirement, but the Foundation holds Zoom "Coffee Chat" sessions during each open application window where staff answer questions before applicants submit. Applicants should confirm their operating budget falls under the $8 million cap (waived for animal welfare and dental health programs) before applying.`,
  },
  {
    slug: 'anchorum-health-foundation',
    full_description: `Anchorum Health Foundation converted from a nonprofit hospital system into a grantmaking foundation dedicated to health equity in northern New Mexico, with San Miguel and Mora counties as its core focus. Its signature move was a $25 million investment that established the Las Vegas NM Community Foundation as a standalone grantmaking body for that region. Anchorum's own giving, roughly $3 million annually, targets the social determinants of health: food security, housing stability, transportation access, and behavioral health, funded through initiatives rather than an open competitive cycle.`,
    application_process: `Anchorum does not accept unsolicited grant applications. Funding for San Miguel and Mora county projects flows through the Las Vegas NM Community Foundation, while funding elsewhere in northern New Mexico moves through Anchorum-initiated partnerships. Organizations interested in a future partnership should review current initiatives at anchorumhf.org and reach out directly rather than submitting a cold application.`,
  },
  {
    slug: 'andy-warhol-foundation',
    full_description: `The Andy Warhol Foundation's presence in New Mexico runs mainly through the Fulcrum Fund, a regional regranting program it has funded since 2016 and administered locally by 516 ARTS in Albuquerque. The Fulcrum Fund has awarded more than $865,000 to 344 artists, art spaces, and organizations statewide, with individual grants of $2,000 to $10,000 supporting self-organized, non-501(c)(3) artistic activity that's open to the public. Eligible artists must be based within about 80 miles of Albuquerque, which covers Santa Fe as well. Separately, the Foundation makes direct grants to visual arts nonprofits nationwide for exhibitions, curatorial research, and public programming, for which New Mexico organizations anywhere in the state can apply.`,
    application_process: `New Mexico artists and collectives apply for Fulcrum Fund grants directly through 516 ARTS at 516arts.org rather than through the Warhol Foundation; the Fund typically runs one cycle per year with dates posted on that site. Visual arts organizations seeking a direct grant from the Foundation apply through warholfoundation.org, where guidelines vary by initiative and most funding decisions favor institutions with an established exhibition or curatorial track record.`,
  },
  {
    slug: 'community-foundation-of-southern-nm',
    full_description: `The Community Foundation of Southern New Mexico administers several named funds rather than a single general grant pool, each with its own deadline and focus. The Devasthali Family Foundation Grant runs two cycles a year and awards $1,500 to $4,000 across its 12-county southern New Mexico service area for arts, education, and child hunger programs. The Wellness Fund targets maternal and child health with $3,000 to $10,000 annual grants and larger multi-year awards up to $30,000. The Dr. Robert Palmer Grant is restricted to Luna County, and the LGBTQIA+ Grant and Rainbow Fund support LGBTQIA+-serving organizations regionally with smaller awards of $500 to $2,000.`,
    application_process: `All funds are administered through the Foundation's online portal at grantinterface.com, with separate application windows for each: Devasthali runs March-May and August-October, the Wellness Fund and Dr. Robert Palmer Grant run March 20-April 22, and the LGBTQIA+ Grant runs in May. Applicants should confirm eligibility for the specific fund before applying, since geographic and program restrictions differ across the Foundation's grant lines. Reviewers weigh mission alignment, financial stability, and measurable outcomes.`,
  },
  {
    slug: 'con-alma-health-foundation',
    full_description: `Con Alma Health Foundation is the only New Mexico foundation dedicated exclusively to health equity statewide, funding 501(c)(3) organizations that work with marginalized, rural, immigrant, and low-income communities across all 33 counties. It runs two distinct grant streams: the statewide Con Alma Annual Grants and the Northern New Mexico Health Grants, a regional program with added emphasis on Los Alamos, Rio Arriba, and northern Santa Fe counties. Awards range from $15,000 to $150,000, reflecting the Foundation's preference for funding sustained, community-rooted initiatives rather than one-time projects.`,
    application_process: `Applications for both grant streams go through an online portal at conalmahealth.smartsimple.com. The Con Alma Annual Grants open April 27 and close May 15; Northern New Mexico Health Grants open June 1 and close June 29, with awards announced in early November and funds distributed by mid-December. Con Alma also recruits community reviewers with lived experience and local knowledge, a distinctive part of its process worth knowing about if a nonprofit's leadership wants to get involved beyond applying.`,
  },
  {
    slug: 'gila-community-foundation',
    full_description: `The Gila Community Foundation serves Grant, Hidalgo, Luna, and Catron counties in New Mexico's rural southwest corner, an area with limited philanthropic infrastructure of its own. Its Southline Grant supports nonprofits, faith-based organizations, and public entities working in education, health, social services, arts, and community development, and the Foundation describes its process as intentionally simple and streamlined for organizations with limited grant-writing capacity.`,
    application_process: `The Foundation announces each grant-making cycle on its website at gilacf.org rather than running on a fixed annual calendar, so organizations in its service area should check the site periodically or contact staff directly at 575-956-6095 or info@gilacf.org to find out when the next cycle opens and what documentation it requires.`,
  },
  {
    slug: 'lannan-foundation',
    full_description: `Lannan Foundation is a Santa Fe-based private foundation supporting contemporary artists, writers, and Indigenous activists through grants, fellowships, and residencies rather than a public grant program. Its literary program funds nonprofit publishers, literary organizations, and cultural centers that bring innovative writers to wider audiences, while its Indigenous Communities program supports organizations working on cultural preservation, environmental justice, and self-determination. Lannan also operates a residency program in Marfa, Texas, that has hosted numerous writers connected to New Mexico's literary community.`,
  },
  {
    slug: 'las-vegas-nm-community-foundation',
    full_description: `Established through Anchorum Health Foundation's $25 million investment, the Las Vegas NM Community Foundation is a young, single-purpose foundation focused entirely on San Miguel and Mora counties in northern New Mexico. Its Community Grants program funds general community projects addressing health outcomes and social determinants like food security, housing, and transportation, but explicitly excludes religious initiatives, capital campaigns, endowments, scholarships, and private school tuition. Applicant organizations must be at least one year old and either 501(c)(3), governmental, or working under a qualified fiscal sponsor.`,
    application_process: `Applications are submitted through the link on lvnmcf.com; the most recent Community Grants cycle closed with notifications sent by December 31 and public announcements shortly after. Because the foundation runs a single annual cycle rather than rolling deadlines, San Miguel and Mora county nonprofits should watch the website or contact the foundation at (505) 600-2868 to catch the application window when it opens.`,
  },
  {
    slug: 'mccune-charitable-foundation',
    full_description: `McCune Charitable Foundation is one of New Mexico's largest private foundations, funding 501(c)(3) nonprofits, federally recognized tribes, public schools, and government agencies across health, education, arts, environment, economic development, and rural development statewide. McCune is known for a trust-based, relationship-oriented approach to grantmaking guided by what it calls its Theory of Change: Alignment, Collaboration, and Integration, and it publishes its full list of grant recipients and nine Foundation Priorities for prospective applicants to review before applying.`,
    application_process: `The most recent funding cycle opened August 15 and closed September 15 at 5 p.m. MDT, with staff holding open call sessions in late August and early September to answer questions. New applicants register with a unique email address in the Foundation's grantinterface.com portal; organizations working through a fiscal sponsor should note that relationship directly in the organization name field. McCune does not require a letter of intent, only the full online application.`,
  },
  {
    slug: 'national-endowment-for-the-arts',
    full_description: `The National Endowment for the Arts reaches New Mexico through two channels: direct competitive grants to nonprofits nationwide, and indirect funding routed through New Mexico Arts via the State and Regional Partnership program. NEA grants support music, theater, dance, visual arts, literature, folk and traditional arts, design, and media arts projects, and New Mexico organizations with a national or multi-state program are often better positioned for a direct NEA award than smaller local nonprofits, which typically find a better fit applying to New Mexico Arts instead.`,
  },
  {
    slug: 'new-mexico-arts',
    full_description: `New Mexico Arts, a division of the Department of Cultural Affairs, is the primary state-level arts funder for nonprofits, schools, tribal entities, and local governments statewide. It distributes both state appropriations and federal NEA pass-through funds across eight program areas, including Cultural Community Arts Support, Arts Projects, Arts Learning, Traditional Folk Arts, and dedicated funding for Local Arts Councils and Major Cultural Organizations. The agency runs on a roughly annual cycle: guidelines post in September, funding decisions go through Arts Commission approval in July, and notifications go out in late July for the following fiscal year.`,
    application_process: `All applications go through New Mexico Arts' online system except Folk Arts Apprenticeships. First-time applicants must contact program staff to confirm eligibility and submit an Advance Review application, due in late October, before the final application deadline in mid-December. Renewal applicants must have been successfully funded in the prior cycle to reapply, so new organizations should budget extra lead time for the advance-review step.`,
  },
  {
    slug: 'new-mexico-community-foundation',
    full_description: `New Mexico Community Foundation is among the state's largest community foundations, administering both a general Thriving New Mexico funding priority area and several special-purpose funds, including the Northeastern Health Fund, the Vecino Fund, and Native American Prep Scholars. Its Tribal Futures Fund and broader Indigenous-led grantmaking reflect a stated focus on rural communities and tribal self-determination, distinguishing NMCF from foundations concentrated in the state's metro areas.`,
    application_process: `Grant guidelines and current application windows are posted at nmcf.org/apply-for-a-grant. Because NMCF administers multiple named funds with separate criteria, organizations should confirm which fund matches their region and program area before applying. The Foundation's Grants Director, reachable at edavila@newmexicofoundation.org, can help nonprofits identify the right fund for their work.`,
  },
  {
    slug: 'nm-creative-industries',
    full_description: `The New Mexico Creative Industries Division, part of the state Economic Development Department, funds infrastructure and organizational capacity across six creative sectors: performing, visual, and literary arts; entertainment and media; applied arts and design; marketing and graphics; creative technology; and crafts and artisan trades. Its three grant lines, the Creative Support Organization Grant, the Business Development & Expansion Grant, and Creative Industries Public Development Projects, are aimed primarily at local governments, tribal entities, counties, and educational institutions rather than individual nonprofits, making it a better fit for a city arts commission or tribal cultural program than a small standalone 501(c)(3).`,
    application_process: `The Division takes applications through Submittable rather than a general online form. Interested organizations should first request a meeting through the CID Meeting & Information Request Form on edd.newmexico.gov/creative-industries to confirm which grant line fits their project before submitting.`,
  },
  {
    slug: 'new-mexico-humanities-council',
    full_description: `New Mexico Humanities Council distributes federal National Endowment for the Humanities funds to nonprofits, tribal governments, and government agencies as subaward grants, which means the Council itself is a pass-through and cannot fund other pass-through agencies. Eligible projects serve public audiences and advance humanities inquiry through formats like oral history projects, documentary films, community discussions, lectures, and humanities-centered arts programming. Because subawards ultimately trace back to federal funds, applicant organizations must have no active federal funding exclusions or debarments.`,
  },
  {
    slug: 'pnm-tnmp-foundation',
    full_description: `The PNM/TNMP Foundation is the corporate giving arm of PNM Resources, New Mexico's largest electric utility, awarding more than $1 million annually across three pillars: education, environment, and economic vitality. Recent funding has emphasized STEAM education, housing, food access, and essential services for underserved New Mexicans, and while most giving targets New Mexico, some programs extend into parts of Texas served by the utility's transmission subsidiary, TNMP. The Foundation is explicit that its funding is corporate philanthropy, not customer rate revenue.`,
    application_process: `Applications go through an online portal at bbgm-apply.yourcausegrants.com. The Foundation doesn't publish fixed annual deadlines on its public page, so nonprofits should check the portal directly or email community@pnm.com to confirm the current cycle before applying.`,
  },
  {
    slug: 'santa-fe-community-foundation',
    full_description: `Santa Fe Community Foundation runs two competitive grant cycles a year for organizations serving Santa Fe, Mora, Rio Arriba, and San Miguel counties, alongside several statewide special-purpose funds: the Envision Fund for LGBTQ+ organizations, which has granted more than $1 million since 1997, and the Native American Advised Fund, which has directed more than $800,000 to tribal organizations since 1993. Community Grant awards scale with an applicant's operating budget, ranging from $5,000 to $20,000, and most successful applicants are 501(c)(3) organizations at least three years old.`,
    application_process: `The Spring cycle runs February 9 through March 15, and the Fall cycle runs July 13 through August 16, both managed through the Foundation's online grantee portal. Organizations may submit only one Community Grant application per calendar year, so nonprofits eligible for both the general cycle and a special fund like the Envision Fund should decide in advance which is the better fit.`,
  },
  {
    slug: 'taos-community-foundation',
    full_description: `Taos Community Foundation's annual Impact Grants serve Taos County and western Colfax County across eight priority areas: animal welfare, arts and culture, basic needs, community advocacy, environmental sustainability, health, education, and youth development. The program is modest in scale but broad in reach, funding 61 organizations with $281,845 in its 2026 cycle, an average award of roughly $4,600, reviewed by community volunteer committees rather than foundation staff alone.`,
    application_process: `The 2026 cycle opened February 3 and closed April 1, with awards announced by late May and a celebration event in June; late applications are not accepted. Applicants submit through the online portal at grantinterface.com and must be a 501(c)(3), public agency, or federally recognized tribe in good standing with state and federal reporting requirements.`,
  },
  {
    slug: 'usda-rural-development-nm',
    full_description: `USDA Rural Development's New Mexico office administers a range of federal grant and loan programs for rural communities, and its Rural Business Development Grant is the program most relevant to nonprofits, funding technical assistance, business planning, and infrastructure that supports small business growth and job creation in rural areas and communities under 50,000 in population. Nonprofit organizations, public bodies, and federally recognized tribes are all eligible applicants, and awards are typically used to fund a specific project rather than general operating support.`,
    application_process: `Applications are submitted through the USDA's Rural Development office for New Mexico rather than a public online portal. Interested nonprofits should contact the state office directly through rd.usda.gov/nm for the current notice of funding availability, since federal grant cycles open on a schedule set by USDA's national program office and can vary year to year.`,
  },
  {
    slug: 'walmart-foundation',
    full_description: `Walmart Foundation's Spark Good Local Grants program funds 501(c)(3) public charities, along with eligible schools and faith-based organizations running community-wide projects, near Walmart and Sam's Club store locations. Grants of $250 to $5,000 support work in economic opportunity, food and textile waste reduction, and community resilience. The program runs three application cycles per fiscal year, and organizations may hold up to 25 pending or approved applications at once but cannot reapply to the same facility within the same fiscal year after being funded.`,
    application_process: `Nonprofits create a Spark Good account at walmart.com/nonprofits and complete verification through Walmart's third-party partner, Deed, before applying. Cycles run February 1 through April 15, May 1 through July 15, and August 1 through November 30. The guided application asks organizations to select the specific store facility they're requesting funding from, since grants are tied to that store's local service area rather than statewide.`,
  },
  {
    slug: 'witter-bynner-foundation',
    full_description: `Witter Bynner Foundation for Poetry is a small, focused Santa Fe funder supporting poetry programming nationwide, with grants for individual poets, translation projects, audience-building initiatives, and community-based uses of poetry. New Mexico-based literary organizations are explicitly encouraged to apply, and because the foundation funds a narrow field, competition tends to be less crowded than at broader arts funders, though award sizes are correspondingly modest, from $1,000 to $10,000.`,
  },
];

const resources = [
  {
    slug: 'artwork-archive-artist-inventory',
    add: `Artists typically use Artwork Archive to track a full catalog of pieces alongside pricing history, storage location, and where each work has been shown or sold, which becomes especially useful when applying for grants or consignment agreements that ask for a documented body of work. The free plan covers a limited number of pieces, and paid tiers scale up storage and add features like a public portfolio website and collector CRM tools, which is why galleries as well as solo artists rely on it for inventory management.`,
  },
  {
    slug: 'cafe-calls-for-artists-new-mexico',
    add: `Artists build a free CaFE profile once and reuse it to apply to any call listed on the platform, uploading work samples, a resume, and an artist statement that carry over between applications rather than needing to be resubmitted each time. New Mexico-specific searches turn up calls from the state's museums, public art programs, and regional arts councils alongside national and international opportunities, and most calls list a jury panel and notification date so applicants know what to expect after submitting.`,
  },
  {
    slug: 'candid-guidestar-nonprofit-profiles',
    add: `Claiming and updating a Candid profile is free and earns a nonprofit a Seal of Transparency (Bronze, Silver, Gold, or Platinum depending on how much financial and programmatic detail is disclosed); Candid's own research found that organizations with a Seal raise an average of 62% more in contributions the year after earning it. Many funders now check for a Seal before reviewing a grant application, which makes claiming a profile one of the higher-leverage, lowest-cost steps a New Mexico nonprofit can take. A paid Premium tier adds deeper funder-matching data, though small nonprofits under $1 million in revenue that reach Gold status can often get free access to it through Candid's periodic promotions.`,
  },
  {
    slug: 'fractured-atlas-fiscal-sponsorship',
    add: `Fractured Atlas charges an 8% administrative fee on donations processed through its fiscal sponsorship, on top of a membership due of $10 a month for an individual artist or $20 a month for an organization covering up to three users. That structure makes it most cost-effective for artists and small collectives running occasional fundraising campaigns rather than an ongoing annual budget, where a locally based fiscal sponsor with a flat fee might work out cheaper. Because sponsorship is nationwide, it's a common first step for New Mexico artists who need 501(c)(3) status quickly for a specific grant deadline without incorporating their own nonprofit.`,
  },
  {
    slug: 'grantsmanship-center-training',
    add: `The five-day format is intensive by design: participants leave with a completed draft proposal built around the TGCI Model, which breaks a grant application into a problem statement, goals and objectives, methods, evaluation plan, and budget narrative that funders can follow section by section. Because the training is run nationally with only occasional New Mexico sessions, staff at smaller organizations sometimes coordinate to attend together or apply for one of the periodic scholarships to offset the registration cost.`,
  },
  {
    slug: 'groundworks-nm-nonprofit-capacity',
    add: `Groundworks NM runs its workshops as a cohort rather than one-off sessions in many cases, so participants build relationships with staff at other New Mexico nonprofits working through the same governance or fundraising challenges. Because the organization is based in Albuquerque but serves the whole state, many sessions are offered virtually or in a hybrid format specifically to reach smaller organizations in rural counties that couldn't otherwise justify travel time for a single workshop.`,
  },
  {
    slug: 'irs-form-1023-nonprofit-application',
    add: `The streamlined 1023-EZ is only available to organizations that project gross receipts under $50,000 for each of their first three years and total assets under $250,000; a 30-question eligibility worksheet in the instructions determines whether an organization qualifies, and answering yes to any disqualifying question means filing the longer Form 1023 instead. Both forms are filed electronically through Pay.gov with a filing fee, and approval typically takes several weeks to a few months depending on IRS processing volume and whether the application is flagged for additional review.`,
  },
  {
    slug: 'nm-arts-and-cultural-districts',
    add: `Designated districts, which currently include areas in Albuquerque, Santa Fe, Taos, Las Cruces, Silver City, and several smaller communities, get access to technical assistance on things like district branding and wayfinding, networking with other district coordinators around the state, and eligibility for grant opportunities set aside specifically for district-affiliated organizations and projects. The program is aimed at building a sustained local arts economy in a defined geographic area rather than funding individual organizations directly, so most engagement happens through a district's coordinating entity rather than a single nonprofit applying on its own.`,
  },
  {
    slug: 'nm-arts-grant-portal',
    add: `Because guidelines change year to year and eligibility rules vary by grant category, New Mexico Arts requires new applicants to confirm eligibility with program staff before beginning an application in the portal, which can add lead time that organizations should plan for ahead of the December deadline. Once an account and eligibility profile are set up, they carry over for future cycles, which makes the setup a one-time cost for organizations that plan to apply annually.`,
  },
  {
    slug: 'nm-secretary-of-state-nonprofit-filing',
    add: `Filing articles of incorporation with the Secretary of State is the first legal step for a New Mexico nonprofit, before it can apply for federal 501(c)(3) status with the IRS, and the same portal is used afterward to file the annual reports required to keep an organization in good standing with the state. Nonprofits that fall out of compliance with annual reporting risk administrative dissolution, so the portal's search tool is also useful for checking an organization's own status or verifying that a potential partner or grantee is currently in good standing.`,
  },
  {
    slug: 'santa-fe-community-foundation-learning-hub',
    add: `Programming leans heavily toward small and rural nonprofits that can't easily access national training providers, with a mix of live workshops, recorded webinars, and peer learning circles where staff and board members from different organizations work through shared challenges together rather than just listening to a lecture. Most sessions are free or low-cost, reflecting the Learning Hub's role as capacity-building infrastructure for the Foundation's own grantee network across northern New Mexico rather than a revenue-generating training business.`,
  },
  {
    slug: 'score-nm-free-mentoring',
    add: `Mentors are working or retired business professionals volunteering their time, matched to a nonprofit or creative business based on relevant industry experience, and sessions are confidential and free regardless of how many meetings an organization needs. Because SCORE mentoring is available virtually as well as in person, artists and small organizations outside Albuquerque, Santa Fe, or Las Cruces can still get matched with a mentor without traveling to one of SCORE's physical chapter locations.`,
  },
  {
    slug: 'wesst-small-business-consulting-nm',
    add: `WESST's consulting is one-on-one rather than group training, which lets a self-employed artist or small creative business work through specifics like pricing a body of work, setting up basic bookkeeping, or preparing a loan application with a consultant who can follow up over multiple sessions. Beyond its six regional offices, WESST also administers small-dollar loans and low-cost group trainings, so the free consulting often serves as an entry point that connects an artist to WESST's other capital and training programs once a specific need is identified.`,
  },
];

async function run() {
  for (const f of funders) {
    if (f.application_process) {
      await sql`UPDATE funders SET full_description = ${f.full_description}, application_process = ${f.application_process}, updated_at = now() WHERE slug = ${f.slug}`;
    } else {
      await sql`UPDATE funders SET full_description = ${f.full_description}, updated_at = now() WHERE slug = ${f.slug}`;
    }
    console.log('funder updated:', f.slug);
  }

  for (const r of resources) {
    const rows = await sql`SELECT description FROM resources WHERE slug = ${r.slug}`;
    if (rows.length === 0) { console.log('MISSING resource:', r.slug); continue; }
    const newDesc = rows[0].description.trim() + '\n\n' + r.add.trim();
    await sql`UPDATE resources SET description = ${newDesc}, updated_at = now() WHERE slug = ${r.slug}`;
    console.log('resource updated:', r.slug);
  }
}

run().then(() => { console.log('DONE'); }).catch(e => { console.error('ERR', e); process.exit(1); });

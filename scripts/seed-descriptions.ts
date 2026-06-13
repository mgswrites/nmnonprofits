import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error('ERROR: DATABASE_URL not set'); process.exit(1); }
const sql = neon(DATABASE_URL);

const DESCRIPTIONS: Record<string, string> = {
  'roadrunner-food-bank': `Roadrunner Food Bank is the largest nonprofit dedicated to solving hunger in New Mexico, distributing tens of millions of pounds of food each year across all 33 counties. Founded in 1980, it grew from a modest operation into a statewide hunger relief network and is a member of Feeding America, the national food bank association.

The organization operates large warehouses in Albuquerque and Las Cruces and works through a network of more than 700 partner organizations, including food pantries, shelters, soup kitchens, and other nonprofits. Roadrunner sources food from grocery retailers, farms, manufacturers, and food drives, then sorts, stores, and redistributes it to communities throughout the state.

Beyond bulk distribution, Roadrunner runs direct service programs that reach people where they live. Mobile food pantries deliver fresh produce and groceries to rural and underserved areas. The Healthy Foods Center model places food assistance inside healthcare settings, allowing medical providers to refer patients facing food insecurity. School-based programs and senior food box initiatives target children and older adults, two groups especially vulnerable to hunger.

New Mexico consistently ranks among the states with the highest rates of food insecurity and child hunger, and Roadrunner Food Bank positions itself as a frontline response to that challenge. The organization emphasizes nutritious food, fresh produce, and partnerships that connect hunger relief to health outcomes.

Roadrunner relies on individual donors, corporate partners, grants, and thousands of volunteers who sort and pack food at its facilities. Its work spans both immediate emergency food relief and longer-term efforts to address the root causes of hunger across urban and rural New Mexico communities.`,

  'the-food-depot': `The Food Depot is the food bank serving northern New Mexico, headquartered in Santa Fe and covering a nine-county region that includes some of the most rural and geographically isolated communities in the state. Established in 1994, it distributes millions of pounds of food annually and is a member of the Feeding America network.

The organization works through a network of partner agencies, including pantries, shelters, group homes, and senior centers, supplying them with food to reach people in need. Counties served include Santa Fe, Rio Arriba, Taos, Los Alamos, Mora, San Miguel, Colfax, Union, and Harding, spanning a vast and sparsely populated territory where access to fresh food can be limited.

The Food Depot operates several direct programs. Mobile food pantries bring groceries to remote areas, and a Kids Cafe program provides meals and snacks to children at after-school and summer sites. Senior food programs and partnerships with healthcare providers extend its reach to populations facing barriers to consistent nutrition.

A signature event, the annual Souper Bowl, raises funds and awareness while showcasing local restaurants and chefs, reflecting the organization's deep ties to the Santa Fe community. The Food Depot also responds to emergencies, providing food relief during wildfires and other disasters that have affected northern New Mexico in recent years.

The organization depends on community donations, grants, food industry partnerships, and a large base of volunteers who sort and distribute food. By combining warehouse distribution with mobile and targeted programs, The Food Depot addresses hunger across a region marked by both high poverty rates and significant distances between communities.`,

  'storehouse-new-mexico': `Storehouse New Mexico is one of the largest food pantries in the state, based in Albuquerque, where it provides groceries directly to individuals and families facing hunger. The organization traces its roots to 1976 and has grown into a high-volume distribution site serving thousands of households each month.

Unlike a regional food bank that supplies other agencies, Storehouse operates primarily as a direct-service pantry, allowing clients to select food rather than receiving pre-packed boxes when possible. This client-choice approach is designed to preserve dignity and reduce waste by letting people choose items their families will use. The pantry distributes staples, fresh produce, protein, and other groceries to those who qualify.

Storehouse serves a broad cross-section of the Albuquerque community, including working families, seniors on fixed incomes, people experiencing homelessness, and individuals navigating unemployment or medical hardship. It also offers pet food, recognizing that families struggling to feed themselves often struggle to feed their animals as well.

The organization sources food through donations, grocery rescue partnerships, food drives, and purchases, and it relies heavily on volunteers to sort, stock, and distribute groceries. Its operating model emphasizes efficiency and high turnover, moving large quantities of food to meet sustained demand in a metropolitan area with significant rates of poverty and food insecurity.

Funded by individual gifts, congregations, businesses, and grants, Storehouse New Mexico functions as a community-supported response to hunger in central New Mexico. Its long history and consistent presence have made it a recognized resource for Albuquerque residents in need of emergency and ongoing food assistance.`,

  'blessing-ranch': `Blessing Ranch Ministries is a faith-based nonprofit that provides counseling, restoration, and renewal for Christian leaders, pastors, missionaries, and their families. Founded in 1996 by clinical psychologist Dr. John Walker, the ministry pioneered the field of intensive pastoral care, integrating psychology and theology to support leaders facing burnout, crisis, and the emotional toll of ministry.

The organization operates a ranch-based retreat model, offering a quiet setting where leaders can step away from the pressures of their work and receive concentrated counseling. Services center on intensive counseling sessions tailored to each individual, couple, family, or ministry team, led by trained counselors and psychologists who specialize in the unique stresses faced by those in vocational ministry.

Blessing Ranch addresses issues including moral failure, marital strain, depression, exhaustion, and conflict, with the goal of restoring leaders to health and effective service rather than seeing them leave ministry altogether. The ranch environment, with its emphasis on rest, reflection, and personal attention, is integral to the approach.

Beyond direct counseling, the ministry has worked to raise awareness about the prevalence of clergy burnout and the importance of proactive care for those who lead congregations and faith organizations. It serves leaders from a wide range of Christian traditions and from across the country, drawing people who travel to the ranch for focused, residential-style care.

Supported by donations, partner churches, and individuals who value leadership health, Blessing Ranch reflects a niche but significant mission within the nonprofit sector: caring for the caregivers and spiritual leaders whose own wellbeing is often overlooked. Its founding helped establish a broader movement focused on sustaining those in long-term ministry.`,

  'reunity-resources': `Reunity Resources is a Santa Fe nonprofit that runs a two-acre urban farm and a soil and compost operation, building a closed-loop, localized food system focused on equitable food access and sustainable land stewardship. The organization connects food waste recycling, regenerative farming, and community food distribution into a single integrated model.

Its composting program diverts roughly four million pounds of food waste from landfills each year, collecting scraps from commercial kitchens and residential doorstep pickup. Using an aerobic, high-heat composting method, Reunity produces about 3,000 cubic yards of finished compost annually, much of it sold to local gardeners and landscapers, with proceeds supporting the organization's mission. It also recycles used cooking oil into biodiesel.

Reunity Farm grows vegetables, herbs, fruits, and flowers, and donates around 10,000 pounds of fresh produce each year to community hunger relief efforts. The farm hosts a farm stand, a farm camp for children, and a farm fresh kitchen, and the organization operates the Santa Fe Community Fridge and Pantry, providing free food to anyone in need.

By tying together composting, farming, food distribution, and education, Reunity demonstrates how organic waste can be transformed into healthy soil and food rather than discarded. Its ten interrelated programs reflect a systems-based approach to environmental sustainability and food security in the Santa Fe area.

The organization engages volunteers, schoolchildren, and community members in hands-on learning about soil health, recycling, and local agriculture. Supported by compost and produce sales, grants, and donations, Reunity Resources serves as both a working farm and a community hub advancing regenerative practices in northern New Mexico.`,

  'homewise': `Homewise is a Santa Fe-based nonprofit and certified community development financial institution that helps New Mexicans become successful, long-term homeowners. Founded in 1986, originally as the Neighborhood Housing Services of Santa Fe, it has grown into a statewide leader in affordable homeownership, combining financial education, lending, real estate development, and home improvement services under one roof.

The organization's integrated model is distinctive. Homewise offers homebuyer education and financial coaching, originates and services its own mortgage loans, develops and sells affordable homes, and provides home refinancing and energy efficiency improvements. By keeping these functions in-house, it guides clients through the entire process of buying and keeping a home, with a particular focus on first-time and lower-income buyers.

Homewise develops residential communities in Santa Fe, Albuquerque, and other parts of the state, building homes priced to be attainable for working families. Its financial coaching helps clients improve credit, reduce debt, and build savings, addressing the barriers that often keep people from qualifying for conventional mortgages.

As a CDFI, Homewise channels lending capital into communities and households that mainstream financial institutions often underserve. The organization emphasizes responsible lending and long-term stability, working to keep homeowners in their homes and to build household wealth through equity.

New Mexico faces significant affordability and wage challenges, and Homewise positions homeownership as a path to financial security and stronger neighborhoods. Funded through lending operations, grants, philanthropy, and investment capital, the organization has helped thousands of families purchase homes and reflects a model of housing nonprofit that blends mission with sustainable financial practice.`,

  'yes-housing': `YES Housing is an Albuquerque-based nonprofit affordable housing developer that creates and manages quality, affordable rental homes for low-income individuals and families across New Mexico and the broader Southwest. The organization develops, owns, and operates multifamily housing, focusing on communities and populations that struggle to find safe, affordable places to live.

YES Housing works across the full development cycle, identifying needs, securing financing, building or rehabilitating properties, and providing ongoing property management. Its portfolio includes housing for families, seniors, and people with special needs, and many of its developments incorporate supportive services designed to help residents maintain stable housing.

The organization frequently partners with service providers, tribal entities, and other nonprofits to address specific community needs, including housing tied to behavioral health, recovery, and support for vulnerable populations. By combining bricks-and-mortar development with attention to residents' wellbeing, YES Housing aims to do more than simply provide units, working toward long-term housing stability.

Affordable housing financing is complex, often involving low-income housing tax credits, federal and state programs, and layered funding sources. YES Housing brings the technical expertise to assemble these resources and bring projects to completion, helping to expand the supply of affordable homes in a state where demand consistently outpaces availability.

Operating in New Mexico and surrounding states, YES Housing addresses a persistent regional challenge: a shortage of affordable rental housing for low-income residents. Through development and stewardship of quality housing, the organization works to ensure that families, seniors, and individuals with limited incomes have access to homes that are safe, well-managed, and within reach financially.`,

  'ventana-fund': `Ventana Fund is an Albuquerque-based nonprofit and certified community development financial institution that provides loans to develop and preserve affordable housing across New Mexico. The organization fills a critical gap in the financing landscape by lending capital to affordable housing developers, nonprofits, and tribal entities that may have difficulty securing conventional financing.

As a CDFI, Ventana Fund channels investment into projects and communities that traditional lenders often overlook. It offers flexible, mission-driven loan products for the acquisition, construction, rehabilitation, and preservation of affordable rental housing, helping to expand and protect the supply of homes available to low-income New Mexicans.

Ventana works with a range of borrowers, including small and emerging developers, established nonprofit housing organizations, and tribal housing authorities. By providing patient, affordable capital and technical support, the fund enables projects that increase access to safe, decent housing in both urban and rural areas, including underserved and tribal communities.

New Mexico faces a significant shortage of affordable housing, and access to financing is one of the key barriers to building and preserving it. Ventana Fund addresses this barrier directly, positioning lending capital as a tool for community development and housing equity. Its loans help bring projects to fruition that might otherwise stall for lack of accessible financing.

Funded through investments from banks, foundations, government programs, and other sources, Ventana Fund recycles capital into ongoing housing development across the state. By focusing specifically on affordable housing finance, the organization plays a behind-the-scenes but essential role in increasing the availability of affordable homes for New Mexico's lower-income residents.`,

  'st-elizabeth-shelter': `St. Elizabeth Shelter is a Santa Fe nonprofit that provides emergency shelter, transitional housing, and supportive services to people experiencing homelessness. Founded in 1986, it has long been one of the principal providers of homeless services in Santa Fe, offering both immediate refuge and longer-term pathways out of homelessness.

The organization operates emergency shelter beds where individuals can find a safe place to sleep, meals, and basic necessities. Beyond emergency care, St. Elizabeth runs transitional and supportive housing programs that help residents stabilize, address underlying challenges, and work toward permanent housing and self-sufficiency. Case management connects clients to services such as employment assistance, benefits enrollment, healthcare, and behavioral health support.

St. Elizabeth serves a range of populations, including single adults, families, and people facing mental health or substance use challenges. Its programs are designed to meet people at different points along the continuum from crisis to stability, recognizing that homelessness has varied causes and that lasting solutions require more than a single night of shelter.

The organization operates multiple facilities and housing programs in the Santa Fe area, reflecting its growth over decades of service. It collaborates with other agencies, healthcare providers, and the broader community to coordinate care and fill gaps in the local safety net.

Santa Fe, like many communities, faces ongoing challenges with homelessness driven by high housing costs and limited affordable options. St. Elizabeth Shelter responds with a combination of crisis services and supportive housing aimed at helping people regain stability. Supported by donations, grants, faith communities, and volunteers, it remains a cornerstone of homeless services in the region.`,

  'joy-junction': `Joy Junction was one of New Mexico's largest emergency homeless shelters, located in Albuquerque, where for decades it provided food, shelter, and services to families and individuals experiencing homelessness. Founded in 1986 by Jeremy Reynalds, the faith-based organization grew into a major presence in the Albuquerque homeless services landscape.

At its height, Joy Junction operated a large campus on the city's south side, offering emergency shelter beds, meals, clothing, and basic necessities to hundreds of people, with a particular emphasis on serving families with children, a population for whom shelter options can be scarce. The organization provided life recovery programs intended to help residents address addiction, find employment, and transition toward stability.

A signature program was the Lifeline of Hope mobile food unit, which delivered meals and supplies directly to people living on the streets and in encampments across Albuquerque, extending the shelter's reach beyond its campus. Joy Junction emphasized meeting immediate physical needs while offering spiritual support and longer-term recovery programming consistent with its Christian mission.

The shelter operated almost entirely on private donations rather than government funding, relying on individuals, congregations, and businesses to sustain its operations. This independence shaped its model and its outreach to the broader community for support.

Joy Junction served the Albuquerque area for more than three decades, becoming a recognized resource for families and individuals in crisis. Its history reflects the persistent challenge of family homelessness in New Mexico and the role that faith-based shelters have played in responding to it, providing emergency care and recovery support to thousands of people over the years.`,

  'la-casa-family-advocacy-center': `La Casa is a Las Cruces nonprofit that provides shelter, advocacy, and support services for survivors of domestic violence in southern New Mexico. Established in 1980, it has served Doña Ana County and the surrounding region for over four decades as a primary resource for individuals and families fleeing abuse.

The organization operates an emergency shelter where survivors and their children can find safety, along with a continuum of services designed to help them rebuild their lives. These include crisis intervention, a 24-hour hotline, safety planning, counseling, legal advocacy, and assistance navigating protective orders and the court system. La Casa also provides transitional housing and support to help survivors achieve long-term independence.

La Casa works with adults and children affected by domestic violence, recognizing the profound impact abuse has on entire families. Its advocates support survivors through the often complex process of leaving an abusive situation, accessing benefits, securing housing, and addressing the emotional trauma of abuse. Children's programs and counseling address the needs of young people who have witnessed or experienced violence in the home.

Beyond direct services, La Casa engages in community education and prevention efforts aimed at raising awareness about domestic violence, healthy relationships, and the resources available to those in danger. By educating the public, it works to reduce stigma and encourage survivors to seek help.

Domestic violence remains a serious issue across New Mexico, and La Casa provides a vital safety net in the Las Cruces area. Funded through grants, donations, and community support, the organization combines emergency response with long-term advocacy, helping survivors move from crisis to safety and stability.`,

  'la-clinica-de-familia': `La Clínica de Familia is a federally qualified health center serving Doña Ana County and southern New Mexico from its base in Las Cruces. Founded in 1972, it has grown into a comprehensive community health organization providing medical, dental, and behavioral health care to a largely low-income and underserved population, including many farmworker and rural families.

The organization operates clinics throughout the region, offering primary medical care, pediatrics, women's health, dental services, and behavioral and mental health treatment. As a federally qualified health center, La Clínica provides care to all patients regardless of their ability to pay, using a sliding fee scale based on income to ensure access for those who are uninsured or underinsured.

La Clínica de Familia places strong emphasis on bilingual, culturally responsive care, reflecting the demographics of the border region it serves. Many of its patients are Spanish-speaking, and the organization works to remove language and cultural barriers to healthcare. It also provides substance use treatment and behavioral health services, addressing needs that are often underserved in rural and border communities.

The organization's clinics extend into smaller communities across the county, bringing healthcare closer to people who might otherwise travel long distances or go without care. Programs frequently integrate medical, dental, and behavioral services to treat the whole person and address the social factors that affect health.

Southern New Mexico faces significant health disparities tied to poverty, rurality, and limited access to providers. La Clínica de Familia responds by delivering accessible, affordable, comprehensive care across the region. Supported by federal funding, patient revenue, and grants, it serves tens of thousands of residents and remains a cornerstone of the area's healthcare safety net.`,

  'la-familia-medical-center': `La Familia Medical Center is a federally qualified health center in Santa Fe that provides comprehensive primary care, dental, and behavioral health services to the community, with a focus on low-income, uninsured, and underserved residents. The organization has served Santa Fe for decades as a key part of the local healthcare safety net.

As a federally qualified health center, La Familia offers care to all patients regardless of their ability to pay, using a sliding fee scale based on income. Its services include family medicine, pediatrics, women's health, dental care, and integrated behavioral health, allowing patients to access a range of services in one setting. Bilingual and culturally responsive care reflects the diverse population it serves.

A notable part of La Familia's work is its Healthcare for the Homeless program, which provides medical and behavioral health services specifically to people experiencing homelessness in Santa Fe. Through this program, the organization meets some of the community's most vulnerable residents where they are, addressing both immediate health needs and chronic conditions that are difficult to manage without stable housing.

La Familia integrates medical and behavioral health care, recognizing that mental health, substance use, and physical health are deeply connected. This whole-person approach aims to improve outcomes for patients facing complex and overlapping challenges.

Santa Fe's high cost of living contributes to significant disparities in healthcare access, and La Familia Medical Center works to bridge that gap for those who might otherwise go without care. Supported by federal funding, patient revenue, grants, and donations, the organization serves thousands of patients each year and remains an essential resource for accessible, affordable healthcare in the Santa Fe area.`,

  'presbyterian-medical-services': `Presbyterian Medical Services is a Santa Fe-headquartered nonprofit that operates a broad network of health and human service programs across New Mexico and parts of neighboring states. Founded in 1969, PMS has grown into one of the largest community-based providers of healthcare and social services in the region, reaching many rural and underserved communities.

The organization delivers a wide array of services, including primary medical and dental care, behavioral health and substance use treatment, and early childhood education through Head Start and child development programs. Many of its clinics function as federally qualified health centers, providing care on a sliding fee scale to patients regardless of their ability to pay.

PMS operates dozens of sites across New Mexico, often in small towns and rural areas where access to healthcare and social services is limited. By placing clinics and programs in these communities, the organization brings services closer to people who might otherwise face long travel distances or go without care. Its behavioral health programs address mental health and addiction, while its senior and developmental disability services support other vulnerable populations.

The breadth of PMS's programming distinguishes it from organizations focused on a single service area. By combining healthcare, behavioral health, early childhood education, and social services under one nonprofit umbrella, PMS addresses interconnected needs across the lifespan, from young children to elders.

New Mexico's rural geography and high rates of poverty create persistent challenges in service delivery, and PMS responds with a decentralized model that reaches communities across the state. Supported by federal and state funding, patient revenue, and grants, Presbyterian Medical Services serves tens of thousands of New Mexicans annually through its extensive network of programs.`,

  'southwest-care-center': `Southwest CARE Center is a Santa Fe-based nonprofit healthcare organization that began as a leader in HIV and AIDS care and has expanded into broader primary and specialty medical services. Founded in 1989 during the height of the AIDS epidemic, it built a reputation for compassionate, expert care for people living with HIV and has since grown to serve a wider patient population.

The organization provides primary care, infectious disease treatment, hepatitis C care, sexual health services, and prevention programs, including PrEP for HIV prevention. Its roots in HIV care shaped a model centered on nonjudgmental, patient-focused treatment, serving populations that have often faced stigma or barriers in mainstream healthcare settings.

Southwest CARE Center also engages in clinical research, participating in studies related to HIV, hepatitis, and other conditions, contributing to advances in treatment while offering patients access to emerging therapies. Its research arm reflects a dual commitment to direct patient care and to broader scientific progress in infectious disease.

Over the decades, the organization has adapted to changing healthcare needs, expanding services while maintaining its specialized expertise. It serves patients across northern New Mexico, including those who are uninsured or underinsured, and works to connect people to comprehensive, coordinated care.

Beyond clinical services, Southwest CARE Center has been involved in prevention, education, and outreach aimed at reducing the spread of HIV and other infections. Its history is closely tied to the community's response to the AIDS crisis, and it remains a trusted provider for populations who value its experience and approach.

Supported by patient revenue, grants, and donations, Southwest CARE Center continues to provide specialized and primary healthcare in the Santa Fe region and beyond.`,

  'amador-health-center': `Amador Health Center is a nonprofit community health clinic in Las Cruces that provides affordable, accessible healthcare to low-income, uninsured, and underserved residents of southern New Mexico. The organization focuses on reaching people who fall through the gaps in the healthcare system, offering integrated medical and behavioral health services.

The clinic delivers primary care, behavioral health, and care coordination, with an emphasis on patients who lack insurance or face barriers to traditional healthcare. By offering services on an affordable basis, Amador works to ensure that cost does not prevent people from getting the care they need. Its integrated model brings together physical and mental health care to address the whole person.

Amador Health Center is known for its community-centered, navigation-focused approach, helping patients connect not only to medical care but also to the resources and support systems that affect their health. Care coordinators and community health workers help patients access services, understand their options, and address social factors such as housing, food, and transportation that influence wellbeing.

Serving the Las Cruces and Doña Ana County area, Amador addresses health disparities tied to poverty, lack of insurance, and the challenges of a border region. Many of its patients are uninsured, and the clinic's model is designed to remove the barriers that often keep vulnerable populations from seeking care until problems become severe.

Supported by grants, donations, and community partnerships, Amador Health Center reflects a model of healthcare that combines clinical services with outreach and navigation. By meeting people where they are and addressing the broader context of their lives, the organization works to improve health outcomes among some of southern New Mexico's most underserved residents.`,

  'ben-archer-health-center': `Ben Archer Health Center is a network of federally qualified health centers headquartered in Hatch, New Mexico, providing medical, dental, behavioral health, and pharmacy services across the south-central part of the state. Founded in the early 1970s, it has grown into a substantial community health organization serving rural and underserved populations.

As a federally qualified health center, Ben Archer offers care to all patients regardless of their ability to pay, using a sliding fee scale based on income. Its services span primary medical care, pediatrics, women's health, dental care, behavioral health, and pharmacy, allowing patients in rural communities to access comprehensive care without traveling long distances.

The organization operates multiple clinic sites spread across several counties, bringing healthcare into small communities and agricultural areas where providers are otherwise scarce. This decentralized presence reflects its mission to serve rural New Mexico, including many farmworker and Spanish-speaking families. Bilingual, culturally responsive care is central to its work in the region.

Ben Archer's integration of medical, dental, behavioral, and pharmacy services under one organization allows patients to receive coordinated care and reduces the fragmentation that often affects rural healthcare. Its behavioral health programs address mental health and substance use needs that have historically been underserved in these communities.

South-central New Mexico faces significant health disparities tied to poverty, rurality, and limited access to care. Ben Archer Health Center responds by delivering accessible, affordable, comprehensive services close to where people live. Supported by federal funding, patient revenue, and grants, the organization serves tens of thousands of patients annually and stands as a key part of the healthcare safety net in the Hatch Valley and surrounding region.`,

  'crossroads-community-health-clinic': `Crossroads Community Health Clinic is a Santa Fe organization focused on providing accessible healthcare to people experiencing homelessness and other vulnerable, underserved residents. It works to remove barriers to care for individuals who often struggle to access traditional medical services because of housing instability, lack of insurance, or other challenges.

The clinic aims to meet people where they are, offering services geared toward those living on the streets, in shelters, or in precarious housing situations. For people experiencing homelessness, managing health conditions is especially difficult, and Crossroads positions itself as a point of access for primary care and connection to broader support.

Care for this population typically involves not only treating immediate medical needs but also addressing chronic conditions, behavioral health, and the social factors that contribute to poor health outcomes. Organizations serving people without stable housing often emphasize flexibility, trust-building, and coordination with shelters and other service providers to reach patients who might otherwise avoid or be unable to navigate the healthcare system.

Santa Fe faces persistent challenges with homelessness, driven in large part by high housing costs, and healthcare access is a critical piece of the broader response. By focusing on this population, Crossroads contributes to a network of services aimed at improving the health and stability of some of the community's most vulnerable members.

Like other safety-net health providers, the clinic relies on grants, donations, and partnerships with other agencies to sustain its work. Its focus on people experiencing homelessness reflects a recognition that good health and stable housing are deeply connected, and that accessible, low-barrier care is essential for those living without secure shelter in the Santa Fe area.`,

  'she-recovers-foundation': `SHE RECOVERS Foundation is a Santa Fe-based nonprofit and global grassroots movement supporting women and non-binary individuals in or seeking recovery from a wide range of life challenges. The organization redefines recovery broadly, addressing not only substance use but also trauma, grief and loss, eating disorders, burnout, chronic pain, and mental health issues such as anxiety and depression.

The movement has grown to connect hundreds of thousands of women worldwide, building community through virtual gatherings, online platforms, coaching, and educational resources. Rather than operating as a treatment center, SHE RECOVERS functions as a connective and empowering network, offering peer support, hope, and a sense of belonging to people on recovery journeys that often feel isolating.

Central to its philosophy is the idea that there are many pathways to recovery and that women deserve support tailored to their experiences. The foundation works to reduce stigma, inspire hope, and empower individuals to find their own path to wellness. Its programming includes coaching certification and training, equipping people to support others in recovery and extending the movement's reach.

The organization has launched initiatives aimed at younger generations, responding to the youth mental health crisis by creating programming for younger women and connecting them to support and community. This reflects an effort to reach people earlier and to adapt its model to emerging needs.

Though headquartered in Santa Fe, SHE RECOVERS operates as an international movement, connecting participants across many countries through digital community. Supported by donations, training revenue, and partnerships with treatment providers, the foundation reflects a modern, inclusive, and expansive vision of recovery centered on the experiences and empowerment of women and non-binary people.`,

  'solace-crisis-treatment-center': `Solace Crisis Treatment Center is a Santa Fe nonprofit that provides crisis intervention, counseling, and advocacy for survivors of sexual assault, abuse, and other forms of trauma. Long established as a primary resource in northern New Mexico, the organization supports individuals and families navigating the aftermath of violence and crisis.

Solace operates a 24-hour crisis hotline and provides immediate intervention for people in the wake of sexual assault and abuse, including advocacy and accompaniment for survivors going through medical exams or the legal system. Its trained staff and volunteers help survivors understand their options, access resources, and begin healing in the difficult period following a traumatic event.

Beyond crisis response, the organization offers therapy and counseling services to help survivors process trauma over the longer term. Its programs serve adults and children affected by sexual violence, abuse, and other traumatic experiences, recognizing that recovery is a process that extends well beyond the initial crisis. Counseling is provided by trained therapists experienced in trauma-informed care.

Solace also engages in community education and prevention, working to raise awareness about sexual violence, consent, and healthy relationships, and to educate the public about the resources available to survivors. These efforts aim to reduce stigma and encourage people to seek help.

Sexual assault and abuse remain serious concerns across New Mexico, and Solace provides essential services for survivors in the Santa Fe region and surrounding communities. Funded through grants, donations, and community support, the organization combines immediate crisis response with longer-term healing and prevention work. Its trauma-focused services make it a critical part of the regional response to sexual violence and a trusted resource for survivors seeking safety and support.`,

  'cancer-foundation-for-new-mexico': `Cancer Foundation for New Mexico is a nonprofit that helps cancer patients in northern New Mexico afford the costs associated with treatment, focusing on the practical barriers that can prevent people from completing care. The organization provides direct financial assistance to low-income patients so that the burdens of transportation, lodging, and basic needs do not stand in the way of lifesaving treatment.

A central focus of the foundation is helping patients get to and from treatment. Many people in rural northern New Mexico must travel long distances to reach cancer treatment centers, often daily for weeks at a time during radiation or chemotherapy. The foundation provides assistance with gas, transportation, and lodging so that patients can complete their full course of treatment rather than abandoning it because of cost or distance.

The organization works in partnership with healthcare providers, including treatment centers, whose social workers and staff identify patients in need and connect them to assistance. This collaborative approach ensures that help reaches patients who are already overwhelmed by a cancer diagnosis and the demands of treatment.

By addressing the financial and logistical hardships that accompany cancer, the foundation fills a gap that medical care alone does not cover. Insurance and treatment programs may pay for the medical procedures themselves, but they often leave patients to manage the substantial indirect costs that can derail care, particularly for those with limited incomes.

Supported by donations, fundraising events, and community giving, Cancer Foundation for New Mexico serves patients across a wide region of northern New Mexico. Its practical, patient-centered assistance helps ensure that low-income individuals facing cancer can access and complete the treatment they need.`,

  'communities-in-schools-of-new-mexico': `Communities in Schools of New Mexico is a nonprofit that places trained site coordinators inside public schools to connect students with the resources and support they need to stay in school and succeed. As the state affiliate of the national Communities in Schools network, it focuses on reducing dropout rates and improving outcomes for students facing significant barriers to learning.

The organization's model embeds a dedicated coordinator within a school who works directly with students, families, teachers, and community partners. These coordinators identify students who are struggling and connect them to services such as food, clothing, healthcare, mental health support, tutoring, mentoring, and counseling. By addressing the non-academic barriers that interfere with learning, the model aims to keep students engaged and on track to graduate.

Communities in Schools serves students in high-need schools across New Mexico, many of which serve communities affected by poverty. The organization recognizes that students often cannot focus on academics when they are dealing with hunger, instability, trauma, or other challenges, and its integrated student support model is designed to remove those obstacles.

Coordinators provide both schoolwide support, reaching all students through prevention and awareness efforts, and targeted, intensive case management for students with the greatest needs. This tiered approach allows the organization to address a wide range of challenges within each school community.

New Mexico has historically struggled with graduation rates and educational outcomes, particularly among low-income students, and Communities in Schools positions itself as a partner in improving those outcomes. Supported by grants, philanthropy, and partnerships with school districts, the organization works to surround students with a community of support that helps them stay in school, achieve in life, and reach graduation.`,

  'national-dance-institute-new-mexico': `National Dance Institute New Mexico is a Santa Fe-based nonprofit that uses dance and the performing arts to build confidence, discipline, and a sense of achievement in children. Founded in 1994 and inspired by the national National Dance Institute model created by dancer Jacques d'Amboise, it brings high-energy dance instruction to thousands of New Mexico schoolchildren each year.

The organization's core in-school program sends professional teaching artists into public schools to lead dance classes, often reaching every child in a participating grade regardless of background or ability. The approach emphasizes effort, focus, and excellence, using dance as a vehicle to teach broader life skills and to engage children who might not otherwise thrive in traditional settings.

NDI New Mexico operates dedicated dance centers, including the Dance Barns in Santa Fe and a center in Albuquerque, where students can continue training beyond the classroom through after-school and advanced programs. These facilities serve as hubs for performances, advanced instruction, and community engagement.

The organization reaches students across northern New Mexico and beyond, including many in rural and underserved communities. Its programs culminate in performances that give children the experience of working toward and achieving a public goal, building confidence that extends into other areas of their lives. Scholarships and free programming ensure access for children regardless of family income.

Research and experience tie arts participation to improved academic engagement and self-discipline, and NDI New Mexico leverages dance to support the development of the whole child. Supported by donations, grants, and performance revenue, the organization has become one of the state's most prominent arts education nonprofits, using movement and music to enrich the lives of New Mexico's young people.`,

  'youthworks': `YouthWorks is an Albuquerque-based nonprofit that provides education, job training, and support services to young people who are disconnected from school and work, including those experiencing homelessness or involved with the justice system. The organization helps at-risk and opportunity youth gain the skills, experience, and stability they need to build productive lives.

YouthWorks combines several elements into an integrated program: educational support and GED preparation, paid job training through social enterprises and work crews, case management, and connections to housing, healthcare, and other essential services. By offering young people both income and skill-building opportunities, the organization addresses immediate needs while preparing them for longer-term employment and independence.

The organization operates social enterprises and work programs that give participants hands-on experience and a paycheck while contributing to the community. These often include conservation, food, and community service projects that allow young people to develop work habits and skills in a supportive environment. Mentorship and case management help participants navigate personal challenges and stay engaged.

YouthWorks serves young people facing significant barriers, including those who have left school, experienced homelessness, or been involved with the criminal justice system. The organization meets these youth with services designed to remove obstacles and open pathways to education and employment, recognizing that many have faced trauma and instability.

Disconnected youth represent both a challenge and an opportunity for communities, and YouthWorks focuses on reconnecting these young people to education, work, and support systems. Funded through grants, contracts, social enterprise revenue, and donations, the organization works to help vulnerable young people in the Albuquerque area transition into stable, self-sufficient adulthood and reach their potential.`,

  'rocky-mountain-youth-corps': `Rocky Mountain Youth Corps is a Taos-based nonprofit that engages young people in conservation, community service, and workforce development through paid crew experiences. Founded in 1995, it provides youth and young adults with the opportunity to earn income, gain job skills, and contribute to environmental and community projects across northern New Mexico.

The organization operates conservation corps programs in which crews of young people work on projects such as trail building and maintenance, forest thinning and wildfire mitigation, watershed restoration, and other outdoor work on public lands. Participants earn a stipend and often an education award while developing technical skills, work habits, and leadership abilities. The model combines meaningful labor with personal and professional growth.

Beyond conservation, Rocky Mountain Youth Corps offers programs focused on education, career readiness, and life skills, helping participants set goals, complete education, and prepare for future employment. Many of the young people served face barriers to traditional employment or schooling, and the corps experience provides structure, mentorship, and a sense of accomplishment.

The organization serves a diverse population of young people from northern New Mexico, including many from rural and underserved communities. Its programs connect youth to the outdoors and to their communities while building a pipeline toward careers in natural resources, public service, and other fields. Wildfire mitigation work has taken on added importance given the increasing threat of catastrophic fires in the region.

Supported by federal and state funding, partnerships with land management agencies, grants, and donations, Rocky Mountain Youth Corps advances both conservation goals and youth development. By putting young people to work caring for the land, it addresses environmental needs while investing in the next generation of northern New Mexicans.`,

  'boys-girls-club-of-albuquerque': `Boys & Girls Clubs of Central New Mexico, based in Albuquerque, provides after-school and summer programs that give young people a safe, supportive place to learn, play, and grow. As part of the national Boys & Girls Clubs movement, the organization serves children and teens with programming focused on academic success, healthy lifestyles, and character development.

The clubs offer a structured environment during the critical after-school hours when many children would otherwise be unsupervised. Programming includes homework help and tutoring, sports and recreation, arts, leadership development, and activities that promote good decision-making and healthy habits. Trained staff and mentors build relationships with members, providing guidance and positive role models.

The organization operates club sites across the Albuquerque area, often located in or near neighborhoods with high need, making programs accessible to families who may not be able to afford other forms of childcare or enrichment. Membership fees are kept low or waived so that cost is not a barrier to participation, reflecting the organization's commitment to serving children regardless of family income.

Boys & Girls Clubs emphasize outcomes in three priority areas: academic success, healthy lifestyles, and good character and citizenship. By focusing on these goals, the organization aims to help young people stay on track in school, avoid risky behaviors, and develop into responsible, capable adults.

For working families, the clubs provide both enrichment for children and peace of mind for parents who need safe, affordable supervision during after-school and summer hours. Supported by donations, grants, fundraising, and community partnerships, Boys & Girls Clubs of Central New Mexico serves thousands of young people in the Albuquerque area, investing in their development during the formative years of childhood and adolescence.`,

  'boys-girls-club-of-las-cruces': `Boys & Girls Club of Las Cruces is a nonprofit that provides after-school and summer programming for children and teens in the Las Cruces area, offering a safe and supportive environment focused on youth development. As part of the national Boys & Girls Clubs movement, it serves young people with activities and mentorship aimed at helping them succeed academically, stay healthy, and build strong character.

The club provides structured programming during the hours when many young people would otherwise be unsupervised, including homework help, tutoring, sports and recreation, arts, and leadership activities. Trained staff and mentors form relationships with members and provide positive role models and guidance, helping young people navigate the challenges of growing up.

Serving the Las Cruces and Doña Ana County area, the organization makes its programs accessible to families across the community, keeping fees low so that cost does not prevent participation. Many of the children served come from working families who rely on the club for safe, affordable supervision and enrichment during after-school and summer hours.

The Boys & Girls Club model emphasizes academic success, healthy lifestyles, and good character and citizenship. Through its programming, the organization works to help young people stay engaged in school, make healthy choices, develop leadership skills, and avoid risky behaviors, supporting their growth into capable and responsible adults.

For a region with significant rates of poverty, the club provides important opportunities for young people who might otherwise lack access to enrichment and mentorship. Supported by donations, grants, fundraising, and community partnerships, Boys & Girls Club of Las Cruces invests in local children and teens, offering them a positive place to spend their time and the support they need to thrive.`,

  'the-bridges-project-for-education': `The Bridges Project for Education is a Santa Fe nonprofit that helps low-income, first-generation, and underserved students pursue and complete higher education. The organization provides guidance, mentoring, and support to young people navigating the often complex path from high school to college and career, focusing on those who would be the first in their families to attend college.

The Bridges Project offers college and career advising, helping students explore options, prepare applications, complete financial aid forms, and understand the steps required to enroll in postsecondary education. For first-generation students whose families may have little experience with the college process, this guidance can be the difference between pursuing higher education and giving up on it.

Beyond the application stage, the organization supports students through the transition to college and during their studies, recognizing that getting in is only part of the challenge. Ongoing mentoring, advising, and connection to resources help students persist and complete their degrees or credentials, addressing the barriers that often lead first-generation and low-income students to leave school before finishing.

The organization serves students in the Santa Fe area, many of whom come from communities with low rates of college attendance and completion. By building relationships with students over time and providing individualized support, The Bridges Project works to close gaps in educational attainment and to expand opportunity for young people who might otherwise lack access to the guidance that more advantaged students receive.

Education is closely tied to long-term economic mobility, and The Bridges Project positions higher education as a pathway out of poverty for the students it serves. Supported by grants, donations, and community partnerships, the organization helps first-generation and low-income students in northern New Mexico reach and succeed in college and beyond.`,

  'think-new-mexico': `Think New Mexico is a Santa Fe-based, results-oriented think tank that develops and advances policy solutions to improve the lives of New Mexicans. Founded in 1999, the nonpartisan organization is distinguished by its focus on identifying specific, achievable reforms and then working to enact them into law through the legislative process.

Unlike think tanks that produce research without pursuing implementation, Think New Mexico selects a small number of issues each year, conducts in-depth research, and develops concrete policy proposals, then campaigns to turn those proposals into legislation. This focused, action-driven approach has produced a record of tangible legislative accomplishments over the organization's history.

The organization has worked on a wide range of issues affecting everyday New Mexicans, including education reform, repealing taxes on essentials, improving retirement security, increasing government transparency, and reforming various state policies. Its proposals are grounded in research and designed to be practical and broadly beneficial rather than ideologically driven, which has helped it build bipartisan support for its initiatives.

Think New Mexico operates statewide, addressing policies that affect residents across New Mexico. Its nonpartisan stance allows it to work with legislators and officials across the political spectrum, focusing on common-sense reforms rather than partisan agendas. The organization produces detailed reports that lay out the case for its proposals and the evidence behind them.

Supported by individual donors and foundations rather than government funding, Think New Mexico maintains independence in selecting and pursuing its issues. By combining rigorous research with hands-on advocacy and a track record of passing legislation, the organization has carved out a distinctive role in New Mexico's policy landscape, translating ideas into concrete improvements in state law and public policy.`,

  'girls-inc-of-santa-fe': `Girls Inc. of Santa Fe is a nonprofit that empowers girls to be strong, smart, and bold through research-based programming, mentoring, and a supportive environment. As part of the national Girls Inc. network, it serves girls in the Santa Fe area with programs designed to help them develop confidence, skills, and the ability to navigate challenges they face growing up.

The organization provides after-school and summer programming covering areas such as STEM education, healthy living, financial literacy, media literacy, leadership, and personal development. Its programs are intentionally designed to counter the gender stereotypes and pressures that can limit girls' aspirations, encouraging them to pursue their interests and goals with confidence.

Girls Inc. of Santa Fe serves girls from a range of backgrounds, with particular attention to those from low-income families who may have fewer opportunities for enrichment and mentorship. By keeping programs affordable and accessible, the organization works to ensure that all girls can benefit from its offerings regardless of family income. Trained staff and mentors provide consistent, caring relationships that support each girl's growth.

The Girls Inc. approach is grounded in research about what helps girls thrive, emphasizing skills, knowledge, and a supportive setting where girls can take risks, make mistakes, and build resilience. Programs address topics that are especially relevant to girls, from body image and healthy relationships to academic achievement and career exploration.

By investing in girls during their formative years, Girls Inc. of Santa Fe aims to set them on a path toward educational and personal success. Supported by donations, grants, and community partnerships, the organization provides a space where girls in the Santa Fe area can develop the confidence and capabilities to advocate for themselves and pursue their full potential.`,

  'adaptive-sports-program-new-mexico': `Adaptive Sports Program New Mexico is a Santa Fe-based nonprofit that provides recreational and competitive sports opportunities for people with physical and cognitive disabilities. The organization helps individuals of all ages and ability levels experience the physical, social, and emotional benefits of sports and outdoor activity through adaptive equipment and trained instruction.

The program is well known for its adaptive skiing and snowboarding offerings, providing lessons and specialized equipment that allow people with disabilities to enjoy winter sports at New Mexico ski areas. Beyond the slopes, the organization offers a range of adaptive activities throughout the year, expanding access to recreation that might otherwise be out of reach for people with disabilities.

Participants include people with a wide variety of disabilities, from physical impairments to cognitive and developmental conditions, as well as veterans and others who benefit from adaptive recreation. Trained instructors and volunteers work with each participant to tailor activities and equipment to their abilities, ensuring a safe and rewarding experience.

Adaptive sports offer more than physical exercise: they build confidence, independence, and social connection, and they challenge limiting assumptions about what people with disabilities can do. By creating these opportunities, the organization promotes inclusion and wellbeing for a population that often faces barriers to recreation and physical activity.

The organization relies on volunteers, many of whom are trained to support participants on the slopes and in other activities, as well as on donated and specialized adaptive equipment. Supported by donations, grants, and community partnerships, Adaptive Sports Program New Mexico serves participants from across the region. Its work reflects a belief that everyone, regardless of ability, deserves the chance to experience the joy and benefits of sport and outdoor recreation in New Mexico.`,

  'georgia-okeeffe-museum': `The Georgia O'Keeffe Museum in Santa Fe is dedicated to the life, work, and legacy of the influential American modernist artist Georgia O'Keeffe. Opened in 1997, eleven years after the artist's death, it holds the largest collection of O'Keeffe's work in the world and serves as a center for scholarship, exhibitions, and education related to her art and to American modernism.

The museum's collection includes a substantial body of O'Keeffe's paintings, drawings, and other works, spanning her long and prolific career. Through rotating exhibitions, the museum presents her art alongside that of her contemporaries and explores the themes, places, and influences that shaped her distinctive vision, including the New Mexico landscapes that drew her to the region and became central to her work.

In addition to its Santa Fe galleries, the museum stewards O'Keeffe's historic properties in Abiquiú, including her home and studio, where she lived and worked for decades. These sites offer visitors insight into the artist's life and the northern New Mexico environment that inspired so much of her art, and the museum offers tours and programs connected to them.

The Georgia O'Keeffe Museum also functions as a research and education institution, supporting scholarship on O'Keeffe and modernism and offering educational programs for students, teachers, and the public. Its research center preserves archives and materials related to the artist's life and work.

As one of the few major museums in the United States dedicated to a single woman artist, the museum holds particular significance. Supported by admissions, memberships, donations, and grants, it attracts visitors from around the world to Santa Fe while advancing understanding and appreciation of one of the most important figures in American art.`,

  'lensic-performing-arts-center': `The Lensic Performing Arts Center is a historic theater in downtown Santa Fe that operates as a nonprofit community venue, hosting a wide array of performances and events. Originally built in 1931 as a movie palace and vaudeville house, the ornate Spanish Renaissance-style building was restored and reopened in 2001 as the city's premier performing arts center.

As a nonprofit, the Lensic serves as a shared stage for the Santa Fe community, presenting and hosting performances by numerous local arts organizations as well as touring artists. Its programming spans music, theater, dance, film, lectures, and community events, making it a central gathering place for cultural life in the city. Many of Santa Fe's leading arts groups use the Lensic as a primary venue.

The organization's mission emphasizes accessibility and community benefit. Beyond commercial bookings, the Lensic presents its own programming and supports educational and community initiatives, working to ensure that the performing arts are available to a broad audience. Its nonprofit structure distinguishes it from purely commercial venues and reflects a commitment to serving the public good.

The restoration of the historic theater preserved an architectural landmark while creating a modern, functional performing arts space. The building itself is a significant part of Santa Fe's downtown heritage, and its revival reflected community investment in both historic preservation and the arts.

The Lensic hosts hundreds of events each year, drawing audiences from Santa Fe and beyond and contributing to the city's vibrant cultural and economic life. Supported by ticket revenue, rentals, donations, and grants, the center functions as a cornerstone of the performing arts in northern New Mexico, providing a home for local artists and a stage for world-class talent in a beautifully restored historic setting.`,

  'museum-of-new-mexico-foundation': `The Museum of New Mexico Foundation is the primary nonprofit fundraising and support organization for the state's museums and historic sites operated under the Museum of New Mexico system. Based in Santa Fe, the foundation raises private funds and provides support that complements state funding for these cultural institutions.

The Museum of New Mexico system includes major institutions such as the New Mexico Museum of Art, the Museum of International Folk Art, the Museum of Indian Arts and Culture, the New Mexico History Museum, and several state historic sites. The foundation supports these museums by raising money for exhibitions, acquisitions, education programs, and capital needs that public funding alone cannot cover.

Through membership programs, fundraising events, individual giving, grants, and operation of museum shops, the foundation generates revenue that flows to the museums and their programming. Its support helps the institutions mount ambitious exhibitions, build and care for their collections, and offer educational opportunities to students and the public. The foundation also stewards endowments and donor gifts dedicated to the long-term health of the museums.

By serving as the fundraising partner for the state museum system, the foundation enables these institutions to enrich their offerings and reach beyond what state appropriations provide. This public-private partnership model is common among major museum systems and allows New Mexico's cultural institutions to benefit from both government support and private philanthropy.

The museums supported by the foundation preserve and present New Mexico's rich artistic, cultural, and historical heritage, drawing visitors from around the world to Santa Fe and contributing to the state's identity and economy. Through its fundraising and stewardship, the Museum of New Mexico Foundation plays an essential role in sustaining and strengthening these institutions for current and future generations.`,

  'national-institute-of-flamenco': `The National Institute of Flamenco is an Albuquerque-based nonprofit dedicated to preserving and promoting the art of flamenco through education, performance, and cultural programming. The organization works to advance flamenco as a serious art form and to share its rich Spanish and Romani heritage with audiences and students in New Mexico and beyond.

The institute offers extensive flamenco instruction, teaching dance, music, and song to students of all ages and levels, from young children to professional performers. Its educational programs help cultivate the next generation of flamenco artists and provide opportunities for people to study an art form that has deep cultural roots and demanding technical traditions.

A signature undertaking is the annual Festival Flamenco Alburquerque, one of the most significant flamenco festivals outside of Spain, which brings world-renowned flamenco artists to Albuquerque for performances, workshops, and intensive instruction. The festival draws performers and students from around the world and has helped establish Albuquerque as an important center for flamenco in the United States.

The organization is closely associated with Tierra Adentro, a charter school that integrates flamenco and arts education with academics, reflecting the institute's commitment to using the art form as a vehicle for youth development and cultural education. Through these efforts, flamenco becomes both an artistic pursuit and a means of building discipline, confidence, and cultural connection.

New Mexico's deep Hispanic heritage makes it a fitting home for an institution dedicated to flamenco, and the National Institute of Flamenco has built a national reputation for excellence. Supported by tuition, performance revenue, donations, and grants, the organization sustains a vibrant flamenco community in Albuquerque while honoring and advancing a cherished cultural tradition.`,

  '516-arts': `516 ARTS is a nonprofit contemporary art museum and cultural organization in downtown Albuquerque that presents exhibitions, programs, and events connecting artists, audiences, and communities. Founded in 2006, it operates as an independent, noncollecting institution focused on showcasing contemporary art and fostering dialogue around important social and cultural themes.

The organization mounts rotating exhibitions featuring local, regional, national, and international artists, often organized around timely themes that explore issues such as social justice, the environment, identity, and community. By curating thematic exhibitions and pairing them with public programs, 516 ARTS uses art as a means of sparking conversation and engagement on issues that matter to the broader community.

Beyond its gallery, 516 ARTS offers educational programs, artist talks, performances, workshops, and community events that extend its reach and deepen public engagement with contemporary art. It frequently collaborates with other organizations, artists, and institutions, and has spearheaded large-scale collaborative initiatives that bring together multiple venues and partners across the city and region around shared themes.

Located in the heart of downtown Albuquerque, 516 ARTS contributes to the cultural vitality and revitalization of the city center, serving as a gathering place and a hub for the arts. Its programming emphasizes accessibility and inclusivity, aiming to connect with diverse audiences and to make contemporary art relevant and approachable.

As a noncollecting organization, 516 ARTS focuses its resources on exhibitions, programs, and community engagement rather than on building and maintaining a permanent collection. Supported by donations, grants, memberships, and community partnerships, it has become a significant presence in Albuquerque's arts landscape, bridging artistic expression and civic dialogue and championing contemporary art in New Mexico.`,

  'cornerstones-community-partnerships': `Cornerstones Community Partnerships is a Santa Fe-based nonprofit that works to preserve historic structures, traditional building practices, and cultural heritage across New Mexico and the Southwest. Founded in 1986, the organization specializes in the restoration of historic adobe churches and community buildings, engaging local communities in the hands-on work of preservation.

A central focus of Cornerstones is the restoration of historic adobe churches, many of them centuries old and located in rural Hispanic and Native communities throughout New Mexico. These structures are often at the heart of their communities' cultural and spiritual life, and the organization helps communities repair and maintain them using traditional materials and techniques such as adobe, mud plaster, and timber craftsmanship.

The organization's approach emphasizes community participation and the transmission of traditional building knowledge. Rather than simply performing repairs, Cornerstones works alongside community members, teaching and reinforcing the skills needed to preserve these structures, helping ensure that traditional building practices are passed on to new generations. This focus on knowledge transfer is integral to its mission.

Cornerstones also operates a youth program that engages young people in preservation work, combining hands-on construction experience with education about history, culture, and craftsmanship. Through this program, young people develop skills, connect with their heritage, and contribute to preserving important community landmarks.

By preserving historic adobe buildings and the traditional knowledge behind them, Cornerstones helps communities maintain their cultural identity and their connection to the past. These structures represent irreplaceable heritage, and their preservation strengthens community pride and continuity. Supported by donations, grants, and partnerships, Cornerstones Community Partnerships has worked on numerous projects across New Mexico and the broader region, sustaining both the physical landmarks and the cultural traditions of the Southwest.`,

  'new-mexico-jazz-workshop': `New Mexico Jazz Workshop is an Albuquerque-based nonprofit that has presented jazz performances and education throughout New Mexico since 1978. The organization works to promote jazz and related music through concerts, educational programs, and community events, building audiences and supporting musicians across the state.

The workshop presents a year-round schedule of performances featuring local, regional, and national jazz artists, bringing live music to venues and audiences in the Albuquerque area and beyond. Its concert series and events provide performance opportunities for musicians and expose audiences to a wide range of jazz styles, from traditional to contemporary, as well as related genres such as blues and Latin music.

Education is a core part of the organization's mission. New Mexico Jazz Workshop offers classes, workshops, and programs that teach music to students of various ages and skill levels, helping to cultivate appreciation for jazz and to develop new generations of musicians and listeners. These educational efforts help sustain the art form and provide learning opportunities that might otherwise be limited in the community.

Over its decades of operation, the organization has become an established part of the cultural fabric of Albuquerque and New Mexico, supporting the local music scene and providing a platform for jazz in a region where the genre might otherwise have fewer dedicated champions. Its long history reflects a sustained commitment to keeping jazz alive and accessible.

By combining performance with education and community engagement, New Mexico Jazz Workshop serves both artists and audiences, enriching the cultural life of the state. Supported by ticket revenue, donations, grants, and community partnerships, the organization continues to present music and educational programming that celebrate and sustain jazz as a vital American art form in New Mexico.`,

  'wildearth-guardians': `WildEarth Guardians is a nonprofit environmental advocacy organization headquartered in Santa Fe that works to protect and restore wildlife, wild places, wild rivers, and the health of the American West. Founded in 1989, originally as Forest Guardians, the organization uses advocacy, litigation, science, and policy work to defend the region's natural heritage.

The organization pursues its mission across several program areas, including protecting and recovering endangered and imperiled species, safeguarding public lands and forests, restoring rivers and water, and addressing climate change by working to curb fossil fuel extraction and reduce emissions. WildEarth Guardians is known for its willingness to use the courts, frequently filing lawsuits to enforce environmental laws and hold government agencies and industry accountable.

WildEarth Guardians works throughout the American West, with a particular focus on issues affecting New Mexico and the broader region. Its campaigns address threats such as habitat destruction, oil and gas development, livestock impacts on public lands, and the decline of native wildlife. The organization advocates for stronger protections and for the recovery of species ranging from wolves to native fish and birds.

The organization's approach combines on-the-ground knowledge with legal and policy expertise, allowing it to challenge harmful practices and push for systemic change. Its work on climate and fossil fuels reflects an effort to address the root causes of environmental harm, while its species and lands work targets immediate threats to biodiversity and ecosystems.

Supported by donations, foundation grants, and members, WildEarth Guardians operates as an independent advocate for the environment of the American West. Through its persistent advocacy and litigation, the organization has played a significant role in shaping conservation outcomes across the region, defending the wildlife and wild places of New Mexico and beyond.`,

  'the-nature-conservancy-new-mexico': `The Nature Conservancy in New Mexico is the state chapter of the global conservation organization, working to protect the lands and waters on which all life depends. The Nature Conservancy is known for its science-based, collaborative approach to conservation, and its New Mexico program applies that approach to the state's diverse landscapes, from rivers and forests to grasslands and deserts.

The chapter works to conserve important habitats and natural resources across New Mexico, often by acquiring and managing preserves, partnering with landowners and agencies, and developing solutions that balance conservation with human needs. The organization owns and stewards several nature preserves in the state, protecting critical habitats and providing places for both wildlife and people.

Water is a central concern in arid New Mexico, and The Nature Conservancy works on river and watershed protection, including efforts to restore the health of rivers such as the Rio Grande and to address the challenges of water scarcity. It also engages in forest health and wildfire resilience work, recognizing the growing threat that catastrophic fire poses to both ecosystems and communities.

The Nature Conservancy emphasizes collaboration, working with ranchers, farmers, tribes, government agencies, businesses, and other stakeholders to achieve conservation outcomes that benefit both nature and people. This pragmatic, partnership-based model distinguishes its approach and allows it to address conservation at a landscape scale.

As part of one of the world's largest conservation organizations, the New Mexico chapter brings significant scientific and financial resources to bear on local challenges. Supported by donations, grants, and members, The Nature Conservancy in New Mexico advances the protection and restoration of the state's natural heritage, working to ensure that its lands and waters remain healthy and resilient for future generations.`,

  'santa-fe-watershed-association': `Santa Fe Watershed Association is a nonprofit dedicated to protecting and restoring the Santa Fe River and its watershed. The organization works to improve the health of the river, engage the community in stewardship, and promote a sustainable relationship between the city and its primary waterway, which has historically been central to Santa Fe's existence yet often runs dry.

The association engages in river restoration efforts, water quality monitoring, and habitat improvement along the Santa Fe River, working to revive a waterway that has been heavily affected by diversion, development, and drought. Its efforts aim to restore flows, improve riparian habitat, and reconnect the community with the river as a living natural resource.

Education and community engagement are central to the organization's mission. Santa Fe Watershed Association offers programs for students and the public that teach about the watershed, water conservation, and the ecology of the river, fostering an ethic of stewardship. Volunteer events such as cleanups and plantings give community members hands-on opportunities to contribute to the river's health.

The organization also engages in advocacy and partnership work, collaborating with the city, agencies, and other stakeholders on policies and projects affecting the river and watershed. In a region where water is scarce and precious, the health of the Santa Fe River carries both ecological and cultural significance, and the association works to ensure that the river is valued and protected.

By combining restoration, education, advocacy, and community engagement, Santa Fe Watershed Association addresses the many facets of watershed health. Supported by donations, grants, and volunteers, the organization works to ensure that the Santa Fe River and its watershed are healthy, resilient, and able to support both the natural environment and the community that depends on them.`,

  'taos-land-trust': `Taos Land Trust is a nonprofit organization that works to conserve land, water, and agricultural heritage in the Taos area of northern New Mexico. The organization protects open space, farmland, and natural resources while supporting the traditional land-based culture and acequia-irrigated agriculture that have long defined the region.

The land trust works to permanently protect land through conservation easements and ownership, safeguarding agricultural lands, wildlife habitat, and scenic open spaces from development. By conserving these lands, the organization helps preserve the rural character, ecological health, and cultural traditions of the Taos region for future generations.

A signature project is the Rio Fernando Park, a property the organization stewards along the Rio Fernando de Taos, where it has undertaken wetland and habitat restoration, agricultural revitalization, and educational programming. The site serves as a living demonstration of the connections between land, water, food, and community, and as a place for public engagement and learning.

Water and acequias hold deep importance in northern New Mexico, where centuries-old community irrigation systems sustain both agriculture and culture. Taos Land Trust supports the protection of water rights and acequia traditions, recognizing that conserving land and water together is essential to maintaining the region's agricultural heritage and food systems.

The organization also offers education and community programs that connect people, especially young people, to the land and to traditional agricultural practices. These efforts help pass on knowledge and foster a sense of stewardship among residents.

Supported by donations, grants, and community partnerships, Taos Land Trust combines land conservation with cultural preservation and education. Its work reflects a holistic vision of conservation that honors the deep ties between the people of northern New Mexico and the land and water that sustain them.`,

  'new-mexico-wilderness-alliance': `New Mexico Wilderness Alliance is a nonprofit conservation organization dedicated to protecting and restoring wilderness and wild lands across New Mexico. Based in Albuquerque, the organization advocates for the permanent protection of public lands and works to safeguard the state's natural landscapes, wildlife habitat, and opportunities for solitude and recreation.

The alliance focuses on identifying, advocating for, and securing protection for wilderness-quality lands throughout New Mexico, including designation of new wilderness areas, national monuments, and other protected designations. It works with communities, elected officials, and federal land management agencies to advance protections for deserving landscapes and to defend existing protected areas from threats.

In addition to advocacy and policy work, the organization conducts on-the-ground stewardship, including volunteer projects to restore habitat, maintain trails, remove invasive species, and care for wild lands. These efforts engage citizens directly in conservation and help maintain the ecological health of protected areas. Wilderness inventories and field surveys help document the values of lands proposed for protection.

New Mexico contains vast public lands of significant ecological, cultural, and recreational value, and the alliance works to ensure that the most important of these remain protected for future generations. Its campaigns have contributed to the protection of numerous areas across the state, balancing conservation with the interests of local communities.

The organization also engages the public through outreach, education, and recreational outings that connect people to wild places and build a constituency for conservation. By fostering appreciation for wilderness, it builds support for its protection efforts.

Supported by members, donations, and grants, New Mexico Wilderness Alliance serves as a leading advocate for wild lands in the state. Through advocacy, stewardship, and public engagement, the organization works to preserve New Mexico's wilderness heritage and the natural landscapes that define much of the state.`,

  'acequia-madre-del-llano': `The Acequia Madre del Llano is a historic community irrigation system in Las Vegas, New Mexico, part of the centuries-old acequia tradition that has sustained agriculture and community life in the region. Acequias are gravity-fed earthen irrigation channels brought to New Mexico through Spanish and Indigenous traditions, and they remain governed as community institutions managed collectively by the landowners they serve.

The acequia carries water from the Gallinas River to irrigate lands in the Las Vegas area, supporting farming, gardening, and the maintenance of the agricultural landscape. As a mother ditch, or acequia madre, it represents one of the primary channels from which smaller ditches branch to distribute water across the community's lands.

Acequias operate as self-governing entities under New Mexico law, managed by an elected mayordomo, or ditch boss, and commissioners who oversee the distribution of water, maintenance of the channels, and resolution of disputes among members. The shared responsibility for maintaining the ditch, including the traditional annual cleaning, reflects a communal approach to water management that has endured for generations.

Beyond their practical function, acequias hold deep cultural and historical significance in New Mexico, embodying traditions of cooperation, shared resources, and connection to the land that stretch back centuries. They are recognized as important institutions for preserving both agricultural heritage and community cohesion, and the water they carry is understood as a shared and sacred resource.

The Acequia Madre del Llano, tied to the historic settlement of Las Vegas, continues this living tradition, sustaining irrigated agriculture and the cultural practices associated with acequia governance. As water becomes increasingly scarce in the arid Southwest, acequias like this one remain vital both as sources of irrigation and as enduring examples of community-based resource management in northern New Mexico.`,

  'naeva-new-mexico-alliance-for-environmental-action': `NAEVA is an Albuquerque-based organization that works to build Native political power and advance the social, economic, and environmental wellbeing of Indigenous communities in New Mexico and beyond. Rooted in decades of Native organizing, the organization unites Indigenous people to advocate for justice, equity, and a better quality of life both on and off tribal lands.

NAEVA engages in civic participation work, including voter registration, voter education, and outreach in Pueblo, Navajo, Apache, and urban Native communities, working to ensure that Indigenous voices are heard in the political process. It partners with tribal communities across New Mexico, including the state's Pueblos, the Navajo Nation, and the Jicarilla and Mescalero Apache nations, to strengthen civic engagement and representation.

Environmental justice is a central concern for the organization, which addresses the disproportionate environmental harms borne by Native communities, including impacts from extractive industries and pollution. NAEVA advocates for the protection of land, water, air, and sacred places, connecting environmental health to the broader wellbeing and self-determination of Indigenous people.

The organization works on a range of issues affecting Native communities, including economic justice, voting rights, education, and the protection of cultural and natural resources. Its approach centers Indigenous leadership and community priorities, building power from within Native communities rather than imposing external agendas.

By combining civic engagement, advocacy, and community organizing, NAEVA works to advance equity and justice for Indigenous New Mexicans and to address the systemic challenges they face. Supported by donations, grants, and partnerships, the organization plays a significant role in mobilizing Native communities, protecting their interests, and advancing environmental and social justice across New Mexico, contributing to a stronger Indigenous voice in the region's civic and environmental life.`,

  'native-forward-scholars-fund': `Native Forward Scholars Fund, based in Albuquerque, is the largest provider of scholarships to Native American students in the United States. Formerly known as the American Indian Graduate Center, the organization has supported Indigenous students pursuing higher education for decades, helping them access college and graduate degrees and reduce the financial barriers to educational attainment.

The organization provides scholarships and fellowships to American Indian and Alaska Native students from tribes across the country, funding undergraduate, graduate, and professional studies. By awarding millions of dollars in scholarships, Native Forward helps Indigenous students afford the cost of higher education, which can otherwise be a significant obstacle for students and families.

Beyond financial support, Native Forward offers mentorship, advising, professional development, and a community of support to help students succeed and complete their degrees. The organization recognizes that financial aid alone is not always enough, and it works to support students throughout their academic journeys, helping them persist and graduate.

Native Forward serves students from hundreds of tribal nations, reflecting the diversity of Native communities across the United States. Its work addresses long-standing disparities in educational access and attainment among Native populations and aims to build a pipeline of educated Native professionals and leaders who can contribute to their communities and tribes.

Education is widely seen as a pathway to opportunity and a tool for strengthening tribal nations, and Native Forward positions scholarship support as an investment in Indigenous self-determination and prosperity. Supported by donations, grants, federal funding, and partnerships, the organization has helped tens of thousands of Native students pursue higher education over its history. From its base in Albuquerque, Native Forward Scholars Fund continues to expand educational opportunity for Native American and Alaska Native students nationwide.`,

  'indigenous-women-rising': `Indigenous Women Rising is an Albuquerque-based collective and nonprofit dedicated to ensuring the reproductive justice and health of Indigenous people. The organization centers the experiences and needs of Native women, two-spirit, and LGBTQ individuals, working to advance access to reproductive healthcare, education, and self-determination for Indigenous communities.

A central part of the organization's work is its abortion fund, which provides financial assistance to Indigenous people seeking abortion care, helping to cover the costs of procedures and related expenses such as travel. This fund addresses significant barriers to reproductive healthcare that Native people often face, including the limitations of the Indian Health Service and the geographic and financial obstacles of accessing care.

Indigenous Women Rising also operates a midwifery and birth support fund and engages in education and advocacy around reproductive health, sexual health, and the broader concept of reproductive justice as it applies to Indigenous communities. The organization grounds its work in the understanding that reproductive justice for Native people is inseparable from issues of sovereignty, history, and the right to make decisions about one's own body and family.

The organization works to provide culturally rooted education and resources, addressing topics that are often underserved or stigmatized, and to center Indigenous values and traditions in conversations about reproductive health. Its approach recognizes the unique historical and ongoing injustices that Native people have faced regarding reproductive autonomy, including histories of forced sterilization.

Supported by donations, grants, and community contributions, Indigenous Women Rising provides both direct financial assistance and broader advocacy and education. By centering Indigenous people in the movement for reproductive justice, the organization works to expand access to care and to affirm the dignity, autonomy, and health of Native women and LGBTQ individuals across the region and beyond.`,

  'pueblo-of-acoma-cultural-center': `The Pueblo of Acoma Cultural Center, also known as the Sky City Cultural Center and Haak'u Museum, is located at Acoma Pueblo, home to one of the oldest continuously inhabited communities in North America. The center serves as a gateway for visitors to learn about the history, culture, and traditions of the Acoma people while supporting the preservation and sharing of Acoma heritage.

Acoma Pueblo, known as Sky City, is a village atop a mesa that has been inhabited for centuries, and the cultural center provides the starting point for guided tours of the historic village. Through these tours and its exhibits, the center offers visitors insight into Acoma's long history, traditional way of life, architecture, and enduring cultural practices, all presented from the perspective of the Acoma people themselves.

The center houses the Haak'u Museum, which features exhibits on Acoma history and culture, including the pueblo's renowned pottery tradition. Acoma is famous for its distinctive thin-walled pottery, and the center showcases and supports this art form, providing a venue where the work of Acoma artists can be seen and appreciated. By featuring Acoma artisans, the center supports the livelihoods of community members and the continuation of traditional arts.

Beyond serving visitors, the cultural center plays a role in preserving and transmitting Acoma culture, language, and history for the community itself. It functions as a place where heritage is honored and shared, helping to sustain cultural identity across generations.

Tourism centered on the cultural center and Sky City contributes to the pueblo's economy while allowing Acoma to share its story on its own terms. The Pueblo of Acoma Cultural Center stands as both a welcome to visitors and an institution dedicated to the preservation and celebration of one of the most significant living cultural traditions in the American Southwest.`,

  'eight-northern-indian-pueblos-council': `The Eight Northern Indian Pueblos Council is an organization representing eight Pueblo communities in northern New Mexico, working to support their shared interests, sovereignty, and wellbeing. The member pueblos include Ohkay Owingeh, Santa Clara, San Ildefonso, Nambé, Pojoaque, Tesuque, Picuris, and Taos, each a sovereign tribal nation with its own government, traditions, and culture.

The council serves as a vehicle for collaboration among the northern pueblos, allowing them to address common concerns, pool resources, and advocate collectively on issues affecting their communities. Through joint efforts, the member pueblos can pursue programs and initiatives in areas such as economic development, health, education, social services, and the protection of cultural and natural resources.

Historically, the council has administered programs and services that benefit the member communities, helping to deliver resources and support across the eight pueblos. By working together, the pueblos can achieve outcomes that might be more difficult for individual communities to accomplish alone, while still maintaining their distinct identities and sovereignty.

The council also plays a role in promoting and preserving Pueblo culture and heritage. The northern pueblos are home to rich artistic, linguistic, and cultural traditions, and collaborative efforts can help support the continuation of these traditions and the sharing of Pueblo culture with the broader public when the communities choose to do so.

Representing communities with deep roots in northern New Mexico, the Eight Northern Indian Pueblos Council reflects the value of intertribal cooperation in advancing shared goals. By bringing together eight sovereign nations around common interests, the council works to strengthen the member pueblos and to advance their collective wellbeing, self-determination, and cultural continuity within the region they have inhabited for centuries.`,

  'navajo-nation-human-rights-commission': `The Navajo Nation Human Rights Commission is an entity of the Navajo Nation government, with offices including a presence in Gallup, dedicated to protecting and advancing the human and civil rights of the Navajo people. Established by the Navajo Nation, the commission investigates discrimination, advocates for the rights of Navajo citizens, and works to address injustices affecting the Navajo people both on and off the reservation.

The commission addresses a range of human rights concerns, including racial discrimination, unfair treatment in border towns surrounding the Navajo Nation, voting rights, and access to services and justice. Border towns near the reservation have historically been sites of discrimination against Navajo people, and the commission works to document and address such treatment and to advocate for fairness and equity.

The commission conducts investigations, holds public hearings, gathers testimony, and produces reports on human rights issues affecting the Navajo people. Through these efforts, it brings attention to injustices, informs policy, and advocates for changes that protect the rights and dignity of Navajo citizens. Its work spans issues from discrimination and racism to broader questions of equity and access.

By giving voice to the experiences of Navajo people and holding institutions accountable, the commission plays an important role in defending civil and human rights. It serves as an advocate within the larger systems of state, federal, and local governance that affect Navajo citizens, working to ensure that their rights are respected and that discrimination is addressed.

As a part of the Navajo Nation's governmental structure, the commission reflects the nation's commitment to protecting its people and asserting its sovereignty in matters of human rights. From its offices, including in the Gallup area near the reservation's eastern edge, the Navajo Nation Human Rights Commission works to advance justice and equity for the Navajo people across the region.`,

  'jicarilla-apache-nation-education-department': `The Jicarilla Apache Nation Education Department is the educational arm of the Jicarilla Apache Nation, based in Dulce, New Mexico, the tribal nation's primary community in the north-central part of the state. The department oversees and supports education programs and services for members of the Jicarilla Apache Nation, working to advance educational opportunity and success for tribal students.

The department administers a range of programs aimed at supporting students from early childhood through higher education. These may include scholarship and financial assistance programs for college students, tutoring and academic support, early childhood education, and other initiatives designed to help Jicarilla Apache students succeed at every stage of their educational journey.

By providing scholarships and support for higher education, the department helps tribal members pursue college and advanced degrees, reducing financial barriers and investing in the future of the nation. Education is widely recognized as essential to the wellbeing and self-determination of tribal nations, and the department's work reflects the Jicarilla Apache Nation's commitment to developing educated citizens who can contribute to the community.

The department also works to support cultural education and the preservation of Jicarilla Apache language and traditions, recognizing that education encompasses not only academic achievement but also the transmission of cultural knowledge and identity. Integrating cultural learning with academic education helps strengthen students' connection to their heritage.

Serving the community of Dulce and the broader Jicarilla Apache Nation, the education department functions as a central institution for advancing the educational goals of the tribe. By supporting students and families and investing in education, the Jicarilla Apache Nation Education Department works to build a foundation for the long-term prosperity, self-determination, and cultural continuity of the Jicarilla Apache people.`,

  'new-mexico-voices-for-children': `New Mexico Voices for Children is an Albuquerque-based nonprofit research and advocacy organization focused on improving the wellbeing of children and families in New Mexico. The organization conducts research, analyzes policy, and advocates for changes that address child poverty, health, education, and economic security, working to ensure that the needs of children are prioritized in public policy.

The organization is known for producing data and analysis on the conditions facing New Mexico's children, including its participation in the annual KIDS COUNT data effort, which tracks indicators of child wellbeing across the state and nation. By compiling and presenting this data, New Mexico Voices for Children informs policymakers, advocates, and the public about how children are faring and where improvements are needed.

New Mexico consistently ranks low on measures of child wellbeing, with high rates of child poverty and significant challenges in areas such as health and education. New Mexico Voices for Children uses its research to advocate for policies that address these challenges, including measures related to family economic security, healthcare access, early childhood education, and tax policy that affects low-income families.

The organization engages in advocacy at the state level, working with legislators and officials to advance policies that benefit children and families. Its evidence-based approach combines rigorous research with active engagement in the policy process, aiming to translate data into concrete improvements in the lives of New Mexico's children.

Supported by foundation grants and donations, New Mexico Voices for Children operates as an independent advocate for children's interests. By grounding its advocacy in research and data, the organization works to shape a policy environment that supports the health, education, and economic security of children and families across New Mexico, with a particular focus on those facing poverty and disadvantage.`,

  'common-cause-new-mexico': `Common Cause New Mexico is the state chapter of the national nonpartisan government reform organization Common Cause, working to strengthen democracy and promote open, accountable, and ethical government. Based in Albuquerque, the organization advocates for reforms that empower citizens, increase transparency, and reduce the influence of money and special interests in politics.

The organization works on a range of democracy and good-government issues, including campaign finance reform, ethics and accountability in government, voting rights and access to the ballot, redistricting reform, and open government and transparency. Through advocacy, public education, and engagement with the legislative process, Common Cause New Mexico works to advance policies that make government more responsive to the people.

Common Cause New Mexico has been involved in efforts to improve New Mexico's election systems, increase transparency in campaign finance and lobbying, establish ethics oversight, and reform the redistricting process to reduce partisan manipulation. Its nonpartisan stance allows it to advocate for structural reforms that benefit the democratic process regardless of which party holds power.

The organization engages citizens through education and grassroots involvement, working to build public support for reforms and to empower people to participate in their democracy. By informing the public about issues affecting government accountability and the electoral process, it aims to foster a more engaged and informed citizenry.

As part of a national network with a long history of government reform advocacy, Common Cause New Mexico brings both local focus and broader expertise to its work. Supported by members, donations, and grants, the organization serves as a watchdog and advocate for democratic reform in the state. Through its efforts, Common Cause New Mexico works to ensure that government in the state is open, accountable, and responsive to the interests of ordinary New Mexicans.`,

  'center-for-civic-policy': `Center for Civic Policy is an Albuquerque-based nonprofit that works to engage and empower New Mexicans in the civic and political process, with a focus on building a more inclusive and participatory democracy. The organization conducts research, education, and engagement efforts aimed at increasing civic participation and advancing policies that reflect the interests of underrepresented communities.

The organization focuses on civic engagement, voter education, and community organizing, working to ensure that residents, particularly those from communities that have historically been marginalized or underrepresented, are informed and able to participate in the decisions that affect their lives. Through outreach, education, and engagement, it works to strengthen the connection between communities and the political process.

Center for Civic Policy also engages in research and policy analysis on issues affecting New Mexico communities, providing information and advocacy aimed at advancing equitable policies. By combining grassroots engagement with policy work, the organization seeks to give voice to communities and to influence the policy decisions that shape their wellbeing.

The organization's work reflects a belief that a healthy democracy depends on broad and meaningful participation, especially from those who have often been excluded from the political process. By educating and mobilizing residents, it works to increase civic engagement and to build the capacity of communities to advocate for themselves.

Operating in a state with diverse communities and significant disparities, Center for Civic Policy aims to advance equity through increased civic participation and informed advocacy. Supported by grants and donations, the organization serves as a vehicle for engaging New Mexicans in their democracy and for advancing policies that reflect the needs and priorities of the communities it serves. Through its efforts, it works toward a more inclusive, participatory, and responsive political process in New Mexico.`,

  'aclu-of-new-mexico': `The ACLU of New Mexico is the state affiliate of the American Civil Liberties Union, working to defend and advance civil rights and civil liberties for all people in New Mexico. Based in Albuquerque, the organization uses litigation, advocacy, public education, and organizing to protect constitutional rights and to challenge government actions and policies that violate those rights.

The ACLU of New Mexico works across a broad range of civil liberties issues, including freedom of speech, religious liberty, due process, privacy, racial justice, immigrants' rights, LGBTQ rights, reproductive freedom, voting rights, and the rights of people in the criminal justice and immigration systems. As a border state with diverse communities, New Mexico presents particular civil liberties challenges, and the organization addresses issues such as immigration enforcement, detention, and the treatment of marginalized populations.

The organization frequently engages in litigation, bringing lawsuits to challenge unconstitutional laws and practices and to protect the rights of individuals and communities. It also advocates at the legislative level, working to pass laws that strengthen civil liberties and to defeat measures that would undermine them. Public education and community engagement round out its approach, informing people of their rights and mobilizing support for civil liberties.

As a nonpartisan organization, the ACLU of New Mexico defends civil liberties regardless of the political affiliation of those whose rights are at stake, grounding its work in constitutional principles. Its independence allows it to challenge government overreach and to advocate for the rights of all people, including those who are unpopular or marginalized.

Supported by members, donations, and grants, the ACLU of New Mexico operates as part of a nationwide network with a long history of defending civil liberties. Through its litigation, advocacy, and education, the organization works to ensure that the rights and freedoms guaranteed by the Constitution are protected for everyone in New Mexico.`,

  'santa-fe-dreamers-project': `Santa Fe Dreamers Project is a nonprofit that provides free legal services to immigrants in New Mexico, with a focus on empowering immigrant families and communities. The organization offers legal representation and support to help immigrants navigate the complex immigration system, defend their rights, and pursue legal status and protection.

The organization provides legal assistance in areas such as Deferred Action for Childhood Arrivals, asylum, deportation defense, family petitions, and other immigration matters. By offering these services free of charge, Santa Fe Dreamers Project removes financial barriers that often prevent immigrants from accessing the legal help they need to protect themselves and their families.

The project serves a range of immigrant populations, including young people brought to the United States as children, asylum seekers, detained immigrants, and immigrant families. Its work includes representing individuals in detention and advocating for those facing deportation, providing critical support to people whose lives and family unity may be at stake.

Beyond direct legal services, Santa Fe Dreamers Project engages in community education and outreach, helping immigrants understand their rights and the legal options available to them. The organization works to empower immigrant communities and to build resilience in the face of an immigration system that can be confusing, intimidating, and harsh.

New Mexico's location as a border state and its significant immigrant population make access to immigration legal services especially important, and the demand for such services often far exceeds the available resources. Santa Fe Dreamers Project helps fill this gap, providing skilled legal representation to those who could not otherwise afford it. Supported by donations, grants, and community support, the organization works to protect the rights and dignity of immigrants and to keep families together across New Mexico.`,

  'wesst': `WESST is a statewide nonprofit economic development organization and certified community development financial institution that supports small business and entrepreneurship across New Mexico. Headquartered in Albuquerque, WESST provides business training, consulting, and access to capital, with a particular emphasis on helping women, minorities, and underserved entrepreneurs start and grow successful businesses.

The organization offers a combination of services designed to support entrepreneurs at every stage. These include one-on-one business consulting, training and workshops on topics such as business planning, marketing, and finances, and small business lending through its loan fund. By pairing education and advising with access to capital, WESST helps entrepreneurs overcome the common barriers to starting and sustaining a business.

WESST operates offices in multiple communities across New Mexico, extending its reach beyond Albuquerque to serve entrepreneurs throughout the state, including in rural areas. This statewide presence allows it to support business development in diverse communities and to address the economic needs of different regions.

As a community development financial institution, WESST provides loans to small businesses that may have difficulty obtaining financing from traditional banks, helping to fill gaps in access to capital. Its lending, combined with the guidance and support it offers, helps entrepreneurs launch and expand businesses that create jobs and strengthen local economies.

WESST places particular focus on serving women, minorities, low-income individuals, and others who face barriers to entrepreneurship, working to expand economic opportunity and reduce disparities. By helping these entrepreneurs succeed, the organization contributes to broader economic development and inclusion across New Mexico. Supported by federal funding, grants, lending revenue, and donations, WESST serves as a key resource for small business development and entrepreneurial empowerment throughout the state.`,

  'accion-opportunity-fund': `Accion Opportunity Fund is a nonprofit community development financial institution that provides loans, coaching, and resources to small business owners, with a significant presence in New Mexico and a national reach. The organization focuses on supporting entrepreneurs who are underserved by traditional financial institutions, including women, people of color, immigrants, and low-to-moderate income business owners.

The organization provides small business loans to entrepreneurs who may not qualify for conventional bank financing, helping them access the capital they need to start, sustain, or grow their businesses. Beyond lending, it offers business coaching, educational resources, and support designed to help entrepreneurs succeed and build financial stability.

Accion Opportunity Fund's roots in New Mexico trace to the longstanding work of Accion serving entrepreneurs in the Southwest, and the organization has grown through merger into a national presence while continuing to serve local communities. Its focus on underserved entrepreneurs reflects a mission to expand economic opportunity and to address disparities in access to capital and business support.

By providing affordable, responsible financing along with guidance and resources, the organization helps small business owners overcome barriers and build successful enterprises. Small businesses are important drivers of job creation and economic vitality, and by supporting entrepreneurs who might otherwise be excluded from the financial mainstream, Accion Opportunity Fund contributes to inclusive economic growth.

The organization serves a diverse population of entrepreneurs, recognizing the particular challenges that women, minority, and immigrant business owners often face in accessing capital and support. Its work aims to level the playing field and to help these entrepreneurs achieve their goals.

Supported by lending revenue, philanthropy, grants, and partnerships, Accion Opportunity Fund operates as a mission-driven lender and resource for small businesses. From its work in New Mexico to its broader national efforts, the organization helps entrepreneurs access the capital and coaching they need to build thriving businesses and stronger communities.`,

  'community-action-agency-of-southern-new-mexico': `Community Action Agency of Southern New Mexico is a nonprofit that provides services to low-income individuals and families in southern New Mexico, working to address the causes and conditions of poverty. As part of the national network of community action agencies established to fight poverty, the organization delivers programs designed to help people achieve greater stability and self-sufficiency.

The agency administers a variety of programs aimed at meeting basic needs and promoting economic opportunity. These commonly include assistance with housing and utilities, such as energy assistance and weatherization programs that help low-income households afford and improve their homes, as well as other services targeted at the needs of vulnerable residents.

Community action agencies typically offer programs that address multiple dimensions of poverty, from immediate needs like food and shelter to longer-term efforts that help people build skills, find employment, and increase their financial stability. By combining emergency assistance with programs that promote self-sufficiency, the agency works to both alleviate the effects of poverty and address its underlying causes.

Serving southern New Mexico, a region with significant rates of poverty, the agency reaches individuals and families across multiple communities, including rural areas where access to services may be limited. Its programs help residents weather hardship, improve their living conditions, and pursue greater economic security.

Community action agencies are rooted in the principle of empowering low-income people and engaging communities in efforts to reduce poverty. Through its programs and services, Community Action Agency of Southern New Mexico works to give residents the support and resources they need to improve their circumstances.

Supported by federal and state funding, grants, and partnerships, the agency serves as part of the safety net for low-income people in southern New Mexico, delivering programs that address poverty and help individuals and families build more stable and self-sufficient lives.`,

  'goodwill-industries-of-new-mexico': `Goodwill Industries of New Mexico is a nonprofit organization that uses revenue from its retail stores to fund job training, employment services, and community programs across the state. As part of the national Goodwill network, the organization operates on a model in which donated goods are sold in stores, generating funds and providing jobs that support its mission of helping people find employment and achieve self-sufficiency.

The organization operates retail stores throughout New Mexico, where it sells donated clothing, household goods, and other items. The revenue from these sales, along with the donations themselves, supports Goodwill's workforce development and job training programs, creating a self-sustaining cycle that connects retail operations to mission-driven services.

Goodwill of New Mexico provides job training, employment services, and support to people facing barriers to employment, including individuals with disabilities, those who have been unemployed, people reentering the workforce, and others who need assistance finding and keeping jobs. Its programs help participants develop skills, prepare for the job market, and connect with employment opportunities.

The retail stores themselves provide employment and training opportunities, allowing people to gain work experience while contributing to the organization's operations. In this way, Goodwill's stores serve both as a source of funding and as a venue for workforce development.

By keeping donated goods out of landfills and giving them new life, Goodwill also contributes to environmental sustainability, adding another dimension to its community impact. Its model demonstrates how social enterprise can fund charitable work while providing affordable goods to the public.

Operating across New Mexico, Goodwill Industries of New Mexico combines retail operations with workforce development to help people achieve economic independence. Supported by store revenue, donations, and grants, the organization works to expand employment opportunity and to strengthen the workforce, helping individuals build skills, find jobs, and improve their lives throughout the state.`,

  'vida-mejor-capital': `Vida Mejor Capital is a Santa Fe-based nonprofit that empowers New Mexico's small businesses and food enterprises through technical assistance and equitable access to capital. The organization focuses on supporting entrepreneurs in the food and agricultural sectors, helping to build a stronger, more resilient local food system and to promote economic opportunity in underserved communities.

A central element of Vida Mejor Capital's work is its Navigation Services Center, which functions as a rural business incubator providing comprehensive, no-cost support to New Mexican entrepreneurs in the healthy and fresh food industry. Through this center, the organization helps food businesses develop and grow, offering guidance on the many challenges of launching and sustaining an enterprise.

The organization provides financial assistance through grants and loans to support food and agricultural enterprises, helping entrepreneurs access the capital they need to start and expand their businesses. It also offers business development services, including support with marketing, feasibility studies, and overall business strategy, helping businesses strengthen their operations and reach new markets.

By focusing on the food sector, Vida Mejor Capital addresses both economic development and food access, recognizing that strengthening local food enterprises can improve the availability of healthy food while creating jobs and opportunity. The organization has been involved in efforts to expand food access in New Mexico, including participation in initiatives that bring resources to underserved communities.

Vida Mejor Capital emphasizes equity in its work, aiming to ensure that entrepreneurs who have historically lacked access to capital and support can participate in and benefit from economic development. Supported by grants, philanthropy, and partnerships, the organization serves New Mexico entrepreneurs, particularly those in rural and underserved areas. Through its combination of technical assistance and access to capital, Vida Mejor Capital works to build sustainable, inclusive economic opportunity and a healthier local food system across the state.`,

  'animal-humane-new-mexico': `Animal Humane New Mexico is an Albuquerque-based nonprofit dedicated to the welfare of dogs and cats, providing adoption, veterinary, and other services to animals and the community. With a long history of serving the Albuquerque area, the organization works to find homes for homeless pets, reduce pet overpopulation, and support the bond between people and animals.

The organization operates an adoption program that places homeless dogs and cats into loving homes, taking in animals and providing them with care until they can be adopted. As a limited-admission organization focused on adoption and welfare, it works to give animals the time and support they need to find permanent homes.

Animal Humane New Mexico also operates veterinary services, including spay and neuter programs and clinics that provide affordable care to the public. Spaying and neutering are essential to reducing pet overpopulation, and the organization's efforts in this area help address the root causes of animal homelessness. Affordable veterinary care helps keep pets healthy and in their homes.

Beyond adoption and veterinary care, the organization engages in community programs, education, and support designed to promote responsible pet ownership and animal welfare. It works to keep pets and their families together and to provide resources that help people care for their animals.

The organization relies on adoptions, donations, veterinary service revenue, retail operations, and volunteers to sustain its work. Its programs reflect a comprehensive approach to animal welfare that addresses adoption, healthcare, population control, and community support.

Serving the Albuquerque metropolitan area, Animal Humane New Mexico has helped countless dogs and cats find homes and has provided essential services to pets and their owners. Through adoption, veterinary care, spay and neuter programs, and community engagement, the organization works to improve the lives of animals and to strengthen the relationships between people and their pets across central New Mexico.`,

  'santa-fe-animal-shelter-humane-society': `Santa Fe Animal Shelter & Humane Society is a nonprofit organization that provides shelter, adoption, veterinary, and animal welfare services in the Santa Fe area. As the primary animal shelter for the region, it cares for homeless, lost, and surrendered animals and works to find them loving homes while promoting animal welfare throughout the community.

The organization takes in dogs, cats, and other animals, providing them with shelter, medical care, and the support they need until they can be adopted or reunited with their owners. Its adoption program places animals into new homes, working to ensure good matches between pets and families. As an open-admission shelter, it accepts animals in need regardless of their circumstances.

The shelter operates veterinary services, including spay and neuter programs and a community veterinary clinic that provides affordable care to the public. These services help control pet overpopulation, keep animals healthy, and make veterinary care more accessible to pet owners who might otherwise struggle to afford it. Spay and neuter efforts are central to reducing the number of homeless animals over time.

Santa Fe Animal Shelter & Humane Society also engages in community programs, humane education, and outreach designed to promote responsible pet ownership, prevent animal cruelty, and support the human-animal bond. It works to keep pets in their homes and to provide resources for people facing challenges in caring for their animals.

Supported by adoptions, donations, veterinary service revenue, retail operations, and a dedicated corps of volunteers, the organization sustains a wide range of animal welfare programs. Serving Santa Fe and the surrounding area, Santa Fe Animal Shelter & Humane Society works to provide compassionate care for animals in need, to find homes for homeless pets, and to advance animal welfare across northern New Mexico through its shelter, clinic, and community services.`,

  'high-desert-humane-society': `High Desert Humane Society is a nonprofit animal shelter serving Silver City and Grant County in southwestern New Mexico. The organization provides shelter and care for homeless and abandoned animals and works to find them new homes, serving as an important resource for animal welfare in a rural region of the state.

The shelter takes in dogs, cats, and other animals in need, providing them with food, shelter, and care while working to place them in adoptive homes. Through its adoption program, the organization connects animals with families and individuals looking to provide them with permanent homes, helping to reduce the number of homeless animals in the community.

As a shelter serving a rural area, High Desert Humane Society plays a vital role in caring for animals that might otherwise have few options. Rural communities often face particular challenges in animal welfare, including limited resources and access to veterinary care, and the shelter helps address these needs for Silver City and the surrounding region.

The organization works to promote spaying and neutering and responsible pet ownership, recognizing that addressing pet overpopulation is key to reducing the number of homeless animals over the long term. It also provides services to help reunite lost pets with their owners and to support the community's animals.

High Desert Humane Society relies heavily on community support, including donations, adoption fees, and volunteers who help care for the animals and support the shelter's operations. The dedication of volunteers and supporters is essential to sustaining its work in a smaller community with limited resources.

Serving Silver City and Grant County, High Desert Humane Society provides essential animal welfare services in southwestern New Mexico. Through sheltering, adoption, and community efforts, the organization works to care for homeless animals, find them loving homes, and promote the wellbeing of animals throughout the region it serves.`,

  'new-mexico-association-of-nonprofits': `The New Mexico Association of Nonprofits was a statewide membership organization that supported and strengthened the nonprofit sector across New Mexico. Serving as a hub for nonprofits throughout the state, it provided resources, training, advocacy, and networking opportunities designed to help nonprofit organizations operate more effectively and advance their missions.

The association offered capacity-building services to its member organizations, including training and educational programs on topics such as governance, fundraising, management, and compliance. By helping nonprofits build their skills and knowledge, the organization worked to strengthen the sector as a whole and to improve the ability of individual organizations to serve their communities.

The association also engaged in advocacy on behalf of the nonprofit sector, representing the interests of nonprofits in policy discussions and working to create a supportive environment for charitable organizations in New Mexico. This advocacy role helped ensure that the concerns and contributions of the nonprofit sector were recognized and addressed.

Networking and connection were central to the association's purpose, bringing together nonprofit leaders and organizations to share knowledge, collaborate, and support one another. By fostering these connections, the organization helped build a stronger, more cohesive nonprofit community across the state.

The nonprofit sector plays a significant role in New Mexico, providing essential services, employment, and community benefit. Strengthening this sector through training, advocacy, and connection contributes to the wellbeing of communities throughout the state.

The New Mexico Association of Nonprofits later became part of Groundworks New Mexico, joining with related capacity-building efforts to continue serving the sector. Through its work, the association contributed to building a stronger, more effective nonprofit community in New Mexico, helping organizations across the state better serve the people and causes they exist to support.`,

  'groundworks-new-mexico': `Groundworks New Mexico is an Albuquerque-based capacity-building organization that strengthens the state's social sector by providing learning opportunities, technical assistance, and support to nonprofits and the professionals who work in them. The organization was formed through the coming together of the New Mexico Association of Grantmakers and the Center for Nonprofit Excellence, uniting funders and nonprofits under a single banner.

The organization's mission centers on connecting, strengthening, and advocating for New Mexico's social sector while helping it reach its full potential. Through its Center for Nonprofit Excellence, Groundworks provides educational programs, training, and one-on-one technical assistance to help nonprofit organizations build their capacity, improve their operations, and increase their impact.

Groundworks offers professional networking and learning opportunities, both in person and virtually, that bring together people across the social sector to share knowledge, build relationships, and learn from one another. These opportunities help connect and unite a sector that includes diverse organizations working on a wide range of causes throughout the state.

The organization also supports nonprofits in areas such as compliance, transparency, and accountability, helping them meet the standards and expectations that come with operating as charitable organizations. By strengthening these practices, Groundworks helps build trust and effectiveness across the sector.

Groundworks emphasizes values including racial equity, collaboration, community, and impact, reflecting a commitment to advancing not only the strength of individual organizations but also broader goals of equity and community wellbeing. By bringing together grantmakers and nonprofits, the organization works to foster collaboration across the sector.

Supported by memberships, grants, and contributions, Groundworks New Mexico serves as a central resource for the state's nonprofits and funders. Through its capacity-building, networking, and advocacy efforts, the organization works to unleash the full potential of New Mexico's social sector and to strengthen the organizations that serve communities across the state.`,

  'center-for-nonprofit-excellence': `The Center for Nonprofit Excellence is a capacity-building initiative that provides training, technical assistance, and resources to strengthen nonprofit organizations in New Mexico. Associated with efforts to support the state's social sector, the center works to help nonprofits operate more effectively, build their skills, and increase their impact in the communities they serve.

The center offers educational programs and training on the many aspects of nonprofit management, including governance, fundraising, financial management, leadership, and compliance. By building the knowledge and skills of nonprofit staff, board members, and volunteers, it helps organizations strengthen their operations and better fulfill their missions.

In addition to training, the center provides one-on-one technical assistance, working directly with organizations to address their specific challenges and needs. This individualized support helps nonprofits solve problems, improve their practices, and build the capacity needed to grow and sustain their work.

The center also supports nonprofits in maintaining strong practices around transparency, accountability, and compliance, helping them meet the standards expected of charitable organizations and build trust with funders, donors, and the public. Strong organizational practices are essential to the long-term health and effectiveness of nonprofits.

By strengthening individual organizations, the Center for Nonprofit Excellence contributes to the overall health of New Mexico's nonprofit sector, which provides essential services and community benefit across the state. A stronger sector means more effective organizations better able to serve their communities.

The Center for Nonprofit Excellence became part of Groundworks New Mexico, joining with related capacity-building efforts to continue serving the sector under a unified organization. Through its training, technical assistance, and support, the center has worked to build the capacity and effectiveness of nonprofits throughout New Mexico, helping them better serve the people and causes that depend on them and contributing to a stronger social sector statewide.`,

  'new-mexico-association-of-grantmakers': `The New Mexico Association of Grantmakers was a membership organization that brought together foundations, corporate giving programs, and other funders to strengthen and advance philanthropy across New Mexico. Serving as a hub for the state's grantmaking community, it provided resources, networking, and support designed to improve the practice and impact of philanthropy in the state.

The association connected grantmakers with one another, fostering collaboration, the sharing of knowledge, and coordinated approaches to addressing community needs. By bringing funders together, it helped build relationships and partnerships that could increase the effectiveness of philanthropic investment in New Mexico.

The organization provided educational programs, resources, and support to help grantmakers improve their practices and stay informed about emerging issues and best practices in philanthropy. These efforts helped funders make more informed and effective decisions in their grantmaking, ultimately benefiting the nonprofits and communities they support.

The association also worked to promote philanthropy and to represent the interests and perspectives of the grantmaking community in broader discussions about the social sector and community needs. By raising awareness of philanthropy's role and contributions, it helped strengthen the environment for charitable giving in the state.

Philanthropy plays an important role in supporting the nonprofit sector and addressing community needs in New Mexico, and a strong, connected grantmaking community contributes to more effective and strategic giving. By supporting funders, the association indirectly strengthened the many organizations and causes that depend on philanthropic support.

The New Mexico Association of Grantmakers became part of Groundworks New Mexico, joining with nonprofit capacity-building efforts under a unified organization that serves both funders and nonprofits. Through its work bringing grantmakers together and supporting effective philanthropy, the association contributed to a stronger and more collaborative philanthropic and social sector across New Mexico.`,

  'new-mexico-center-on-law-and-poverty': `The New Mexico Center on Law and Poverty is an Albuquerque-based nonprofit that advances economic and social justice through legal advocacy, policy work, and litigation on behalf of low-income New Mexicans. The organization works to ensure that people living in poverty have access to the resources, services, and rights to which they are entitled, and to address systemic barriers that perpetuate poverty.

The center engages in advocacy and litigation across a range of issues affecting low-income people, including access to healthcare, public benefits, education, fair treatment, and economic security. By using legal tools and policy advocacy, the organization works to hold government and institutions accountable and to secure and protect the rights of vulnerable populations.

The organization has worked on issues such as access to Medicaid and other public benefits, food assistance, education equity, and consumer protections, advocating for systems that work fairly for low-income people. Its litigation and advocacy aim to address not just individual cases but the broader policies and practices that affect poverty across the state.

The New Mexico Center on Law and Poverty combines legal expertise with policy analysis and advocacy, allowing it to pursue change through multiple avenues. It works with affected communities, partners with other organizations, and engages with policymakers to advance reforms that improve the lives of low-income New Mexicans.

New Mexico has high rates of poverty, and many residents face significant barriers to accessing the services and opportunities they need. The center works to break down these barriers and to advance a more just and equitable system, focusing on the structural issues that contribute to poverty and economic hardship.

Supported by grants and donations, the New Mexico Center on Law and Poverty serves as an advocate for economic and social justice in the state. Through its legal and policy work, the organization strives to improve conditions for low-income New Mexicans and to advance fairness and opportunity across the state.`,

  'center-for-action-and-contemplation': `The Center for Action and Contemplation is an Albuquerque-based nonprofit educational organization founded in 1987 by Father Richard Rohr, a Franciscan friar and author. The center is dedicated to the integration of action and contemplation, drawing on contemplative spiritual traditions to support personal and social transformation grounded in compassion and justice.

The organization is known for its teaching and educational programs that explore contemplative spirituality, the perennial wisdom traditions, and the connection between inner spiritual life and outer engagement with the world. Its work emphasizes that authentic spirituality should lead to compassionate action and a commitment to justice, reflecting the integration of contemplation and action that gives the center its name.

The center reaches a wide audience through online courses, publications, podcasts, conferences, and other educational offerings. Father Richard Rohr's writings and teachings have a broad following, and the center has become an influential voice in contemporary contemplative Christianity and interfaith spiritual exploration. Its programs draw participants from around the world.

A notable initiative of the center is the Living School, an educational program that offers in-depth study in the contemplative tradition, guiding students through a structured course of learning aimed at deepening their spiritual understanding and their capacity for transformation. The school reflects the center's commitment to serious, sustained spiritual education.

The center's teaching emphasizes themes such as nondual consciousness, compassion, humility, and the connection between spirituality and social engagement. It draws on Christian mysticism and other wisdom traditions to offer a path of spiritual growth oriented toward both inner transformation and engagement with the suffering and injustice of the world.

Supported by donations, program revenue, and a broad community of supporters, the Center for Action and Contemplation continues the work begun by its founder, offering spiritual education and resources to people seeking to integrate contemplative practice with compassionate action in their lives and in the world.`,

  'ghost-ranch-education-and-retreat-center': `Ghost Ranch is a nonprofit education and retreat center located near Abiquiú in northern New Mexico, set amid the dramatic landscapes that inspired artist Georgia O'Keeffe. Spanning a vast and scenic property of colorful cliffs, mesas, and high desert, the ranch offers retreats, workshops, educational programs, and outdoor experiences in a setting of remarkable natural beauty.

The center is affiliated with the Presbyterian Church and welcomes people of all backgrounds and faiths. It hosts a wide range of programs throughout the year, including spiritual retreats, art and photography workshops, classes in subjects ranging from history to wellness, and outdoor activities such as hiking and horseback riding. The ranch serves as a place for learning, reflection, renewal, and connection with the land.

Ghost Ranch's landscape is deeply associated with Georgia O'Keeffe, who lived and painted in the area, and the dramatic scenery continues to draw artists, photographers, and visitors inspired by its beauty. The property's geology, including its distinctive red and yellow cliffs, and its connections to paleontology, with significant fossil discoveries having been made there, add to its rich character and educational appeal.

The ranch offers lodging and meals, allowing guests to stay on the property during retreats and programs and to immerse themselves in the setting. It serves individuals, groups, and organizations seeking a place for gatherings, conferences, retreats, and educational experiences in a tranquil and inspiring environment.

With its combination of natural beauty, cultural and artistic significance, and diverse educational programming, Ghost Ranch occupies a distinctive place among retreat and education centers. Supported by program fees, lodging revenue, donations, and its affiliation with the Presbyterian Church, Ghost Ranch continues to welcome visitors from across the country and around the world to experience learning, renewal, and the extraordinary landscape of northern New Mexico.`,

  'taos-ski-valley-foundation': `Taos Ski Valley Foundation is a nonprofit that supports the Taos community through grantmaking and charitable initiatives, with a particular focus on environmental stewardship and community wellbeing. Connected to Taos Ski Valley, the foundation channels charitable contributions toward organizations and causes that benefit the people and natural environment of the Taos area.

The foundation focuses much of its environmental work on forest health, waterways protection, and wildfire prevention and mitigation, recognizing the growing threats that wildfire and environmental degradation pose to the region. It supports organizations working on these issues, including efforts related to water funds, land trusts, and forest stewardship, helping to protect the landscapes and resources on which the community depends.

In addition to environmental work, the foundation operates community programs that partner with local nonprofits to support arts and culture, health, education, critical services, and overall wellbeing. Through these partnerships, it helps strengthen the network of organizations serving the Taos community and addressing local needs.

The foundation has provided significant charitable support to the Taos and broader New Mexico community, including emergency relief during crises such as wildfires. By contributing to emergency funds and disaster relief efforts, it helps the community respond to and recover from major challenges that affect residents' lives and livelihoods.

The foundation's giving has supported a range of organizations, including those focused on conservation, youth development, food security, and outdoor equity, reflecting a broad commitment to the wellbeing of the Taos region and its people. Its support helps these organizations carry out their missions and serve the community.

Supported by contributions connected to Taos Ski Valley and other sources, Taos Ski Valley Foundation works to give back to the community and to protect the natural environment that defines the Taos area. Through its grantmaking and partnerships, the foundation invests in the long-term health, resilience, and wellbeing of the Taos community and its surrounding landscape.`,

  'anchorum-health-foundation': `Anchorum Health Foundation is a Santa Fe-based foundation dedicated to improving the conditions that most influence the health of communities and people in northern New Mexico. The foundation was created following a major restructuring of ownership in CHRISTUS St. Vincent Regional Medical Center, through which the nonprofit, formerly known as Anchorum St. Vincent, transferred its ownership stake and funded the creation of a substantial endowment.

The transaction that established Anchorum Health Foundation resulted in a large endowment over a period of years, making it one of the largest foundations in New Mexico. This significant resource positions the foundation to make a substantial and lasting impact on health and wellbeing across the region it serves.

The foundation focuses on the broader determinants of health, addressing the underlying social, economic, and environmental conditions that shape people's health outcomes rather than focusing solely on medical care. This approach recognizes that factors such as housing, food, education, and economic security have a profound influence on community health, and that addressing these conditions is essential to improving wellbeing.

Anchorum makes grants and investments to support organizations and initiatives working to improve health and address health disparities in northern New Mexico. Building on a history of grantmaking that began before the restructuring, when Anchorum St. Vincent provided substantial funding to improve healthcare in the region, the foundation continues to invest in efforts that strengthen community health.

By focusing on the conditions that influence health and by bringing significant resources to bear, Anchorum Health Foundation works to address the health challenges facing northern New Mexico, a region with notable health disparities. Through its grantmaking and partnerships, the foundation aims to create lasting improvements in the health and wellbeing of communities and individuals across the region it serves.`,

  'dreamtree-project': `DreamTree Project is a Taos-based nonprofit that provides shelter and supportive services to youth experiencing homelessness in northern New Mexico. The organization works to ensure that young people facing housing instability have a safe place to stay and the support they need to move toward stability and a more hopeful future.

DreamTree operates an emergency youth shelter that provides a safe haven for young people who have nowhere else to go, offering them shelter, food, and basic necessities. The organization also provides transitional living programs that help older youth and young adults develop the skills and stability needed to live independently, bridging the gap between crisis and self-sufficiency.

The organization serves runaway, homeless, and at-risk youth, populations that are especially vulnerable and often underserved. Young people experiencing homelessness face significant dangers and challenges, and DreamTree works to meet their immediate needs while helping them address the circumstances that led to their housing instability. Case management, counseling, and connections to education and employment support help young people build a path forward.

DreamTree also works to support family reunification when appropriate and safe, and to help youth develop the life skills, education, and resources they need to succeed. Its programs are designed to address the whole young person, recognizing that lasting stability requires more than just a place to sleep.

Youth homelessness is a serious issue, and in rural areas like northern New Mexico, resources for homeless young people can be especially scarce. DreamTree Project fills a critical gap, providing services that might otherwise be unavailable to vulnerable youth in the region.

Supported by grants, donations, and community support, DreamTree Project serves young people in Taos and the surrounding area. Through its shelter, transitional living programs, and supportive services, the organization works to help homeless and at-risk youth find safety, stability, and the opportunity to build better futures.`,

  'mainstreet-de-las-vegas': `MainStreet de Las Vegas is a nonprofit organization dedicated to revitalizing the historic downtown of Las Vegas, New Mexico, and supporting the economic vitality of the community. As an accredited program within the New Mexico MainStreet network and the national Main Street America movement, it works to preserve the area's historic character while promoting economic development and community pride.

The organization focuses on the revitalization of Las Vegas's historic commercial corridor, which includes the Plaza, Bridge Street, Douglas Avenue, and the Railroad District. Its work encompasses economic development, support for local businesses, facade and building renovations, beautification efforts, and the preservation of the area's rich historical, cultural, and architectural resources.

MainStreet de Las Vegas works to attract and support small businesses, facilitate the rehabilitation and reuse of vacant historic buildings, and create a vibrant downtown that supports commerce while celebrating the community's heritage. In recent years, the district has seen new businesses open and historic buildings change hands and be restored, reflecting the organization's efforts to strengthen the local economy.

The organization also organizes cultural events and works to instill a sense of place and community pride, embracing the area's history, arts, and natural environment. Las Vegas, New Mexico, possesses a wealth of historic architecture and a rich cultural heritage, and MainStreet de Las Vegas works to leverage these assets for community and economic benefit.

By combining historic preservation with economic development, the organization pursues a model of revitalization that honors the past while building toward a more prosperous future. Its partnerships and collaborations with the community, businesses, and other stakeholders are central to its approach.

Supported by grants, memberships, and community contributions, MainStreet de Las Vegas works to create a unique and vital downtown that supports the business community, celebrates history and culture, and enhances the quality of life in Las Vegas, New Mexico.`,

  'new-mexico-mainstreet-program': `New Mexico MainStreet is a statewide economic development program that supports the revitalization of historic and traditional commercial districts in communities across New Mexico. Operating as part of the state's economic development efforts and connected to the national Main Street America movement, the program provides technical assistance, training, and resources to local MainStreet organizations and districts throughout the state.

The program supports a network of accredited and affiliated local MainStreet organizations in communities across New Mexico, helping them pursue downtown revitalization through a comprehensive approach that addresses economic vitality, historic preservation, design and beautification, organization, and promotion. By providing expertise and support, New Mexico MainStreet helps these local efforts succeed.

New Mexico MainStreet offers technical assistance in areas such as economic development, historic preservation, urban design, business development, and community organizing. It helps local districts develop plans, attract and support businesses, rehabilitate historic buildings, and create vibrant, economically healthy downtowns that serve as centers of community life.

The program emphasizes the preservation of New Mexico's historic and cultural heritage, recognizing the value of the state's traditional commercial districts and historic buildings. By supporting their revitalization rather than allowing them to decline, the program helps communities retain their character and sense of place while fostering economic growth.

Revitalized downtowns support local businesses, create jobs, attract visitors, and strengthen community identity, contributing to the economic and social wellbeing of the communities they serve. New Mexico MainStreet's statewide support helps extend these benefits to communities across the state, including smaller and rural towns.

Through its network, technical assistance, and resources, New Mexico MainStreet works to strengthen downtowns and commercial districts throughout New Mexico. The program helps communities harness their historic assets and entrepreneurial energy to build vibrant, economically vital, and culturally rich downtowns that serve residents and visitors alike.`,

  'las-vegas-first-community-services-foundation': `Las Vegas First Community Services Foundation is a nonprofit organization that works to advance the economic vitality and to support the rich history and culture of Las Vegas, New Mexico, and the surrounding area. The foundation promotes local businesses, tourism, and education, celebrating the community's local art, music, architecture, history, and outdoor recreation.

The organization grew out of Las Vegas First, which began as the Las Vegas First Independent Business Alliance, a voluntary association of independently owned businesses in and around Las Vegas that has existed since the early 1990s. In 2020, the organization expanded its scope by establishing Las Vegas First Community Services Foundation as a charitable nonprofit, broadening its mission beyond business advocacy.

The foundation supports the local economy and small businesses while promoting cultural tourism, recognizing the value of the area's artists, musicians, historic architecture, and natural surroundings. By celebrating and promoting these assets, it works to attract visitors and to strengthen the community's economic and cultural life.

Membership in the organization is open to independently owned businesses, local nonprofits, and supportive individuals, reflecting its roots as a business alliance and its broad base of community support. With a substantial membership, the foundation brings together businesses and community members around shared goals of economic vitality and cultural celebration.

The organization's work spans economic development, cultural promotion, and education, reflecting an integrated approach to strengthening the Las Vegas community. By supporting local businesses, promoting tourism, and celebrating the area's heritage and recreational opportunities, it works to enhance the quality of life for residents and the prosperity of the community.

Supported by memberships, contributions, and community involvement, Las Vegas First Community Services Foundation serves as an advocate and champion for Las Vegas, New Mexico. Through its efforts to promote local businesses, tourism, and culture, the organization works to advance the economic and cultural wellbeing of the community and the surrounding area.`,

  'las-vegas-arts-council': `Las Vegas Arts Council is a nonprofit organization that supports and promotes the arts in Las Vegas, New Mexico, and the surrounding region. The council works to foster a vibrant arts community, providing opportunities for artists, presenting exhibitions and events, and enriching the cultural life of the community.

The organization supports local artists and the arts through programming that may include exhibitions, gallery space, events, and opportunities for artists to show and sell their work. By providing venues and platforms for creative expression, the council helps sustain a community of artists and brings art to residents and visitors in the Las Vegas area.

Las Vegas, New Mexico, has a rich cultural heritage and a community of artists, and the arts council works to nurture and celebrate this creative vitality. Its efforts contribute to the cultural identity of the community and support the role of the arts in fostering community pride, engagement, and economic activity.

The council engages the community through arts programming and events that bring people together and provide opportunities for cultural participation and enjoyment. By making the arts accessible and visible, it helps build appreciation for the arts and supports the creative economy in a region with deep cultural roots.

Arts organizations like the council play an important role in smaller communities, where they help sustain cultural life, support local artists, and contribute to community vitality and tourism. The presence of a strong arts community can enhance the appeal and quality of life of a place, and the council works to advance these benefits for Las Vegas.

Supported by memberships, donations, and community involvement, Las Vegas Arts Council serves as an advocate and resource for the arts in its community. Through its exhibitions, events, and support for artists, the organization works to promote creativity, celebrate the area's cultural heritage, and enrich the cultural and artistic life of Las Vegas, New Mexico, and the surrounding region.`,

  'taos-community-foundation': `Taos Community Foundation is a nonprofit community foundation that supports charitable giving and addresses community needs in the Taos area of northern New Mexico. As a community foundation, it serves as a vehicle for donors to support causes they care about and channels resources toward organizations and initiatives that benefit the Taos region.

The foundation manages charitable funds established by donors, including funds dedicated to specific causes, organizations, or community needs. By pooling and stewarding these resources, the foundation is able to make grants that support a wide range of organizations and efforts in the Taos area, from arts and education to health, social services, and the environment.

A key role of community foundations is connecting philanthropy with community needs, and Taos Community Foundation works to understand the needs of the Taos region and to direct charitable resources where they can have the greatest impact. It awards grants to local nonprofits and initiatives, helping to strengthen the network of organizations serving the community.

The foundation also plays an important role in responding to community crises and emergencies. It has established and managed funds to provide relief during disasters, such as wildfires, helping the community respond to and recover from major events that affect residents' lives and livelihoods.

By building permanent charitable resources and fostering philanthropy, the foundation works to support the long-term wellbeing of the Taos community. Endowed funds and ongoing giving help ensure that resources will be available to address community needs both now and in the future.

Supported by donor contributions and the funds it manages, Taos Community Foundation serves as a hub for charitable giving and community investment in the Taos area. Through its grantmaking, fund management, and responsiveness to community needs, the foundation works to strengthen the Taos region and to improve the lives of its residents across a range of causes and concerns.`,

  'krossroads-las-vegas-nm': `Krossroads Integrative Health and Recovery Solutions operates a location in Las Vegas, New Mexico, as part of a behavioral health organization serving northern New Mexico communities. Founded in 2021 and women-owned, Krossroads provides substance use disorder treatment and behavioral health services to individuals and families across a region stretching from the Rio Grande Valley to communities in northern New Mexico.

The Las Vegas location is part of a network that includes centers in Las Vegas, Raton, Española, Santa Fe, and Albuquerque, allowing the organization to serve clients across a wide area of the state. Krossroads provides services including medication-assisted treatment, psychiatric evaluation and management, intensive outpatient programming, community support services, and individual and group therapies.

A significant resource associated with the Las Vegas area is the Krossroads Withdrawal Management Center, an inpatient medical detoxification facility located within Alta Vista Regional Hospital in Las Vegas. This center provides medically supervised detox for individuals seeking to safely withdraw from substances, offering a critical service for those beginning the recovery process from substance use disorders.

Krossroads takes an integrative approach to health and recovery, combining medical treatment, psychiatric care, therapy, and community support to address substance use and behavioral health needs comprehensively. By treating both the medical and psychological dimensions of addiction and behavioral health, the organization works to support lasting recovery.

The organization addresses substance use and behavioral health challenges in a region of New Mexico where such services can be limited, particularly in smaller and rural communities. By establishing a presence in Las Vegas and other northern New Mexico towns, Krossroads helps expand access to treatment and recovery support.

As a behavioral health organization holding nonprofit status, Krossroads serves individuals and families seeking help with substance use and recovery. Through its Las Vegas location and broader network, Krossroads Integrative Health and Recovery Solutions works to provide accessible, comprehensive treatment and to support recovery across northern New Mexico.`,

  'krossroads-raton-nm': `Krossroads Integrative Health and Recovery Solutions operates a location in Raton, New Mexico, extending its behavioral health and recovery services to communities in the northeastern part of the state. Founded in 2021 and women-owned, Krossroads serves individuals and families dealing with substance use disorders and behavioral health needs across a region that spans from the Albuquerque area to northern New Mexico communities.

The Raton location is part of a network of Krossroads centers that also includes sites in Las Vegas, Española, Santa Fe, and Albuquerque, enabling the organization to reach clients across a broad geographic area, including smaller and more remote communities. Raton, located near the Colorado border, is one of the more rural and isolated communities the organization serves.

At its locations, Krossroads provides a range of services, including medication-assisted treatment, psychiatric evaluation and management, intensive outpatient programming, comprehensive community support services, and individual and group therapies. These services address both the medical and psychological aspects of substance use and behavioral health, reflecting the organization's integrative approach to treatment and recovery.

By establishing a presence in Raton, Krossroads helps address the shortage of behavioral health and substance use treatment services in northeastern New Mexico, where access to such care can be especially limited. Rural communities often face significant barriers to treatment, including distance and a scarcity of providers, and the Raton location helps bring services closer to those who need them.

Krossroads's integrative model combines medical care, psychiatric services, therapy, and community support to provide comprehensive treatment for substance use and behavioral health conditions. This holistic approach aims to support lasting recovery and improved wellbeing for clients.

As a behavioral health organization holding nonprofit status, Krossroads serves individuals and families seeking help with substance use and recovery. Through its Raton location and broader network, Krossroads Integrative Health and Recovery Solutions works to expand access to treatment and recovery support across northern and northeastern New Mexico.`,
};

async function main() {
  let updated = 0;
  let notFound = 0;

  for (const [slug, description] of Object.entries(DESCRIPTIONS)) {
    const result = await sql`
      UPDATE listings
      SET full_description = ${description}, updated_at = now()
      WHERE slug = ${slug} AND status = 'approved' AND deleted_at IS NULL
      RETURNING id, name
    `;
    if (result.length === 0) {
      console.warn(`  WARN  slug not found: ${slug}`);
      notFound++;
    } else {
      console.log(`  ok  [${result[0].id}] ${result[0].name}`);
      updated++;
    }
  }

  console.log(`\nUpdated: ${updated}  Not found: ${notFound}`);
}

main().catch((e) => { console.error(e); process.exit(1); });

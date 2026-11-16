# 06. How AI changes industries: time saved and time newly spent

Research date: 27 October 2026. Evidence from 2024 to 2026 first.

## How to read the tags

- **Verified**: checked against a primary or close-to-primary source in this research pass. URL given.
- **Plausible**: well-known published study, cited from prior knowledge or secondary coverage. Check the URL before quoting.
- **Estimate**: our own judgement or a forecast. Not a measurement.
- **[VENDOR]**: the number comes from a company that sells the tool. Treat it as weaker.

## Cross-industry baseline

| Finding | Number | Tag | Source |
|---|---|---|---|
| Self-reported time saved by US genAI users | 5.4% of hours, about 2.2 h per 40 h week. Highest in computer and math jobs and in information services. Lowest in personal services and leisure. | Verified (survey) | https://www.stlouisfed.org/open-vault/2025/oct/generative-ai-productivity-future-work |
| Same, spread over all workers | 1.6% of all work hours, up to 1.3% labour productivity | Verified (survey) | https://www.stlouisfed.org/on-the-economy/2025/nov/state-generative-ai-adoption-2025 |
| Denmark, 25,000 workers, 11 exposed jobs | About 3% time saved. No effect on earnings or hours (rules out more than 1%). 8.4% of workers got new AI tasks. Employer push raised adoption from 47% to 83%. | Verified | https://ideas.repec.org/p/nbr/nberwo/33777.html |
| M365 Copilot randomised field study, about 6,000 workers, 56 firms | About 40% used it regularly. Email time fell about 1.4 h a week (intent to treat). No clear change in meeting time. | Verified [VENDOR authors, but randomised] | https://arxiv.org/pdf/2504.11436 |
| Early-career jobs in exposed occupations | Ages 22 to 25 saw a 13% relative fall in employment since late 2022 (August 2025 paper). The November 2025 revision reports 16%. Older workers in the same jobs held or grew. Change shows in hiring, not wages. | Verified | https://digitaleconomy.stanford.edu/event/bharat-chandar-canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/ |

**Pattern across studies.** Lab and narrow-task trials show 15% to 55% speedups. Field studies of whole jobs show 2% to 6% of hours saved. The gap is review time, uneven use, and saved time going into other work rather than leaving the payroll. (Estimate, built on the rows above.)

**New work that appears in every sector.** Checking and fixing AI output, writing prompts and templates, tuning and watching agents, data clean-up, AI governance and audit trails, and training staff. The Danish study is one of the few that measures this directly (8.4% of workers got new tasks).

---

## 1. Software

**Tasks AI does today.** Code completion, boilerplate, tests, code explanation, migrations, pull request summaries, first-pass code review, and increasingly agentic multi-file changes.

**Measured time savings.**
- GitHub Copilot lab task: 55.8% faster on a single bounded task. Plausible [VENDOR co-authors]. https://arxiv.org/abs/2302.06590
- Field trials at Microsoft, Accenture and a Fortune 100 firm, about 4,900 developers: 26% more completed pull requests. Gains larger for junior staff. Plausible. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4945566
- Google internal RCT: about 21% faster on an enterprise task. Plausible [VENDOR]. https://arxiv.org/abs/2410.12944
- METR RCT, experienced open-source developers on their own repos, early 2025 tools: 19% **slower**, while they believed they were 20% faster. Verified via coverage. https://newsletter.getdx.com/p/metr-study-on-how-ai-affects-developer-productivity
- DORA 2024: more AI use linked to slightly lower delivery throughput and stability. Plausible. https://dora.dev/research/2024/dora-report/

**Adoption.** Highest of any sector. Most professional developers use AI tools weekly. Plausible (Stack Overflow 2025 survey). https://survey.stackoverflow.co/2025/

**New work.** Reviewing AI-written code, security and licence checks, writing specs and context files for agents, evaluation suites, managing agent runs and their cost.

**Jobs.** Most exposed: junior developers, manual QA testers, routine front-end and integration work. Growing: senior and staff engineers who review and design, platform and security engineers, AI and ML engineers, eval and reliability roles.

**Outlook.**
- 1 year: agents handle well-scoped tickets. Review becomes the bottleneck. Estimate.
- 3 years: team shape shifts toward fewer juniors per senior. Code volume rises faster than headcount. Estimate.
- 5 years: much routine maintenance and migration run by agents under human sign-off. Estimate.
- 10 years: the job centres on intent, architecture, verification and accountability. Estimate.

## 2. Finance and insurance

**Tasks AI does today.** Customer service chat, KYC and document intake, claims triage and first notice of loss, fraud flags, credit memo drafts, research summaries for advisers, reconciliation and close support, underwriting data extraction.

**Measured time savings.**
- Customer support agents (a software firm help desk, often cited for financial-style service work): 14% more issues resolved per hour on average, 34% for novices. Plausible. https://www.nber.org/papers/w31161
- Klarna said its assistant did the work of 700 agents and cut resolution time from 11 to 2 minutes. Later it rehired some humans for quality. Plausible [VENDOR, self-reported]. https://www.klarna.com/international/press/klarna-ai-assistant-handles-two-thirds-of-customer-service-chats-in-its-first-month/
- Morgan Stanley adviser meeting notes tool: time savings stated by the firm only. Plausible [VENDOR / firm claim].

**Adoption.** High in large banks and insurers, mostly internal copilots and service. Strict model-risk rules slow fully automated decisions. Plausible.

**New work.** Model risk validation, explainability files for regulators, fairness testing, human review of flagged cases, AI incident logs. EU AI Act treats credit scoring and some insurance pricing as high risk. Verified. https://artificialintelligenceact.eu/annex/3/

**Jobs.** Most exposed: contact centre agents, claims processors, loan processors, junior analysts, data entry. Growing: model risk and AI governance, fraud analysts working with AI, data engineers, complex-case adjusters.

**Outlook.** 1 year: service and back-office copilots everywhere. 3 years: straight-through processing for simple claims and loans. 5 years: agent-run operations with human exception desks. 10 years: smaller operations staff, larger risk and control staff. All Estimate.

## 3. Healthcare

**Tasks AI does today.** Ambient scribes writing clinical notes, inbox reply drafts, prior authorisation letters, coding support, imaging triage and second reads, patient message triage.

**Measured time savings.**
- NEJM AI RCT, 238 outpatient doctors, two scribes vs usual care: Nabla cut time in notes by 9.5% (P=0.02), DAX Copilot showed no significant change (minus 1.7%). Single academic centre, Nov 2024 to Jan 2025, 14 specialties. Verified via abstract coverage, PubMed blocked by a check page. https://pubmed.ncbi.nlm.nih.gov/41497288/
- 24-week stepped-wedge trial across clinics in two US states: about 0.36 h a day less documentation, note quality held. Verified via coverage. https://www.news-medical.net/news/20251126/AI-tools-can-ease-documentation-burden-and-reduce-physician-burnout.aspx
- Scribe studies more consistently show lower burnout than large time cuts. Verified via coverage. https://www.consultant360.com/exclusive/ambient-ai-scribes-linked-lower-work-exhaustion-multistate-pragmatic-trial
- Swedish MASAI mammography trial: AI-supported screening cut radiologist reading workload by about 44% with similar or better cancer detection. Plausible. https://www.thelancet.com/journals/lanonc/article/PIIS1470-2045(23)00298-X/fulltext
- Vendor scribe claims of "2 hours a day saved" are much larger than the trials. [VENDOR], weaker.

**Adoption.** Ambient scribes spread fast in US health systems in 2024 to 2026. Clinical decision AI moves slower because of regulation and liability. Plausible.

**New work.** Checking and signing AI notes, catching invented details, governance committees, model monitoring for drift and bias, patient consent.

**Jobs.** Most exposed: medical transcriptionists, medical coders, scheduling and billing staff, some prior-authorisation work. Growing: nurses and care staff (demand driven by ageing), clinical informatics, AI safety and quality roles.

**Outlook.** 1 year: scribes become standard in outpatient care. 3 years: inbox and admin agents. 5 years: AI second reads routine in imaging and pathology. 10 years: care time per patient rises, admin share falls, clinician supply still the limit. All Estimate.

## 4. Retail and e-commerce

**Tasks AI does today.** Product descriptions and images, search and recommendations, service chat, demand forecasting, pricing, returns handling, marketing copy.

**Measured time savings.**
- Field experiments on an e-commerce marketplace showed AI tools raised sales in some uses (for example machine translation and product listing work). Plausible. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4914935
- Amazon says genAI made seller listing creation much faster. [VENDOR], weaker.
- Most published retail numbers are vendor or consultancy claims. Few independent time studies exist. Estimate.

**Adoption.** High in large online retailers, patchy in small shops and stores. Plausible.

**New work.** Brand and accuracy review of generated content, catalogue data quality, monitoring chatbots, managing AI shopping agents as a new channel.

**Jobs.** Most exposed: copywriters for catalogue content, service agents, merchandising analysts, cashiers (via self-checkout, older automation). Growing: retail data and pricing analysts, fulfilment technicians, customer experience designers.

**Outlook.** 1 year: AI content is default for catalogues. 3 years: shoppers' own AI agents buy on their behalf, changing search and ads. 5 years: store and warehouse staff mix shifts toward technicians. 10 years: much of discovery and purchase happens through agents. All Estimate.

## 5. Manufacturing and logistics

**Tasks AI does today.** Predictive maintenance, visual quality inspection, demand and route planning, warehouse robotics, document handling for freight and customs, maintenance manuals via chat.

**Measured time savings.**
- Most evidence is case studies from vendors and consultancies (for example WEF Lighthouse factories). [VENDOR / consultancy], weaker. https://initiatives.weforum.org/global-lighthouse-network/home
- Robot adoption studies (pre-genAI) show productivity gains with local job losses. Plausible. https://www.journals.uchicago.edu/doi/10.1086/705716
- GenAI use on the factory floor is lower than in offices. Plausible (St. Louis Fed industry gaps above).

**Adoption.** Moderate. Classic machine learning and robotics are mature. GenAI used mainly in engineering, planning and paperwork.

**New work.** Robot fleet supervision, data labelling for inspection models, OT security, keeping digital twins accurate.

**Jobs.** Most exposed: inspectors, schedulers, freight clerks, pickers and packers. Growing: maintenance technicians, robotics and automation techs, supply chain analysts.

**Outlook.** 1 year: genAI copilots for engineers and planners. 3 years: humanoid and mobile robot pilots scale in warehouses. 5 years: lights-out shifts for some lines. 10 years: physical AI may be the largest labour shift here, still uncertain. All Estimate.

## 6. Professional services (legal, consulting, accounting)

**Tasks AI does today.** Research, first drafts, contract review, due diligence, slide and memo drafts, audit sampling, tax research, meeting notes.

**Measured time savings.**
- BCG consultants, 758 people: on tasks inside AI's ability, 12.2% more tasks, 25.1% faster, higher quality (often quoted as 40%, sources differ). On a task outside it, 19 points less likely to be correct. Published in Organization Science 2026. Verified via secondary summaries, SSRN blocked. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4573321
- Writing tasks for professionals: about 40% faster and better quality. Plausible. https://www.science.org/doi/10.1126/science.adh2586
- Law students RCT with reasoning models and RAG tools: faster and better on several legal tasks, with some invented citations in non-RAG use. Plausible. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5162111
- Thomson Reuters 2025 survey: professionals expect 5 hours a week saved within a year. This is a forecast, and it comes from a tool seller. [VENDOR], Estimate. https://www.thomsonreuters.com/en/press-releases/2025/june/the-ai-adoption-reality-check-firms-with-ai-strategies-are-twice-as-likely-to-see-ai-driven-revenue-growth-those-without-risk-falling-behind
- Courts have sanctioned lawyers for AI-invented case citations in 2023 to 2025. Verified as a pattern. https://www.damiencharlotin.com/hallucinations/

**Adoption.** High in large firms, slower in small ones. Only 22% of surveyed professionals say their firm has a clear AI strategy. Verified (survey, vendor). Same TR URL.

**New work.** Citation and fact checking, AI use policies with clients, pricing changes away from billable hours, knowledge engineering.

**Jobs.** Most exposed: paralegals, junior associates' research and review time, junior analysts, bookkeepers, tax preparers. Growing: legal operations, AI and knowledge engineers in firms, advisory roles that sell judgement.

**Outlook.** 1 year: drafting and review copilots standard in big firms. 3 years: billable hour model under pressure, fixed fees grow. 5 years: pyramid narrows at the base, training of juniors redesigned. 10 years: firms sell outcomes and AI-backed products. All Estimate.

## 7. Education

**Tasks AI does today.** Lesson plans, worksheets, quizzes, feedback drafts, admin letters, differentiated materials, student tutoring.

**Measured time savings.**
- Gallup and Walton Family Foundation, 2,232 US teachers, 2025: weekly AI users estimate 5.9 h saved a week, about six weeks a year. Only 32% use it weekly. Self-reported. Verified, URL opened. https://news.gallup.com/poll/691967/teachers-using-ai-tools-save-hours-week.aspx
- England EEF trial of ChatGPT for lesson planning: about 31% less planning time, quality similar. Plausible. https://educationendowmentfoundation.org.uk/projects-and-evaluation/projects/chatgpt-in-lesson-preparation-teacher-choices-trial
- Nigeria after-school tutoring pilot with GPT-4: notable learning gains in six weeks. Plausible. https://blogs.worldbank.org/en/education/From-chalkboards-to-chatbots-Transforming-learning-in-Nigeria
- Turkish high school RCT: unguarded GPT-4 helped practice but hurt later exam scores. A guarded tutor avoided the harm. Plausible. https://www.pnas.org/doi/10.1073/pnas.2422633122

**Adoption.** Rising but uneven. Most schools lack a policy (19% of teachers report one). Unverified, not found on the Gallup page opened. Gallup URL above.

**New work.** Redesigning assessment against AI cheating, checking AI material for errors, AI literacy teaching, policy and data privacy work.

**Jobs.** Most exposed: tutoring services, some instructional design, test item writing. Growing: teachers stay in demand, plus learning designers and edtech support.

**Outlook.** 1 year: planning and feedback tools widespread. 3 years: AI tutors in many classrooms, assessment shifts to in-person and oral. 5 years: personalised pacing common. 10 years: teacher role leans toward coaching and supervision. All Estimate.

## 8. Government

**Tasks AI does today.** Drafting, summarising consultations, case note writing, call centre support, translation, document search, benefits triage.

**Measured time savings.**
- UK cross-government Copilot trial, about 20,000 staff: 26 minutes a day saved, self-reported. Did not measure where saved time went. Verified, URL opened. https://www.theregister.com/2025/06/03/uk_government_study_ai_time_savings
- Microsoft's own write-up of the same trial. [VENDOR], weaker. https://ukstories.microsoft.com/features/government-trial-shows-ai-could-save-civil-servants-nearly-two-weeks-each-a-year/
- UK Department for Business and Trade found no clear productivity gain in its own Copilot evaluation. Plausible. https://www.gov.uk/government/publications/microsoft-365-copilot-evaluation
- Australian government Copilot trial: time savings reported, mixed quality and concerns. Plausible. https://www.digital.gov.au/initiatives/copilot-trial

**Adoption.** Many pilots, slower scaling due to procurement, security and public trust.

**New work.** Algorithmic transparency records, impact assessments, appeals for AI-assisted decisions, procurement and vendor oversight.

**Jobs.** Most exposed: clerical and admin staff, call handlers, translators. Growing: digital and data roles, AI assurance, caseworkers handling complex cases.

**Outlook.** 1 year: office copilots across departments. 3 years: AI-assisted case processing with human sign-off. 5 years: hiring freezes absorb savings rather than layoffs. 10 years: smaller back office, more frontline focus, if trust holds. All Estimate.

## 9. Creative and media

**Tasks AI does today.** Copy, image and video generation, editing and dubbing, transcription, localisation, storyboards, newsroom summaries.

**Measured time savings.**
- Freelance market after ChatGPT and image tools: fewer writing and image jobs and lower earnings on exposed platforms. Plausible. https://pubsonline.informs.org/doi/10.1287/mnsc.2024.05420
- Freelancers' earnings fell about 5% after ChatGPT in exposed work. Plausible. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4527336
- Writers using AI ideas produced stories rated more creative but more similar to each other. Plausible. https://www.science.org/doi/10.1126/sciadv.adn5290

**Adoption.** High among freelancers and marketing teams. Contested in film, TV and news by unions and rights holders.

**New work.** Rights and licence clearance, provenance labels, brand review, prompt and pipeline direction, deepfake checks.

**Jobs.** Most exposed: stock image makers, copywriters, translators, voice actors, junior editors. Growing: creative directors using AI, content strategists, trust and provenance roles.

**Outlook.** 1 year: generated video in ads and social is normal. 3 years: dubbing and localisation mostly automated. 5 years: small teams make long-form content. 10 years: value moves to taste, IP, and audience trust. All Estimate.

## 10. Agriculture

**Tasks AI does today.** Precision spraying (see and spray), yield and weather forecasts, crop disease ID from phone photos, farm advice chatbots, autonomous tractors, livestock monitoring.

**Measured time savings.**
- John Deere See and Spray: herbicide use cut by about 59% on average in 2024 fields. [VENDOR], weaker. https://www.deere.com/en/news/all-news/see-spray-2024-results/
- USDA reports precision ag adoption rising with farm size. Plausible. https://www.ers.usda.gov/publications/pub-details?pubid=105893
- Farmer.Chat and Digital Green advice bots in India and Africa: early studies show uptake but few hard time numbers. Plausible.

**Adoption.** High on large farms in rich countries, low on smallholdings. Cost and connectivity are the limits.

**New work.** Farm data management, robot and drone servicing, agronomy advice backed by sensors.

**Jobs.** Most exposed: seasonal manual labour for weeding and picking, crop scouts. Growing: precision ag technicians, agronomic data roles, equipment service.

**Outlook.** 1 year: more vision-guided spraying and phone advisers. 3 years: autonomous tillage on large farms. 5 years: robotic harvest for some crops. 10 years: labour shortage, not jobs lost, is the main driver. All Estimate.

---

## Summary table

| Sector | Typical measured saving (best evidence) | Adoption | Biggest new work | Evidence strength |
|---|---|---|---|---|
| Software | 20% to 55% on tasks, minus 19% for experts on own code | Very high | Code review, agent management | Strong, mixed |
| Finance, insurance | 14% service throughput | High | Model risk, regulator files | Medium |
| Healthcare | 0% to 10% note time, plus less burnout | High for scribes | Checking AI notes | Strong RCTs, modest |
| Retail | Mostly vendor claims | High online | Content QA | Weak |
| Manufacturing, logistics | Case studies | Moderate | Robot supervision | Weak to medium |
| Professional services | 25% to 40% on fitting tasks, errors outside | High in big firms | Citation checking | Strong lab, weak field |
| Education | 31% planning time, 5.9 h self-report | Medium | Assessment redesign | Medium |
| Government | 26 min a day self-report | Pilots | Transparency, appeals | Medium |
| Creative, media | Earnings down for exposed freelancers | High | Rights and provenance | Medium |
| Agriculture | Input cuts, vendor numbers | Low to medium | Farm data, robots | Weak |

## Gaps and cautions

- Self-reported savings run higher than measured ones. Treat surveys as upper bounds.
- Few studies track where saved time goes. The Danish and UK work suggests most is reabsorbed into other tasks.
- Vendor numbers dominate retail, manufacturing and agriculture.
- Several URLs tagged Plausible were not opened in this pass and should be checked before quoting.

## Verification log

Checked 27 Oct 2026.

- Opened: The Register on UK Copilot trial (20,000 staff, 26 min, self-reported, time use not tracked), Gallup teacher poll (2,232 teachers, 5.9 h, 32% weekly).
- Checked via search: Stanford Canaries (13% in August 2025, 16% in November 2025 revision), NEJM AI scribe RCT (238 doctors, Nabla 9.5%, DAX not significant), BCG jagged frontier (758, 12.2%, 25.1%, 19 points).
- Corrections: Canaries revised figure added. Scribe arms named. BCG figures made exact. Teacher policy 19% downgraded to Unverified.
- Vendor items kept tagged [VENDOR]: Copilot field study, Klarna, Morgan Stanley, Thomson Reuters, Microsoft UK write-up, Deere, Amazon, Google RCT.
- Blocked: SSRN (403), PubMed (check page).
- Not rechecked this pass: other Plausible rows (Copilot 55.8%, METR, DORA, NBER support agents, MASAI, EEF, Nigeria, Turkey PNAS, freelancer studies).
- Missing claims worth adding: METR follow up results on newer tools, and an independent measure of time saved in retail.

# LinkedIn Post Options: Monetizing AI Agents

Source pages: *Monetizing AI Agents* (`/deep-dives/monetizing-ai-agents`) and *The Agent Monetization Instrument* (`/deep-dives/agent-monetization-instrument`).

Built against `linkedin-post-playbook.md` (2026 rules): one idea per post, opening line under 210 characters, one block worth saving, a closing question that needs a full-sentence answer, no link in the body or the first comment.

Every number below is on the pages with its source. Assumptions are marked as mine.

## Final post (October 11, 2026)

Use this one. Media: `docs/linkedin-assets/instrument-fit-map.png` or none. No link in the body or the first comment.

```text
Most teams can now build, trace and debug AI agents at scale. Far fewer can say what one run earned.

The build side, from a survey of 1,340 practitioners:
57% have agents in production
89% have observability
62% trace every step and tool call
(The survey's publisher sells observability tools.)

The commercial side:
Pricing: 3.8% of 80 agent companies price per outcome
Margin: a 76% resolution rate takes a worked 40% margin down to 26%
ROI: 37% report a positive profit impact from AI in a 2026 survey
Go to market: 16 to 20 weeks to buy, against 7 to 10 for standard software

My read: the trace already records what a task cost and whether it finished. A price can start from that record.

Four numbers I would pull before setting a price:
1. Cost per finished task
2. Share of attempts that fail
3. Share that need a person
4. What both sides accept as "finished"

Which of these does your team measure today, and who outside engineering sees it?

#AIAgents #Pricing #GoToMarket
```

## Revised three (October 11, 2026)

These replace the series opener and the final two. Order: Sample 1, Sample 2, Sample 3, one a week. No link in the body or the first comment.

### Sample 1: The fit map

Image: `docs/linkedin-assets/instrument-fit-map.png`.

```text
Six ways to price an AI agent are on public price lists today. Five yes or no questions tell you which one fits.

I mapped them after reading the price pages.

The six, with a list price each:

Per seat: $30 a user a month
Usage or credits: $0.10 an action
Per conversation: $2
Per outcome: $0.99
Hybrid: seats with a credit pool, then a meter
Fixed price: a services contract with a productivity commitment

The five questions:

1. Can both sides count a finished task?
2. Does the agent finish with no human step?
3. Is cost per task stable?
4. Can the buyer forecast volume?
5. Does a labour budget pay for the whole process?

How I read the answers:

Yes to 5: fixed price.
No to 1 and 2: per seat.
No to 1, yes to 2: usage or credits, with a cap.
Yes to 1, no to 2: per conversation.
Yes to 1 and 2, no to 3 or 4: hybrid.
Yes to the first four: per outcome.

Per outcome needs four yes answers. That may be why 3.8% of 80 agent companies price that way.

This ranking is my judgement. No source ranks the models like this.

Which of the five questions can you answer from pilot data today, and which one is still a guess?

#AIAgents #Pricing #GoToMarket
```

### Sample 2: We know how to build agents. What about pricing, margin, ROI and go to market

Image: none, or the bars figure from the evidence page.

```text
Most agent teams can now build, trace and debug an AI agent. Far fewer can say what one run earned.

Can we say the industry knows how to build agents? Mostly, yes.

From a survey of 1,340 practitioners:

57% have agents in production, up from 51%
89% have observability in place
62% trace every step and tool call

Two cautions. 52% run offline evaluations, and quality is still the top barrier. The survey's publisher sells observability tools.

So building and debugging have matured. Now ask four commercial questions about the same agent.

Pricing: 3.8% of 80 agent companies price per outcome.
Margin: one vendor's own 76% resolution rate takes a worked 40% margin down to 26%.
ROI: in a 2026 survey, 80% say AI made them more productive. 37% report a positive profit impact. That covers all AI, agents included.
Go to market: AI software takes 16 to 20 weeks to buy, against 7 to 10 for standard software.

My read: the trace already records what a task cost and whether it finished. Pricing, margin and ROI can all start from that record.

Four things I would pull from traces before setting a price:

1. Cost per finished task, and its spread
2. Share of attempts that fail
3. Share that need a person
4. What both sides would accept as "finished"

Which of these four does your team measure today, and who outside engineering sees it?

#AIAgents #Pricing #GoToMarket
```

ROI source for Sample 2: McKinsey's 2026 state of AI survey, as stated in a McKinsey article dated October 5, 2026 and opened October 11, 2026: "80 percent of respondents say AI has improved their individual productivity, while only 37 percent of respondents report positive EBIT impact", and 6 percent qualify as AI high performers. The post says "profit impact" for EBIT. Limits: it covers all AI and not agents alone, McKinsey sells consulting, and the respondent count was not confirmed at source so none is stated. Backup line, Deloitte State of AI in the Enterprise 2026 (3,235 leaders, fieldwork August to September 2025): 20% already grow revenue through AI and 66% report efficiency gains. The earlier IBM figure (25% of AI initiatives delivered expected ROI, 2025) is no longer used.

### Sample 3: The margin walk

Media: `docs/linkedin-assets/agent-margin-walk-4-scenarios.gif`.

```text
On paper, an AI support agent sold per outcome earns a 40% margin. Change four inputs and it loses 20 cents a unit.

I priced one unit of agent work, then stressed it.

The start:

Price: $0.99 per resolved conversation, one vendor's list price
Model cost: $0.44, a benchmark median for a customer service task
Human review: $0.15, my assumption of 5% of cases at $3 each

Cost $0.59. Margin 40%.

The walk:

1. 24% of attempts fail and are not billed: 26%
2. Human review rises from 5% to 10%: 11%
3. The system of record adds a $0.10 access charge: 1%
4. A heavier task lifts model cost to $0.60: minus 20%

Step 1 uses the vendor's own figure of 76% resolved on average. Steps 2 to 4 are my assumptions.

The price stayed at $0.99 throughout.

Three numbers I would ask for before quoting a price per outcome: the failure rate, the review rate and who else gets paid.

If you sell agent work per outcome: which of the four moved most once real volume arrived, and how did you find out?

#AIAgents #Pricing #SaaS
```

## Series opener: We learned to build agents. Now price them (October 11, 2026)

Post this first. It sets up Post 1 (who keeps the count) and Post 2 (the margin walk). Image: `docs/linkedin-assets/pricing-model-fit-map.png`. The fit map is also on the evidence page (`#maa-fit`) and as a fit finder on the instrument page (`#ami-fit`).

```text
Teams have learned to build AI agents.

In one survey of 1,340 practitioners, 57% have agents in production. 89% have observability in place. 62% can trace every step and tool call.

We can replay a run, find the bad tool call and fix it.

Now ask the commercial questions about that same run.

What did it cost? What did it earn? Who counted it? Who pays if it failed?

Here the answers are much thinner.

Pricing: 3.8% of 80 agent companies price per outcome. 71.3% still use subscriptions.
Margin: one vendor's own 76% resolution rate takes a worked 40% margin down to 26%.
Spend: 46.9% of enterprise buyers say their AI spend is over plan.
Sales cycle: AI software takes 16 to 20 weeks to buy. Standard software takes 7 to 10.
Billing: none of the vendor terms I read gives the buyer a right to recount.

My read: the trace is the link between the two halves. It already holds what a task cost and whether it finished. That is where a price should start.

Five questions I would answer before choosing a pricing model:

1. Can both sides count a finished task?
2. Can the result be credited to the agent?
3. How widely does cost per task vary?
4. Can the buyer forecast volume?
5. Which budget pays, software or labour?

Which of the five is hardest to answer for your agent today, and why?

#AIAgents #Pricing #GoToMarket
```

### What the research supports

| Dimension | Finding | Source |
|---|---|---|
| Build | 57.3% have agents in production, up from 51% | LangChain State of Agent Engineering, 1,340 responses, November 18 to December 2, 2025, published June 12, 2026 |
| Debug | 89% have some form of observability. 62% have detailed tracing of steps and tool calls | Same, all respondents |
| Quality | 52.4% run offline evals and 37.3% online. Quality is the top barrier, cited by 32% | Same |
| Margin, industry | AI product gross margin 45% in 2025, projected 53% in 2026 and 59% in 2027 | ICONIQ State of AI, July 2026, over 300 software executives |
| Pricing, spend, sales cycle, billing | As in the post | Already on the two pages |

Limits. The survey supports "building and tracing have matured". It does not support "solved": evals trail and quality is still the top barrier. The LangChain sample is self-selected and LangChain sells observability tools. The ICONIQ figures for 2026 and 2027 are what executives expect. A two-axis fit model by Madhavan Ramanujam (autonomy and attribution) exists, but its detail sits behind a paywall, so nothing here is taken from it.

### The pricing models, categorized

Seven models, ordered from paying for access to paying for results. Six are already on the evidence page with a list price each. The seventh is what services firms disclose.

| Model | Example on the page | Seller carries | Buyer carries |
|---|---|---|---|
| Per seat | $30 a user a month | Heavy use | Idle seats |
| Per agent ("digital employee") | $199 an agent a month | Heavy use | Performance |
| Usage or credits | $0.10 an action | Little | Volume and bill shock |
| Per conversation | $2 a conversation | Cost spread | Pays, solved or not |
| Per resolved outcome | $0.99 an outcome | Performance and cost spread | The definition |
| Hybrid (pool plus meter) | Credits past a pool | A floor is secured | The meter |
| Fixed price with a productivity commitment | Services contracts | Delivery risk | Little |

### Which model fits, and why (our judgement)

| Your situation | Fit | Why |
|---|---|---|
| A person stays in the loop and the result is hard to credit to the agent | Per seat, with usage included | The buyer can budget it and nobody has to agree a count |
| The agent works alone, cost per task varies widely, no agreed finish line | Usage or credits, with a spend cap | The seller is protected from the cost spread |
| There is a countable unit of work, but "success" is disputed | Per conversation or per task | Both sides can count it without judging quality |
| Both sides can count a finished outcome, it is credited to the agent, and cost is stable | Per outcome | The seller can carry performance risk and price close to value |
| Volume is hard to forecast, or the buyer needs a ceiling and the seller a floor | Hybrid | A committed pool gives both sides a known number |
| The work spans a whole process and is paid from a labour budget | Fixed price with a productivity commitment | This is what services firms disclose today |

### How to assess it

Five questions, each answered with data from a paid pilot:

1. **Can both sides count a finished task?** Evidence: one written definition, and two counts that agree.
2. **Can the result be credited to the agent?** Evidence: share of tasks finished with no human step.
3. **How widely does cost per task vary?** Evidence: cost per completed task at the median and the 90th percentile, from traces.
4. **Can the buyer forecast volume?** Evidence: three months of volume and its swing.
5. **Which budget pays, software or labour?** Evidence: who signs.

Questions 1 and 3 are already recipe step 4 on the instrument page. Questions 2, 4 and 5 extend it.

## Final two (October 11, 2026)

Built after a search of what people are discussing about AI agent pricing. Post 1 first. Post 2 one week later with `docs/linkedin-assets/agent-margin-walk.gif`.

### What the search found

Limit first: search did not return LinkedIn posts, Reddit threads or Hacker News threads directly. It returned press, analyst quotes and one write-up that summarises Reddit. Treat the themes as signals.

| Theme in the discussion | Who raises it | Post that answers it |
|---|---|---|
| "What counts as a resolution" is a trust issue, and per-resolution bills are hard to budget | Support buyers, per a summary of Reddit threads | Post 1 |
| Who controls the measurement, and how are disputes settled | Procurement and CIO commentary in the trade press | Post 1 |
| Is the vendor taking on real risk, or is it buzz | Analyst commentary | Post 1 |
| Seat revenue is fixed while agent cost moves with usage, so margin can collapse | Founders and pricing writers | Post 2 |
| Bill shock on usage pricing, hybrids as the common answer | Pricing blogs, investor playbooks | Not used, already well covered by others |

Not used as fact: a secondhand report of one legal AI company's margin turning negative, and any quote I could not open at source.

### Post 1: Who keeps the count

```text
One question keeps coming up wherever AI agent pricing is discussed.

What counts as a resolution?

I went through the public terms and help pages to answer it.

One vendor bills when the customer leaves without asking for more help. It reverses the charge if they return to that conversation.

One bills only the resolutions its own language model has verified. To dispute one, you contact support.

One lists $2 per resolution and bills nothing if the customer asks for a human.

Three vendors, three meanings of one word. In each case the seller keeps the count. None of the terms I read gives the buyer a right to recount.

Buyers say they want this model. In one survey of customer experience outsourcing clients, 76% are open to paying by outcome. 5% have a contract built that way.

My read: that gap is about the count more than the price.

Four things I would agree before signing:

1. The definition of a resolved case, written into the order form
2. Your own log of every billed unit
3. A recontact check: how many resolved customers return on the same issue within 72 hours
4. A dispute window, and the evidence that settles it

If you buy per resolution: how do you check the count, and what happened the first time your number and the vendor's differed?

#AIAgents #Pricing #CustomerSupport
```

### Post 2: The margin walk

```text
On paper, an AI support agent sold per outcome earns a 40% margin.

Change four inputs and it loses 20 cents on every unit.

Seat revenue is fixed. Agent cost moves with every attempt. So I priced one unit of agent work and then stressed it.

The start:
Price: $0.99 per resolved conversation. One vendor's list price.
Model cost: $0.44. A benchmark median for a customer service task.
Human review: $0.15. My assumption, 5% of cases at $3 each.

That is $0.59 of cost and a 40% margin.

The walk:

1. 24% of attempts fail and are not billed: 26%
2. Human review rises from 5% to 10% of cases: 11%
3. The system of record adds a $0.10 access charge: 1%
4. A heavier task lifts model cost to $0.60: minus 20%

Step 1 uses the vendor's own figure. It says its agent resolves 76% of conversations on average.

Steps 2 to 4 are my assumptions. None of them is extreme, and together they turn $0.40 of margin into a $0.20 loss.

The price never moved. Only the inputs did.

So before I asked what the unit costs, I would ask for the failure rate, the review rate and who else gets paid.

If you sell agent work per outcome: which of these four moved most once real volume arrived, and how did you find it?

#AIAgents #Pricing #SaaS
```

### Current pricing challenges

Each line is on the pages with its source. Use these as proof points in either post or in replies to comments.

**For enterprise buyers**

| Challenge | Evidence |
|---|---|
| The bill is hard to forecast | 46.9% of 1,636 enterprise technology decision makers report AI spend over plan (Futurum, September 2026) |
| The seller keeps the count | None of the terms opened gives the buyer a right to recount the billed unit |
| One word, several meanings | Three vendors define a billable "resolution" three ways |
| The pricing model keeps moving | One large vendor went from a fee per conversation to credits to seat licences. Another may move a plan to list price at renewal |
| Buying takes longer | The most common AI software purchase cycle is 16 to 20 weeks, against 7 to 10 for standard software. 58% involve seven or more people (Levelpath, 300 procurement leaders, June 2026) |
| Wanting it and signing it differ | 76% of customer experience outsourcing clients are open to outcome pricing and 5% hold such a contract (HFS, July 2026) |

**For sellers**

| Challenge | Evidence |
|---|---|
| Failed attempts cost money and earn none | At a 76% resolution rate the worked example falls from 40% margin to 26% |
| Cost per task varies widely | Benchmark median cost runs from $0.18 to $3.26 a task, an 18 times spread across task types |
| Few can publish an outcome price | 3.8% of 80 agent companies price per outcome, down from 4.5% |
| The buyer's budget is tight | AI spending rose 38% while total customer service budgets rose 2% (Gartner, 199 leaders, 2026) |

**Short version for a post or a comment**

```text
What buyers of AI agents are dealing with today:

1. A bill they cannot forecast
2. A count the seller keeps
3. A word, "resolution", that each vendor defines differently
4. A pricing model that changes between renewals
```

### GIF

`docs/linkedin-assets/agent-margin-walk-4-scenarios.gif` (2142 by 1852, about 15 seconds). Four steps from the live calculator: failed attempts 0% to 24% (margin 40% to 26%), human review 5% to 10% (11%), a $0.10 access charge (1%), model cost $0.44 to $0.60 (-20%). Steps 2 to 4 are assumptions and the footer says so.

### Hashtags

Three per post, placed at the end. The playbook allows at most three and warns that more can hurt reach. Topic comes from the words in the post under the 2026 rules, so the tags are a small aid.

### Search sources

- https://www.getmacha.com/blog/zendesk-reddit-opinions
- https://www.techtarget.com/it-strategy/news/366651390/Outcomes-based-AI-pricing-works-in-theory-but-in-practice
- https://www.channeldive.com/news/agentic-ai-outcome-pricing-models-zendesk-gartner/829209/
- https://www.cfodive.com/news/blackline-cfo-touts-outcome-based-ai-pricing-shift/825940/
- https://www.bvp.com/atlas/the-ai-pricing-and-monetization-playbook
- https://startupfortune.com/how-to-price-an-ai-agent-feature-when-usage-swings-wildly/
- https://www.revinci.ai/blogs/why-seat-based-saas-pricing-fails-for-ai-agents/

## Option 1: The margin walk

Shape: surprising number, then a worked example. Audience: founders, product and pricing leads, CFOs.

### Hook options

1. On paper, an AI support agent sold per outcome earns a 40% margin. Count the attempts that fail and it earns 26%.
2. A failed attempt costs the same to run as a successful one. Only one of them gets paid.
3. I priced one unit of AI agent work from public numbers. The margin fell from 40% to below zero in four steps.

### Final post

```text
On paper, an AI support agent sold per outcome earns a 40% margin.

Count the attempts that fail and it earns 26%.

I worked through one unit of agent work using public numbers.

Price: $0.99 per resolved conversation. One vendor's list price.
Model cost: $0.44. A benchmark median for a customer service task.
Human review: $0.15. My assumption, 5% of cases at $3 each.

That is $0.59 of cost and a 40% margin. Most pricing decks stop here.

The same vendor says its agent resolves 76% of conversations on average.

The other 24% still run the model. Nobody pays for them.

Here is the walk:

1. Every attempt succeeds: 40%
2. 24% of attempts fail: 26%
3. The customer pays by card: 23%
4. Add monitoring, onboarding and unpaid pilots: below zero

Step 4 uses my own illustrative costs. With them, the price has to reach $1.87 to earn 40% again. The list price is $0.99.

So the failure rate belongs in the price. I would ask for it before I asked what the unit costs.

If you sell or buy agent work per outcome: which cost surprised you most once real volume arrived, and how did you find it?
```

### Why this one

- It carries one idea: failed attempts are a cost that outcome pricing hides.
- The four-step walk is the block people save.
- The reader can check every line. Three inputs are public and one is labelled as mine.

## Option 2: Who counts the outcome

Shape: buyer checklist. Audience: support, operations and procurement leaders.

### Hook options

1. You pay each time an AI agent resolves a ticket. I read the public contracts. None gives the buyer a right to recount.
2. Three vendors bill per "resolution". They define the word three different ways.
3. One vendor bills a resolution when the customer simply leaves. Ask how yours counts before you sign.

### Final post

```text
You pay each time an AI agent resolves a ticket.

I read the public contracts and help pages. None gives the buyer a right to recount.

Here is how three vendors count the same word.

One bills a resolution when the customer leaves without asking for more help. It reverses the charge if they return to that conversation.

One changed its rule on May 18, 2026. Now only a resolution verified by its own language model draws on the paid allowance.

One lists $2 per resolution. It bills nothing if the customer gives negative feedback or asks for a human.

Each rule is reasonable. Each is also counted by the seller.

Four things I would agree before signing:

1. The definition of a resolved case, written into the order form
2. Your own log of every billed unit
3. A recontact check: how many resolved customers return on the same issue within 72 hours
4. A dispute window, and the evidence that settles a dispute

Number 3 is the cheapest test. It needs only your contact history.

If you buy per resolution today: how do you check the count, and what happened the first time your number and the vendor's number differed?
```

### Why this one

- It is the most useful of the three to a buyer, and the checklist is easy to save.
- It names no vendor, so it reads as advice and not as an attack. The names and sources are on the page.
- Risk: it is a narrower audience than Option 1.

## Option 3: What sellers publish

Shape: contrarian with a count. Audience: founders, investors, strategy leads.

### Hook options

1. Outcome pricing gets a lot of airtime in AI agents. A review of 80 agent companies found 3.8% using it.
2. I looked for outcome prices in eight fields outside customer support. I found none.
3. The share of AI agent companies pricing per outcome went down this year, from 4.5% to 3.8%.

### Final post

```text
Outcome pricing gets a lot of airtime in AI agents.

A review of 80 agent companies found 3.8% using it. A year earlier it was 4.5%.

Over the same period, subscription pricing rose from 62.1% to 71.3%.

I wanted to see it for myself, so I checked eight fields outside customer support.

Five show a public price. None is priced per outcome.

What sellers publish today:

1. Credits per action, at about $0.10 an action on one list
2. A fee per conversation
3. A fee per minute for voice
4. Seats, with the agents bundled into the plan

My read, and it is a judgement: an outcome price needs a count that both sides accept. Support has one, because a ticket closes. Most other work has no agreed finish line yet.

So I would pick the unit your buyer can already count, and move to outcomes when the count exists.

If you price an agent today: which unit did you choose, and what did your buyers push back on first?
```

### Why this one

- It has the sharpest opening line of the three.
- Risk: it invites "outcome pricing is early, give it time" replies. That is a fair point and the post already allows for it.
- The 3.8% figure comes from a billing vendor's review of public price pages. Say so if asked.

## Option 4: The buyer's ask (customer problem version)

Shape: problem, what the industry tried, insight, question. Audience: buyers and sellers alike.

### Problem statement

Built from published sources only. No customer here is invented.

- **What the buyer asks for.** Pay for results. Know the bill before the month ends. Be able to check the count.
- **What the buyer gets today.** A price tied to results with a count kept by the seller, or a seat price with a known bill and no tie to results.
- **What the industry has tried.** A fee per conversation, credits per action, seat licences, resolutions verified by the seller's own model.
- **What is still missing.** A count that both sides accept.

### Hook options

1. 76% of customer experience outsourcing buyers say they are open to paying by outcome. 5% have a contract built that way.
2. Buyers of AI agents ask for three things: pay for results, know the bill, check the count. Today they can pick two.
3. A customer asked a vendor whether a ticket is billed when a human steps in after the AI. The vendor answered twice.

### Final post

```text
76% of customer experience outsourcing buyers say they are open to paying by outcome.

5% have a contract built that way.

That gap is the most useful number I found on AI agent pricing.

The buyer's ask is easy to state:

1. Let me pay for results
2. Let me know the bill before the month ends
3. Let me check the count

Here is what the industry has tried.

One large vendor moved from a fee per conversation, to credits per action, to seat licences. The reported reason: customers pushed for more flexibility.

One vendor bills per resolution. A customer asked on its forum whether a ticket still counts when a human steps in afterwards. The company first said no. Then it corrected itself. It can.

Another now bills only the resolutions its own model has verified. To dispute one, you contact support.

Meanwhile 46.9% of enterprise technology buyers in one survey say their AI spend is over plan.

My read: the three asks pull against each other. An outcome price gives results and an uncertain bill. A seat gives a known bill and no tie to results. Neither gives the buyer a count.

So I think the pricing model is the smaller problem. The missing piece is a count both sides accept.

If you buy or sell agent work: which of the three asks did you give up, and what did it cost you?
```

### Why this one

- It starts from the reader's problem, which is the structure the research favours for this kind of post.
- The forum exchange is a real, specific moment. The playbook says a scene holds attention longer than a number.
- The three asks are the block people save.

### Sources for Option 4

- 76% open and 5% contracted: HFS Research, July 6, 2026. Customer experience outsourcing clients. Sample size not stated.
- Three pricing models and "customers have pushed for more flexibility": The Register, December 12, 2025, on Salesforce Agentforce.
- Forum exchange: Intercom Community, customer post of May 27, 2025 and staff reply of June 4, 2025.
- Verified resolutions and the support route for disputes: Zendesk help centre, from May 18, 2026.
- 46.9% over plan: Futurum survey of 1,636 enterprise technology decision makers, September 10, 2026.

## Research refresh (October 11, 2026)

A fresh search on what works on LinkedIn found vendor and agency blogs only. No source quotes LinkedIn itself and their numbers disagree, so treat these as signals.

- **Structure.** For a post about a business problem, sources favour problem, insight, solution, question over a personal story arc. Option 4 follows it.
- **Format.** Document posts lead in every source found. Plain text is contested and single images may reduce reach.
- **Comments.** A few long comments are said to count for more than many short ones.
- **Style.** One source warns against one-sentence paragraphs, fake suspense and generic AI phrasing. The house post uses many one-line paragraphs, so the drafts here group lines where they belong together.
- **Links.** Sources agree a link in the body costs reach. They disagree on the first comment. The playbook's rule (no link in either) is the safer one.
- **Proof.** The 2024 Edelman and LinkedIn study found decision makers value strong research and data (55%) and concrete guidance (43%). No 2026 edition was found.

## Recommendation

Start with the series opener, then Post 1, then Post 2 with the GIF, one a week. Options 1 to 4 below are earlier drafts kept for reference.

## Sourcing notes

- $0.99 per outcome: Intercom price page, read October 11, 2026.
- $0.44 model cost: median cost per task on the TAU-bench Airline benchmark (HAL runs). A stand-in for a customer service task, and no vendor's own cost.
- $0.15 human review: assumption, 5% of cases at $3.
- 76% resolved: Intercom's claim about its own product. Not audited.
- 26%, 23%, $1.87: arithmetic from the instrument page. The hidden cost example is an illustration.
- 3.6% card fee: Stripe list rate.
- Resolution rules: Intercom help article, Zendesk help article (tiers from May 18, 2026), Salesforce Agentforce pricing as described by an adviser.
- "None gives a right to recount": applies to the contracts and terms opened for the page. Sierra's terms give a copy of a security report and a 30-day invoice dispute window.
- 72-hour recontact check: a vendor glossary definition (Decagon). The window is a convention, with no benchmark behind it.
- 3.8% of 80 companies, 4.5% the year before, subscription 62.1% to 71.3%: Orb's review of public pricing.
- Five of eight fields with a public price and none per outcome: our count from the price pages opened on October 11, 2026.

## Posting notes

- Keep the link out of the body and out of the first comment. Add it by editing the post a few hours later, or reply "comment and I will send it".
- Be available for the first 60 minutes and answer each comment in full sentences.
- Option 1 also works as a five-slide document post: one slide per step of the walk, then the question. The playbook rates that format above plain text.
- Use at most three hashtags, or none.
- The pages must be live before any of these goes out.

Voice: calm, direct, technical. One idea per post. No invented numbers.

# Customs Entry Agent — LinkedIn Launch Pack

Internal companion for publishing the customs entry agent deep dive on LinkedIn.

The goal is not to summarise the page. The goal is to turn it into a post that teaches one reusable idea and earns comments from trade compliance owners, supply chain leaders, AI delivery leads, and the architects who get asked to build this.

Page: `https://models-to-margins.vinayagrw.workers.dev/deep-dives/customs-entry-agent`
Visual asset available: `docs/customs-agent.gif`

## Why this angle works

- It has a number nobody can argue with and almost nobody has seen: 95.0% versus 46.8%.
- The evidence is independent and recent, not vendor material.
- The legal finding is a hard wall, not an opinion, and most tools in this category are on the wrong side of it.
- The architectural lesson generalises well beyond customs, which is what earns shares outside the trade audience.
- It is contrarian without being cynical. The conclusion is "build it differently", not "AI cannot do this".

## Proof hierarchy

Strongest first. Use in this order and do not invert it.

1. **HSCodeComp** (arXiv 2510.19631, October 2025; published ACL 2026). 632 products across 32 categories, graded by a panel of 26 tariff experts. 23 systems evaluated: 14 foundation models, 6 open agent frameworks, 3 closed agents.
   - Licensed tariff experts: **95.0%**
   - Best AI system of all 23 (SmolAgents wrapped around GPT-5): **46.8%**
   - Best model asked directly, no tools (GPT-5): **29.3%**
   - Claude Sonnet 4 11.9%, Kimi-K2 12.2%, DeepSeek-R1 6.7%, Qwen-MAX 3.8%
2. **CBP HQ ruling H350722**, 16 January 2026. Deriving tariff subheadings past six digits, where the output directs or influences an entry, is customs business and requires a broker licence. To six digits it is not.
3. **ATLAS** (arXiv 2509.18400, September 2025). 200 contested rulings. Best published fine-tune 40% at ten digits, GPT-5-Thinking 25%.
4. **Independent product benchmark** (arXiv 2412.14179). Four commercial classification products on 103 randomly drawn rulings: 89.2%, 80.0%, 44.1%, 12.8%.

**Do not merge these.** Three different test sets. Quote each within its own set or the post becomes exactly the sloppiness it is criticising.

## Selected positioning

> The harness is worth more than the model. A person is still worth more than both.

Supporting idea:

> Do not ask the model to name the goods. Ask whether you have shipped this before.

---

## Post 1 · The number

**Recommended flagship.** Widest reach, hardest to argue with.

The best of 23 systems a panel of tariff experts scored on customs classification got 46.8% right.

The people it was tested against got 95%.

Same 632 products. Same rules. Graded by a panel of 26 tariff experts.

That gap is the whole story, and it is not the story most people expect.

Because look at what happened inside it.

GPT-5, asked the question directly: 29.3%.
The same GPT-5, wrapped in a harness that could search and look things up: 46.8%.

Same model. Same test. 17 points.

Changing the model moved almost nothing by comparison. Claude Sonnet 4 scored 11.9%. DeepSeek-R1 6.7%. Qwen-MAX 3.8%.

So the lesson is not "use a better model".

The lesson is that in work governed by rules rather than patterns, the system around the model does more than the model does.

And even then, 46.8% is not a number you file government paperwork on. Getting a tariff code wrong is charged at twice the tax you underpaid, four times if they decide you were careless.

Which is why I think the design most people reach for is the wrong one.

Do not ask the model to name the goods.

Ask a cheaper question first: have we shipped this exact thing before?

If yes, reuse the answer a qualified person already signed off on. If no, spend the money and put a person's name on it.

Most companies find that most of what they ship, they have shipped before.

That is not an AI insight. It is an inventory insight. But it is the one that makes the economics work.

Where else have you seen the harness matter more than the model?

---

## Post 2 · The licence wall

**Sharpest for the trade compliance audience.** Expect strong comments from brokers.

In January, US Customs answered a question a lot of AI vendors would rather nobody asked.

Ruling H350722.

If your tool derives a tariff subheading past the sixth digit, and that output directs or influences a filing, the tool is conducting customs business.

Customs business requires a broker licence.

To six digits, it does not.

Read that again next to the accuracy data, because the two line up in an uncomfortable way.

At six digits, the best frontier model is within about 2 points of a purpose-built fine-tune.

At ten digits, it is 15 points behind.

So the machines are strong exactly where the law lets an unlicensed tool operate.

And they collapse exactly where a licence is required.

That is not a coincidence. The last four digits are where the judgement lives, and judgement is what the licence exists to cover.

You cannot engineer past this one. It is not an accuracy problem that a better model solves next year. It is a legal boundary.

What it does mean is that the routing is not a product preference. It is the compliance line.

Every ten-digit answer goes to a licensed reviewer before it reaches a filing. Not because the model is untrustworthy. Because the licence sits with a person and never with the software.

If you are buying in this category, the question is not "how accurate is it".

The question is "who is licensed, and what exactly are they signing".

Brokers: does this match how you are reading H350722?

---

## Post 3 · The architecture inversion

**Best for the AI delivery and architecture audience.** Most reusable outside customs.

We stopped asking the model to name the thing.

The system got better.

Here is the problem. Every item imported into the US needs a 10-digit code. The code sets the tax. Get it wrong and you pay a multiple of what you underpaid.

The obvious build is: give the model the product description, ask for the code.

The obvious build does not work. The best of the 23 systems that benchmark scored reaches 46.8%, against 95% for licensed experts on the same goods.

So we inverted it.

Instead of one hard question asked of everything, we ask one cheap question of everything first:

Have we filed this exact thing before?

Three outcomes.

**Seen it before.** Replay the answer a licensed person already approved, revalidated against today's rulebook. No model call at all.

**Close to something we have seen.** One narrow deduction from the approved answer. Bounded, and a reviewer checks it.

**Genuinely new.** Full reasoning, full evidence trail, and a licensed person signs it. It never files itself.

The interesting part is what this does to the economics. The expensive path is the smallest path. Most of what a business ships, it has shipped before.

And the failure mode changes shape. A model that guesses fails quietly and at scale. A system that replays approved answers fails loudly, on the one line that is actually new, which is exactly where you want a human anyway.

The generalisable version:

When the work is governed by rules rather than patterns, do not make the model the decision-maker. Make it the thing that handles what your records cannot.

What is the equivalent "have we seen this before" question in your domain?

---

## Post 4 · How to read an accuracy claim

**Most shareable outside the trade audience.** A method post.

Two benchmarks measured the same task.

One said the tools get it right 40% of the time.
One said 89%.

Neither was wrong.

The first drew its test cases from contested rulings, where somebody had already argued about the answer. The second drew at random.

45 points of difference, entirely from sampling.

This is the most common way an AI accuracy number misleads you, and it almost never shows up in the marketing.

Four questions I now ask before I believe any of them.

**1. What was it tested on, and how many?**
"40% accurate" from a 200-item set is a different claim from 40% on 600,000. Both get quoted the same way.

**2. Were the cases sampled at random, or selected?**
Selected sets are usually harder or easier for a reason. That reason is the number.

**3. When did scoring close, and who was entered?**
A leading benchmark in this field closed in October 2025 and has not been refreshed. Whole model families released since are simply absent. That is not dishonesty. It is what a one-off paper is.

**4. What is the human number?**
The most useful figure in the study I have been reading is not any model score. It is that licensed experts scored 95.0% on the same goods. Without that line, 46.8% sounds like a machine problem. With it, it is a difficulty measurement.

Most accuracy claims survive question 1 and die on question 2.

Which of these four gets skipped most often where you work?

---

## Post 5 · The CFO angle

**Shortest. Best for the commercial audience.**

The bill for this system is not tokens.

It is minutes.

We modelled the cost of automating customs filing properly and the model cost barely registers at any realistic price. Human review time dominates it at every tier.

Which changes the whole business case.

You do not win by buying a cheaper model. You win by reducing how many lines a person has to read.

And that number is not set by your AI. It is set by how repetitive your product catalogue is.

So there are two numbers to measure before writing any code.

**One.** What share of the lines you file are products you have shipped before? Below half, stop. No model is cheap enough to rescue that mix.

**Two.** Can you staff roughly one licensed reviewer per 2,000 reviewed lines a month? If not, the throughput is imaginary.

Both are measurable in week one, from data you already have, before a single pound is committed.

One more thing worth saying plainly. Vendor material in this space implies 95% of entries filing untouched. The honest expectation is 60 to 75% by month 12.

That is still a very good number. It is just not the one on the slide.

What is the equivalent week-one measurement in the AI business case you are being shown right now?

---

## Post 6 · Why your shipments actually get stuck

**Recommended opener for a supply chain or operations audience.** The only post in this pack that starts on the reader's own pain rather than on a benchmark. Leads with an honesty move that almost nobody in this category makes.

Ask why a shipment is stuck at the border and you will get a number. Three days. Two weeks. Everybody has a figure.

I went looking for where those figures come from.

They do not come from anywhere.

No primary source publishes how long goods sit on a documentation hold. What is actually instrumented is queue time, the wait in the lane. In a live pull on 21 August 2026, the worst commercial standard lane anywhere on either US land border was 40 minutes.

Forty minutes is not what anyone means when they say their freight is stuck.

So the honest position is that the delay everyone quotes is unmeasured. That makes it a bad number to build a business case on, and I have left it out of mine.

Here is what is measurable. It is worse than a delay figure.

Three things go wrong, and all three are data problems before they are border problems.

**One. The declaration and the shipping documents disagree.** One field differs across two documents describing the same goods. Both were written weeks before anyone could compare them.

**Two. The same check gets done by hand, over and over.** Food safety, agriculture, health and security each run their own hold. An importer whose systems do not talk to each other answers the same question four times.

**Three. The documents arrive after the goods do.** That collapses the decision back onto the moment of arrival, which is the most expensive place on earth to make it.

Now add the clock. Ten working days from cargo release to file, and the deadline does not move.

Add the penalty. Get the tariff code wrong and you are not billed the shortfall. You are billed a multiple of it. Twice the underpaid duty for negligence. Four times for gross negligence.

Add the drift. The rulebook changed four times in July 2026 alone. That is faster than most companies ship software.

The fix is not a faster broker.

It is to stop making the decision at the crossing and start making it at the document, when the invoice line is written and being wrong is still cheap.

Then, for the tariff code itself, ask a cheaper question before the hard one.

Have we shipped this exact thing before?

If yes, reuse the answer a licensed person already approved, revalidated against today's rulebook. If no, spend the money and put a qualified name on it.

Most companies find that most of what they ship, they have shipped before. That is not an AI insight. It is an inventory insight. But it is the one that makes the maths work.

What is your actual first-time-right rate on customs documents? Most people I ask have never measured it.

---

## Post 6b · The short version

**Same argument, cut for reach.** Use if post 6 reads long for your audience.

Three reasons your freight gets held at the border. None of them happen at the border.

**One.** The declaration and the shipping documents disagree. One field, two documents, written weeks apart by different people.

**Two.** The same check gets redone by hand for every agency. Food safety, agriculture, health, security.

**Three.** The documents arrive after the goods do.

All three are data problems wearing a logistics costume.

Meanwhile the clock runs. Ten working days from release to file. Get the tariff code wrong and you pay twice the underpaid duty, four times if they decide you were careless. The rulebook changed four times in July 2026 alone.

One more thing worth knowing. The delay figures people quote in this industry have no primary source. What is actually published is queue time, and the worst commercial lane on either US land border was 40 minutes on 21 August 2026. Nobody publishes how long a documentation hold lasts.

You do not fix this with a faster broker. You fix it by moving the decision to where the invoice line is written, while being wrong is still cheap.

What is your first-time-right rate on customs documents? Most companies cannot answer that.

---

## Post 7 · The conversation that started this

**Personal opener, and the only post that names no country, agency or regulation anywhere.** Travels furthest outside the trade audience. Carries the full 29.3 to 46.8 harness argument, which post 8 does not.

<!-- SLOT: the first line is deliberately generic. Replace it with the real detail if you want to anchor it. Everything after stands on its own. -->

I was catching up with an old friend a while back. They run trade compliance for a manufacturer.

I asked what actually eats their week.

I expected an answer about borders. Queues, inspections, a container stuck somewhere.

They said the hard part happens months before anything moves. At a desk. Over a product description somebody wrote for a catalogue.

That conversation is why I went and spent real time on this.

Every customs declaration in the world rests on three answers. What the goods are, where they are from, and what they are worth. Classification, origin, valuation. Get any one wrong and the declaration is wrong, however good your logistics are.

So which of the three hurts most?

Somebody put that question to a room of customs leaders in June. Around half named classification. It was a live poll at an industry event run by a customs services provider, so treat it as a show of hands rather than a measurement. But it matched my friend, and everything I found afterwards.

Origin and valuation are computations. Hard ones, but they run over facts you already hold. Bills of materials. Supplier declarations. Invoices and contracts.

Classification is different in kind. It is an argument about what a thing actually is, made against a schedule of thousands of lines, and the answer is not sitting in your records anywhere. It is a judgement.

Which is exactly why it looked like an obvious problem to hand to AI. Description in, code out.

The strongest study I found graded 632 products with a panel of 26 tariff experts, against 23 AI systems entered.

The best of the 23 got 46.8%. The human experts, on the same goods, got 95%.

The gap is not the interesting part. This is. The strongest model, asked directly, scored 29.3%. The same model, wrapped in a system that could search and check its own work, scored 46.8%.

Same model. Same goods. 17 points, from the engineering around it rather than the intelligence inside it.

So the lesson is not "wait for a better model". Where work is governed by rules rather than patterns, the system around the model does more than the model does.

And even then, 46.8% is not a number you put your name to on a government filing.

Do not ask the model to name the goods.

Ask a cheaper question first. Have we shipped this exact thing before?

If yes, replay the answer a qualified person already approved, revalidated against today's rulebook. If no, spend the money, and a qualified person puts their name on it.

Most companies find that most of what they ship, they have shipped before. That is not an insight about AI. It is an insight about their own catalogue. But it is the one that makes the economics work.

When I described this back to my friend, they said nobody had ever asked them what share of their filings were repeats.

So I will ask here. Of the three, which one actually costs you most? Classification, origin, or valuation?
---

## Post 8 · Three rules, one data problem

**Strongest opener for a trade and compliance audience.** Same personal entry as post 7, but it leads on the regulatory squeeze rather than avoiding it, and it names the EU rules. Carries the headline 46.8 against 95 but **not** the 29.3 harness detail, which stays with post 7 so the two do not duplicate each other.

<!-- SLOT: replace the first line with the real detail if you want to anchor it. Everything after stands on its own. -->

I was catching up with an old friend a while back. They run trade compliance for a manufacturer. I asked what actually eats their week.

I expected whatever was in the news. Sanctions. Export controls. The environmental and labour rules everyone has been bracing for.

Those are real, and they are close. The EU carbon border mechanism entered its definitive phase in January 2026. The deforestation rules apply from 30 December 2026. The forced labour ban applies from December 2027.

None of them is really a border problem. Each asks the same thing: can you prove, from your own records, what this product is, where it came from and how it was made?

That is the shift. Customs was the desk at the end that stamped paperwork. It is becoming a function that has to hold consistent data across the business, months before anything moves.

Every declaration rests on three answers. What the goods are, where they are from and what they are worth. Classification, origin, valuation. Get one wrong and the whole declaration is wrong.

Ask a room of customs leaders which hurts most and about half say classification. That was a show of hands at an industry event run by a customs services provider, a straw poll rather than a measurement. But it matched my friend, and everything I found afterwards.

Three things go wrong over and over, and all three are data problems before they are border problems.

The declaration and the shipping documents disagree. Automation does not settle that. It surfaces it when the invoice line is written, while being wrong is still cheap.

The same check gets redone by hand for every agency. Answer it once against structured data, then reuse it.

The documents arrive after the goods do. Nothing automates away a missing document, but you can know days earlier.

Could AI just take the classification decision itself?

The strongest study I found graded 632 products with a panel of 26 tariff experts, against 23 AI systems. The best system got 46.8%. The experts got 95% on the same goods.

46.8% is not a number you put your name to on a government filing.

So do not ask the model to name the goods.

Ask a cheaper question first. Have we shipped this exact thing before?

If yes, replay an answer a qualified person already approved, revalidated against today's rulebook. If no, spend the money and put a qualified name on it.

Most of what a company ships, it has shipped before. That is not an insight about AI. It is an insight about its own catalogue. But it is the one that makes the economics work.

I ended up designing the whole thing end to end, because the tools I looked at automated the confident part and handed the reviewable part back to the customer.

What share of your filings are things you have filed before? Most people I ask have never measured it.

#TradeCompliance #Customs #GlobalTrade #SupplyChain #AppliedAI
---

## Post 8b · The short version

**Same argument, cut for reach.** Roughly 1,200 characters. Use if post 8 reads long for your audience.

Three EU rules are turning customs from a paperwork problem into a data problem.

The carbon border mechanism went definitive in January 2026. The deforestation rules apply from 30 December 2026. The forced labour ban applies from December 2027.

Each asks the same thing. Prove, from your own records, what this product is, where it came from and how it was made.

Every declaration rests on three answers. Classification, origin, valuation. Get one wrong and the declaration is wrong, however good your logistics are.

Ask a room of customs leaders which hurts most and about half say classification. That was a show of hands at an industry event, not a measurement.

And classification is where AI looks obvious and is not. The strongest study I found put 23 systems against 632 products graded by 26 tariff experts. Best system 46.8%. The human experts, same goods, 95%.

So do not ask the model to name the goods.

Ask a cheaper question first. Have we shipped this exact thing before? If yes, replay an answer a qualified person already approved, revalidated against today's rulebook. If no, spend the money and put a qualified name on it.

Most of what a business ships, it has shipped before. That is not an AI insight. It is a catalogue insight. But it is the one that makes the economics work.

What share of your filings are repeats? Most companies cannot answer that.

#TradeCompliance #Customs #GlobalTrade #SupplyChain #AppliedAI

---

## Comment-reply prep

**"So AI cannot do customs."**
That is not the claim. The claim is that AI cannot be the decision-maker here. It is very good at recall, validation, evidence assembly and watching the rulebook for changes. Those are the parts worth automating.

**"46.8% will be beaten next year."**
Probably. It still will not clear the legal boundary, and that is the binding constraint rather than the accuracy one.

**"Which vendor is this about?"**
None. The gaps described are a category pattern, and naming one product would make it a smaller claim than it is.

**"Our tool is more accurate than that."**
It may well be, on your goods. The question is what it was measured on. See post 4.

**"Are those regulations actually in force?"**
Partly, and the dates are the point. The EU carbon border mechanism entered its definitive period on 1 January 2026, so that one is live. The deforestation regulation was postponed a second time and now applies from 30 December 2026 for large and medium operators, 30 June 2027 for micro and small. The forced labour regulation, 2024/3015, entered into force on 13 December 2024 but does not apply until 14 December 2027. So one is running, one lands within months and one is still ahead. That spread is exactly why it is a planning problem rather than a filing problem.

**"Where does the classification number come from?"**
Fair question, and the honest answer has two halves. A customs services provider surveyed around 150 senior customs and trade compliance leaders ahead of its own industry summit in June 2026, and separately ran live polls in the room at that event. Those are two different instruments and I keep them apart. The "around half name classification" figure is from the room poll, which is the weaker of the two: self-selected attendees, no stated sample frame, no independent surveyor, and the provider sells customs services. I use it because it agrees with the benchmark evidence, and I name the limitation rather than wait for somebody to find it. Post 7 calls it a show of hands in the body for that reason.

**"Where is your delay data from?"**
Nowhere, and that is the point of post 6. No primary source publishes documentation hold duration. Queue time is published and it is a different thing. The page states this and excludes all three circulating delay figures from its business case.

**"Is the human 95% realistic?"**
It is the benchmark's own expert baseline on its own test set, not a general claim about brokers. Quote it that way.

**"What about the newest models?"**
Fair, and worth being straight about. All three benchmarks on the page are one-off papers rather than maintained leaderboards, and the newest closed scoring in October 2025. Nothing from the 2026 generation is in any of them.

I did go looking. Three later results exist and none of them is a peer-reviewed ten-digit measurement. A May 2026 workflow paper reaches 64.2%, but at six digits, which is a different depth and cannot be set against a ten-digit figure. The benchmark's own owner published a 65.0% result for its own agent on its own benchmark in July 2026, in a blog post with no paper behind it, and that same post restates the baseline as 49.4% where the peer-reviewed paper says 46.8%. A vendor claims first place and publishes no absolute number at all.

So the accurate statement is that no peer-reviewed ten-digit result has been published for any 2026-generation model. The page says exactly that rather than implying the roster is current.

## Pairing guidance

- Publish the text post first. Put the link in the first comment, not the body.
- Post 1 pairs with `docs/customs-agent.gif`. Posts 2, 5, 6, 7 and 8 are stronger as plain text.
- Post 6 pairs well with the documentation-trap figure from the page if you want one visual, since that figure is the same argument drawn.
- If using one visual, use the existing page assets rather than building a separate diagram.
- Keep each post to a single idea. Post 1 is the number, post 3 is the architecture. Do not merge them.

## Posting notes

- Best window: Tuesday to Thursday, mid-morning.
- Sequence if running several: **one opener from 8, 7 or 6, then 1, then 3** a week later, then 2 for the trade audience. All three openers lead on the reader rather than on a benchmark, which earns the widest top-of-funnel, so any of them works better first than the benchmark post does. Posts 4 and 5 are standalone and can fill gaps.
- Post 6 and post 1 make the same argument from opposite ends, one from operations and one from evidence. Running 6 first and 1 second reads as a build. The reverse reads as a repeat.
- **The pack now has three openers and you should run exactly one.** Post 8 leads on the regulatory squeeze and is the strongest for a trade and compliance audience. Post 7 names no jurisdiction at all and travels furthest outside trade. Post 6 leads on operations and suits a logistics audience. All three make overlapping arguments, so running two of them reads as the same post told twice.
- Posts 8 and 7 are the same personal opener pointed at different rooms. If you want one sentence to choose by: post 8 if your audience already knows what CBAM is, post 7 if they do not.
- Post 7 names no country, agency or regulation. That is deliberate and it is what lets it travel, but it also means it cannot carry the licence ruling or the penalty multiples. Those stay with posts 2 and 6.
- Stay active for the first hour. This topic attracts specialists and their comments are the value.

## Length

**LinkedIn feed posts are capped at 3,000 characters.** That is a hard platform limit, not a guideline, and a longer draft cannot be posted at all. Every post in this pack is inside it.

- Only about **140 characters show on mobile** before "see more". The opening line has to earn the click on its own.
- Engagement data puts the sweet spot at roughly **1,300 to 1,900 characters**. Posts 1 to 5 sit there. Posts 6, 7 and 8 run longer deliberately, because this topic rewards depth and the specialists who comment will read to the end.
- If a draft goes over 3,000, cut transitions and restatements first. Never cut a date, a sample size or a qualifier to make room.

## Hashtags

Posts 8 and 8b carry tags. The earlier posts do not, and do not need to be changed.

`#TradeCompliance #Customs #GlobalTrade #SupplyChain #AppliedAI`

- Ordered specific to broad on purpose. The first two are where the people who will actually comment are, the last two buy reach from outside the field.
- Five is the practical ceiling. Past that LinkedIn stops helping and the post starts looking like it is chasing distribution.
- Put them on the last line of the post, not scattered through the body. Inline tags interrupt the read for no distribution benefit.
- Use the **same five** on 8 and 8b so the two versions read as one campaign rather than two attempts.
- Do not tag the page link comment. Tags belong on the post itself.
- If brokers turn up in the comments on post 2, that thread is worth more than the post. Follow it.

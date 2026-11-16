# Knowledge Layer page: user research plan

Page: `/deep-dives/knowledge-layer`. Status: plan only. No sessions have run yet. Every persona review done so far was a simulated desk review, not user data.

## 1. Objectives

| # | Question | Pass signal |
|---|---|---|
| O1 | Does the story land? | 4 of 5 people can say the thesis in their own words after one read |
| O2 | Can people use the replay? | 4 of 5 run a fault and explain why store checks beat prompt checks |
| O3 | Can people use the chooser? | 4 of 5 reach a store set for their own case in under 2 minutes |
| O4 | Does the evidence feel trustworthy? | Trust score 4 or more out of 5, with no one asking "where is this from" unprompted more than once |
| O5 | Does each seat get its own value? | Each seat names one action they would take next |

## 2. Methods

| Method | Why | Sample | Time |
|---|---|---|---|
| Moderated usability test, think aloud | Story, replay and chooser use | 5 per seat, 20 total | 2 weeks |
| Five-second and recall test | Hook strength | 30 remote | 3 days |
| Card sort on the sorter questions | Do people group questions the way the page does | 15 remote | 1 week |
| Page analytics | Real use after launch | All visitors | 4 weeks |

Analytics events to log, with no personal data: seat chosen, screen reached, replay fault and mode run, chooser finished, outbound clicks.

## 3. Participants

| Seat | Who | Screener must-have |
|---|---|---|
| Business buyer | Head of data, CDO office, ops leader | Funds or approves AI or data work |
| Data builder | Data or ML engineer, architect | Has built RAG, a warehouse model or a graph |
| Strategy reader | Analyst, consultant, investor | Tracks AI or data market shifts |
| First-time reader | Product manager or general manager | No graph or ontology background |

## 4. Session guide, 45 minutes

1. **Warm-up, 5 min.** Role, what "knowledge graph" means to them today.
2. **Context, 10 min.** How their team answers company questions with AI today. What went wrong last time.
3. **Tasks, 20 min.** Think aloud.
   - T1. Read the hook. "What is this page claiming?"
   - T2. Open the three layers. "Which layer would hold your customer list? Your churn definition?"
   - T3. Sorter, three questions. Note wrong picks and why.
   - T4. Replay. Run Poisoned doc in prompt mode, then in store mode. "What changed? What does Cited 3 of 3 tell you?"
   - T5. Cost. "Would you show this number to your CFO?" Watch whether they notice Illustrative.
   - T6. Chooser for their own case. "Do you agree with the result?"
4. **Reaction, 7 min.** Trust 1 to 5 and why. What felt like hype. What is missing.
5. **Wrap-up, 3 min.** One thing they would do next. Anything we did not ask.

Probes: "What made you click that?", "What did you expect to happen?", "Who would you send this to?"

## 5. Measures

- Task success per task (done, done with help, failed).
- Time on T4 and T6.
- Thesis recall, scored against the hook line.
- Trust score and the reasons given.
- Misreads, especially of "Cited 3 of 3", evidence tags and illustrative cost.

## 6. Synthesis template

| Seat | Task | Observation | Quote | Theme | Severity 1 to 3 | Fix |
|---|---|---|---|---|---|---|

Then: affinity map by theme, an impact and effort matrix for fixes, and a one-page journey per seat (hook to action).

## 7. Risks to watch

- Story too abstract for first-time readers before the replay.
- Evidence tags ignored, cost read as a quote.
- Citation lesson missed, read as "the system worked".
- Sorter feels like a quiz rather than a decision aid.

## 8. Timeline

| Week | Work |
|---|---|
| 1 | Recruit, pilot one session, fix the guide |
| 2 | 20 sessions, five-second test, card sort |
| 3 | Synthesis, fix list, page changes |
| 4 to 7 | Analytics read after launch |

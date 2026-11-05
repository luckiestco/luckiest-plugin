# Stage prompts

One prompt per stage, for a coding agent that can start helpers, open a browser,
and edit a preview branch (Claude Code, Codex, Cursor). The skill runs these
stages itself. Use this file when the user wants to run a single stage by hand,
or to save a stage as its own command. Replace `<slug>` with the run folder
name. Every prompt assumes the earlier stages' files exist.

## 1. Check access

```
Get my funnel ready for a test run. Read-only: build and change nothing yet.

Find what you can on your own first (repo, docs, connected tools). Then ask me,
in one message, for only the gaps: what I sell, the goal a visitor should reach,
the route from ad to welcome, and where customer data lives.

For every connected tool (analytics, database, CRM, payment, email), run one
small read to prove the connection works. Start one helper and have it open the
landing page, to prove helpers and the browser work.

Stop and wait for me at any sign-in, secret, consent screen, or payment. Never
paste keys into chat or files.

Write ./usertest/<slug>/access.md with three parts: the route as numbered steps,
then every step marked reachable or blocked with the access it needs, then the
real count per step if analytics answered (unit, window, source).

Done when: every step on the route is marked, and each blocked step names the
exact access that would unblock it.
```

## 2. Find buyer types

```
Read ./usertest/<slug>/access.md. Find up to five types of people who buy from
me, using only the customer sources marked reachable. Read-only queries.

Rules:
- One customer is one record, however many sources mention them. Leave unknown
  fields as "unknown".
- Keep what buyers did or said apart from what you infer.
- If the evidence supports fewer than five types, make fewer. Mark any thin type
  "provisional" rather than inventing a segment.
- No names, emails, companies, or order numbers in the output.

Hand-check 10 records against the type you put them in, and name any bias in
the sources (one channel, mostly complaints, missing profiles).

Write ./usertest/<slug>/buyers.md: coverage first ("N of M records usable"),
then one card per type with count, evidence, hypothesis (what might confuse
them), entry point, deal-breaker, and one goal a tester can visibly reach.

Done when: every card cites evidence, and every goal is something a browser can
show happening.
```

## 3. Walk the route

```
Read ./usertest/<slug>/buyers.md and access.md. Start one independent helper per
buyer card, in parallel, each in its own browser session. Give each helper only
its card, entry point, goal, the route, and these boundaries. Never give a
helper the code, this plan, or another helper's notes.

Boundaries: use only the test accounts and payment sandbox listed in access.md.
Never make a real purchase, message anyone, publish, or accept cookies. A step
that needs missing access is "blocked", never assumed to work.

Each helper walks the route on a phone-sized screen and on a laptop, labels
every step clear, friction, or blocked (no scores), and for each friction or
blocked step records page, action, expected, actual, and a screenshot. It ends
with "Goal reached: yes | no | blocked at <step>".

Merge into ./usertest/<slug>/issues.md, one row per reproducible problem:
ID | page | action | expected | actual | types | device | screenshot | status.
Two notes share a row only when page, action, and failure all match. Status
starts at "found".
Check each row against its screenshot. Save the raw walks to round-1.md.

Done when: report helpers finished, goals reached, open rows, and blocked steps.
```

## 4. Fix on a preview

```
Read ./usertest/<slug>/issues.md. Fix the biggest open rows on a separate
preview of my site (a new branch or worktree, or the page builder's preview).
Never touch the live site and never deploy.

Start one coding helper per independent fix. Give each its row, the evidence,
and a success check. Each helper changes only the files its fix needs.

Keep prices, the offer, tracking, and working features exactly as they are.
Never invent testimonials, reviews, or numbers. If a page lives in a builder you
cannot edit, write the exact proposed change on the row and set it to blocked.
Stop and ask before adding a dependency or changing a database schema.

Merge compatible fixes into the preview, run the project's own tests and type
checks, then open every changed page on phone and laptop. Set a row to "retest"
only once its change is visible on the preview.

Done when: you show the preview link, each changed row with what changed, and
the rows still blocked with what they need.
```

## 5. Repeat until the route holds

```
Read ./usertest/<slug>/issues.md and the latest round file. Run the next round
on the preview: fresh independent helpers, same buyer cards, goals, devices,
labels, and boundaries as round 1.

A row closes only after a helper sees that the original failure no longer
happens on the preview. Anything half fixed, not reachable, or not retested
remains open. Put new problems in a separate
"new this round" list so the comparison stays fair. Save round-<n>.md.

Loop stages 4 and 5. Stop when two back-to-back rounds reach every goal with
at most minor friction, or after round 5, or as soon as the next round needs
access or a business decision from me.

Report a before-and-after table per row, screenshots, and open blockers. Recount
the totals by hand. Never call a helper a real customer, and never claim the
result predicts sales.

Done when: the preview is ready for my review and you name one next action.
```

## 6. Measure real behavior

```
The funnel is live. Using the analytics marked reachable in
./usertest/<slug>/access.md, measure the same route with real visitors.
Read-only.

First list the events or tables and map each route step to one. Check how
steps link to one person. If only browsers are identified, call the counts
"browser journeys". If two steps cannot be joined, show separate counts and no
rate between them. Use one date range and one conversion window for every step,
and exclude test accounts and my own visits.

Write ./usertest/<slug>/results.md with a table of step, count, lost, and lost %.
Name the largest count loss and the largest percent loss separately. Check the
arithmetic by hand.

Compare with issues.md. Tester findings stay hypotheses unless a real drop
agrees. Propose the next fix from real behavior, run it through stages 4 and 5,
and define how to compare before and after release.

Done when: the unit, step order, and window are stated, the math checks out, and
you say what the data supports, what is uncertain, and when to look again.
```

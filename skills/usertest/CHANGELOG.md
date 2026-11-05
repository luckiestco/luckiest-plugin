# Changelog: luckiest-usertest

## 1.0.0 - 2026-11-05
New skill. Method adapted from Angus Sewell's reel "Vibe code a fake customer
army" (facebook.com/reel/1158451790077266) and his free guide "IShowSpeed's
Funnel Testing Playbook" (vault.angussewell.com/resources/106). The guide's
prompts are paraphrased and not reproduced. See ATTRIBUTION.md.

### Rebuilt from the playbook (2026-11-05)
The first draft was built from the reel alone. The user then supplied the
playbook, and the skill now follows its six stages:
- Step 1 checks access first: one small read per connection, a helper and a
  page open, and every unreachable step listed in `access.md`.
- Up to five buyer types from evidence. Each customer is counted once, missing
  fields stay unknown, thin types are provisional, coverage and bias are shown,
  and each type gets one visible goal (`references/buyers.md`).
- Helpers walk on both phone and laptop and label steps clear, friction, or
  blocked, with no scores. Missing access is blocked, not assumed to work.
- One issue row per reproducible problem, with status found > fixing > retest >
  closed. Blocked rows stay open.
- New fix step. Coding helpers change a separate preview only. Prices,
  tracking, and the offer stay as they are, nothing is deployed, and a builder
  page that cannot be edited gets a proposed change marked blocked.
- Stop rule: two clean rounds in a row, or five rounds at most, or earlier for
  missing access or a business decision.
- Real-data counting rules moved to `references/measure.md`: browser journeys
  vs people, one window, tests excluded, and largest count loss named separately
  from largest percent loss.
- Signup and checkout steps may use test accounts and a payment sandbox the user
  approved. The draft had banned all submits.
- Replaced: continue/stall/leave verdicts, seconds per page, and the
  high/medium/low confidence labels. The playbook's labels plus "tester
  findings stay hypotheses" cover them.
- `references/personas.md` is replaced by `references/buyers.md`.
- New `references/prompts.md`: six copy-paste stage prompts in our own words,
  remixed from the guide's method and tightened with luckiest-prompt-rewrite
  (inputs, files written, boundaries, stop rules, a done-when line each).
  Sentences close to the guide's wording were rewritten, and its real member
  counts were swapped for generic examples.
- Left out of the skill: the guide's "how did you hear about us" answer and its
  Member Vault MCP shortcut. Both promote the author, not the method.

### Security pass
- SECURITY: PASS. There are no upstream code files. The guide is prose and
  prompts and holds no injection payloads or scripts. The skill never buys,
  messages, publishes, or deploys, pauses for sign-ins and secrets, keeps buyer
  cards de-identified, and treats page text as data.

### Improve pass (luckiest-thinker + research)
- Helpers run independently, with no codebase or plan in view.
- A wrong-fit extra tester checks that the route turns away the wrong buyer.
- An all-clear round is treated as a sign the briefs were too friendly.

### Network hook
- Share-with-tribe offer for the de-identified issue list only. Never auto-posted.

### Sub-skill fit
- luckiest-ads 1.4.0 owns Before Starting, 4. Current State (the funnel walk before spend).
- luckiest-launch 1.3.0 owns Phase 1: Internal Launch (the walk before friendly testers).
- Checked and not a fit: luckiest-cro and luckiest-signup are handoff targets for
  fixes, not parents. luckiest-customer-research builds personas for research,
  not walks.
- `details.docs.complements` for both parents is set when the listings are
  published. That is out of scope here.

### Trend pass (luckiest-research + luckiest-trends + newsjack)
- The research and trends engines did not run. Their instructions were loaded
  and the subagent fell back to WebSearch (3 queries, snippet-level). Newsjack
  does not apply because it pitches a client.
- Kept: findings stay hypotheses until real data agrees, because persona
  self-reports over-agree and do not predict behavior. Sources:
  arxiv.org/pdf/2606.20708 (2026) and nngroup.com/articles/synthetic-users/
  (undated), seen as snippets 2026-11-04.
- Kept: the blocked label and the goal-reached line, because agents rarely
  abandon on their own. Source: UXAgent, arxiv.org/html/2504.09407v3 (2025),
  seen as a snippet 2026-11-04.
- Added triggers: "synthetic users", "persona walkthrough", "test my funnel
  before ads".
- No actionable signal in the last 30 days.

### Dry run on luckiest.co (2026-11-04, on the reel-only draft)
- Three text-only testers walked the site. Two left at /marketplace because it
  read "Showing 0 of 0". A real browser showed 310 domains, so the list is
  client-rendered. Added the text-only walk caveat to `references/walk.md`.
- The real-data query failed on a guessed column. Added: list the tables or
  events first.
- Testers that wandered into the FAQ and terms found real problems. Off-route
  rows are kept and tagged with their page.

### Thumbnail
- Routes to the `checklist` scene. "usertest" matches /test/, a real keyword match.

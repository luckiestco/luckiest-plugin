# Buyer types

A buyer type is a perspective drawn from real evidence, not an invented
demographic. A card with no evidence is a guess and is marked provisional.

## Where to look (use what is connected, read-only)

| Source | What it gives |
|---|---|
| Customer records, signups, purchases | Who actually buys, in what numbers |
| Sales calls, support email, chat | The words people use when they are stuck |
| Reviews, feedback forms, testimonials | Why buyers bought and what nearly stopped them |
| Analytics segments | Traffic source, device, which pages they saw |
| Project docs (AGENTS.md, BRIEF.md) | The audience the team designed for |

If only project docs exist, every card is provisional: design assumptions, not
customer evidence.

## Counting

- One customer is one record, however many sources mention them.
- Missing fields stay `unknown`. Never fill them with a likely value.
- Report coverage, for example "120 of 400 paying customers have a usable
  profile; 280 are empty". Thin coverage is a finding.
- Hand-check about 10 records against the type you put them in.
- Name any bias, such as feedback coming mostly from unhappy users or one
  channel.

## Card format

```markdown
## <Type> - <count> records (provisional | evidenced)
- Evidence: what these buyers did or said, de-identified
- Hypothesis: what this type might find confusing on the route
- Goal: the visible result a tester of this type must reach (for example
  "sees the monthly price and reaches the signup form")
- Entry point: the ad, post, search, or email this type arrives from
- Leaves if: the deal-breaker, from evidence where possible
```

Keep facts in Evidence and guesses in Hypothesis. Never mix them.

## Optional extra testers

When the route is meant to turn some people away, add one wrong-fit tester whose
goal is to leave at the right step. If it reaches checkout, the page is not
filtering. Mark it as an extra, outside the five types.

## Privacy

No names, emails, company names, or order numbers on any card. Paraphrase quotes
so no one can be identified.

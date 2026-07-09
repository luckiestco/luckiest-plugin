# Vocabulary: User-Facing Terms

Every command file MUST read this file and follow it in all output.

## Internal Term -> User-Facing Term Mapping

| Internal | User-Facing |
|----------|-------------|
| PLAN | plan |
| APPLY | go |
| UNIFY | finish |
| skill_loop status | status |
| DRAFT | in progress |
| DOING | active |
| DONE | complete |
| UAT | testing |
| AC | requirements |
| HANDOFF | ready for review |

## Hard Rules

1. **Never show internal terms to the user.** All output must use user-facing vocabulary only. Never surface PLAN, APPLY, UNIFY, skill_loop, UAT, AC, HANDOFF, DRAFT, DOING, or any internal database term in user-visible output.

2. **Exactly one suggested next action per response.** Every command output ends with a single next-step recommendation in the format: `Next: <one action>`

3. **Plain language, no jargon, no em dashes.** Use direct, accessible language. No em dashes. No filler phrases. No marketing speak.

## Interpretation Guide

- **"done means"**: A feature is complete when it's tested, documented, and ready for users. Not partial or draft.
- **"bookmark"**: Save progress state (current plan, step count, completion %) so users can resume later.
- **plan**: The complete feature spec and acceptance criteria.
- **go**: Execute the next step of the plan.
- **finish**: Mark the feature complete and document results.
- **status**: Check where you are in the feature work.

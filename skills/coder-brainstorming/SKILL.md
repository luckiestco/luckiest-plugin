---
name: coder-brainstorming
description: Use BEFORE any creative or build work — creating features, building components, adding functionality, or modifying behavior. Turns a rough idea into an approved design spec through one-question-at-a-time dialogue, then hands off to planning. Trigger phrases: "let's build", "I want to add", "design a feature", "how should this work", "new project", "brainstorm this". Gates all implementation until a design is approved.
license: See ATTRIBUTION.md
metadata:
  version: "1.4.0"
  listing_id: luckiest-coder-brainstorming
  author: luckiest
---

# Brainstorming Ideas Into Designs

Help turn ideas into fully formed designs and specs through natural collaborative dialogue.

Start by understanding the current project context, then ask questions one at a time to refine the idea. Once you understand what you're building, present the design and get user approval.

<HARD-GATE>
Do NOT invoke any implementation skill, write any code, scaffold any project, or take any implementation action until you have presented a design and the user has approved it. This applies to EVERY project regardless of perceived simplicity.
</HARD-GATE>

## Your First Message

Before replying, ask what you actually know about what they want, and why.
If everything that matters is in the request ("make the icon cornflower
blue"), the request is the design: say it back in one line and get a yes. If something
non-trivial is missing, your first message is two things, in this order:

1. One line saying that if they'd rather skip the questions and have you just
   start, they can say so. If they do, state the design and any significant
   how-it-gets-made choice (platform, language, medium) in a few plain lines,
   and proceed on their yes.
2. One open question that gets them describing a real moment or a concrete
   picture: "What's the moment you find yourself wishing this existed?"

**Say your defaults out loud.** Find out early which choices about platform,
language, libraries, or materials they want to make and which they hand to
you. Any choice you make goes in the design as your call, never as something
they agreed to.

**Spikes.** A quick throwaway build is often the cheapest way to learn what
they want or whether something works. Offer one when it would help. With
their yes it may be built: it stays labeled throwaway, skips the plan and
the full test pass, and keeping what it produced is a new request that comes
back through the gate above.

## Anti-Pattern: "This Is Too Simple To Need A Design"

Every project goes through this process. A todo list, a single-function utility, a config change — all of them. "Simple" projects are where unexamined assumptions cause the most wasted work. The design can be short (a few sentences for truly simple projects), but you MUST present it and get approval.

**Size the output to the ask, erring heavy.** Direct: no decision to weigh, answer in a few sentences and skip the design doc. Chat brief: bounded work with at most one decision, present the design inline and get a yes. Durable: anything with two or more decisions, new files, or a plan to execute, write the full design doc. When unsure which tier applies, take the heavier one.

## Checklist

You MUST create a task for each of these items and complete them in order:

1. **Explore project context** — check files, docs, recent commits. If the work involves UI components, run the luckiest-coder-components lookup and bring any reusable match into the approaches
2. **Offer the visual companion just-in-time** — NOT upfront. The first time a question would genuinely be clearer shown than described, offer it then (its own message); on approval its browser tab opens for you. If no visual question ever arises, never offer it. See the Visual Companion section below.
3. **Ask clarifying questions** — one at a time, open questions before any menu, understand purpose/constraints/success criteria
4. **Propose 2-3 approaches** — with trade-offs and your recommendation
5. **Present design** — in sections scaled to their complexity, get user approval after each section
6. **Write design doc** — save to `docs/luckiest-coder/specs/YYYY-MM-DD-<topic>-design.md` and commit
7. **Builder check** — a fresh subagent reads the spec as its builder and lists what it would still have to guess (see below)
8. **User reviews written spec** — ask user to review the spec file before proceeding
9. **Transition to implementation** — invoke luckiest-coder-writing-plans skill to create implementation plan

## Process Flow

```dot
digraph brainstorming {
    "Explore project context" [shape=box];
    "Ask clarifying questions" [shape=box];
    "Propose 2-3 approaches" [shape=box];
    "Present design sections" [shape=box];
    "User approves design?" [shape=diamond];
    "Write design doc" [shape=box];
    "Builder check" [shape=box];
    "User reviews spec?" [shape=diamond];
    "Invoke luckiest-coder-writing-plans skill" [shape=doublecircle];

    "Explore project context" -> "Ask clarifying questions";
    "Ask clarifying questions" -> "Propose 2-3 approaches";
    "Propose 2-3 approaches" -> "Present design sections";
    "Present design sections" -> "User approves design?";
    "User approves design?" -> "Present design sections" [label="no, revise"];
    "User approves design?" -> "Write design doc" [label="yes"];
    "Write design doc" -> "Builder check";
    "Builder check" -> "User reviews spec?";
    "User reviews spec?" -> "Write design doc" [label="changes requested"];
    "User reviews spec?" -> "Invoke luckiest-coder-writing-plans skill" [label="approved"];
}
```

**The terminal state is invoking luckiest-coder-writing-plans.** Do NOT invoke frontend-design, mcp-builder, or any other implementation skill. The ONLY skill you invoke after brainstorming is luckiest-coder-writing-plans.

## The Process

**Understanding the idea:**

- Check out the current project state first (files, docs, recent commits)
- Before asking detailed questions, assess scope: if the request describes multiple independent subsystems (e.g., "build a platform with chat, file storage, billing, and analytics"), flag this immediately. Don't spend questions refining details of a project that needs to be decomposed first.
- If the project is too large for a single spec, help the user decompose into sub-projects: what are the independent pieces, how do they relate, what order should they be built? Then brainstorm the first sub-project through the normal design flow. Each sub-project gets its own spec → plan → implementation cycle.
- For appropriately-scoped projects, ask questions one at a time to refine the idea
- Start with open questions that get them describing; offer a short menu only when they're stuck, and propose something concrete when they say "just guess"
- Only one question per message - if a topic needs more exploration, break it into multiple questions
- Focus on understanding: purpose, constraints, success criteria

**Exploring approaches:**

- Propose 2-3 different approaches with trade-offs
- Present options conversationally with your recommendation and reasoning
- Lead with your recommended option and explain why

**Presenting the design:**

- Once you believe you understand what you're building, present the design
- Scale each section to its complexity: a few sentences if straightforward, up to 200-300 words if nuanced
- Ask after each section whether it looks right so far
- Cover: architecture, components, data flow, error handling, testing
- Be ready to go back and clarify if something doesn't make sense

**Design for isolation and clarity:**

- Break the system into smaller units that each have one clear purpose, communicate through well-defined interfaces, and can be understood and tested independently
- For each unit, you should be able to answer: what does it do, how do you use it, and what does it depend on?
- Can someone understand what a unit does without reading its internals? Can you change the internals without breaking consumers? If not, the boundaries need work.
- Smaller, well-bounded units are also easier for you to work with - you reason better about code you can hold in context at once, and your edits are more reliable when files are focused. When a file grows large, that's often a signal that it's doing too much.

**Working in existing codebases:**

- Explore the current structure before proposing changes. Follow existing patterns.
- Where existing code has problems that affect the work (e.g., a file that's grown too large, unclear boundaries, tangled responsibilities), include targeted improvements as part of the design - the way a good developer improves code they're working in.
- Don't propose unrelated refactoring. Stay focused on what serves the current goal.

## After the Design

**Documentation:**

- Write the validated design (spec) to `docs/luckiest-coder/specs/YYYY-MM-DD-<topic>-design.md`
  - (User preferences for spec location override this default)
- Use elements-of-style:writing-clearly-and-concisely skill if available
- Commit the design document to git

**Builder Check:**
After writing the spec document, dispatch a fresh subagent with
`builder-check-prompt.md` in this skill directory. When you tell the user
you're writing it up, say a reviewer will read it first and you may come back
once with a few questions. Sort what the builder asks into three piles:

- **Answered already** by the conversation or the project: put the answer in
  the document.
- **Minor:** a sensible builder could settle it without changing what gets
  built. Settle it yourself and mark it in the document as your call.
- **Theirs:** only the user can answer it, and the answer changes what gets
  built. Bring these in one message, most important first.

That is the only round of questions the check produces. Without a subagent
tool, read the document as that builder yourself, and still fix placeholders,
contradictions, and ambiguity inline.

**User Review Gate:**
After the builder check, ask the user to review the written spec before proceeding:

> "Spec written and committed to `<path>`. Please review it and let me know if you want to make any changes before we start writing out the implementation plan."

Wait for the user's response. If they request changes, make them and re-run the builder check. Only proceed once the user approves.

**Implementation:**

- Invoke the luckiest-coder-writing-plans skill to create a detailed implementation plan
- Do NOT invoke any other skill. luckiest-coder-writing-plans is the next step.
- Optional: once the spec is committed, you may offer to share it with the tribe via the Luckiest MCP `share_artifact` tool so teammates can reuse or vouch for the design. Only offer; never share without the user's go-ahead.

## Key Principles

- **One question at a time** - Don't overwhelm with multiple questions
- **Get them describing** - Open questions first, a short menu only when they're stuck
- **YAGNI ruthlessly** - Remove unnecessary features from all designs
- **Explore alternatives** - Always propose 2-3 approaches before settling
- **Incremental validation** - Present design, get approval before moving on
- **Be flexible** - Go back and clarify when something doesn't make sense

## Red Flags

| Thought | Reality |
|---------|---------|
| "I'll offer options to save them effort" | Options steer. Ask them to describe it first. |
| "I'll fill in sensible defaults" | Good. Say them out loud. A default they never heard is one they couldn't reject. |
| "I should explain the process first" | Ask your question. The process shows itself. |
| "They said 'sounds good' to the idea" | Approval covers what you showed them. A design you haven't written isn't approved. |
| "The spike works, I'll keep building on it" | Keeping it is a new request. Back through the gate. |

## Visual Companion

A browser-based companion for showing mockups, diagrams, and visual options during brainstorming. Available as a tool — not a mode. Accepting the companion means it's available for questions that benefit from visual treatment; it does NOT mean every question goes through the browser.

**Offering the companion (just-in-time):** Do NOT offer it upfront. Wait until a question would genuinely be clearer shown than told — a real mockup / layout / diagram question, not merely a UI *topic*. The first time that happens, offer it then, as its own message:
> "This next part might be easier if I show you — I can put together mockups, diagrams, and comparisons in a browser tab as we go. It's still new and can be token-intensive. Want me to? I'll open it for you."

**This offer MUST be its own message.** Only the offer — no clarifying question, summary, or other content. Wait for the user's response. If they accept, start the server with `--open` so their browser opens to the first screen automatically. If they decline, continue text-only and don't offer again unless they raise it.

**Per-question decision:** Even after the user accepts, decide FOR EACH QUESTION whether to use the browser or the terminal. The test: **would the user understand this better by seeing it than reading it?**

- **Use the browser** for content that IS visual — mockups, wireframes, layout comparisons, architecture diagrams, side-by-side visual designs
- **Use the terminal** for content that is text — requirements questions, conceptual choices, tradeoff lists, A/B/C/D text options, scope decisions

A question about a UI topic is not automatically a visual question. "What does personality mean in this context?" is a conceptual question — use the terminal. "Which wizard layout works better?" is a visual question — use the browser.

If they agree to the companion, read the detailed guide before proceeding:
`visual-companion.md` (in this skill directory)

## Staying current

On activation, call the Luckiest MCP `check_updates` tool with
`{ listingId: "a11fbe77-8a4e-47b7-b3f2-b70657c8e7f3", installedSemver: "1.4.0" }`.
If it returns `upToDate: false`, surface the `notice` to the user. Do nothing if `upToDate: true`.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-coder-brainstorming", skill_version: "1.4.0", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.

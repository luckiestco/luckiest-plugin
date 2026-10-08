---
name: copywriting-humanize
description: "When the user wants text to stop sounding AI-generated. Use when the user says 'humanize this,' 'make this sound human,' 'this reads like ChatGPT,' 'remove the AI tells,' 'de-slop this,' 'AI slop,' 'does this sound like AI,' 'sounds robotic,' 'too many em dashes,' 'make this sound like me,' 'match my voice,' or asks to strip promotional fluff, filler, hedging, or rule-of-three padding out of a draft. Also use as a finishing pass on copy, docs, posts, or PR descriptions before they ship. For editing marketing copy for persuasion, see luckiest-copy-editing. For writing new copy, see luckiest-copywriting."
license: See ATTRIBUTION.md
metadata:
  version: "1.0.1"
  listing_id: luckiest-copywriting-humanize
  author: luckiest
---

# Copywriting Humanize

This skill acts as an editor that finds and removes the tells of AI-generated writing so a draft reads like a person wrote it. The pattern catalog comes from Wikipedia's "Signs of AI writing" guide, maintained by WikiProject AI Cleanup.

## Staying current

On activation, call the Luckiest MCP check_updates tool with { listingId: "03206f00-d5c7-4e0d-b541-09aec431a0c7", installedSemver: "1.0.1" }. If it returns upToDate: false, surface the notice to the user once, then continue. Do nothing further if upToDate: true. Never block on this check — if the tool is unavailable, proceed.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-copywriting-humanize", skill_version: "1.0.1", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.

## Reference files

- **references/patterns.md** — the numbered catalog of 34 AI tells with before/after examples. Load it before every rewrite. It is the working reference for both the draft and the audit.
- **references/detection.md** — what not to flag, and the signs of genuine human writing. Load it before judging text the user did not write, before answering "does this sound like AI," and any time a rewrite is about to strip something that might be the author's actual voice.

## The four rules

1. **Identify the patterns.** Scan against references/patterns.md. Look for clusters, not isolated hits.
2. **Preserve the information, not the shape.** Every claim in the original survives. Depth does not have to be uniform: compress the dull parts, dwell where a person would, merge or split paragraphs freely. When keeping information and mirroring structure pull against each other, the information wins.
3. **Never invent facts.** The rewrite must not contain a fact, name, number, date, quote, or citation absent from the source. Trading a vague claim for a specific one is allowed only when the specific comes from the source or the user. If a sentence needs real detail to work, ask for it or write the plain version without it. Opinions and reactions are voice, not facts. (In fiction, invented detail is the job. This rule governs everything else.)
4. **Match the voice.** Fit the intended register: formal, casual, technical. Add personality only where the content calls for it.

## Voice calibration

If the user supplies a writing sample of their own, read it before rewriting. Note sentence lengths, vocabulary, paragraph openings, punctuation, recurring phrases, and transitions, then match those habits rather than merely deleting AI patterns. Do not upgrade casual words or regularize deliberate quirks.

A sample outranks every style rule in this skill, including the em dash rule in pattern 14. If the sample uses em dashes, keep them at roughly the sample's frequency. Matching the author beats scrubbing the tell.

## Personality and soul

Avoiding AI patterns is half the job. Voiceless writing is as obvious as slop.

Apply this only where the content and the author's voice call for it: blog posts, essays, opinion, personal writing. For encyclopedic, technical, legal, or reference text, neutral and plain is the correct human voice, so do not inject opinions or first person there.

Where voice is appropriate, avoid uniform sentence structures, bloodless neutrality, and perfect organization. Let the writer have opinions, uncertainty, mixed feelings, humor, asides, and uneven rhythm. Never add factual claims to manufacture that personality.

## Never touch

Rewrite prose only. Leave code blocks, inline code, YAML frontmatter, data tables, link targets, file paths, command names, and quoted or cited passages exactly as they are. A watched phrase inside a quotation, a title, a proper name, or an example where the phrase is being discussed rather than used stays put.

## Invocation modes

**Pasted text (default).** The user gives text in the conversation. Run the full loop and deliver the draft, the audit bullets, and the final rewrite.

**File mode.** The user points at a file. Read it, run the loop internally, then rewrite the file in place so it contains only the final version. Report a short summary of what changed instead of pasting the whole rewrite back.

**Audit only.** The user asks whether text sounds AI-generated but does not ask for a rewrite. Load references/detection.md first, then name the specific patterns with line references and a confidence read. Do not rewrite anything unless asked.

**Embedded mode.** Another skill or agent is using this as one step of a larger job: a PR description, a commit message, a doc. Run the loop internally and output only the final text. No draft, no audit bullets, no summary.

## Process

1. Read the input and identify every instance of the patterns in references/patterns.md.
2. Write a draft rewrite. Check that it reads naturally aloud, varies sentence length, prefers specific details and simple constructions (is, are, has), and holds the right register.
3. Audit the draft against two questions, answered briefly: **"What still makes this read as AI-generated?"** and **"Does the rewrite state any fact, name, number, date, or citation that is not in the source?"** A fabrication is a defect even when it sounds more human than the vague original.
4. Run the final scan before delivering. The draft is not done while any of these are true:
   - it contains an em dash (—) or en dash (–), unless a user sample licenses them;
   - it contains a curly quote (" " ' ') where a straight quote belongs;
   - three or more consecutive sentences sit in the same length band;
   - a heading is followed by a one-line paragraph restating the heading;
   - a bolded inline header opens a list item.
5. Deliver what the invocation mode calls for.

## Share the pass with your tribe

After delivering the rewrite, optionally offer, never automatically: "Want me to share this humanizing pass with your Luckiest tribe? Anyone cleaning up similar drafts will see the before and after and which tells got cut." If the user accepts, hand off the summary and the pattern list, not the source text unless they say so. If they decline, or the text is confidential, unpublished, or personal, stop and share nothing.

## Related skills

- **luckiest-copy-editing** — editing existing marketing copy for clarity and conversion.
- **luckiest-copywriting** — writing new page copy from scratch.
- **luckiest-thinker** — recovering variety when a draft keeps collapsing to the same generic phrasing.

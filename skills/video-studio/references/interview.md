# Context interview

Every new run starts here, before Step 1. Five minutes of questions saves a
storyboard nobody wanted. The answers go to `<output-dir>/brief.md`, and the
director, the script, and the plan read that file instead of guessing.

## 1. Infer first

Read the request, then skim the repo the way Step 1 does (README, landing page,
`package.json`, an existing `plan.md` or `brief.md`). Fill in every field below
that they already answer. A field counts as answered only when the request or the
repo states one value for it, not when you could guess it. When sources disagree
(the README and `package.json` describe different products) or name several
candidates (two audiences), the field is open: ask, with those candidates as the
options.

## 2. Ask what is left

Use AskUserQuestion. At most 4 questions per call and at most 2 calls. Skip every
question the request or repo already answers. Start the first call with one
line naming what you inferred and from where, for example: "From your README: it
is for freelancers, and the message is 'get paid on time'. A few questions on the
rest."

Each question offers 2 to 4 options drawn from the repo (the user can always pick
"Other" and type). Put your best guess first and mark it "(Recommended)".

| Call | Field | Question | Example options |
|---|---|---|---|
| 1 | Audience | Who is this video for? | Two or three audiences from the README or site |
| 1 | Message | What is the one thing they should remember? | Two or three lines from the product's own copy |
| 1 | Where | Where will it be posted? | "X and LinkedIn, 16:9, 20s", "TikTok and Reels, 9:16, 30s", "YouTube or website, 16:9, 60-90s" |
| 1 | Type | What kind of video? | "Motion graphics (HyperFrames)", "AI-generated video", "A mix of both" |
| 2 | Why now | What should viewers do after watching? | "Sign up", "Join the waitlist", "Watch the launch", with the real URL |
| 2 | References | Any video or style you want it to feel like? | "No reference", "I'll paste a link" |
| 2 | Must show | Anything that has to be in it? | "Our logo and the dashboard", "A real customer number", "Nothing specific" |
| 2 | Voice | Voiceover or no voiceover? | "No voice, music and text only", "AI voice (Kokoro)", "I'll record it" |

If call 1 answers everything that matters (the user typed a full brief in
"Other"), skip call 2. Never ask a third time: anything still open is inferred
and marked as such.

"A mix of both" means some scenes are `ai` and the rest are motion, demo, or
logo scenes. AI scenes cost credits, so the cost check comes later, before any
generation (SKILL.md Step 3).

## 3. Write brief.md

```markdown
# Brief: <product>

- Audience: <who>
- Message: <one line, no "and">
- Where: <platforms>, <format>, <length>s
- Type: <motion graphics | AI-generated | mix>
- Call to action: <action>, <url>
- References: <links or none>
- Must show: <assets or none>
- Voice: <none | Kokoro | user recording>

Inferred, not asked: <field>: <value> (from <source>), ...
```

Mark every value you did not hear from the user in the "Inferred" line (write
"none" when everything was asked), so the user can spot a wrong guess. A URL no
file states is written as `<url> [confirm]`. In chat, summarize the brief in four
lines or fewer and give its path, then go to Step 1.

## With --yes

Ask nothing. Infer every field from the request and the repo, write `brief.md`
with every field listed under "Inferred", show it, and continue. Defaults when
nothing says otherwise: Where is "X and LinkedIn, 16:9" at the middle of the
mode's default length (20s for `launch`), Type is motion graphics, Voice is none,
References and Must show are none, and a missing URL is `[confirm]`.

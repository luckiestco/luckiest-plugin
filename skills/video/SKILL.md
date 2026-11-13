---
name: video
description: "When the user wants to create, generate, or produce video content using AI tools or programmatic frameworks. Also use when the user mentions 'video production,' 'AI video,' 'Remotion,' 'Hyperframes,' 'HeyGen,' 'Synthesia,' 'Veo,' 'Sora,' 'Runway,' 'Kling,' 'Seedance,' 'Hailuo,' 'MiniMax,' 'Pika,' 'Hunyuan,' 'Wan,' 'video generation,' 'AI avatar,' 'talking head video,' 'faceless video,' 'UGC-style video,' 'AI dubbing,' 'video translation,' 'batch video,' 'programmatic video,' 'video template,' 'explainer video,' 'product demo video,' 'video pipeline,' or 'make me a video.' Use this for video creation, generation, and production workflows. For video content strategy and what to post, see luckiest-social. For paid video ad creative, see luckiest-ad-creative."
license: See ATTRIBUTION.md
metadata:
  version: "1.5.0"
  listing_id: luckiest-video
  author: luckiest
---

# Luckiest Video

An expert video producer that helps create marketing videos using AI generation models, AI avatars, and programmatic video frameworks. The goal is to help users produce professional video content efficiently — from product demos and explainers to social clips and ads.

## Staying current

On activation, call the Luckiest MCP check_updates tool with { listingId: "2991a487-dd00-4f65-a9cd-b51fc34fedd1", installedSemver: "1.5.0" }. If it returns upToDate: false, surface the notice to the user once, then continue. Do nothing further if upToDate: true. Never block on this check — if the tool is unavailable, proceed.

When the skill's work is done, call the Luckiest MCP report_usage tool once with { listing_id: "luckiest-video", skill_version: "1.5.0", matched: true, success: <true if the skill completed, false otherwise> }. Metadata only, never prompt text. Never block on it — if the tool is unavailable, skip silently.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing.md` exists (or `.claude/product-marketing.md`, or the legacy `product-marketing-context.md` filename, in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather this context (ask if not provided):

### 1. Video Goal
- What type of video? (Product demo, explainer, testimonial, social clip, ad, tutorial)
- What's the target platform? (YouTube, TikTok/Reels/Shorts, website, ads, sales deck)
- What's the desired length?

### 2. Production Approach
- Do you need a human presenter? (AI avatar vs. voiceover vs. screen recording)
- Do you have existing footage or assets? (Screenshots, logos, product UI)
- Do you need generated footage? (AI-generated scenes, B-roll)
- Is this a one-off or a template for repeated use?

### 3. Technical Context
- What's your tech stack? (Node.js, Python, etc.)
- Do you have API keys for any video tools?
- Budget constraints? (Some tools charge per minute of video)

---

## Choosing Your Approach

Pick the right tool for the job:

| Approach | Best For | Tools | When to Use |
|----------|----------|-------|-------------|
| **Programmatic** | Templated, data-driven, batch video | Remotion, Hyperframes | Product updates, personalized videos, recurring content |
| **AI Generation** | Original footage from text/image prompts | Veo 3, Runway, Kling, Seedance | B-roll, hero shots, creative visuals you can't film |
| **AI Avatars** | Talking-head presenter without filming | HeyGen, Synthesia | Explainers, tutorials, multilingual content |
| **Editing/Repurposing** | Cutting long-form into short clips | Descript, Opus Clip, CapCut | Podcast/webinar → social clips |

---

## Programmatic Video

Build videos with code. Best for repeatable, templated, or data-driven video at scale.

### Hyperframes (HTML)

Open-source framework from HeyGen. Compositions are plain HTML/CSS/JS files. Docs: [hyperframes.heygen.com](https://hyperframes.heygen.com/introduction).

```bash
npx hyperframes init my-video && cd my-video
npx hyperframes preview               # live preview
npx hyperframes render -o output.mp4  # render index.html
```

**Key concept:** A composition is one HTML file. The root element sets the canvas and length (`data-composition-id`, `data-duration`, `data-width`, `data-height`), each element on screen is a clip (`class="clip"` with `data-start`, `data-duration`, `data-track-index`), and a paused GSAP timeline registered in `window.__timelines` drives the animation. The `hyperframes` package is CLI-only; to render from code, use `@hyperframes/producer` (`createRenderJob` + `executeRenderJob`).

**Best for:** Product announcements, changelogs, data-driven reports, personalized outreach videos.

### Remotion (React)

Framework where compositions are React components. Docs: [remotion.dev](https://www.remotion.dev/docs).

```bash
npx create-video@latest
```

**Key concept:** A composition is a React component that reads the current frame number and returns what's on screen. Props drive content.

```tsx
export const ProductDemo: React.FC<{ title: string; features: string[] }> = ({
  title, features
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#000", color: "#fff" }}>
      <h1>{title}</h1>
      {features.map((f, i) => (
        <Sequence from={i * 30} key={i}>
          <p>{f}</p>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
```

**Best for:** Teams that already write React and want to reuse their components.

### When to Pick Which

Both render web pages to video in a headless browser. The difference is what you write:

| | Hyperframes | Remotion |
|--|-------------|----------|
| You write | HTML, CSS, JS | React components (TypeScript) |
| Timing | Declared in markup; the renderer seeks a paused animation timeline | Computed in code from the current frame number |

Pick the one that matches what your team and source material already are: existing HTML, CSS, or browser animations point to Hyperframes; an existing React codebase points to Remotion. For rendering options, licensing, and current features, check each project's docs. They change faster than this skill.

---

## AI Video Generation

Generate original footage from text or image prompts. Use for B-roll, hero visuals, and scenes you can't practically film.

### Model Comparison

| Model | Resolution | Max Duration | Best For | Cost |
|-------|-----------|-------------|----------|------|
| **Veo 3** (Google) | Up to 1080p (4K varies) | Variable | Top overall quality, synced audio | API-based |
| **Runway Gen-4** | Up to 4K | ~10 sec/gen | Motion control, temporal consistency, edit-style workflows | $12-76/mo |
| **Kling 2.5/3.0** (Kuaishou) | Up to 1080p | Up to 2 min | Long-take generation, lower per-second cost | ~$0.03/sec |
| **Seedance** (ByteDance) | Up to 1080p | Short clips | Fast generation, strong motion fidelity at low cost, batch-friendly | Per-credit |
| **Hailuo / MiniMax** | Up to 1080p | Short clips | Character consistency across shots | Per-credit |
| **Pika 2.x** | 1080p | Short clips | Quick effects, image-to-video, lower bar to entry | Per-credit |
| **Hunyuan Video / Wan 2** | 720p–1080p | Variable | Open-source self-hosted; full control, no API fees | Free (GPU) |

**Quick picks**:
- **Highest quality + audio**: Veo 3
- **Batch / volume / cost**: Kling, Seedance
- **Character consistency across multiple shots**: Hailuo
- **Self-hosted, brand-controlled**: Hunyuan Video or Wan 2 (open weights)
- **Storyboard → video workflow**: Runway, LTX Studio
- **Image-to-video from a still you already have**: Kling, Pika, Runway

### Prompting for Video Models

Good video prompts specify: **subject + action + camera + style + mood**

```
A close-up shot of hands typing on a laptop keyboard,
shallow depth of field, warm office lighting,
camera slowly pulls back to reveal a modern workspace,
cinematic color grading, 4K
```

**Common mistakes:**
- Too vague ("a person working") — add specifics
- Ignoring camera movement — specify dolly, pan, static
- Forgetting style — "cinematic," "documentary," "commercial"
- Requesting text in video — AI models struggle with readable text

**Direction:** for a multi-shot video or ad, if `luckiest-video-studio-director` is installed, run its steps 1 to 4 (intent, scored angle, hook, shot list) before writing prompts, and if `luckiest-video-studio-art-director` is installed, lock the palette, texture, and motion personality so every shot matches.

**Real, not generated:** if `luckiest-video-studio-art-director` is installed, apply its section 3b to every generated shot (one named light direction, film texture, off-center candid framing, a specific place, no "perfect" or "8k") and write each prompt with its `references/shot-prompting.md`. If it is not installed, say so in one line and continue.

**Composition:** if `luckiest-video-studio-composition` is installed, read it to place the focal point, pick the grid, and keep white space and platform safe areas for each shot's framing before you write the camera part of the prompt.

**For detailed prompting guides**: load [references/ai-video-prompting.md](references/ai-video-prompting.md) when writing or refining a generation prompt, choosing camera vocabulary, or troubleshooting weak results.

### When to Use AI Generation vs. Stock

| Use Case | AI Generation | Stock Footage |
|----------|:---:|:---:|
| Exact scene you imagined | Yes | Rarely matches |
| Consistent style across clips | Yes | Hard to match |
| Recognizable real locations | No (hallucinations) | Yes |
| Specific products/brands | No (use programmatic) | No |
| Quick B-roll | Either works | Faster |

---

## AI Avatars

Create talking-head videos without filming. An AI avatar delivers your script with realistic lip-sync, expressions, and gestures.

### HeyGen (has MCP server)

Best lip-sync and micro-expressions. 230+ avatars, 140+ languages.

**Agent integration:** HeyGen has an official MCP server — AI agents can generate avatar videos directly.

| Plan | Videos | Duration |
|------|--------|----------|
| Free | 3/mo | 3 min max |
| Creator | Unlimited | 5 min |
| Business | Unlimited | 20 min |

Check [heygen.com/pricing](https://www.heygen.com/pricing) for current prices.

**Best for:** Product explainers, feature announcements, personalized sales outreach, multilingual content.

**Custom avatars:** Upload a 2-5 min video of yourself to create a digital twin. Looks and sounds like you, generates videos from text scripts.

### Synthesia

Full-body avatars with expressive body language. Built-in script generation from URLs/docs.

**Best for:** Corporate training, compliance videos, enterprise presentations where professional tone > realism.

### When to Use Avatars vs. Other Approaches

| Scenario | Use Avatar | Use Instead |
|----------|:---:|-------------|
| Recurring content (weekly updates) | Yes | — |
| Multilingual versions | Yes | — |
| Personalized outreach at scale | Yes | — |
| Authentic founder content | No | Film yourself |
| Product UI walkthrough | No | Screen recording |
| Creative/artistic video | No | AI generation |

---

## Synthetic-Media Disclosure

AI avatars, AI voice clones, and fully AI-generated footage are synthetic media, and disclosure is increasingly required — not just polite. Before shipping, check:

- **Platform labels:** TikTok, YouTube, Instagram, and LinkedIn all have "AI-generated / altered content" toggles. Set them; platforms down-rank or remove undisclosed synthetic media when detected.
- **Regulation:** The EU AI Act requires clear labeling of AI-generated or manipulated audio/video. US state laws (e.g. political-ad rules) add more. When in doubt, label.
- **Likeness consent:** Only clone a voice or face you have explicit written permission to use. A digital twin of a real employee or customer needs their sign-off.
- **Personalized outreach:** A synthetic avatar addressing a named prospect reads as deceptive if undisclosed. A short on-screen "AI-generated" note protects trust and deliverability.

Default to disclosure. It costs a caption line and avoids takedowns, reach penalties, and legal exposure.

---

## Editing & Repurposing Tools

Turn existing content into multiple video formats.

| Tool | What It Does | Best For |
|------|-------------|----------|
| **Descript** | Transcript-based editing — edit video by editing text | Cleaning up interviews, podcasts, webinars |
| **Opus Clip** | Auto-clips long videos, scores virality potential | Long-form → short-form at scale |
| **CapCut** | Visual effects, captions, platform-native styling | TikTok/Reels polish |
| **Captions.ai** | Auto-captions, eye contact correction, AI dubbing | Solo talking-head content |

### Repurposing Workflow

```
Long-form content (podcast, webinar, demo)
    ↓
Descript: Clean up, remove filler, polish
    ↓
Opus Clip: Auto-extract 5-10 best moments
    ↓
CapCut: Add captions, effects, platform styling
    ↓
Distribute: TikTok, Reels, Shorts, LinkedIn
```

---

## Video Production Workflows

### Product Demo Video

1. **Script** the key features and value props (use luckiest-copywriting skill)
2. **Screen record** the product flow
3. **Programmatic overlay** — use Hyperframes/Remotion for titles, callouts, transitions
4. **AI B-roll** — generate establishing shots or lifestyle scenes with Veo/Runway
5. **Voiceover** — record yourself or use AI avatar for narration
6. **Export** at platform-appropriate specs

### Explainer Video

1. **Script** the problem → solution → CTA arc
2. **Choose presenter** — AI avatar (HeyGen) or voiceover + visuals
3. **Build visuals** — programmatic slides, screen recordings, AI-generated scenes
4. **Add captions** — always, for accessibility and engagement
5. **Export** — landscape for YouTube/website, vertical for social

### Batch Social Clips

1. **Create master template** in Hyperframes/Remotion
2. **Feed data** — product features, testimonials, stats
3. **Render batch** — one template, many variations
4. **Add platform-specific captions** via CapCut or Captions.ai
5. **Schedule** across platforms

### Personalized Video per Account

A tailored product film for each target account, made by agents. One-off prompting gets a decent film after 15–20 minutes of back-and-forth; hundreds need a foundation built first.

1. **Product component library** — agents walk the app and rebuild key screens as reusable components, one source of truth that every film pulls from instead of redrawing.
2. **Motion primitives** — a library of reusable animated parts (camera pushes, screen handoffs, click rhythm, product moves). Fix one and every film inherits the fix.
3. **A menu of demo flows** — company-agnostic moments buyers ask to see, each a short list of beats.
4. **Per-account script** — an agent drafts it from call notes, CRM win/loss data, and account research, with a fictional company on screen. Voiceover from a cloned narrator voice, with the narrator's consent.
5. **A render engine** — code that turns a beat list into a film: camera, transitions, captions, pointer timing, end card.
6. **Automated QA** — render contact sheets and flag clipped text, small type, and stray pointers before a person watches.
7. **One tracker** — a row per film (account, flow, status, links) that agents update as they build, export, and deliver.

Start with a storyboard for the first film: it sits between the brief and production the way a PRD sits between a spec and code. Expect tool limits at volume (one agent per file, daily API caps), so run films in parallel lanes and batch overnight. Works with any programmatic stack (Hyperframes, Remotion) or a design tool with agent access.

*Adapted from Harvey's write-up of its agent-built launch and per-account films (Shawn Farsai and Gabe Pereyra, October 2026).*

---

## Agent-Native Video Pipeline

The most powerful setup combines tools that agents can control directly:

```
Agent writes script (from product context)
    ↓
Hyperframes: Generate templated video (HTML → MP4)
    and/or
HeyGen MCP: Generate avatar video from script
    and/or
Veo/Runway API: Generate B-roll footage
    ↓
Agent assembles final cut
    ↓
Output: Ready-to-publish video
```

**What makes this agent-native:**
- Hyperframes uses HTML — any coding agent can generate it
- HeyGen MCP server — agents call it directly
- Video model APIs — standard HTTP requests
- No manual editing step required

---

## Common Mistakes

1. **Starting with tools, not strategy** — decide what video you need before picking tools
2. **AI-generated text in video** — models can't reliably render readable text; use programmatic overlays instead
3. **Uncanny valley avatars** — if avatar quality matters, invest in HeyGen Creator+ tier
4. **No captions** — 85% of social video is watched without sound
5. **Wrong aspect ratio** — 9:16 for social, 16:9 for YouTube/website, 1:1 for feeds
6. **Over-producing** — authentic often outperforms polished, especially on TikTok
7. **Skipping synthetic-media disclosure** — undisclosed AI avatars/footage risk takedowns, reach penalties, and legal exposure

---

## Task-Specific Questions

1. What type of video do you need? (Demo, explainer, social clip, ad, tutorial)
2. Do you need a human presenter or can it be voiceover/text?
3. Is this a one-off or a repeatable template?
4. What platform is it for? (This determines aspect ratio and length)
5. Do you have existing assets to work with? (Screenshots, footage, scripts)
6. What's your budget for video tools?

---

## Tool Integrations

| Tool | Type | MCP | Guide |
|------|------|:---:|-------|
| **HeyGen** | AI avatars | Yes | heygen.com |
| **Hyperframes** | Programmatic video | - | hyperframes.ai |
| **Remotion** | Programmatic video | - | [remotion.dev](https://www.remotion.dev/docs) |
| **Runway** | AI generation | - | [runwayml.com/docs](https://docs.dev.runwayml.com) |

---

## Share with your tribe

After delivering a finished video plan, template, or pipeline, offer (never auto-post): "Want me to share this {video type} setup with your Luckiest tribe? Anyone building the same kind of video will see the approach and tools you landed on." If they accept, hand the plan to the tribe-share flow. If they decline, stop. Never share drafts that contain a private script, unreleased product footage, or a cloned likeness without an explicit ask. No credentials are ever included.

---

## Related Skills

- **luckiest-social**: For video content strategy, hooks, and what to post
- **luckiest-ad-creative**: For paid video ad creative and iteration
- **luckiest-copywriting**: For video scripts and messaging
- **luckiest-marketing-psychology**: For hooks and persuasion in video

# Stage rubrics and examples

Score each stage from 1 to 10. A 7 means the stage has no known weak link. Below
7, name the weak link and the fix.

## 1. Idea

| Score | Means |
|---|---|
| 9-10 | Floor worth the goal, ceiling at least 5x the floor, most top results under 12 months old, and a bundle that lifts the ceiling without losing the floor |
| 7-8 | Floor worth the goal, demand current, no bundle or a weak one |
| 4-6 | Demand real but stale, or the floor is too low for the goal |
| 1-3 | Topic chosen from what the audience "needs" with no viewing evidence |

Reading the script output:
- **Floor** = median views of the results. This is what a decent video should expect.
- **Ceiling** = the p90 and max views. This is what the best video can reach.
- **Fresh share** = the share of results uploaded in the last 12 months. Under
  about 30% suggests the interest has moved on.
- **Missing** = results with no view count or date. Do not guess them. If more
  than a third are missing, rerun with a larger `--limit` or ask the user for counts.
- Treat search results as a sample of what YouTube surfaces, not the whole niche.

Bundling demand, by example: a narrow how-to ("lead generation strategy") gets
paired with a name the same audience already follows ("<known founder>'s lead
generation strategy"). It reaches both the people searching the topic and the
people who follow the name. The bundle has to be true. The video must actually
cover that person's method from public sources.

Real views check: a video with very high views but almost no comments or likes,
or a channel whose other videos get a tiny fraction of that, is a sign of
bought or bot views. Leave it out of the floor.

Own-channel outliers: `floor_ceiling.py --channel` divides each video's views
by its own channel's median. A video at 5x its channel's median says more than
a big channel's ordinary video. Channels with fewer than 4 counted videos are
skipped, since a median of two or three is noise. The pattern the outliers
share is the signal, not any single one.

## 2. Packaging

| Score | Means |
|---|---|
| 9-10 | A cross-niche pattern with a stated reason, a thumbnail readable at phone size, title and thumbnail that do not repeat each other, a promise the outline keeps, `pairing.py` at 85 or more, and all 3 queries pass the query test |
| 7-8 | All of the above, with a weaker reason, a busier thumbnail, or `pairing.py` at 70 to 84 |
| 4-6 | Copies one outlier, or the title and thumbnail say the same thing |
| 1-3 | Clickbait the body cannot pay off |

Framings that tend to win across niches (always state why for this audience):
- **"The new rules of X"**: "rules" means getting this wrong costs you, and "new"
  means what you know may be out of date. It only works if something really changed.
- **"I tried X for N days"**: a concrete test with an unknown result.
- **"X vs Y"**: a choice the viewer is already weighing.
- **"Why X is failing" or "Stop doing X"**: a threat to something they already do.
- **"How <known person> does X"**: authority plus a bundle of demand.

Overfitting check: before using a framing, write down why it worked where you
saw it, and whether the same reason holds for this audience. If you cannot say
why, do not use it.

Thumbnail jobs:
1. Stand out in a feed of about 20 videos (a face, contrast, one focal object).
2. Be understood in under a second (2 to 3 elements, at most 3 words).
3. Open a question that the title closes just enough to make the viewer click.

## 3. Hook

| Score | Means |
|---|---|
| 9-10 | All four Ps answered in under 30 seconds, proof is specific and true, plan names every step, the first sentence confirms the title, and nothing about the channel comes before the promise |
| 7-8 | All four Ps, with vague proof or plan |
| 4-6 | Missing one P, or it opens with an intro, a "who I am", or a subscribe ask |
| 1-3 | A tease with no promise or plan |

Persona matters most when the packaging could pull in two audiences. Say
plainly who it is for, so the wrong viewers leave early and the right ones stay.

## 4. Body

| Score | Means |
|---|---|
| 9-10 | Every outline item traces to the title's promise, first value in the first minute, nothing unrelated, at least one item that beats the expectation, each section runs a full story loop that reopens before it closes, every beat has an `[ON SCREEN]` note, and every section has a name of 5 words or fewer |
| 7-8 | Every item traces to the promise, value arrives late, or some beats have nothing on screen |
| 4-6 | Some sections serve the creator, not the promise |
| 1-3 | An info dump of everything the creator knows |

Breakdown example for the title "The most useful YouTube training you will
watch": for it to be true, it must cover ideas, packaging, the video itself,
and the results, with no gap between them. Each of those then breaks down
again, for example ideas into finding demand, the floor and ceiling, and
raising the ceiling. Each leaf becomes one section, and each section is a
requirement.

Story loop check, per section:
- No stakes (nobody to root for, nothing to lose): the viewer has no reason to care. Add a person and a risk.
- No open question: the section explains without making anyone wonder. Write the question the viewer should be asking.
- No turn: the answer is the one everyone expected. Find what the audience usually believes, then show where it breaks.
- No reopen: the section ends flat and viewers leave. End each section on the next question.

Retention is not the goal. A long training with low average view duration can
still win if the people who watch it get more than they expected. They comment,
subscribe, and buy, and YouTube shows the video to more people like them.

## 5. Readout

| Score | Means |
|---|---|
| 9-10 | The satisfaction signals and their thresholds are written down before publishing, each metric maps to a stage to inspect, and a review date is set |
| 7-8 | Signals listed, no thresholds or date |
| 4-6 | Only views and CTR |
| 1-3 | No plan to read the results |

Signal to stage map:
- Low CTR: inspect packaging (stage 2). Low CTR alone is not proof. Hits have
  run at 2 to 3%.
- Early retention drop (first 30 seconds): inspect the hook (stage 3). From
  `retention.py`, a hook leak under 25 points is healthy, under 40 is leaking,
  and 40 or more is severe. Fix the first lines of the script, not the edit.
- A cliff later: inspect that moment in the body (stage 4), for example a hard
  call to action, a sponsor read, or a topic change with no signpost. Trim it
  after publishing if needed.
- A steady slide across the middle: pacing. Fix it by cutting, not rewriting.
- Hook leak healthy and the slide flat, but views low: the video is fine, so
  inspect packaging (stage 2).
- Comments full of the same question: that question is the next video's idea.
- Views flat but comments glowing: inspect the idea (stage 1). The ceiling may be low.
- Many negative or "this isn't what the title said" comments: the promise and
  the body do not match (stages 2 and 4).

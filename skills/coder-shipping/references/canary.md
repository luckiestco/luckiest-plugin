# Canary — continuous post-deploy monitoring (CANARY phase)

Load this only when the user wants ongoing production watching, not a one-shot health check.
The main SKILL.md's Phase 3 covers the quick check; this covers baseline-based monitoring.

## Baseline capture (`--baseline`)

Before a deploy, capture a reference for the routes that matter: screenshot each key page and
record its console state and network health. Store baselines keyed by route so a later run can
diff against them. Refresh the baseline after a known-good deploy so drift is measured against
current-good, not ancient-good.

## Page discovery

Discover the routes to watch from the app itself: the sitemap, the router config, or the nav.
Prioritize the primary user-facing flows (auth, checkout, the core product surface) over
marketing pages. Cap the set so monitoring stays fast.

## Monitoring loop

For each watched page after deploy:
1. Load it and confirm a 2xx.
2. Capture console errors and failed network requests.
3. Screenshot and diff against the baseline for obvious visual regression.
4. Flag anomalies: new console errors, new 4xx/5xx, large visual delta, or a load-time
   regression beyond a sane threshold.

Run the loop periodically for the requested window (e.g. the first N minutes after deploy),
not just once, so a delayed failure (cache warm, background job, CDN propagation) is caught.

## Health report

Emit: pages checked, status codes, console/network anomalies per page, visual-diff verdicts,
and an overall PASS / ATTENTION verdict. On any regression, name the failing route and the
specific error, and recommend rollback over an in-place hotfix — a bad deploy is reverted,
not debugged live.

## Portability note

The gstack original drove this through its proprietary `browse` daemon. This edition is
tool-agnostic: use whatever headless-browser or HTTP-check capability the host provides
(a browser MCP, a `/browse`-style skill, or plain `curl` for status-only checks). Degrade
gracefully — if no browser is available, do status-code and response-body checks with `curl`
and say visual monitoring was skipped.

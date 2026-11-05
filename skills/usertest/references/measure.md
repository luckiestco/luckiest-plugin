# Measuring the real route

Use the connected analytics (PostHog, GA4, Mixpanel) or the database, read-only.

## Before counting

1. List the events or tables first and map each route step to one. Names vary,
   so never guess a column.
2. Check how each step links to the same person. If only browsers are
   identified, call the result "browser journeys", not people.
3. If two steps cannot be joined, show their counts separately and do not
   compute a conversion rate between them.

## Counting

- Count unique people (or browser journeys) through the steps in order, in one
  date range and one conversion window for every step. State the unit, the
  order, and the window.
- Exclude test accounts and your own visits.
- Recent arrivals have had less time to convert. Say so when the window is short.

## Reporting

| Step | Count | Lost | Lost % |
|---|---|---|---|

Name two things separately:

- **Largest count loss:** the step where the most people leave (for example
  1,000 visits to 250 opt-ins loses 750).
- **Largest percent loss:** the step with the steepest drop (for example 240
  on the welcome page to 12 checkouts loses 95%).

Check the arithmetic by hand before reporting. Tester findings stay hypotheses
until a real drop agrees with them.

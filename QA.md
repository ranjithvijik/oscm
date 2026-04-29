# Playwright QA System

This project uses Playwright to test `index.html` at three levels:

- Unit/static checks: parse `index.html` and verify structural contracts before the browser runs.
- Integration checks: load the app, click through modules, test calculator behavior, and check responsive overflow.
- UAT checks: exercise learner-facing journeys on desktop and mobile Chrome profiles.

## Setup

```bash
npm install
npm run qa:install
```

## Commands

```bash
npm run qa              # full suite
npm run qa:unit         # static index.html contract checks
npm run qa:integration  # browser integration and calculator checks
npm run qa:uat          # desktop and mobile user acceptance flows
npm run qa:headed       # run visibly for debugging
npm run qa:report       # open the latest HTML report
```

## Current Coverage

- Verifies all 40 navigation modules have matching `*-module` content sections.
- Detects duplicate DOM IDs.
- Verifies `switchTab(this, module, tab)` targets exist.
- Confirms the default page loads without app console errors.
- Clicks every module and requires visible, non-empty content.
- Checks mobile viewport horizontal overflow.
- Validates representative calculators: PERT probability, EOQ, and safety stock.
- Runs UAT flows across core study modules and tab switching.

## Known Failures Caught By The Suite

At the time this QA system was added, the suite catches existing `index.html` issues:

- `breakeven-patch` tab target is referenced, but the panel is `breakeven-target`.
- `learning-sim` is referenced by a tab but is not present as a matching panel.
- Browser traversal fails around `dpmo-module`, indicating static markup and parsed browser DOM differ.
- The UAT study journey fails around `mrp-module` because expected header selectors are missing or malformed in the parsed DOM.

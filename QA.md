# Playwright QA System

This project uses Playwright to test `index.html` at three levels:

- Unit/static checks: parse `index.html` and verify structural contracts before the browser runs.
- Integration checks: load the app, generate named tests for all 40 modules, test calculator behavior, verify tab targets, and check responsive overflow.
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
- Generates per-module tests so each of the 40 modules has its own desktop open/content check.
- Generates per-module tab target checks for all modules with `switchTab(...)` buttons.
- Generates per-module mobile viewport checks so all 40 modules are checked for horizontal overflow.
- Validates representative calculators: PERT probability, EOQ, and safety stock.
- Runs UAT flows across core study modules and tab switching.

## Full Module Coverage

`tests/integration/modules.spec.ts` now expands the module inventory into explicit Playwright tests:

- 40 desktop module-open/content tests.
- 40 tab-target reachability tests.
- 40 mobile no-horizontal-overflow tests.
- 2 global module smoke checks.

The integration module suite currently lists **122 tests** and covers every `data-module` entry found in `index.html`.

## Current Status

The known tab and module traversal failures caught by this suite have been fixed.
The latest orchestrated run passes all suites:

- Static unit contract: 4/4 passed.
- Browser integration: 125/125 passed.
- User acceptance: 6/6 passed.

The browser helpers isolate local QA from third-party CDN/network failures so the
suite reports application errors instead of internet connectivity noise.

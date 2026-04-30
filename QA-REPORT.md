# OSCM Simulator - QA Report

> Generated: **2026-04-30 03:12 UTC** | Grade: **A+** | Pass Rate: **100.0%**

## All Suites Passed

| Metric | Value |
| --- | --- |
| Suites Run | **3** |
| Passed | 3 |
| Failed | 0 |
| Pass Rate | 100.0% `########################` |
| Duration | 171.77s |

## Suite Summary

| Suite | Description | Command | Duration | Status |
| --- | --- | --- | --- | --- |
| Static Unit Contract | Parses index.html and validates structural contracts. | `npx playwright test tests/unit --project=chromium --reporter=line` | 4.15s | PASS |
| Browser Integration | Loads index.html, checks module navigation, responsive layout, and calculators. | `npx playwright test tests/integration --project=chromium --reporter=line` | 124.56s | PASS |
| User Acceptance | Exercises learner journeys on desktop and mobile browser profiles. | `npx playwright test tests/uat --reporter=line --workers=1` | 43.06s | PASS |

## Details

### Static Unit Contract

- Status: **PASSED**
- Command: `npx playwright test tests/unit --project=chromium --reporter=line`
- Duration: 4.15s

<details>
<summary>Output</summary>

```text
Running 4 tests using 4 workers

[1/4] [chromium]  tests/unit/index.static.spec.ts:35:3  index.html static contract  all tab buttons target a tab panel that exists in the same module
[2/4] [chromium]  tests/unit/index.static.spec.ts:26:3  index.html static contract  contains the required runtime primitives
[3/4] [chromium]  tests/unit/index.static.spec.ts:22:3  index.html static contract  does not contain duplicate DOM ids
[4/4] [chromium]  tests/unit/index.static.spec.ts:11:3  index.html static contract  has one unique content module for every navigation item
  4 passed (2.2s)
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:09:11] "GET /index.html HTTP/1.1" 200 -
```

</details>

### Browser Integration

- Status: **PASSED**
- Command: `npx playwright test tests/integration --project=chromium --reporter=line`
- Duration: 124.56s

<details>
<summary>Output</summary>

```text
Running 125 tests using 4 workers

[1/125] [chromium]  tests/integration/calculators.spec.ts:5:3  calculator integration checks  PERT probability calculator updates from inputs
[2/125] [chromium]  tests/integration/calculators.spec.ts:37:3  calculator integration checks  safety stock calculator updates safety stock and reorder point
[3/125] [chromium]  tests/integration/modules.spec.ts:18:3  module integration coverage  loads the default page without app console errors
[4/125] [chromium]  tests/integration/calculators.spec.ts:21:3  calculator integration checks  EOQ calculator updates quantity and total cost when sliders change




[5/125] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  pert module opens from navigation with non-empty content

[6/125] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  breakeven module opens from navigation with non-empty content

[7/125] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  decision module opens from navigation with non-empty content

[8/125] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  learning module opens from navigation with non-empty content

[9/125] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  linebalance module opens from navigation with non-empty content

[10/125] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  queuing module opens from navigation with non-empty content

[11/125] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  littles module opens from navigation with non-empty content

[12/125] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  service module opens from navigation with non-empty content

[13/125] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  sqc module opens from navigation with non-empty content

[14/125] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  capability module opens from navigation with non-empty content

[15/125] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  sampling module opens from navigation with non-empty content

[16/125] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  dpmo module opens from navigation with non-empty content

[17/125] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  fmea module opens from navigation with non-empty content

... 309 lines omitted ...

[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:10:46] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:10:47] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:10:48] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:10:49] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:10:49] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:10:50] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:10:52] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:10:53] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:10:53] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:10:53] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:10:55] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:10:56] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:10:56] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:10:57] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:10:59] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:10:59] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:10:59] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:00] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:02] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:03] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:03] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:04] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:06] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:07] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:07] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:08] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:09] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:10] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:10] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:11] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:12] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:13] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:14] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:14] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:15] "GET /index.html HTTP/1.1" 200 -
```

</details>

### User Acceptance

- Status: **PASSED**
- Command: `npx playwright test tests/uat --reporter=line --workers=1`
- Duration: 43.06s

<details>
<summary>Output</summary>

```text
Running 6 tests using 1 worker

[1/6] [chromium]  tests/uat/index.uat.spec.ts:21:3  user acceptance flows  student can browse the primary study journey

[2/6] [chromium]  tests/uat/index.uat.spec.ts:35:3  user acceptance flows  user can switch tabs inside major modules

[3/6] [chromium]  tests/uat/index.uat.spec.ts:56:3  user acceptance flows  module inventory remains discoverable to a learner

[4/6] [mobile-chrome]  tests/uat/index.uat.spec.ts:21:3  user acceptance flows  student can browse the primary study journey

[5/6] [mobile-chrome]  tests/uat/index.uat.spec.ts:35:3  user acceptance flows  user can switch tabs inside major modules

[6/6] [mobile-chrome]  tests/uat/index.uat.spec.ts:56:3  user acceptance flows  module inventory remains discoverable to a learner

  6 passed (40.8s)
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:21] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:22] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:26] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:28] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:41] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:46] "GET /index.html HTTP/1.1" 200 -
[WebServer] ::ffff:127.0.0.1 - - [29/Apr/2026 23:11:48] "GET /index.html HTTP/1.1" 200 -
```

</details>

## Commands

```bash
make install
make browsers
make qa
make fast
make t-unit
make t-integration
make t-uat
```

---
Generated by `run_tests.js` at 2026-04-30 03:12 UTC

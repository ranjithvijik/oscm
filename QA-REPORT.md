# OSCM Simulator - QA Report

> Generated: **2026-04-30 12:36 UTC** | Grade: **A+** | Pass Rate: **100.0%**

## All Suites Passed

| Metric | Value |
| --- | --- |
| Suites Run | **3** |
| Passed | 3 |
| Failed | 0 |
| Pass Rate | 100.0% `########################` |
| Duration | 143.67s |

## Suite Summary

| Suite | Description | Command | Duration | Status |
| --- | --- | --- | --- | --- |
| Static Unit Contract | Parses index.html and validates structural contracts. | `npx playwright test tests/unit --project=chromium --reporter=line` | 2.04s | PASS |
| Browser Integration | Loads index.html, checks module navigation, responsive layout, and calculators. | `npx playwright test tests/integration --project=chromium --reporter=line` | 107.48s | PASS |
| User Acceptance | Exercises learner journeys on desktop and mobile browser profiles. | `npx playwright test tests/uat --reporter=line --workers=1` | 34.15s | PASS |

## Details

### Static Unit Contract

- Status: **PASSED**
- Command: `npx playwright test tests/unit --project=chromium --reporter=line`
- Duration: 2.04s

<details>
<summary>Output</summary>

```text
Running 4 tests using 2 workers









[1/4] [chromium]  tests/unit/index.static.spec.ts:11:3  index.html static contract  has one unique content module for every navigation item
[2/4] [chromium]  tests/unit/index.static.spec.ts:22:3  index.html static contract  does not contain duplicate DOM ids
[3/4] [chromium]  tests/unit/index.static.spec.ts:26:3  index.html static contract  contains the required runtime primitives
[4/4] [chromium]  tests/unit/index.static.spec.ts:35:3  index.html static contract  all tab buttons target a tab panel that exists in the same module
  4 passed (889ms)
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:34:20] "GET /index.html HTTP/1.1" 200 -
(node:2493) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:2494) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:2494) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:2493) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
```

</details>

### Browser Integration

- Status: **PASSED**
- Command: `npx playwright test tests/integration --project=chromium --reporter=line`
- Duration: 107.48s

<details>
<summary>Output</summary>

```text
Running 131 tests using 2 workers









[1/131] [chromium]  tests/integration/calculators.spec.ts:21:3  calculator integration checks  EOQ calculator updates quantity and total cost when sliders change
[2/131] [chromium]  tests/integration/calculators.spec.ts:5:3  calculator integration checks  PERT probability calculator updates from inputs


[3/131] [chromium]  tests/integration/calculators.spec.ts:37:3  calculator integration checks  safety stock calculator updates safety stock and reorder point
[4/131] [chromium]  tests/integration/calculators.spec.ts:54:3  calculator integration checks  line balancing calculator updates from visible input IDs


[5/131] [chromium]  tests/integration/calculators.spec.ts:72:3  calculator integration checks  break-even target volume uses the canonical break-even inputs
[6/131] [chromium]  tests/integration/calculators.spec.ts:90:3  calculator integration checks  transportation module renders allocation summary with total cost


[7/131] [chromium]  tests/integration/calculators.spec.ts:103:3  calculator integration checks  PERT canonical estimates, variance builder, and animation controls render

[8/131] [chromium]  tests/integration/calculators.spec.ts:122:3  calculator integration checks  SQC legacy x-bar and range chart containers are populated

[9/131] [chromium]  tests/integration/calculators.spec.ts:135:3  calculator integration checks  forecast comparison, lean improvement, regression, and capability outputs update

[10/131] [chromium]  tests/integration/modules.spec.ts:18:3  module integration coverage  loads the default page without app console errors

[11/131] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  pert module opens from navigation with non-empty content

[12/131] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  breakeven module opens from navigation with non-empty content

[13/131] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  decision module opens from navigation with non-empty content

... 343 lines omitted ...

[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:43] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:44] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:45] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:46] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:46] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:47] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:47] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:49] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:49] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:50] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:50] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:52] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:52] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:53] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:53] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:54] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:54] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:56] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:56] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:57] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:57] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:58] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:35:59] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:36:00] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:36:00] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:36:01] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:36:02] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:36:03] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:36:03] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:36:04] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:36:04] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:36:06] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:36:06] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:36:07] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:36:07] "GET /index.html HTTP/1.1" 200 -
```

</details>

### User Acceptance

- Status: **PASSED**
- Command: `npx playwright test tests/uat --reporter=line --workers=1`
- Duration: 34.15s

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

  6 passed (33.2s)
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:36:10] "GET /index.html HTTP/1.1" 200 -
(node:4933) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:4933) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:36:10] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:36:14] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:36:16] "GET /index.html HTTP/1.1" 200 -
(node:5046) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:5046) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:36:26] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:36:30] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 12:36:32] "GET /index.html HTTP/1.1" 200 -
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
Generated by `run_tests.js` at 2026-04-30 12:36 UTC

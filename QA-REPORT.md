# OSCM Simulator - QA Report

> Generated: **2026-04-30 14:36 UTC** | Grade: **A+** | Pass Rate: **100.0%**

## All Suites Passed

| Metric | Value |
| --- | --- |
| Suites Run | **3** |
| Passed | 3 |
| Failed | 0 |
| Pass Rate | 100.0% `########################` |
| Duration | 149.45s |

## Suite Summary

| Suite | Description | Command | Duration | Status |
| --- | --- | --- | --- | --- |
| Static Unit Contract | Parses static app files and validates structural contracts. | `npx playwright test tests/unit --project=chromium --reporter=line` | 2.13s | PASS |
| Browser Integration | Loads index.html, checks module navigation, responsive layout, and calculators. | `npx playwright test tests/integration --project=chromium --reporter=line` | 112.51s | PASS |
| User Acceptance | Exercises learner journeys on desktop and mobile browser profiles. | `npx playwright test tests/uat --reporter=line --workers=1` | 34.80s | PASS |

## Details

### Static Unit Contract

- Status: **PASSED**
- Command: `npx playwright test tests/unit --project=chromium --reporter=line`
- Duration: 2.13s

<details>
<summary>Output</summary>

```text
Running 5 tests using 2 workers









[1/5] [chromium]  tests/unit/index.static.spec.ts:23:3  index.html static contract  does not contain duplicate DOM ids
[2/5] [chromium]  tests/unit/index.static.spec.ts:12:3  index.html static contract  has one unique content module for every navigation item
[3/5] [chromium]  tests/unit/index.static.spec.ts:27:3  index.html static contract  contains the required runtime primitives
[4/5] [chromium]  tests/unit/index.static.spec.ts:36:3  index.html static contract  loads extracted stylesheet and runtime assets
[5/5] [chromium]  tests/unit/index.static.spec.ts:44:3  index.html static contract  all tab buttons target a tab panel that exists in the same module
  5 passed (959ms)
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:34:13] "GET /index.html HTTP/1.1" 200 -
(node:2455) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:2456) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:2455) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:2456) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
```

</details>

### Browser Integration

- Status: **PASSED**
- Command: `npx playwright test tests/integration --project=chromium --reporter=line`
- Duration: 112.51s

<details>
<summary>Output</summary>

```text
Running 134 tests using 2 workers









[1/134] [chromium]  tests/integration/calculators.spec.ts:21:3  calculator integration checks  EOQ calculator updates quantity and total cost when sliders change
[2/134] [chromium]  tests/integration/calculators.spec.ts:5:3  calculator integration checks  PERT probability calculator updates from inputs






[3/134] [chromium]  tests/integration/calculators.spec.ts:37:3  calculator integration checks  safety stock calculator updates safety stock and reorder point
[4/134] [chromium]  tests/integration/calculators.spec.ts:54:3  calculator integration checks  line balancing calculator updates from visible input IDs






[5/134] [chromium]  tests/integration/calculators.spec.ts:72:3  calculator integration checks  break-even target volume uses the canonical break-even inputs
[6/134] [chromium]  tests/integration/calculators.spec.ts:90:3  calculator integration checks  transportation module renders allocation summary with total cost






[7/134] [chromium]  tests/integration/calculators.spec.ts:103:3  calculator integration checks  PERT canonical estimates, variance builder, and animation controls render

... 875 lines omitted ...

[WebServer] 127.0.0.1 - - [30/Apr/2026 14:35:57] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:35:57] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:35:58] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:35:58] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:35:58] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:35:58] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:35:58] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:35:58] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:00] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:00] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:00] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:00] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:00] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:00] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:01] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:01] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:01] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:01] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:01] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:01] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:03] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:03] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:03] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:03] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:03] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:03] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:04] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:04] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:04] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:04] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:04] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:04] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:05] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:05] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:05] "GET /assets/css/oscm.css HTTP/1.1" 200 -
```

</details>

### User Acceptance

- Status: **PASSED**
- Command: `npx playwright test tests/uat --reporter=line --workers=1`
- Duration: 34.80s

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


  6 passed (33.8s)
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:08] "GET /index.html HTTP/1.1" 200 -
(node:5266) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:5266) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:09] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:09] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:09] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:13] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:13] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:13] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:15] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:15] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:15] "GET /assets/css/oscm.css HTTP/1.1" 200 -
(node:5393) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:5393) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:25] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:25] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:26] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:29] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:30] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:30] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:31] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:31] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 14:36:31] "GET /assets/js/oscm.js HTTP/1.1" 200 -
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
Generated by `run_tests.js` at 2026-04-30 14:36 UTC

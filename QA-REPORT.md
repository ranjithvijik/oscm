# OSCM Simulator - QA Report

> Generated: **2026-04-30 15:44 UTC** | Grade: **A+** | Pass Rate: **100.0%**

## All Suites Passed

| Metric | Value |
| --- | --- |
| Suites Run | **3** |
| Passed | 3 |
| Failed | 0 |
| Pass Rate | 100.0% `########################` |
| Duration | 153.55s |

## Suite Summary

| Suite | Description | Command | Duration | Status |
| --- | --- | --- | --- | --- |
| Static Unit Contract | Parses static app files and validates structural contracts. | `npx playwright test tests/unit --project=chromium --reporter=line` | 2.16s | PASS |
| Browser Integration | Loads index.html, checks module navigation, responsive layout, and calculators. | `npx playwright test tests/integration --project=chromium --reporter=line` | 116.63s | PASS |
| User Acceptance | Exercises learner journeys on desktop and mobile browser profiles. | `npx playwright test tests/uat --reporter=line --workers=1` | 34.76s | PASS |

## Details

### Static Unit Contract

- Status: **PASSED**
- Command: `npx playwright test tests/unit --project=chromium --reporter=line`
- Duration: 2.16s

<details>
<summary>Output</summary>

```text
Running 6 tests using 2 workers









[1/6] [chromium]  tests/unit/index.static.spec.ts:23:3  index.html static contract  does not contain duplicate DOM ids
[2/6] [chromium]  tests/unit/index.static.spec.ts:12:3  index.html static contract  has one unique content module for every navigation item
[3/6] [chromium]  tests/unit/index.static.spec.ts:27:3  index.html static contract  contains the required runtime primitives
[4/6] [chromium]  tests/unit/index.static.spec.ts:36:3  index.html static contract  loads extracted stylesheet and runtime assets
[5/6] [chromium]  tests/unit/index.static.spec.ts:44:3  index.html static contract  does not contain hidden control characters that corrupt MathJax formulas
[6/6] [chromium]  tests/unit/index.static.spec.ts:54:3  index.html static contract  all tab buttons target a tab panel that exists in the same module
  6 passed (937ms)
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:42:26] "GET /index.html HTTP/1.1" 200 -
(node:2464) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:2463) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:2464) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:2463) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
```

</details>

### Browser Integration

- Status: **PASSED**
- Command: `npx playwright test tests/integration --project=chromium --reporter=line`
- Duration: 116.63s

<details>
<summary>Output</summary>

```text
Running 135 tests using 2 workers









[1/135] [chromium]  tests/integration/calculators.spec.ts:21:3  calculator integration checks  EOQ calculator updates quantity and total cost when sliders change
[2/135] [chromium]  tests/integration/calculators.spec.ts:5:3  calculator integration checks  PERT probability calculator updates from inputs





[3/135] [chromium]  tests/integration/calculators.spec.ts:37:3  calculator integration checks  safety stock calculator updates safety stock and reorder point
[4/135] [chromium]  tests/integration/calculators.spec.ts:54:3  calculator integration checks  line balancing calculator updates from visible input IDs






[5/135] [chromium]  tests/integration/calculators.spec.ts:72:3  calculator integration checks  break-even target volume uses the canonical break-even inputs



[6/135] [chromium]  tests/integration/calculators.spec.ts:90:3  calculator integration checks  transportation module renders allocation summary with total cost



[7/135] [chromium]  tests/integration/calculators.spec.ts:103:3  calculator integration checks  PERT canonical estimates, variance builder, and animation controls render


... 876 lines omitted ...

[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:14] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:14] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:15] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:15] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:15] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:15] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:15] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:15] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:16] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:16] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:16] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:17] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:17] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:17] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:17] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:17] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:17] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:18] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:18] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:18] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:19] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:19] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:19] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:19] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:19] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:19] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:20] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:20] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:20] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:21] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:21] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:21] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:22] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:22] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:22] "GET /assets/js/oscm.js HTTP/1.1" 200 -
```

</details>

### User Acceptance

- Status: **PASSED**
- Command: `npx playwright test tests/uat --reporter=line --workers=1`
- Duration: 34.76s

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
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:24] "GET /index.html HTTP/1.1" 200 -
(node:5270) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:5270) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:25] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:25] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:25] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:29] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:29] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:29] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:31] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:31] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:31] "GET /assets/js/oscm.js HTTP/1.1" 200 -
(node:5391) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:5391) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:42] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:42] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:42] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:46] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:46] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:46] "GET /assets/js/oscm.js HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:48] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:48] "GET /assets/css/oscm.css HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 15:44:48] "GET /assets/js/oscm.js HTTP/1.1" 200 -
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
Generated by `run_tests.js` at 2026-04-30 15:44 UTC

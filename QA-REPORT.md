# OSCM Simulator - QA Report

> Generated: **2026-04-30 02:58 UTC** | Grade: **A+** | Pass Rate: **100.0%**

## All Suites Passed

| Metric | Value |
| --- | --- |
| Suites Run | **3** |
| Passed | 3 |
| Failed | 0 |
| Pass Rate | 100.0% `########################` |
| Duration | 125.03s |

## Suite Summary

| Suite | Description | Command | Duration | Status |
| --- | --- | --- | --- | --- |
| Static Unit Contract | Parses index.html and validates structural contracts. | `npx playwright test tests/unit --project=chromium --reporter=line` | 2.08s | PASS |
| Browser Integration | Loads index.html, checks module navigation, responsive layout, and calculators. | `npx playwright test tests/integration --project=chromium --reporter=line` | 97.70s | PASS |
| User Acceptance | Exercises learner journeys on desktop and mobile browser profiles. | `npx playwright test tests/uat --reporter=line` | 25.24s | PASS |

## Details

### Static Unit Contract

- Status: **PASSED**
- Command: `npx playwright test tests/unit --project=chromium --reporter=line`
- Duration: 2.08s

<details>
<summary>Output</summary>

```text
Running 4 tests using 2 workers









[1/4] [chromium]  tests/unit/index.static.spec.ts:11:3  index.html static contract  has one unique content module for every navigation item
[2/4] [chromium]  tests/unit/index.static.spec.ts:22:3  index.html static contract  does not contain duplicate DOM ids
[3/4] [chromium]  tests/unit/index.static.spec.ts:26:3  index.html static contract  contains the required runtime primitives
[4/4] [chromium]  tests/unit/index.static.spec.ts:35:3  index.html static contract  all tab buttons target a tab panel that exists in the same module
  4 passed (900ms)
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:56:04] "GET /index.html HTTP/1.1" 200 -
(node:2467) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:2468) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:2468) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:2467) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
```

</details>

### Browser Integration

- Status: **PASSED**
- Command: `npx playwright test tests/integration --project=chromium --reporter=line`
- Duration: 97.70s

<details>
<summary>Output</summary>

```text
Running 125 tests using 2 workers









[1/125] [chromium]  tests/integration/calculators.spec.ts:5:3  calculator integration checks  PERT probability calculator updates from inputs
[2/125] [chromium]  tests/integration/calculators.spec.ts:21:3  calculator integration checks  EOQ calculator updates quantity and total cost when sliders change


[3/125] [chromium]  tests/integration/calculators.spec.ts:37:3  calculator integration checks  safety stock calculator updates safety stock and reorder point

[4/125] [chromium]  tests/integration/modules.spec.ts:18:3  module integration coverage  loads the default page without app console errors

[5/125] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  pert module opens from navigation with non-empty content

[6/125] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  breakeven module opens from navigation with non-empty content

[7/125] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  decision module opens from navigation with non-empty content

[8/125] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  learning module opens from navigation with non-empty content

[9/125] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  linebalance module opens from navigation with non-empty content

[10/125] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  queuing module opens from navigation with non-empty content

[11/125] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  littles module opens from navigation with non-empty content

[12/125] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  service module opens from navigation with non-empty content

[13/125] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  sqc module opens from navigation with non-empty content

... 325 lines omitted ...

[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:19] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:20] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:20] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:21] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:21] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:22] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:23] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:24] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:24] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:25] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:25] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:27] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:27] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:28] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:28] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:29] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:29] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:31] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:31] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:32] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:32] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:33] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:33] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:35] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:35] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:36] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:36] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:37] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:38] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:39] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:39] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:40] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:40] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:41] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:41] "GET /index.html HTTP/1.1" 200 -
```

</details>

### User Acceptance

- Status: **PASSED**
- Command: `npx playwright test tests/uat --reporter=line`
- Duration: 25.24s

<details>
<summary>Output</summary>

```text
Running 6 tests using 2 workers









[1/6] [chromium]  tests/uat/index.uat.spec.ts:21:3  user acceptance flows  student can browse the primary study journey
[2/6] [chromium]  tests/uat/index.uat.spec.ts:35:3  user acceptance flows  user can switch tabs inside major modules


[3/6] [chromium]  tests/uat/index.uat.spec.ts:56:3  user acceptance flows  module inventory remains discoverable to a learner





[4/6] [mobile-chrome]  tests/uat/index.uat.spec.ts:21:3  user acceptance flows  student can browse the primary study journey

[5/6] [mobile-chrome]  tests/uat/index.uat.spec.ts:35:3  user acceptance flows  user can switch tabs inside major modules

[6/6] [mobile-chrome]  tests/uat/index.uat.spec.ts:56:3  user acceptance flows  module inventory remains discoverable to a learner

  6 passed (24.3s)
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:44] "GET /index.html HTTP/1.1" 200 -
(node:4878) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:4879) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:4878) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:4879) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:45] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:45] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:48] "GET /index.html HTTP/1.1" 200 -
(node:5064) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:5064) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:51] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:56] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 02:57:58] "GET /index.html HTTP/1.1" 200 -
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
Generated by `run_tests.js` at 2026-04-30 02:58 UTC

# OSCM Simulator - QA Report

> Generated: **2026-04-30 13:09 UTC** | Grade: **A+** | Pass Rate: **100.0%**

## All Suites Passed

| Metric | Value |
| --- | --- |
| Suites Run | **3** |
| Passed | 3 |
| Failed | 0 |
| Pass Rate | 100.0% `########################` |
| Duration | 150.29s |

## Suite Summary

| Suite | Description | Command | Duration | Status |
| --- | --- | --- | --- | --- |
| Static Unit Contract | Parses index.html and validates structural contracts. | `npx playwright test tests/unit --project=chromium --reporter=line` | 2.23s | PASS |
| Browser Integration | Loads index.html, checks module navigation, responsive layout, and calculators. | `npx playwright test tests/integration --project=chromium --reporter=line` | 113.56s | PASS |
| User Acceptance | Exercises learner journeys on desktop and mobile browser profiles. | `npx playwright test tests/uat --reporter=line --workers=1` | 34.49s | PASS |

## Details

### Static Unit Contract

- Status: **PASSED**
- Command: `npx playwright test tests/unit --project=chromium --reporter=line`
- Duration: 2.23s

<details>
<summary>Output</summary>

```text
Running 4 tests using 2 workers









[1/4] [chromium]  tests/unit/index.static.spec.ts:11:3  index.html static contract  has one unique content module for every navigation item
[2/4] [chromium]  tests/unit/index.static.spec.ts:22:3  index.html static contract  does not contain duplicate DOM ids
[3/4] [chromium]  tests/unit/index.static.spec.ts:26:3  index.html static contract  contains the required runtime primitives
[4/4] [chromium]  tests/unit/index.static.spec.ts:35:3  index.html static contract  all tab buttons target a tab panel that exists in the same module
  4 passed (968ms)
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:06:49] "GET /index.html HTTP/1.1" 200 -
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
- Duration: 113.56s

<details>
<summary>Output</summary>

```text
Running 134 tests using 2 workers









[1/134] [chromium]  tests/integration/calculators.spec.ts:5:3  calculator integration checks  PERT probability calculator updates from inputs
[2/134] [chromium]  tests/integration/calculators.spec.ts:21:3  calculator integration checks  EOQ calculator updates quantity and total cost when sliders change


[3/134] [chromium]  tests/integration/calculators.spec.ts:37:3  calculator integration checks  safety stock calculator updates safety stock and reorder point
[4/134] [chromium]  tests/integration/calculators.spec.ts:54:3  calculator integration checks  line balancing calculator updates from visible input IDs


[5/134] [chromium]  tests/integration/calculators.spec.ts:72:3  calculator integration checks  break-even target volume uses the canonical break-even inputs

[6/134] [chromium]  tests/integration/calculators.spec.ts:90:3  calculator integration checks  transportation module renders allocation summary with total cost

[7/134] [chromium]  tests/integration/calculators.spec.ts:103:3  calculator integration checks  PERT canonical estimates, variance builder, and animation controls render

[8/134] [chromium]  tests/integration/calculators.spec.ts:122:3  calculator integration checks  SQC legacy x-bar and range chart containers are populated

[9/134] [chromium]  tests/integration/calculators.spec.ts:135:3  calculator integration checks  forecast comparison, lean improvement, regression, and capability outputs update

[10/134] [chromium]  tests/integration/modules.spec.ts:18:3  module integration coverage  loads the default page without app console errors

[11/134] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  pert module opens from navigation with non-empty content

[12/134] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  breakeven module opens from navigation with non-empty content

[13/134] [chromium]  tests/integration/modules.spec.ts:30:5  module integration coverage  decision module opens from navigation with non-empty content

... 352 lines omitted ...

[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:18] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:18] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:19] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:19] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:21] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:21] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:22] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:22] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:23] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:24] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:25] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:25] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:26] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:27] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:28] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:28] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:29] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:30] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:31] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:31] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:32] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:33] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:34] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:34] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:35] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:35] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:37] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:37] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:38] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:38] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:39] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:40] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:41] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:41] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:42] "GET /index.html HTTP/1.1" 200 -
```

</details>

### User Acceptance

- Status: **PASSED**
- Command: `npx playwright test tests/uat --reporter=line --workers=1`
- Duration: 34.49s

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

  6 passed (33.5s)
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:45] "GET /index.html HTTP/1.1" 200 -
(node:4952) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:4952) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:46] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:50] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:08:51] "GET /index.html HTTP/1.1" 200 -
(node:5125) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:5125) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:09:02] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:09:07] "GET /index.html HTTP/1.1" 200 -
[WebServer] 127.0.0.1 - - [30/Apr/2026 13:09:08] "GET /index.html HTTP/1.1" 200 -
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
Generated by `run_tests.js` at 2026-04-30 13:09 UTC

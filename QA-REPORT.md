# OSCM Simulator - QA Report

> Generated: **2026-04-30 15:49 UTC** | Grade: **A+** | Pass Rate: **100.0%**

## All Suites Passed

| Metric | Value |
| --- | --- |
| Suites Run | **3** |
| Passed | 3 |
| Failed | 0 |
| Pass Rate | 100.0% `########################` |
| Duration | 234.21s |

## Suite Summary

| Suite | Description | Command | Duration | Status |
| --- | --- | --- | --- | --- |
| Static Unit Contract | Parses static app files and validates structural contracts. | `npx playwright test tests/unit --project=chromium --reporter=line` | 4.26s | PASS |
| Browser Integration | Loads index.html, checks module navigation, responsive layout, and calculators. | `npx playwright test tests/integration --project=chromium --reporter=line` | 171.32s | PASS |
| User Acceptance | Exercises learner journeys on desktop and mobile browser profiles. | `npx playwright test tests/uat --reporter=line --workers=1` | 58.62s | PASS |

## Details

### Static Unit Contract

- Status: **PASSED**
- Command: `npx playwright test tests/unit --project=chromium --reporter=line`
- Duration: 4.26s

<details>
<summary>Output</summary>

```text
Running 6 tests using 4 workers

[1/6] [chromium]  tests/unit/index.static.spec.ts:12:3  index.html static contract  has one unique content module for every navigation item
[2/6] [chromium]  tests/unit/index.static.spec.ts:27:3  index.html static contract  contains the required runtime primitives
[3/6] [chromium]  tests/unit/index.static.spec.ts:36:3  index.html static contract  loads extracted stylesheet and runtime assets
[4/6] [chromium]  tests/unit/index.static.spec.ts:44:3  index.html static contract  does not contain hidden control characters that corrupt MathJax formulas
[5/6] [chromium]  tests/unit/index.static.spec.ts:23:3  index.html static contract  does not contain duplicate DOM ids
[6/6] [chromium]  tests/unit/index.static.spec.ts:54:3  index.html static contract  all tab buttons target a tab panel that exists in the same module
  6 passed (1.8s)
```

</details>

### Browser Integration

- Status: **PASSED**
- Command: `npx playwright test tests/integration --project=chromium --reporter=line`
- Duration: 171.32s

<details>
<summary>Output</summary>

```text
Running 135 tests using 4 workers

[1/135] [chromium]  tests/integration/calculators.spec.ts:54:3  calculator integration checks  line balancing calculator updates from visible input IDs
[2/135] [chromium]  tests/integration/calculators.spec.ts:21:3  calculator integration checks  EOQ calculator updates quantity and total cost when sliders change
[3/135] [chromium]  tests/integration/calculators.spec.ts:37:3  calculator integration checks  safety stock calculator updates safety stock and reorder point
[4/135] [chromium]  tests/integration/calculators.spec.ts:5:3  calculator integration checks  PERT probability calculator updates from inputs
[5/135] [chromium]  tests/integration/calculators.spec.ts:72:3  calculator integration checks  break-even target volume uses the canonical break-even inputs
[6/135] [chromium]  tests/integration/calculators.spec.ts:90:3  calculator integration checks  transportation module renders allocation summary with total cost
[7/135] [chromium]  tests/integration/calculators.spec.ts:103:3  calculator integration checks  PERT canonical estimates, variance builder, and animation controls render
[8/135] [chromium]  tests/integration/calculators.spec.ts:122:3  calculator integration checks  SQC legacy x-bar and range chart containers are populated
[9/135] [chromium]  tests/integration/calculators.spec.ts:135:3  calculator integration checks  forecast comparison, lean improvement, regression, and capability outputs update
[10/135] [chromium]  tests/integration/modules.spec.ts:18:3  module integration coverage  loads the default page without app console errors
[11/135] [chromium]  tests/integration/modules.spec.ts:29:3  module integration coverage  keeps modules separated if the extracted stylesheet is unavailable
[12/135] [chromium]  tests/integration/modules.spec.ts:62:5  module integration coverage  pert module opens from navigation with non-empty content
[13/135] [chromium]  tests/integration/modules.spec.ts:62:5  module integration coverage  breakeven module opens from navigation with non-empty content
[14/135] [chromium]  tests/integration/modules.spec.ts:62:5  module integration coverage  decision module opens from navigation with non-empty content
[15/135] [chromium]  tests/integration/modules.spec.ts:62:5  module integration coverage  learning module opens from navigation with non-empty content
[16/135] [chromium]  tests/integration/modules.spec.ts:62:5  module integration coverage  linebalance module opens from navigation with non-empty content
[17/135] [chromium]  tests/integration/modules.spec.ts:62:5  module integration coverage  queuing module opens from navigation with non-empty content
[18/135] [chromium]  tests/integration/modules.spec.ts:62:5  module integration coverage  littles module opens from navigation with non-empty content
[19/135] [chromium]  tests/integration/modules.spec.ts:62:5  module integration coverage  service module opens from navigation with non-empty content
[20/135] [chromium]  tests/integration/modules.spec.ts:62:5  module integration coverage  sqc module opens from navigation with non-empty content
[21/135] [chromium]  tests/integration/modules.spec.ts:62:5  module integration coverage  capability module opens from navigation with non-empty content
[22/135] [chromium]  tests/integration/modules.spec.ts:62:5  module integration coverage  sampling module opens from navigation with non-empty content
[23/135] [chromium]  tests/integration/modules.spec.ts:62:5  module integration coverage  dpmo module opens from navigation with non-empty content
[24/135] [chromium]  tests/integration/modules.spec.ts:62:5  module integration coverage  fmea module opens from navigation with non-empty content
[25/135] [chromium]  tests/integration/modules.spec.ts:62:5  module integration coverage  pareto module opens from navigation with non-empty content
[26/135] [chromium]  tests/integration/modules.spec.ts:62:5  module integration coverage  fishbone module opens from navigation with non-empty content
[27/135] [chromium]  tests/integration/modules.spec.ts:62:5  module integration coverage  distributions module opens from navigation with non-empty content
[28/135] [chromium]  tests/integration/modules.spec.ts:62:5  module integration coverage  centroid module opens from navigation with non-empty content
[29/135] [chromium]  tests/integration/modules.spec.ts:62:5  module integration coverage  transportation module opens from navigation with non-empty content
[30/135] [chromium]  tests/integration/modules.spec.ts:62:5  module integration coverage  factor module opens from navigation with non-empty content
[31/135] [chromium]  tests/integration/modules.spec.ts:62:5  module integration coverage  mms-lookup module opens from navigation with non-empty content
[32/135] [chromium]  tests/integration/modules.spec.ts:62:5  module integration coverage  queue-cost module opens from navigation with non-empty content
[33/135] [chromium]  tests/integration/modules.spec.ts:62:5  module integration coverage  lean module opens from navigation with non-empty content

... 68 lines omitted ...

[102/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  sampling module renders on mobile without horizontal overflow
[103/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  dpmo module renders on mobile without horizontal overflow
[104/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  fmea module renders on mobile without horizontal overflow
[105/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  pareto module renders on mobile without horizontal overflow
[106/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  fishbone module renders on mobile without horizontal overflow
[107/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  distributions module renders on mobile without horizontal overflow
[108/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  centroid module renders on mobile without horizontal overflow
[109/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  transportation module renders on mobile without horizontal overflow
[110/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  factor module renders on mobile without horizontal overflow
[111/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  mms-lookup module renders on mobile without horizontal overflow
[112/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  queue-cost module renders on mobile without horizontal overflow
[113/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  lean module renders on mobile without horizontal overflow
[114/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  sourcing module renders on mobile without horizontal overflow
[115/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  risk module renders on mobile without horizontal overflow
[116/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  decoupling module renders on mobile without horizontal overflow
[117/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  forecast module renders on mobile without horizontal overflow
[118/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  aggregate module renders on mobile without horizontal overflow
[119/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  eoq module renders on mobile without horizontal overflow
[120/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  safetystock module renders on mobile without horizontal overflow
[121/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  newsvendor module renders on mobile without horizontal overflow
[122/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  regression module renders on mobile without horizontal overflow
[123/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  mrp module renders on mobile without horizontal overflow
[124/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  scheduling module renders on mobile without horizontal overflow
[125/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  crashing module renders on mobile without horizontal overflow
[126/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  bom module renders on mobile without horizontal overflow
[127/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  mrp-lotsizing module renders on mobile without horizontal overflow
[128/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  pokayoke module renders on mobile without horizontal overflow
[129/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  practice module renders on mobile without horizontal overflow
[130/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  ch1-practice module renders on mobile without horizontal overflow
[131/135] [chromium]  tests/integration/modules.spec.ts:95:5  module integration coverage  sqc-practice module renders on mobile without horizontal overflow
[132/135] [chromium]  tests/integration/modules.spec.ts:108:3  module integration coverage  responsive layout avoids horizontal document overflow
[133/135] [chromium]  tests/integration/modules.spec.ts:121:3  module integration coverage  desktop layout keeps sidebar and main content side by side
[134/135] [chromium]  tests/integration/modules.spec.ts:143:3  module integration coverage  tablet layout stacks navigation above content without clipping modules
[135/135] [chromium]  tests/integration/modules.spec.ts:168:3  module integration coverage  narrow phone layout keeps critical controls reachable
  135 passed (2.8m)
```

</details>

### User Acceptance

- Status: **PASSED**
- Command: `npx playwright test tests/uat --reporter=line --workers=1`
- Duration: 58.62s

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
  6 passed (56.1s)
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
Generated by `run_tests.js` at 2026-04-30 15:49 UTC

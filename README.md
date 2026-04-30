# OSCM Simulator

An interactive, browser-based Operations and Supply Chain Management simulator for learning quantitative models, process analysis, quality methods, supply chain decisions, inventory planning, MRP, scheduling, and exam practice.

The app is intentionally simple to deploy: the learning experience is served as static files, with module markup in `index.html` and extracted CSS/JavaScript in `assets/`. The automated quality system lives in the Playwright test suite. No application server is required.

## What This Project Contains

- `index.html`: the static simulator markup, including navigation, learning modules, formulas, visual sections, and practice tools.
- `assets/css/oscm.css`: simulator styling, responsive layout rules, visual components, and theme styles.
- `assets/js/oscm.js`: simulator runtime behavior, calculators, navigation, chart rendering, and initialization.
- `tests/`: Playwright unit, integration, and UAT coverage for the simulator.
- `run_tests.js`: QA orchestrator that runs the suites and writes `QA-REPORT.md`.
- `QA.md`: QA system documentation.
- `QA-REPORT.md`: latest generated QA result.
- `.github/workflows/qa.yml`: GitHub Actions QA workflow.
- `.github/workflows/deploy.yml`: static artifact build workflow.
- `amplify.yml`: AWS Amplify build configuration.
- `Makefile`: local automation shortcuts.

## Quick Start

Install dependencies and browser binaries:

```bash
npm install
npm run qa:install
```

Run the full automated QA suite:

```bash
npm test
```

Serve the simulator locally:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/index.html
```

You can also open `index.html` directly in a browser, but a local HTTP server is recommended because it matches the Playwright and CI environment.

## Simulator Overview

The simulator is organized as a static single-page learning application. The left navigation lists 40 modules. Each module has a matching `*-module` content section in `index.html`, while styling and runtime behavior live in `assets/css/oscm.css` and `assets/js/oscm.js`. Many modules include tabs for simulator views, theory, practice, scenarios, or lookup tools.

Common module patterns:

- Theory sections explain the operations management concept and key formulas.
- Simulator controls let learners change parameters and immediately see outputs.
- Metric cards summarize computed results.
- Practice sections provide self-check problems and worked answers.
- Responsive layout support keeps modules usable on desktop and mobile.
- MathJax renders formulas where mathematical notation is needed.

The app covers material from project management, capacity planning, process design, quality, facilities, supply chain, forecasting, inventory, MRP, and scheduling.

## Module Catalog

### 1. PERT Network, Chapter 4

The PERT module teaches project network analysis. It covers optimistic, most likely, and pessimistic estimates, expected activity time, variance, critical path thinking, and project completion probability. Learners use it to understand how uncertainty affects project duration and how probability supports schedule risk decisions.

Core concepts:

- Expected activity time using the PERT weighted average.
- Activity variance from optimistic and pessimistic estimates.
- Critical path and project duration logic.
- Probability of completing a project by a target date.

### 2. Break-Even Analysis, Chapter 5A

The break-even module explains cost-volume-profit analysis. It helps learners compare fixed costs, variable costs, price, target profit, and required volume. The simulator includes sensitivity, scenario comparison, practice, and target-volume analysis.

Core concepts:

- Break-even units and break-even revenue.
- Contribution margin.
- Target profit volume.
- Comparing process alternatives with different fixed and variable cost structures.

### 3. Decision Trees, Chapter 5

The decision tree module explains expected monetary value under uncertainty. It models choices with probabilities and payoffs so learners can compare alternatives in a structured way.

Core concepts:

- Decision nodes, chance nodes, and terminal outcomes.
- Expected monetary value.
- Rollback analysis.
- Expected value of perfect information.

### 4. Learning Curves, Chapter 6

The learning curve module shows how time or cost declines as cumulative output increases. Learners can adjust first-unit time and learning rate, see the learning exponent, and compare unit and cumulative time behavior.

Core concepts:

- Learning rate interpretation.
- Log-linear learning curve model.
- Unit time estimates for cumulative production.
- Cumulative and average time analysis.

### 5. Line Balancing, Chapter 8

The line balancing module covers assigning work tasks to stations while respecting cycle time and precedence constraints. It helps learners understand throughput, station utilization, idle time, and theoretical minimum stations.

Core concepts:

- Cycle time.
- Theoretical minimum workstations.
- Line efficiency.
- Idle time and bottleneck awareness.

### 6. Queuing Theory, Chapter 10

The queuing module introduces waiting line analysis. Learners explore how arrival rates, service rates, and server capacity affect utilization, average waiting time, average number in queue, and system congestion.

Core concepts:

- Arrival rate and service rate.
- Utilization.
- Waiting time and queue length.
- Tradeoffs between service capacity and customer delay.

### 7. Little's Law, Chapter 11

The Little's Law module explains the relationship between inventory, throughput, and flow time. It is useful for analyzing process flow, work-in-process, and service systems.

Core concepts:

- `L = lambda W`.
- Throughput, inventory, and flow time.
- Flow diagnostics in operations.
- Bottleneck and WIP implications.

### 8. Service Design, Chapter 9

The service design module focuses on service process choices, customer contact, failure points, and operational design. It helps learners connect process structure to customer experience and service quality.

Core concepts:

- Service blueprint thinking.
- Customer contact and process visibility.
- Service failure prevention.
- Operational design choices for service systems.

### 9. p and c Charts, Chapter 13

The statistical quality control module covers attribute control charts. It helps learners understand when a process is stable and when variation indicates a likely assignable cause.

Core concepts:

- p-charts for fraction defective.
- c-charts for count defects.
- Center lines and control limits.
- Interpreting out-of-control signals.

### 10. Process Capability, Exhibit 13.4

The process capability module explains whether a stable process can meet specification limits. Learners compare process spread and centering against customer requirements.

Core concepts:

- Specification limits versus control limits.
- Cp and Cpk.
- Centering and process spread.
- Practical interpretation of capability values.

### 11. Acceptance Sampling, Chapter 13

The acceptance sampling module covers lot inspection decisions. It helps learners understand sample size, acceptance number, producer risk, consumer risk, and operating characteristic logic.

Core concepts:

- Lot acceptance and rejection.
- Sample size and acceptance criteria.
- Operating characteristic curves.
- Inspection tradeoffs.

### 12. DPMO and DMAIC, Chapter 12

The DPMO module introduces Six Sigma quality measurement and structured improvement. It connects defects, opportunities, units, and process improvement thinking.

Core concepts:

- Defects per million opportunities.
- Units, defects, and opportunities per unit.
- DMAIC improvement cycle.
- Translating defect rates into quality performance.

### 13. FMEA Risk, Chapter 12

The FMEA module teaches failure mode and effects analysis. Learners evaluate failure severity, occurrence, and detection to prioritize risk reduction work.

Core concepts:

- Failure modes and effects.
- Severity, occurrence, and detection.
- Risk priority number.
- Prevention and control planning.

### 14. Pareto Analysis, Chapter 13

The Pareto module explains how to prioritize defects or problems by frequency and impact. It supports the "vital few" idea used in quality improvement.

Core concepts:

- Categorizing defects or causes.
- Ranking by frequency or impact.
- Cumulative contribution.
- Prioritizing improvement work.

### 15. Fishbone Diagram, Chapter 13

The fishbone module covers cause-and-effect analysis. It helps learners structure root-cause thinking across categories such as methods, materials, people, machines, measurement, and environment.

Core concepts:

- Cause-and-effect diagrams.
- Root-cause categorization.
- Structured brainstorming.
- Quality improvement diagnostics.

### 16. Distributions, Chapter 10

The distributions module supports probability modeling used in operations decisions. It helps learners reason about variability and connect distributions to waiting lines, demand, quality, and service performance.

Core concepts:

- Probability distribution behavior.
- Variability in operational systems.
- Distribution selection and interpretation.
- Operations decisions under uncertainty.

### 17. Centroid Method, Chapter 15

The centroid module covers a location planning method based on demand points and coordinates. It helps learners estimate a central facility location that balances weighted demand.

Core concepts:

- Weighted x and y coordinates.
- Demand-weighted facility location.
- Location planning tradeoffs.
- Visual interpretation of coordinates.

### 18. Transportation Method, Chapter 15

The transportation module introduces shipping allocation across sources and destinations. It helps learners reason about cost-minimizing logistics decisions.

Core concepts:

- Supply and demand constraints.
- Shipping costs.
- Allocation decisions.
- Transportation planning structure.

### 19. Factor Rating, Chapter 15

The factor rating module teaches facility location scoring with weighted criteria. It supports qualitative and quantitative comparison of location alternatives.

Core concepts:

- Decision criteria.
- Factor weights.
- Alternative ratings.
- Weighted score comparison.

### 20. M/M/s Table, Exhibit 10.9

The M/M/s lookup module provides support for multi-server queue analysis. It helps learners interpret queue performance when more than one service channel is available.

Core concepts:

- Multi-server waiting lines.
- Server utilization.
- Lookup-table based queue estimates.
- Service capacity decisions.

### 21. Queue Costing, Chapter 10

The queue costing module connects waiting line performance to economics. Learners compare service cost against waiting cost to find a better capacity decision.

Core concepts:

- Cost of service capacity.
- Cost of customer or job waiting.
- Total system cost.
- Capacity tradeoff analysis.

### 22. Lean Supply Chains, Chapter 14

The lean module covers waste reduction and flow improvement in supply chains. It connects lean principles to operational execution.

Core concepts:

- Waste identification.
- Flow, pull, and continuous improvement.
- Supplier and process coordination.
- Lean tradeoffs in supply networks.

### 23. Global Sourcing, Chapter 16

The global sourcing module covers international sourcing decisions. It helps learners compare cost, risk, lead time, flexibility, and strategic supplier concerns.

Core concepts:

- Total landed cost thinking.
- Global supplier tradeoffs.
- Lead time and risk.
- Strategic sourcing decisions.

### 24. Supply Chain Risk Management, Chapter 1

The supply chain risk module introduces operational resilience. It helps learners think about disruption sources, risk exposure, mitigation, and continuity planning.

Core concepts:

- Supply, demand, process, and external risks.
- Risk identification.
- Mitigation strategies.
- Resilience and continuity.

### 25. Decoupling Point, Chapter 7

The decoupling point module explains where inventory separates forecast-driven and order-driven activity. It supports make-to-stock, assemble-to-order, and make-to-order decisions.

Core concepts:

- Forecast-driven versus order-driven flow.
- Customer order decoupling point.
- Inventory positioning.
- Responsiveness and efficiency tradeoffs.

### 26. Enhanced Forecast, Chapter 18

The enhanced forecasting module covers demand forecasting methods and forecast accuracy. Learners compare forecast behavior and evaluate error.

Core concepts:

- Forecasting demand.
- Moving averages, smoothing, and trend logic.
- Forecast error measurement.
- Operations planning implications.

### 27. Aggregate Planning, Chapter 19

The aggregate planning module covers medium-term production planning. It helps learners compare capacity, workforce, inventory, backlog, and demand management choices.

Core concepts:

- Demand and capacity balance.
- Chase and level strategies.
- Inventory and workforce tradeoffs.
- Planning horizon decisions.

### 28. EOQ Model, Chapter 20

The EOQ module teaches economic order quantity. Learners adjust demand, ordering cost, holding cost, and unit cost to see order quantity and cost effects.

Core concepts:

- Economic order quantity.
- Ordering cost and holding cost.
- Total annual inventory cost.
- Reorder cycle logic.

### 29. Safety Stock, Chapter 20

The safety stock module explains inventory buffers for uncertainty. It connects demand variation, lead time, service level, safety stock, and reorder point.

Core concepts:

- Demand and lead time uncertainty.
- Service level.
- Safety stock.
- Reorder point.

### 30. Newsvendor Model, Chapter 20

The newsvendor module covers single-period inventory decisions. It helps learners balance overage and underage costs when demand is uncertain.

Core concepts:

- Critical fractile.
- Overage and underage cost.
- Single-period order quantity.
- Demand uncertainty.

### 31. Regression+, Chapter 18

The regression module supports forecasting with causal relationships. It helps learners understand how independent variables can predict demand or operational outcomes.

Core concepts:

- Linear regression.
- Slope and intercept interpretation.
- Forecasting with explanatory variables.
- Fit and prediction awareness.

### 32. MRP Matrix, Chapter 21

The MRP module covers material requirements planning. It helps learners understand gross requirements, scheduled receipts, projected on-hand inventory, net requirements, planned order receipts, and planned order releases.

Core concepts:

- Time-phased planning.
- Netting logic.
- Lead time offset.
- Planned orders.

### 33. Job Scheduling, Chapter 22

The scheduling module covers job sequencing and performance measures. Learners compare sequencing rules and their effects on completion time, flow time, lateness, and utilization.

Core concepts:

- Job sequencing.
- Dispatching rules.
- Flow time and lateness.
- Schedule performance comparison.

### 34. Project Crashing, Chapter 4

The project crashing module explains how to shorten project duration at additional cost. It helps learners compare crash cost per time unit and identify economical schedule compression.

Core concepts:

- Normal time and crash time.
- Normal cost and crash cost.
- Crash cost slope.
- Critical path compression.

### 35. BOM Explosion, Chapter 21

The BOM explosion module teaches how parent demand translates into component requirements. It supports MRP logic and dependent demand planning.

Core concepts:

- Parent-child product structure.
- Component quantity multiplication.
- Gross dependent demand.
- Bill of materials interpretation.

### 36. MRP Lot Sizing, Chapter 21

The MRP lot sizing module compares order sizing rules used in material planning. It helps learners see how lot-for-lot, fixed order quantity, and economic logic affect inventory and ordering.

Core concepts:

- Lot-for-lot ordering.
- Fixed order quantity.
- Periodic order quantity thinking.
- Inventory and setup tradeoffs.

### 37. Poka-yoke Database, Chapter 9

The poka-yoke module covers mistake-proofing. It helps learners connect process design to defect prevention and service reliability.

Core concepts:

- Error prevention.
- Detection and control devices.
- Process design for quality.
- Human error reduction.

### 38. Practice Problems, Exam Prep

The practice module provides broader exam preparation. It gives learners a place to review concepts, attempt questions, and reinforce calculator-based topics.

Core concepts:

- Mixed operations management practice.
- Formula application.
- Self-check review.
- Exam readiness.

### 39. Chapter 1 Practice

The Chapter 1 practice module reviews introductory operations and supply chain concepts. It supports early-course terminology and foundational thinking.

Core concepts:

- Operations strategy basics.
- Supply chain foundations.
- Process and productivity concepts.
- Introductory review.

### 40. SQC Practice, Chapter 13

The SQC practice module focuses on statistical quality control review. It helps learners reinforce control charts, quality metrics, process capability, and quality improvement tools.

Core concepts:

- Control chart interpretation.
- Capability calculations.
- Defect and DPMO practice.
- Quality tool selection.

## Automated QA

The project includes automated QA at three levels.

### Static Unit Contract

Command:

```bash
npm run qa:unit
```

This suite parses the static app files and verifies structural contracts before the browser runs:

- Every navigation item has one matching content module.
- DOM IDs are unique.
- Required runtime primitives exist in the extracted runtime asset.
- Every `switchTab(this, module, tab)` call targets an existing panel in the same module.
- `index.html` links the extracted CSS and JavaScript assets.

### Browser Integration

Command:

```bash
npm run qa:integration
```

This suite launches the simulator in Chromium and verifies:

- Default page load without application console errors.
- Every module opens from navigation and contains meaningful content.
- Every module with tabs can activate its tab panels.
- Every module renders on a mobile viewport without horizontal overflow.
- Representative calculators update correctly, including PERT probability, EOQ, and safety stock.

The browser helper blocks third-party network requests during local QA so external CDN or internet failures do not get confused with application bugs.

### User Acceptance Testing

Command:

```bash
npm run qa:uat
```

The UAT suite validates learner-facing flows on desktop and mobile browser profiles:

- Browsing a primary study journey across major modules.
- Switching tabs inside major modules.
- Confirming the full module inventory remains discoverable.

The QA orchestrator runs UAT with `--workers=1` for stable report generation across desktop and mobile profiles.

### QA Orchestrator

Command:

```bash
node run_tests.js --out QA-REPORT.md
```

The orchestrator runs the unit, integration, and UAT suites, captures output, computes pass rate and grade, and writes `QA-REPORT.md`.

Useful options:

```bash
node run_tests.js --fast
node run_tests.js --module unit
node run_tests.js --module integration
node run_tests.js --module uat
node run_tests.js --out custom-report.md
node run_tests.js --no-report
```

Make shortcuts:

```bash
make install
make browsers
make qa
make fast
make t-unit
make t-integration
make t-uat
make report
make clean
```

## Continuous Integration

GitHub Actions runs QA on pushes and pull requests.

### QA Workflow

File: `.github/workflows/qa.yml`

Behavior:

- Runs on pushes to `main` and `develop`.
- Runs on pull requests targeting `main`.
- Supports manual `workflow_dispatch`.
- Tests against Node.js 22 and Node.js 24.
- Installs dependencies with `npm ci`.
- Installs Playwright Chromium with `npm run qa:install`.
- Runs `node run_tests.js --out QA-REPORT-node<version>.md`.
- Uploads QA reports and Playwright artifacts.
- Posts the report to the GitHub Actions summary.
- On pushes to `main`, regenerates canonical `QA-REPORT.md` and commits it with `[skip ci]`.

### Build and Deploy Workflow

File: `.github/workflows/deploy.yml`

Behavior:

- Runs on pushes to `main`.
- Supports manual `workflow_dispatch`.
- Uses Node.js 24.
- Runs fast QA with `node run_tests.js --fast --out QA-REPORT-build.md`.
- Uploads a static site artifact containing `index.html`, `assets/`, QA docs, and package metadata.

## Deployment

The simulator is a static site. Any static host can serve it as long as `index.html` is reachable.

### AWS Amplify

`amplify.yml` is included for AWS Amplify hosting.

Build behavior:

- `npm ci`
- `npm run qa:install`
- `node run_tests.js --fast --out QA-REPORT.md`
- Publish static artifacts from the repository root

Amplify artifact list:

- `index.html`
- `assets/**/*`
- `QA.md`
- `QA-REPORT.md`
- `package.json`
- `package-lock.json`

### Generic Static Hosting

For Netlify, Vercel static output, GitHub Pages, S3, CloudFront, or any static file host:

1. Install dependencies in CI if you want QA.
2. Run `node run_tests.js --fast --out QA-REPORT.md` as the build validation step.
3. Publish `index.html`, `assets/`, and documentation files.

There is no backend runtime requirement.

## Development Workflow

Recommended local loop:

```bash
npm install
npm run qa:install
python3 -m http.server 4173
node run_tests.js --fast
node run_tests.js --module integration
node run_tests.js --module uat
```

Before committing changes:

```bash
node run_tests.js --out QA-REPORT.md
```

Commit both source changes and the updated `QA-REPORT.md` when the report is intentionally refreshed.

## Quality Status

The latest documented QA status is stored in `QA-REPORT.md`.

At the time this README was written, the automated suite covers:

- 4 static unit checks.
- 125 browser integration checks.
- 6 user acceptance checks.
- All 40 simulator modules.

## Repository Structure

```text
.
|-- index.html
|-- QA.md
|-- QA-REPORT.md
|-- README.md
|-- Makefile
|-- amplify.yml
|-- package.json
|-- package-lock.json
|-- playwright.config.ts
|-- run_tests.js
|-- tests/
|   |-- helpers/
|   |-- integration/
|   |-- unit/
|   `-- uat/
`-- .github/
    `-- workflows/
```

## Notes for Future Maintainers

- Keep each navigation button's `data-module` value aligned with a matching `id="<module>-module"` content section.
- When adding a tab with `switchTab(this, 'module', 'tab')`, add a matching `id="module-tab"` panel in that module.
- Run `npm run qa:unit` after any structural HTML change.
- Run the full orchestrator before shipping user-facing changes.
- If a test fails because of third-party network behavior, fix the test harness or dependency boundary instead of weakening application assertions.

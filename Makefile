# ============================================================
#  OSCM Simulator — Automation Makefile
#  Usage: make <target>
# ============================================================

NODE    := node
NPM     := npm
RUNNER  := $(NODE) run_tests.js
REPORT  := QA-REPORT.md

.DEFAULT_GOAL := help

.PHONY: help
help:
	@echo ""
	@echo "  OSCM Simulator QA — available make targets"
	@echo "  -----------------------------------------"
	@echo "  make install       Install Node.js dependencies"
	@echo "  make browsers      Install Playwright Chromium"
	@echo "  make test          Run QA orchestrator"
	@echo "  make qa            Run full suite + write QA-REPORT.md"
	@echo "  make fast          Run static/unit suite only"
	@echo "  make report        Print the latest QA-REPORT.md"
	@echo "  make clean         Remove generated QA artifacts"
	@echo ""
	@echo "  Per-suite shortcuts:"
	@echo "  make t-unit        make t-integration     make t-uat"
	@echo ""

.PHONY: install
install:
	$(NPM) install

.PHONY: browsers
browsers:
	$(NPM) run qa:install

.PHONY: test
test:
	$(RUNNER)

.PHONY: qa
qa:
	$(RUNNER) --out $(REPORT)
	@echo ""
	@echo "  QA complete. Report -> $(REPORT)"

.PHONY: fast
fast:
	$(RUNNER) --fast --out $(REPORT)
	@echo ""
	@echo "  Fast QA complete. Report -> $(REPORT)"

.PHONY: report
report:
	@cat $(REPORT) 2>/dev/null || echo "No QA-REPORT.md found. Run 'make qa' first."

.PHONY: t-unit
t-unit:
	$(RUNNER) --module unit

.PHONY: t-integration
t-integration:
	$(RUNNER) --module integration

.PHONY: t-uat
t-uat:
	$(RUNNER) --module uat

.PHONY: clean
clean:
	rm -rf $(REPORT) playwright-report test-results
	@echo "  Cleaned QA artifacts."

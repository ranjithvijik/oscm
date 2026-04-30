#!/usr/bin/env node
/**
 * OSCM Simulator QA Orchestrator
 *
 * Runs the Playwright QA suites and writes a human-readable QA-REPORT.md.
 *
 * Usage:
 *   node run_tests.js
 *   node run_tests.js --fast
 *   node run_tests.js --module unit
 *   node run_tests.js --module integration
 *   node run_tests.js --module uat
 *   node run_tests.js --out custom-report.md
 *   node run_tests.js --no-report
 */

import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const TEST_MODULES = {
  unit: {
    name: 'Static Unit Contract',
    description: 'Parses index.html and validates structural contracts.',
    command: ['npx', ['playwright', 'test', 'tests/unit', '--project=chromium', '--reporter=line']]
  },
  integration: {
    name: 'Browser Integration',
    description: 'Loads index.html, checks module navigation, responsive layout, and calculators.',
    command: ['npx', ['playwright', 'test', 'tests/integration', '--project=chromium', '--reporter=line']]
  },
  uat: {
    name: 'User Acceptance',
    description: 'Exercises learner journeys on desktop and mobile browser profiles.',
    command: ['npx', ['playwright', 'test', 'tests/uat', '--reporter=line', '--workers=1']]
  }
};

const args = process.argv.slice(2);
const hasFlag = (flag) => args.includes(flag);
const getArg = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? null : args[index + 1];
};

const fast = hasFlag('--fast');
const noReport = hasFlag('--no-report');
const selectedModule = getArg('--module');
const outPath = getArg('--out') || 'QA-REPORT.md';

if (selectedModule && !TEST_MODULES[selectedModule]) {
  console.error(`Unknown module "${selectedModule}". Valid modules: ${Object.keys(TEST_MODULES).join(', ')}`);
  process.exit(1);
}

const modulesToRun = selectedModule
  ? [selectedModule]
  : fast
    ? ['unit']
    : Object.keys(TEST_MODULES);

function runModule(key) {
  const module = TEST_MODULES[key];
  const started = Date.now();
  const [command, commandArgs] = module.command;

  process.stdout.write(`  -> ${module.name.padEnd(24)} `);
  const result = spawnSync(command, commandArgs, {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: {
      ...process.env,
      FORCE_COLOR: '0',
      NO_COLOR: '1'
    }
  });

  const durationMs = Date.now() - started;
  const output = `${result.stdout || ''}${result.stderr || ''}`;
  const passed = result.status === 0;
  console.log(`${passed ? 'PASS' : 'FAIL'} (${(durationMs / 1000).toFixed(1)}s)`);

  return {
    key,
    name: module.name,
    description: module.description,
    command: [command, ...commandArgs].join(' '),
    status: passed ? 'PASSED' : 'FAILED',
    exitCode: result.status ?? 1,
    durationMs,
    output: trimOutput(output)
  };
}

function trimOutput(output) {
  const cleanOutput = output
    .replace(/\u001b\[[0-9;?]*[ -/]*[@-~]/g, '')
    .replace(/\r/g, '')
    .replace(/[^\x09\x0A\x20-\x7E]/g, '');
  const lines = cleanOutput.trim().split('\n');
  if (lines.length <= 80) return lines.join('\n');
  return [
    ...lines.slice(0, 35),
    '',
    `... ${lines.length - 70} lines omitted ...`,
    '',
    ...lines.slice(-35)
  ].join('\n');
}

function grade(passRate) {
  if (passRate >= 100) return 'A+';
  if (passRate >= 95) return 'A';
  if (passRate >= 85) return 'B';
  if (passRate >= 75) return 'C';
  if (passRate >= 60) return 'D';
  return 'F';
}

function bar(percent, width = 24) {
  const filled = Math.round(Math.max(0, Math.min(100, percent)) / 100 * width);
  return '#'.repeat(filled) + '-'.repeat(width - filled);
}

function generateReport(results, totalMs) {
  const now = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
  const passed = results.filter((result) => result.status === 'PASSED').length;
  const failed = results.length - passed;
  const passRate = results.length ? (passed / results.length) * 100 : 0;
  const allPassed = failed === 0;

  const lines = [
    '# OSCM Simulator - QA Report',
    '',
    `> Generated: **${now}** | Grade: **${grade(passRate)}** | Pass Rate: **${passRate.toFixed(1)}%**`,
    '',
    `## ${allPassed ? 'All Suites Passed' : 'Some Suites Failed'}`,
    '',
    '| Metric | Value |',
    '| --- | --- |',
    `| Suites Run | **${results.length}** |`,
    `| Passed | ${passed} |`,
    `| Failed | ${failed} |`,
    `| Pass Rate | ${passRate.toFixed(1)}% \`${bar(passRate)}\` |`,
    `| Duration | ${(totalMs / 1000).toFixed(2)}s |`,
    '',
    '## Suite Summary',
    '',
    '| Suite | Description | Command | Duration | Status |',
    '| --- | --- | --- | --- | --- |'
  ];

  for (const result of results) {
    lines.push(
      `| ${result.name} | ${result.description} | \`${result.command}\` | ${(result.durationMs / 1000).toFixed(2)}s | ${result.status === 'PASSED' ? 'PASS' : 'FAIL'} |`
    );
  }

  lines.push('', '## Details', '');

  for (const result of results) {
    lines.push(
      `### ${result.name}`,
      '',
      `- Status: **${result.status}**`,
      `- Command: \`${result.command}\``,
      `- Duration: ${(result.durationMs / 1000).toFixed(2)}s`,
      '',
      '<details>',
      '<summary>Output</summary>',
      '',
      '```text',
      result.output || '(no output)',
      '```',
      '',
      '</details>',
      ''
    );
  }

  lines.push(
    '## Commands',
    '',
    '```bash',
    'make install',
    'make browsers',
    'make qa',
    'make fast',
    'make t-unit',
    'make t-integration',
    'make t-uat',
    '```',
    '',
    '---',
    `Generated by \`run_tests.js\` at ${now}`,
    ''
  );

  return lines.join('\n');
}

function main() {
  const started = Date.now();
  console.log('\nOSCM Simulator QA Orchestrator');
  console.log('================================');
  console.log(`Mode   : ${fast ? 'fast' : 'full'}`);
  console.log(`Suites : ${modulesToRun.join(', ')}`);
  console.log(`Report : ${noReport ? '(disabled)' : outPath}`);
  console.log('');

  const results = modulesToRun.map(runModule);
  const totalMs = Date.now() - started;
  const failed = results.filter((result) => result.status === 'FAILED').length;

  if (!noReport) {
    writeFileSync(resolve(process.cwd(), outPath), generateReport(results, totalMs), 'utf8');
    console.log(`\nReport written -> ${outPath}`);
  }

  console.log(`\nResult: ${results.length - failed}/${results.length} suites passed`);
  process.exit(failed > 0 ? 1 : 0);
}

main();

import { expect, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export type ModuleEntry = {
  id: string;
  label: string;
  chapter: string;
};

export const indexPath = resolve(process.cwd(), 'index.html');

export function readIndexHtml(): string {
  return readFileSync(indexPath, 'utf8');
}

export function extractNavigationModules(html = readIndexHtml()): ModuleEntry[] {
  const buttonPattern =
    /<button class="nav-btn(?: active)?" data-module="([^"]+)">[\s\S]*?<div class="nav-btn-text">\s*<div>([\s\S]*?)<\/div>\s*<div class="nav-btn-chapter">([\s\S]*?)<\/div>/g;

  return [...html.matchAll(buttonPattern)].map((match) => ({
    id: match[1].trim(),
    label: stripTags(match[2]).trim(),
    chapter: stripTags(match[3]).trim()
  }));
}

export function extractModuleIds(html = readIndexHtml()): string[] {
  return [...html.matchAll(/\bid="([^"]+-module)"/g)].map((match) =>
    match[1].replace(/-module$/, '')
  );
}

export function extractIds(html = readIndexHtml()): string[] {
  return [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
}

export function duplicates(values: string[]): string[] {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([value]) => value)
    .sort();
}

export async function collectConsoleProblems(page: Page): Promise<string[]> {
  const problems: string[] = [];
  page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`));
  page.on('console', (message) => {
    if (['error'].includes(message.type())) {
      problems.push(`${message.type()}: ${message.text()}`);
    }
  });
  return problems;
}

export async function assertModuleVisible(page: Page, moduleId: string) {
  const module = page.locator(`#${moduleId}-module`);
  await expect(module, `${moduleId}-module should exist`).toHaveCount(1);
  await expect(module, `${moduleId}-module should be active`).toHaveClass(/active/);
  await expect(module, `${moduleId}-module should be visible`).toBeVisible();

  const text = (await module.innerText()).replace(/\s+/g, ' ').trim();
  expect(text.length, `${moduleId}-module should not be empty`).toBeGreaterThan(80);
}

function stripTags(value: string): string {
  return value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&');
}

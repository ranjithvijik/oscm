import { expect, test } from '@playwright/test';
import {
  duplicates,
  extractIds,
  extractModuleIds,
  extractNavigationModules,
  readAppSource,
  readIndexHtml
} from '../helpers/indexPage';

test.describe('index.html static contract', () => {
  test('has one unique content module for every navigation item', () => {
    const navModules = extractNavigationModules();
    const navIds = navModules.map((module) => module.id);
    const contentIds = extractModuleIds();

    expect(navModules.length, 'expected module count').toBe(40);
    expect(duplicates(navIds), 'duplicate navigation data-module values').toEqual([]);
    expect(duplicates(contentIds), 'duplicate module section IDs').toEqual([]);
    expect(new Set(contentIds), 'content modules should match nav modules').toEqual(new Set(navIds));
  });

  test('does not contain duplicate DOM ids', () => {
    expect(duplicates(extractIds())).toEqual([]);
  });

  test('contains the required runtime primitives', () => {
    const appSource = readAppSource();

    expect(appSource).toContain("document.querySelectorAll('.nav-btn')");
    expect(appSource).toContain("document.querySelectorAll('.module')");
    expect(appSource).toContain('function switchTab');
    expect(appSource).toContain('DOMContentLoaded');
  });

  test('loads extracted stylesheet and runtime assets', () => {
    const html = readIndexHtml();

    expect(html).toContain('href="assets/css/oscm.css"');
    expect(html).toContain('src="assets/js/oscm.js"');
    expect(html).not.toContain('<style>');
  });

  test('all tab buttons target a tab panel that exists in the same module', () => {
    const html = readIndexHtml();
    const failures: string[] = [];
    const tabPattern = /switchTab\(this,'([^']+)','([^']+)'\)/g;

    for (const match of html.matchAll(tabPattern)) {
      const [, moduleId, tabId] = match;
      const targetId = `${moduleId}-${tabId}`;
      if (!html.includes(`id="${targetId}"`)) failures.push(targetId);
    }

    expect(failures).toEqual([]);
  });
});

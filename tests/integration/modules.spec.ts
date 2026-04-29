import { expect, test } from '@playwright/test';
import {
  assertModuleVisible,
  collectConsoleProblems,
  extractNavigationModules
} from '../helpers/indexPage';

const modules = extractNavigationModules();

test.describe('module integration coverage', () => {
  test('loads the default page without app console errors', async ({ page }) => {
    const consoleProblems = await collectConsoleProblems(page);

    await page.goto('/index.html');
    await expect(page).toHaveTitle(/Operations and Supply Chain Management Simulator/);
    await expect(page.locator('.nav-btn')).toHaveCount(40);
    await assertModuleVisible(page, 'pert');

    expect(consoleProblems).toEqual([]);
  });

  test('every navigation item activates a non-empty module', async ({ page }) => {
    const consoleProblems = await collectConsoleProblems(page);

    await page.goto('/index.html');

    for (const module of modules) {
      await page.locator(`.nav-btn[data-module="${module.id}"]`).click();
      await assertModuleVisible(page, module.id);
      await expect(page.locator(`.nav-btn[data-module="${module.id}"]`)).toHaveClass(/active/);
    }

    expect(consoleProblems).toEqual([]);
  });

  test('responsive layout avoids horizontal document overflow', async ({ page }) => {
    const consoleProblems = await collectConsoleProblems(page);

    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/index.html');
    await page.locator('.nav-btn[data-module="eoq"]').click();
    await assertModuleVisible(page, 'eoq');

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, 'page should not horizontally overflow mobile viewport').toBeLessThanOrEqual(1);
    expect(consoleProblems).toEqual([]);
  });
});

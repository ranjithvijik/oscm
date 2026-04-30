import { expect, test } from '@playwright/test';
import {
  assertModuleHasMeaningfulContent,
  assertModuleVisible,
  collectConsoleProblems,
  extractNavigationModules,
  extractTabTargets,
  openModule
} from '../helpers/indexPage';

const modules = extractNavigationModules();
const tabTargetsByModule = extractTabTargets().reduce<Record<string, string[]>>((acc, tab) => {
  (acc[tab.moduleId] ||= []).push(tab.targetId);
  return acc;
}, {});

test.describe('module integration coverage', () => {
  test('loads the default page without app console errors', async ({ page }) => {
    const consoleProblems = await collectConsoleProblems(page);

    await page.goto('/index.html');
    await expect(page).toHaveTitle(/Operations and Supply Chain Management Simulator/);
    await expect(page.locator('.nav-btn')).toHaveCount(40);
    await assertModuleVisible(page, 'pert');

    expect(consoleProblems).toEqual([]);
  });

  for (const module of modules) {
    test(`${module.id} module opens from navigation with non-empty content`, async ({ page }) => {
      const consoleProblems = await collectConsoleProblems(page);

      await page.goto('/index.html');
      await openModule(page, module.id);
      await assertModuleHasMeaningfulContent(page, module.id);

      expect(consoleProblems).toEqual([]);
    });
  }

  for (const module of modules) {
    test(`${module.id} module tab targets are reachable`, async ({ page }) => {
      const consoleProblems = await collectConsoleProblems(page);
      const targetIds = tabTargetsByModule[module.id] ?? [];

      await page.goto('/index.html');
      await openModule(page, module.id);

      for (const targetId of targetIds) {
        const tabButton = page.locator(
          `#${module.id}-module .tab[onclick*="'${targetId.replace(`${module.id}-`, '')}'"]`
        );
        await expect(tabButton, `${targetId} tab button should exist`).toHaveCount(1);
        await tabButton.click();
        await expect(page.locator(`#${targetId}`), `${targetId} panel should become active`).toHaveClass(/active/);
      }

      expect(consoleProblems).toEqual([]);
    });
  }

  for (const module of modules) {
    test(`${module.id} module renders on mobile without horizontal overflow`, async ({ page }) => {
      const consoleProblems = await collectConsoleProblems(page);

      await page.setViewportSize({ width: 390, height: 900 });
      await page.goto('/index.html');
      await openModule(page, module.id);

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `${module.id} should not horizontally overflow mobile viewport`).toBeLessThanOrEqual(1);
      expect(consoleProblems).toEqual([]);
    });
  }

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

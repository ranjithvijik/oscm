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

  test('keeps modules separated if the extracted stylesheet is unavailable', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.route('**/assets/css/oscm.css', async (route) => {
      await route.fulfill({ status: 404, body: '' });
    });

    await page.goto('/index.html');

    const fallbackLayout = await page.evaluate(() => {
      const sidebar = document.querySelector('.sidebar')!.getBoundingClientRect();
      const main = document.querySelector('.main')!.getBoundingClientRect();
      const visibleModules = [...document.querySelectorAll('.module')]
        .filter((module) => getComputedStyle(module).display !== 'none')
        .map((module) => module.id);

      return {
        sidebarRight: sidebar.right,
        mainLeft: main.left,
        visibleModules,
        overflow: document.documentElement.scrollWidth - window.innerWidth
      };
    });

    expect(fallbackLayout.visibleModules).toEqual(['pert-module']);
    expect(fallbackLayout.mainLeft, 'critical fallback should offset main content after sidebar').toBeGreaterThanOrEqual(
      fallbackLayout.sidebarRight - 1
    );
    expect(fallbackLayout.overflow, 'critical fallback should not horizontally overflow').toBeLessThanOrEqual(1);
    await expect(page.locator('#pert-module')).toBeVisible();
    await expect(page.locator('#breakeven-module')).toBeHidden();
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

  test('desktop layout keeps sidebar and main content side by side', async ({ page }) => {
    const consoleProblems = await collectConsoleProblems(page);

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/index.html');
    await assertModuleVisible(page, 'pert');

    const layout = await page.evaluate(() => {
      const sidebar = document.querySelector('.sidebar')!.getBoundingClientRect();
      const main = document.querySelector('.main')!.getBoundingClientRect();
      return {
        sidebarRight: sidebar.right,
        mainLeft: main.left,
        overflow: document.documentElement.scrollWidth - window.innerWidth
      };
    });

    expect(layout.mainLeft, 'main content should start after the fixed sidebar on desktop').toBeGreaterThanOrEqual(layout.sidebarRight - 1);
    expect(layout.overflow, 'desktop should not horizontally overflow').toBeLessThanOrEqual(1);
    expect(consoleProblems).toEqual([]);
  });

  test('tablet layout stacks navigation above content without clipping modules', async ({ page }) => {
    const consoleProblems = await collectConsoleProblems(page);

    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/index.html');
    await openModule(page, 'forecast');

    const layout = await page.evaluate(() => {
      const sidebar = document.querySelector('.sidebar')!.getBoundingClientRect();
      const main = document.querySelector('.main')!.getBoundingClientRect();
      const activeModule = document.querySelector('.module.active')!.getBoundingClientRect();
      return {
        sidebarBottom: sidebar.bottom,
        mainTop: main.top,
        activeWidth: activeModule.width,
        overflow: document.documentElement.scrollWidth - window.innerWidth
      };
    });

    expect(layout.mainTop, 'main content should sit below tablet navigation').toBeGreaterThanOrEqual(layout.sidebarBottom - 1);
    expect(layout.activeWidth, 'active module should fit tablet viewport').toBeLessThanOrEqual(768);
    expect(layout.overflow, 'tablet should not horizontally overflow').toBeLessThanOrEqual(1);
    expect(consoleProblems).toEqual([]);
  });

  test('narrow phone layout keeps critical controls reachable', async ({ page }) => {
    const consoleProblems = await collectConsoleProblems(page);

    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/index.html');
    await openModule(page, 'breakeven');

    await expect(page.locator('#breakeven-module .tabs')).toBeVisible();
    await expect(page.locator('#be-fc')).toBeVisible();
    await expect(page.locator('#be-p')).toBeVisible();
    await expect(page.locator('#be-vc')).toBeVisible();

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, 'narrow phone should not horizontally overflow').toBeLessThanOrEqual(1);
    expect(consoleProblems).toEqual([]);
  });
});

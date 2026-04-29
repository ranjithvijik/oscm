import { expect, test } from '@playwright/test';
import {
  assertModuleVisible,
  collectConsoleProblems,
  extractNavigationModules
} from '../helpers/indexPage';

const criticalJourneys = [
  'pert',
  'breakeven',
  'learning',
  'forecast',
  'eoq',
  'safetystock',
  'mrp',
  'scheduling',
  'practice'
];

test.describe('user acceptance flows', () => {
  test('student can browse the primary study journey', async ({ page }) => {
    const consoleProblems = await collectConsoleProblems(page);

    await page.goto('/index.html');

    for (const moduleId of criticalJourneys) {
      await page.locator(`.nav-btn[data-module="${moduleId}"]`).click();
      await assertModuleVisible(page, moduleId);
      await expect(page.locator(`#${moduleId}-module .module-title, #${moduleId}-module .page-title`).first()).toBeVisible();
    }

    expect(consoleProblems).toEqual([]);
  });

  test('user can switch tabs inside major modules', async ({ page }) => {
    const consoleProblems = await collectConsoleProblems(page);

    await page.goto('/index.html');
    await page.locator('.nav-btn[data-module="breakeven"]').click();
    await assertModuleVisible(page, 'breakeven');

    await page.getByRole('button', { name: /Sensitivity/ }).click();
    await expect(page.locator('#breakeven-sens')).toHaveClass(/active/);

    await page.getByRole('button', { name: /Target Volume/ }).click();
    await expect(page.locator('#breakeven-target, #breakeven-patch').first()).toHaveClass(/active/);

    await page.locator('.nav-btn[data-module="eoq"]').click();
    await assertModuleVisible(page, 'eoq');
    await page.getByRole('button', { name: /Sensitivity/ }).click();
    await expect(page.locator('#eoq-sens')).toHaveClass(/active/);

    expect(consoleProblems).toEqual([]);
  });

  test('module inventory remains discoverable to a learner', async ({ page }) => {
    const modules = extractNavigationModules();

    await page.goto('/index.html');

    for (const module of modules) {
      await expect(page.locator(`.nav-btn[data-module="${module.id}"]`)).toContainText(module.label);
      await expect(page.locator(`.nav-btn[data-module="${module.id}"]`)).toContainText(module.chapter);
    }
  });
});

import { expect, test, type Page } from '@playwright/test';
import { assertModuleVisible, collectConsoleProblems } from '../helpers/indexPage';

test.describe('calculator integration checks', () => {
  test('PERT probability calculator updates from inputs', async ({ page }) => {
    const consoleProblems = await collectConsoleProblems(page);

    await page.goto('/index.html');
    await page.locator('.nav-btn[data-module="pert"]').click();
    await assertModuleVisible(page, 'pert');

    await setNumber(page, 'pert-te', 38);
    await setNumber(page, 'pert-d', 35);
    await setNumber(page, 'pert-var', 11.89);

    await expect(page.locator('#pert-z')).toContainText('-0.87');
    await expect(page.locator('#pert-prob')).toContainText(/19\.\d%/);
    expect(consoleProblems).toEqual([]);
  });

  test('EOQ calculator updates quantity and total cost when sliders change', async ({ page }) => {
    const consoleProblems = await collectConsoleProblems(page);

    await page.goto('/index.html');
    await page.locator('.nav-btn[data-module="eoq"]').click();
    await assertModuleVisible(page, 'eoq');

    await setNumber(page, 'eoq-d', 2000);
    await setNumber(page, 'eoq-s', 50);
    await setNumber(page, 'eoq-h', 2);

    await expect(page.locator('#eoq-q-m')).toContainText(/316|317/);
    await expect(page.locator('#eoq-tc-m')).toContainText(/\$/);
    expect(consoleProblems).toEqual([]);
  });

  test('safety stock calculator updates safety stock and reorder point', async ({ page }) => {
    const consoleProblems = await collectConsoleProblems(page);

    await page.goto('/index.html');
    await page.locator('.nav-btn[data-module="safetystock"]').click();
    await assertModuleVisible(page, 'safetystock');

    await setNumber(page, 'ss-d', 50);
    await setNumber(page, 'ss-sig', 10);
    await setNumber(page, 'ss-lt', 4);
    await setNumber(page, 'ss-z', 1.65);

    await expect(page.locator('#ss-ss-m')).toContainText('33');
    await expect(page.locator('#ss-rop-m')).toContainText('233');
    expect(consoleProblems).toEqual([]);
  });
});

async function setNumber(page: Page, id: string, value: number) {
  await page.locator(`#${id}`).evaluate(
    (input, nextValue) => {
      const element = input as HTMLInputElement | HTMLSelectElement;
      element.value = String(nextValue);
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
    },
    value
  );
}

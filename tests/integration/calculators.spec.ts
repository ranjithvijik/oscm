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

  test('line balancing calculator updates from visible input IDs', async ({ page }) => {
    const consoleProblems = await collectConsoleProblems(page);

    await page.goto('/index.html');
    await page.locator('.nav-btn[data-module="linebalance"]').click();
    await assertModuleVisible(page, 'linebalance');

    await setNumber(page, 'lb-prodtime', 28800);
    await setNumber(page, 'lb-output', 360);
    await setNumber(page, 'lb-sumtask', 200);
    await setNumber(page, 'lb-stations', 4);

    await expect(page.locator('#lb-cycle')).toContainText('80s');
    await expect(page.locator('#lb-eff')).toContainText('62.5%');
    await expect(page.locator('#lb-vis')).not.toBeEmpty();
    expect(consoleProblems).toEqual([]);
  });

  test('break-even target volume uses the canonical break-even inputs', async ({ page }) => {
    const consoleProblems = await collectConsoleProblems(page);

    await page.goto('/index.html');
    await page.locator('.nav-btn[data-module="breakeven"]').click();
    await assertModuleVisible(page, 'breakeven');
    await page.getByRole('button', { name: /Target Volume/ }).click();

    await setNumber(page, 'be-fc', 50000);
    await setNumber(page, 'be-p', 100);
    await setNumber(page, 'be-vc', 60);
    await setNumber(page, 'tv-profit', 30000);

    await expect(page.locator('#tv-q-result')).toContainText('2,000');
    await expect(page.locator('#tv-rev-result')).toContainText('$200,000');
    expect(consoleProblems).toEqual([]);
  });

  test('transportation module renders allocation summary with total cost', async ({ page }) => {
    const consoleProblems = await collectConsoleProblems(page);

    await page.goto('/index.html');
    await page.locator('.nav-btn[data-module="transportation"]').click();
    await assertModuleVisible(page, 'transportation');

    await expect(page.locator('#transport-cost')).toContainText('$');
    await expect(page.locator('#tr-allocation-body tr')).toHaveCount(3);
    await expect(page.locator('#tr-allocation-results')).toContainText('Source A');
    expect(consoleProblems).toEqual([]);
  });

  test('PERT canonical estimates, variance builder, and animation controls render', async ({ page }) => {
    const consoleProblems = await collectConsoleProblems(page);

    await page.goto('/index.html');
    await page.locator('.nav-btn[data-module="pert"]').click();
    await assertModuleVisible(page, 'pert');

    await setNumber(page, 'p-a', 3);
    await setNumber(page, 'p-m', 6);
    await setNumber(page, 'p-b', 15);

    await expect(page.locator('#p-te-m')).toContainText('7.00');
    await expect(page.locator('#pert-total-var')).not.toBeEmpty();
    await expect(page.locator('#pert-path-sd')).not.toBeEmpty();
    await expect(page.locator('#anim-btn')).toBeVisible();
    await expect(page.locator('#anim-speed')).toBeVisible();
    expect(consoleProblems).toEqual([]);
  });

  test('SQC legacy x-bar and range chart containers are populated', async ({ page }) => {
    const consoleProblems = await collectConsoleProblems(page);

    await page.goto('/index.html');
    await page.locator('.nav-btn[data-module="sqc"]').click();
    await assertModuleVisible(page, 'sqc');

    await expect(page.locator('#sqc-line')).toHaveAttribute('points', /,/);
    await expect(page.locator('#sqc-r-line')).toHaveAttribute('points', /,/);
    await expect(page.locator('#sqc-ooc-text')).not.toBeEmpty();
    expect(consoleProblems).toEqual([]);
  });

  test('forecast comparison, lean improvement, regression, and capability outputs update', async ({ page }) => {
    const consoleProblems = await collectConsoleProblems(page);

    await page.goto('/index.html');
    await page.locator('.nav-btn[data-module="forecast"]').click();
    await assertModuleVisible(page, 'forecast');
    await page.getByRole('button', { name: /Model Comparison/ }).click();
    await setNumber(page, 'fc-a', 40);
    await expect(page.locator('#fc-mad')).not.toContainText('0.00');
    await expect(page.locator('#fc-al')).toHaveAttribute('points', /,/);
    await expect(page.locator('#fc-fl')).toHaveAttribute('points', /,/);

    await page.locator('.nav-btn[data-module="lean"]').click();
    await assertModuleVisible(page, 'lean');
    await setNumber(page, 'lean-rm-red', 50);
    await setNumber(page, 'lean-wip-red', 50);
    await setNumber(page, 'lean-fg-red', 50);
    await expect(page.locator('#lean-future-lt')).toContainText('17.0');

    await page.locator('.nav-btn[data-module="regression"]').click();
    await assertModuleVisible(page, 'regression');
    await expect(page.locator('#reg-equation')).toContainText(/Y = .+x/);
    await expect(page.locator('#reg-forecast-y')).not.toContainText('0');

    await page.locator('.nav-btn[data-module="capability"]').click();
    await assertModuleVisible(page, 'capability');
    await setNumber(page, 'cpk-sigma', 0.001);
    await expect(page.locator('#cap-cpk')).not.toBeEmpty();
    await expect(page.locator('#cp-gauge')).toHaveAttribute('stroke-dashoffset', /.+/);
    await expect(page.locator('#cap-status')).toContainText(/Capable|capable|Marginal|Not Capable/);
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

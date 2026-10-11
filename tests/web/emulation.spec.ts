import { test, expect, devices } from '@playwright/test';


// Create out own emulatr
test('emulator test on iPhone 15', async ({ browser }) => {
  const context = await browser.newContext({
    ...devices['iPhone 15'],
  });

  const page = await context.newPage();
  await page.goto('https://www.google.com/');
  await expect(page).toHaveTitle(/Google/);
  await page.waitForTimeout(10000);
  await context.close();
});


// This can be used for our configuartion from config.ts files
test('with config file test on iPhone 15 1', async ({ page}) => {
  await page.goto('https://www.google.com/');
  await expect(page).toHaveTitle(/Google/);
  await page.waitForTimeout(10000);

});
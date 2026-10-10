import {test} from '@playwright/test'
test('Test1 ', async ({ page }) => {
    const url = "https://app.servcraft.co.za/"

    await page.goto(url);
});
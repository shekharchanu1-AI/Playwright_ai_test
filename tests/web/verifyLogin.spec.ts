
import { test, expect } from '@playwright/test';


test('LoginTestApp @e2e', async ({ page }) => {
    const url = "https://app.servcraft.co.za/"

    await page.goto(url);
});
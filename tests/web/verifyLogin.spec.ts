
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test('LoginTestApp @e2e', async ({ page }) => {
    const url = process.env.WEB_APP_URL;

    if (!url) {
        throw new Error('WEB_APP_URL is not defined in .env');
    }

    await page.goto(url);

    await expect(page).toHaveURL(url);
});
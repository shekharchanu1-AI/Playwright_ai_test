import {test, expect} from '@playwright/test'
import dotenv from 'dotenv'

test("LoginTestApp @e2e" , async ({page})=>{
    const url =process.env.WEB_APP_URL;
     if (!url) {
        throw new Error('BASE_URL is not defined in .env');
    }
    await page.goto(url);
    await expect(page.url).toBe(url);

});
import {test, expect} from '@playwright/test'

test.describe.configure({mode :'serial'})

test ("Login to admin user with cookies ", async ({browser})=>{
const context =  await browser.newContext({storageState:'./storage_data/admin_data.json'});
const page = await context.newPage();
await page.goto('https://sdetqa.vercel.app/login_app');
       await expect(page.getByText('Dashboard Welcome',{exact : true})).toBeVisible();
        await expect(page.locator('#displayUser')).toContainText('admin');
       await page.waitForTimeout(5000);
       await context.close();

});

test ("Login to testuser user with cookies ", async ({browser})=>{
const context =  await browser.newContext({storageState:'./storage_data/user_data.json'});
const page = await context.newPage();
await page.goto('https://sdetqa.vercel.app/login_app');
       await expect(page.getByText('Dashboard Welcome',{exact : true})).toBeVisible();
        await expect(page.locator('#displayUser')).toContainText('testuser1');
       await page.waitForTimeout(5000);
       await context.close();

});

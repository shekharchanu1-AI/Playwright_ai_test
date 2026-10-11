import {test, expect} from '@playwright/test'
import fs from 'fs'

test.describe.configure({mode :'serial'})

test ("Login to admin user with session storage data  ", async ({browser})=>{
const context =  await browser.newContext();
const page = await context.newPage();

const sessionStorageData = JSON.parse(fs.readFileSync('./storage_data/session_admin_data.json','utf-8'))
await context.addInitScript((storage)=>{
    for (let key of storage)
    {
        sessionStorage.setItem(key,storage[key]);
    }

},sessionStorageData)

await page.goto('https://sdetqa.vercel.app/login_app');
       await expect(page.getByText('Dashboard Welcome',{exact : true})).toBeVisible();
        await expect(page.locator('#displayUser')).toContainText('admin');
       await page.waitForTimeout(5000);
       await context.close();

});

test ("Login to testuser user with session storage data ", async ({browser})=>{
const context =  await browser.newContext();
const page = await context.newPage();
const sessionStorageData = JSON.parse(fs.readFileSync('./storage_data/session_user_data.json','utf-8'))
await context.addInitScript((storage)=>{
    for (let key in storage)
    {
        sessionStorage.setItem(key,storage[key]);
    }

},sessionStorageData)
await page.goto('https://sdetqa.vercel.app/login_app');
       await expect(page.getByText('Dashboard Welcome',{exact : true})).toBeVisible();
        await expect(page.locator('#displayUser')).toContainText('testuser1');
       await page.waitForTimeout(5000);
       await context.close();

});
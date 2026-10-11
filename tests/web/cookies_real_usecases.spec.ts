/*
Test 1 : open browser > Login > store cookies 
Test 2 : open new browser > load cookies > verfiy automatic login
*/

import {test, expect} from '@playwright/test'
import fs from 'fs'
const cookiesFile = './storage_data/cookies_login.json'
    const url = 'https://sdetqa.vercel.app/login_app'

    test.describe.configure({mode:'serial'})

test(" Handling real application ", async({browser})=>{
    
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url);

    // Login
    await page.getByRole ('textbox',{name:'Username'}).fill('admin')
    await page.getByRole ('textbox',{name:'Password'}).fill('admin123')

    await page.getByLabel('🍪 Cookie').check();
     await page.getByRole ('button',{name:'Login'}).click();

    await expect(page.getByText('Dashboard Welcome',{exact : true})).toBeVisible();
    const cookies = await context.cookies();
    console.log("get cookies ", cookies);
    fs.writeFileSync(cookiesFile, JSON.stringify(cookies,null))
    await page.waitForTimeout(5000);
});

test(" verify login using cookies  ", async({browser})=>{
    const context = await browser.newContext();
   const savedCookies =  JSON.parse (fs.readFileSync(cookiesFile, 'utf8'));
   context.addCookies(savedCookies);
    // const url = 'https://sdetqa.vercel.app/login_app'
    const page = await context.newPage();
    await page.goto(url);
    await expect(page.getByText('Dashboard Welcome',{exact : true})).toBeVisible();
   await page.waitForTimeout(5000);

});
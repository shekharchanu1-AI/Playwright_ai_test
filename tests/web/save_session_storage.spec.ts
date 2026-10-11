import {chromium} from '@playwright/test'
import fs from 'fs'

async function saveAdminSessionStorage()
{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('https://sdetqa.vercel.app/login_app');
     // Login
        await page.getByRole ('textbox',{name:'Username'}).fill('admin')
        await page.getByRole ('textbox',{name:'Password'}).fill('admin123')
        await page.getByLabel('⏳ Session').check();
        await page.getByRole ('button',{name:'Login'}).click();
        await page.waitForSelector('text=Dashboard Welcome',{state : 'visible'});
        const sessionStorageData = await page.evaluate(()=>{
            return sessionStorage;
        });
        fs.writeFileSync('./storage_data/session_admin_data.json', JSON.stringify(sessionStorageData))
        await page.waitForTimeout(3000);
        await page.close();
         await context.close();
        await browser.close();
        
}

async function saveUserSessionStorage()
{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('https://sdetqa.vercel.app/login_app');
     // Login
        await page.getByRole ('textbox',{name:'Username'}).fill('testuser1')
        await page.getByRole ('textbox',{name:'Password'}).fill('testuser123')
        await page.getByLabel('⏳ Session').check();
        await page.getByRole ('button',{name:'Login'}).click();
        await page.waitForSelector('text=Dashboard Welcome',{state : 'visible'});
        const sessionStorageData = await page.evaluate(()=>{
            return sessionStorage;
        });
        fs.writeFileSync('./storage_data/session_user_data.json', JSON.stringify(sessionStorageData))
        await page.waitForTimeout(3000);
        await page.close();
         await context.close();
        await browser.close();
        
}

saveAdminSessionStorage();
saveUserSessionStorage();
import {chromium} from '@playwright/test'

async function saveAdminStorage()
{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('https://sdetqa.vercel.app/login_app');
     // Login
        await page.getByRole ('textbox',{name:'Username'}).fill('admin')
        await page.getByRole ('textbox',{name:'Password'}).fill('admin123')
        await page.getByLabel('🍪 Cookie').check();
        await page.getByLabel('💾 Local').check();
        await page.getByRole ('button',{name:'Login'}).click();
        await page.waitForSelector('text=Dashboard Welcome',{state : 'visible'});
        await context.storageState({path :'./storage_data/admin_data.json'})
        await page.close();
         await context.close();
        await browser.close();
        
}

saveAdminStorage();

async function saveUserSttorage()
{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('https://sdetqa.vercel.app/login_app');
     // Login
        await page.getByRole ('textbox',{name:'Username'}).fill('testuser1')
        await page.getByRole ('textbox',{name:'Password'}).fill('testuser123')
        await page.getByLabel('🍪 Cookie').check();
        await page.getByLabel('💾 Local').check();
        await page.getByRole ('button',{name:'Login'}).click();
        await page.waitForSelector('text=Dashboard Welcome',{state : 'visible'});
        await context.storageState({path :'./storage_data/user_data.json'})
        await page.close();
         await context.close();
        await browser.close();
    
}

saveUserSttorage();
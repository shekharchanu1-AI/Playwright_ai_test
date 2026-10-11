import {test,expect} from '@playwright/test'

test("login as admin and check dashboard ", async({browser})=>{
    // Attaching local storage 
    const context= await browser.newContext({storageState :'./storage_data/data.json'});
    const page = await context.newPage();
    await page.goto('https://sdetqa.vercel.app/login_app');
        await expect(page.getByText('Dashboard Welcome',{exact : true})).toBeVisible();
        await expect(page.locator('#displayUser')).toContainText('admin');
       await page.waitForTimeout(5000);
       await context.close();
});
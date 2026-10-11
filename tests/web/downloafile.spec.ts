import {test,expect} from '@playwright/test'
import fs from 'fs'

test.beforeEach ("Navigate to the uplaod file @e2e",async({page})=>{
await page.goto('https://sdetqa.vercel.app/autoplay')
});

test.afterEach ("clsoing the file ",async({page})=>{
await page.close();
});

test("Download file @e2e",async({page})=>{
    const [dwnld] =await Promise.all ([page.waitForEvent('download'),page.locator('button',{hasText:'Download File'}).click()]);
    await page.waitForTimeout(4000);
    expect(await dwnld.suggestedFilename()).toContain("sample.txt");

    // save the file in custom path
    const downloadPath = 'downloads/sample.txt'
    await dwnld.saveAs(downloadPath);
    const fileExists = fs.existsSync(downloadPath);
    expect(fileExists).toBeTruthy();
    if(fileExists)
    {
        fs.unlinkSync(downloadPath);
    }
});
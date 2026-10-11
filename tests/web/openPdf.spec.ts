import {test, expect} from '@playwright/test' 

import fs from 'fs'

test.beforeEach ("Navigate to the open pdf file ",async({page})=>{
await page.goto('https://sdetqa.vercel.app/autoplay')
});

test.afterEach ("clsoing the file ",async({page})=>{
await page.close();
});

test("open the pdf  file @e2e",async({page})=>{
    const [pdfPage] =await Promise.all ([page.context().waitForEvent('page'),page.locator('button',{hasText:'Open PDF'}).click()]);
    await page.waitForTimeout(4000);
    expect(pdfPage).toBeTruthy();
    await pdfPage.close();

});
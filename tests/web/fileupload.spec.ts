import {test, expect} from '@playwright/test'


test("file upload ", async({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay");
    await page.locator('#singleFileInput').setInputFiles('./uploads/Text1.txt');
    await page.getByRole('button',{name:'Upload Single File'}).click();
    const message =  page.locator("#singleFileStatus")
    await expect(message).toHaveText("Single file selected: Test1.txt");
    await page.waitForTimeout(4000);
});

test("multiple file upload ", async({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay");
    await page.locator('#singleFileInput').setInputFiles(['uploads/Text1.txt','uploads/Text2.txt','uploads/Text13txt']);
    await page.getByRole('button',{name:'Upload Multiple Files'}).click();
    const message =  page.locator("#singleFileStatus")
    await expect(message).toHaveText("Single file selected: Test1.txt");
    await page.waitForTimeout(4000);
});
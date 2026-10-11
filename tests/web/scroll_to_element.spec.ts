import {test, expect} from '@playwright/test'
test("scroll to specific element @e2e", async ({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay");
    const uploadSingleButton = page.getByRole('button',{name :'Upload Single File'})
    await uploadSingleButton.scrollIntoViewIfNeeded();
    await page.waitForTimeout(10000);
});
import {test,expect} from '@playwright/test'

test ("shadow eleement @e2e",async ({page})=>{
await page.goto("https://sdetqa.vercel.app/autoplay");
const laptop = page.locator("#nested_shadow_content");
await laptop.scrollIntoViewIfNeeded();
const text = await laptop.innerText();
console.log(text);

});
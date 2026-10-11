/*
keyboard methods :
insertText /Type

down
press
up

keyboard.press

await page.keyboard

*/

import {test, expect} from '@playwright/test'

test("key board actions : @e2e",async({page})=>{
await page.goto("https://gotranscript.com/text-compare")
const input = page.locator("textarea[name='text1']");

// focus on locator
await input.focus();
await page.keyboard.insertText("chandra");
await page.waitForTimeout(5000);
await input.clear();

// use type
await page.keyboard.type("ramesh");
await page.waitForTimeout(5000);

// cntrl + a
await page.keyboard.down('Control')
await page.keyboard.press('A')
await page.keyboard.up('Control')

// cntrl + c
await page.keyboard.down('Control')
await page.keyboard.press('C')
await page.keyboard.up('Control')

// Tab
await page.keyboard.press('Tab')

// cntrl + v
await page.keyboard.down('Control')
await page.keyboard.press('V')
await page.keyboard.up('Control')

await expect (page.locator("textarea[name='text1']")).toHaveValue("ramesh");
});


test("key board actions using single press : @e2e",async({page})=>{
await page.goto("https://gotranscript.com/text-compare")
const input = page.locator("textarea[name='text1']");

// focus on locator
await input.focus();
await page.keyboard.insertText("deeraj");
await page.waitForTimeout(5000);
await input.clear();

// use type
await page.keyboard.type("raju");
await page.waitForTimeout(5000);

// cntrl + a
await page.keyboard.press('Control+A')


// cntrl + c
await page.keyboard.press('Control+C')


// Tab
await page.keyboard.press('Tab')

// cntrl + v
await page.keyboard.press('Control+V')


await expect (page.locator("textarea[name='text1']")).toHaveValue("raju");
});

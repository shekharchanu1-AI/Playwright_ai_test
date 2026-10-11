/*
1. Mouse Actions 
 locator based mouse actions (recommended)
 coordinate based mouse actions(mouse api)
2. keyboard actions

*/

import {test, expect} from '@playwright/test'

test ("mouse actions : right click or context xlixk @e2e",async({page})=>{
await page.goto("https://sdetqa.vercel.app/autoplay");
await page.locator('button',{ hasText:'Right Click Me'}).click({button : 'right'});
await page.waitForTimeout(3000);
const allOptions = await page.locator("#customContextMenu>button").allInnerTexts();
expect(allOptions).toEqual(['Edit','Cut','Copy','Paste','Delete','Quit'])
const quitOption = page.locator('button',{hasText:'Quit'})
await expect(quitOption).toBeVisible();
page.once('dialog',dialog =>{
    expect(dialog.message()).toContain('Quit');
    dialog.accept()
});
await quitOption.click();
});

test ("mouse actions : mouse hover  @e2e",async({page})=>{
await page.goto("https://sdetqa.vercel.app/autoplay");
await page.locator('span:has-text("Hover me")').hover();
const attribute = await page.locator('span:has-text("Hover me")').getAttribute('title');
console.log(attribute);
expect(attribute).toBe('This is a tooltip');
await page.waitForTimeout(3000);

});

test ("mouse actions : double click @e2e",async({page})=>{
await page.goto("https://sdetqa.vercel.app/autoplay");
await page.locator('button:has-text("Double click")').dblclick();
page.once('dialog',dialog =>{
    expect(dialog.message()).toContain('Double clicked!');
    dialog.accept()
});

});


test ("mouse actions : drag and drop ",async({page})=>{
await page.goto("https://sdetqa.vercel.app/autoplay");
const sourceBtn = page.getByText('Drag me',{exact : true});
const targetBtn = page.getByText('Drop zone',{exact : true});
page.on('dialog',dialog =>{
    expect(dialog.message()).toContain('Double clicked!');
    dialog.accept()
});
await sourceBtn.dragTo(targetBtn)
await page.waitForTimeout(3000);

});
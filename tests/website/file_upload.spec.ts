import {test, expect} from '@playwright/test'

test ("single file upload @e2e", async({page})=>{
await page.goto("https://sdetqa.vercel.app/autoplay");
const singlefileInputBoxt = page.locator('#singleFileInput');
await singlefileInputBoxt.scrollIntoViewIfNeeded();
await singlefileInputBoxt.setInputFiles('./uploads/Test1.txt');
const singleFileButton = page.getByRole('button',{name:'Upload Single File'});
await singleFileButton.click();
const statusMessage = page.locator('#singleFileStatus');
await expect(await statusMessage.innerText()).toContain('Single file selected: Test1.txt');
});


test(" Uploading multile files @e2e ", async({page})=>{
await page.goto("https://sdetqa.vercel.app/autoplay");
const multiFilesInput = page.locator('#multipleFilesInput');
await multiFilesInput.scrollIntoViewIfNeeded();
await multiFilesInput.setInputFiles(['./uploads/Test2.txt','./uploads/Test3.txt','./uploads/Test4.txt']);
const multiFileButton = page.getByRole('button',{name:'Upload Multiple Files'});
await multiFileButton.click();
const multiStatusMessage = page.locator('#multipleFilesStatus')
await expect(await multiStatusMessage.innerText()).toContain('Multiple files selected:');

});

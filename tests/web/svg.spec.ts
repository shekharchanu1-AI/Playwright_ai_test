// scalable vector graphics

import {test, expect} from '@playwright/test'

test ("handling svg elements @e2e",async ({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay");
    const circle = page.locator("svg circle.shape");
    await circle.scrollIntoViewIfNeeded();
    const fillAttri = await circle.getAttribute('fill');
    console.log(fillAttri);
    await expect(fillAttri).toBe("DeepSkyBlue");

    // count
    const shapes = page.locator(".shape")
    console.log("count of shapes : ",await shapes.count());
    await expect(shapes).toHaveCount(4);
});

test("Handling svg bar ", async ({ page }) => {
    await page.goto("https://sdetqa.vercel.app/autoplay");
    const bars = page.locator("svg");
    expect(await bars.count()).toBe(2);
    const barscount = await bars.count()

    const labels = page.locator("svg").nth(1).locator("text");
    // expect(await labels.count()).toBe(2);
    const labelsCount = await labels.count();

    // expect(barscount).toEqual(labelsCount);

    for (let i = 0; i < barscount; i++) {
        const label = await labels.nth(i).innerText();
        const height = await bars.nth(i).getAttribute("height")
        console.log(`${label} : ${height}`);
    }
});
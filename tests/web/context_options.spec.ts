import {test, expect} from '@playwright/test'

test ("Context options demo", async ({browser})=>{
    const context = await browser.newContext({colorScheme : 'dark',
         permissions : ['notifications']
        ,locale : 'en-IN', timezoneId:'Asia/Kolkata',viewport : {width : 1280, height : 720},
         geolocation: {latitude: 17.3843,longitude:78.4583},
         ignoreHTTPSErrors :false}
    );
    const page = await context.newPage();
    await page.goto("https://expired.badssl.com/");
    await page.waitForTimeout(5000);

});
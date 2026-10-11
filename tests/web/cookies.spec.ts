
/*
1. Create Browser Context ------------------------> browser.context()
2. Create context --------------------------------->context.newPage()
3. Add cookies ------------------------------------->context.addCookies();
4. Get cookies -------------------------------------> context.cookies();
5. Clear cookies -----------------------------------> context.clearCookies();
*/

import {test, expect, chromium} from '@playwright/test' 

test('Cookies demo ', async()=>{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = context.newPage();
    await (await page).goto("https://playwright.com");

    //Add cookies 
    await context.addCookies([{name:'username',
                               value:'chandra',
                               domain:'playwright.dev',
                               path:'/',
                               httpOnly:false,
                               secure:true,
                               sameSite: 'Lax'},
                            {name: 'auth_token',
                                value:'xyz123secret',
                                url:'https://example.com'
                            }]);

    // get cookies 
    let cookies = await context.cookies();
    console.log(">>>>>>>>>>>cookies>>>>>>>>>>>>>>>>>>>",cookies);

    // count 
    console.log(cookies.length);

    //Clear the cookies 
    const count = await context.clearCookies();
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>",count)

    // get cookies 
    cookies = await context.cookies();
    console.log(">>>>>>>>>>>cookies>>>>>>>>>>>>>>>>>>>",cookies);

});
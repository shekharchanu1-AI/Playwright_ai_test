// https://demo.playwright.dev/api-mocking
//https://demo.playwright.dev/api-mocking/api/v1/fruits


import {test,expect} from '@playwright/test'

test ('Mocking API Response ',async({page})=>{
    //step : 1 > Intercept the API URL Pattern before navigating
    //https://demo.playwright.dev/api-mocking/api/v1/fruits
    await page.route("**/api/v1/fruits",async(route)=>{
        const fakeResponseJson = [
            {name : 'XYZ', id : 1},
            {name: 'ABC',id: 2}
        ];

    //      // step : 2> fulfill the request with your mock data 
         await route.fulfill({
            status:200,
            contentType:'application/json',
            body: JSON.stringify(fakeResponseJson)
         })

    });
    
    // step 3  > go to page and verify the UI Displays the mocked data
    await page.goto("https://demo.playwright.dev/api-mocking");
    await expect(page.getByText('XYZ')).toBeVisible();
    await expect(page.getByText('ABC')).toBeVisible();

});

// Modify the live response, Doing without mocking
// We cannot moock api request directly we through only browser 

test('Modify the live response ',async({request})=>{
   const response =  await request.get("https://demo.playwright.dev/api-mocking/api/v1/fruits");
   expect(response.ok()).toBeTruthy();
   expect(response.status()).toBe(200)

   const fruites = await response.json ();
   console.log(fruites);
    
    
});


// Example 3 
test('Modify live api response  ', async ({page})=>{
    await page.route("**/api/v1/fruits",async (route)=>{
        const response =await route.fetch();
        const json = await response.json();

        json.push({name:'XYZ',id:1});

        await route.fulfill({
            response,json
        });

        const response1=await page.goto('https://demo.playwright.dev/api-mocking');
        await expect(page.getByText('XYZ')).toBeVisible();
    
    });



});


test.only('Blocking of images ',async ({page})=>{
    await page.route("**/*.{png,jpg,jpeg,gif,svg,webp}", async(route)=>{
        console.log(route.request().url());
        await route.abort();
    })

    await page.goto('https://demoblaze.com');

});
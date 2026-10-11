import {test,expect} from '@playwright/test'
import dotenv from 'dotenv'
import {Buffer} from 'buffer' // to encode data
dotenv.config();

test.describe('API Authentication flows ', ()=>{

    // NO AUTHENTICATION -API
    test("NO Authentication ", async({request})=>{
        const noAuthResponse = await request.get("https://jsonplaceholder.typicode.com/posts/1");
        const noAuthResponseBody = noAuthResponse.json();
        console.log(noAuthResponseBody);
        expect(noAuthResponse.status()).toBe(200)

    });

    // BASIC AUTHENTICATION - API
      test("Basic authentication  ", async({request})=>{
        const username : string | undefined = process.env.BASIC_AUTH_USERNAME;
        const password : string | undefined= process.env.BASIC_AUTH_PASSWORD;

        //this convert date to encoded string format
        const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');
        console.log(base64Credentials);
        const basicAuthResponse = await request.get("https://postman-echo.com/basic-auth",{headers : {Autherization : `Basic ${base64Credentials}`}});
        const basicAuthResponseBody = await basicAuthResponse.json();
        console.log(basicAuthResponseBody);
        expect(basicAuthResponse.status()).toBe(200)
        expect(basicAuthResponseBody.authenticated).toBe(true);
    });

    // API KEY - API 
    test (" Api Key - API ", async({request})=>{
        const apikey = process.env.API_KEY;
        const city ='Delhi'
        const apiKeyResponse = await request.post("https://openweathermap.org/data/2.5/weather?q={city name}&appid={apikey}}",{params :{q : city ,appid: apikey!}});
        const apiKeyResponseBody = await apiKeyResponse.json();
        expect(apiKeyResponse).toBe(200)
        expect(apiKeyResponseBody.name).toBe(city)
        expect(apiKeyResponseBody).toHaveProperty('weather');
    });

    // BEARER TOKEN - JWT
    test ("Bearer token - jwt ",async ({request})=>{
         const githubapikey = process.env.GITHUB_API_KEY;
        const bearerResponse = await request.get('https://api.github.com/user/repos',{headers:{Autherization : `Bearer : ${githubapikey}`}});
         expect(bearerResponse).toBe(200)
        

    });
});
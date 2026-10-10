import {test, expect} from '@playwright/test'
import fs from 'fs';

function readJsonFile (filePath : string){
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

test ('test create, get, get token, partial update put and delete @datadriven',async({request})=>{

    // step 1 : create the resource 
    const BASE_URL ='https://restful-booker.herokuapp.com/'
    const createBookingData = readJsonFile("./testdata/post_request_data.json");
    const createResponse = await request.post(`${BASE_URL}/booking`,{data:createBookingData});
    const createResponseBody= await createResponse.json();
    const bookingId = createResponseBody.bookingid
    expect(createResponse.status()).toBe(201);
    expect(createResponse.statusText()).toBe('Created')

    //step 2 : getting resource
    const getResponse = await request.get(`${BASE_URL}/booking/${bookingId}`);
    const getResponseBody = await getResponse.json();
    console.log(">>>>>>>>>>>>>>>>>>>>>>>",getResponseBody);

    expect(getResponse.status()).toBe(200);
    expect(getResponse.statusText()).toBe('OK')

    // step 3 : Create a token for update put patch and delete request
        const tokenBody = readJsonFile("./testdata/token_request_body.json");
       const createToken= await request.post(`${BASE_URL}/auth`,{data:tokenBody});
       const tokenResponseBody = await createToken.json();
       const token = tokenResponseBody.token;
       expect(createToken.status()).toBe(200);
       expect(createToken.statusText()).toBe('OK')


       
    // step 4 : send patch request 
    const patchRequestBody = readJsonFile ("./testdata/patch_request_body.json");
    const patchRequestResponse = await request.patch(`${BASE_URL}/booking/${bookingId}`, {
                                                headers:{"Content-Type" : "application/json",
                                                "Cookie" : `token=${token}`},data : patchRequestBody});
    const patchResponseBody = await patchRequestResponse.json();

    expect(patchRequestResponse.status()).toBe(200);
    expect(patchRequestResponse.statusText()).toBe('OK')
    console.log(">>>>>>>>>>>>>>>>>>>>>>>",patchResponseBody);

    // step 4: send a full update using put request 
     const putRequestBody = readJsonFile ("./testdata/put_request_body.json");
    const putRequestResponse = await request.put(`${BASE_URL}/booking/${bookingId}`, {
                                                headers:{"Content-Type" : "application/json",
                                                "Cookie" : `token=${token}`},data : putRequestBody});
    const putResponseBody = await putRequestResponse.json();

    expect(putRequestResponse.status()).toBe(200);
    expect(putRequestResponse.statusText()).toBe('OK')
    console.log(">>>>>>>>>>>>>>>>>>>>>>>",putResponseBody);


    //step 6 : Delete booking 
    const deleteRequestResponse = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
                                                headers:{"Content-Type" : "application/json",
                                                "Cookie" : `token=${token}`}});
    const deleteResponseBody = await deleteRequestResponse.json();

    expect(deleteResponseBody.status()).toBe(200);
    expect(deleteResponseBody.statusText()).toBe('OK')
    console.log(">>>>>>>>>>>>>>>>>>>>>>>",deleteResponseBody);


});
import {test, expect} from '@playwright/test'
import fs from 'fs'
test.describe ('File upload and download',()=>{
let uploadTextFile ='';

test ('file upload @sanity',async ({request})=>{
const BASE_URL = 'https://api.escuelajs.co/api/v1/files/upload'
const response = await request.post(BASE_URL,{multipart:{file:{name:'Test1.txt',mimeType:'text/plain',buffer:fs.readFileSync('.testdata/Test1.txt')}}});
expect(response).toBe(201);
const responseBody = await response.json();
expect(responseBody.originalname).toBe('Test1.txt')
uploadTextFile = responseBody.fileName;
console.log('Upload Text File',uploadTextFile);
});

test ('Download Text File ', async ({request})=>{
    const BASE_URL = 'https://api.escuelajs.co/api/v1/files/${uploadTextFile}'
    const response = await request.get(BASE_URL);
    expect(response).toBe(200);
    const fileContent = response.text();
    expect(fileContent).toContain('test');

});
});
import {test, expect} from '@playwright/test'
import Ajv from 'ajv'

test (' schema validation @sanity',async({request})=>{
    const BASE_URL = "https://mocktarget.apigee.net/json"
    const response = await request.get(BASE_URL);
    const responseBody = await response.json();
    console.log(responseBody);

    // schema given by developer 
    const schema = {
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "city": {
      "type": "string"
    },
    "state": {
      "type": "string"
    }
  },
  "required": [
    "firstName",
    "lastName",
    "city",
    "state"
  ],
  "additionalProperties": false,
  "title": "Root"
}

// Validating schema 
const ajv1 = new Ajv();
const validate = ajv1.compile(schema);  // return the validator function
const isValid  = validate(responseBody)
expect(isValid).toBeTruthy();  // assertion
});

test('schema validation 2 @sanity', async ({request})=>{
    const BASE_URL = 'https://jsonplaceholder.typicode.com/posts/1';
    const response = await request.get(BASE_URL)
    const responseBody = response.json();

    const schema ={
  "type": "object",
  "properties": {
    "userId": {
      "type": "integer"
    },
    "id": {
      "type": "integer"
    },
    "title": {
      "type": "string"
    },
    "body": {
      "type": "string"
    }
  },
  "required": [
    "userId",
    "id",
    "title",
    "body"
  ],
  "additionalProperties": false
}

const ajv2 = new Ajv();
const validate =ajv2.compile(schema);
const isValid = validate(schema)
expect(!isValid).toBeTruthy();
});

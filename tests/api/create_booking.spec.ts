import {test, expect} from '@playwright/test'

test ("create booking with static data ", async ({request})=>{
    const BASE_URL= 'https://restful-booker.herokuapp.com'
    const requestPayLoad = {
    firstname: "Jim",
    lastname: "Brown",
    totalprice: 1000,
    depositpaid: true,
    bookingdates: {
      checkin: "2026-08-01",
      checkout: "2026-08-05", 
    },
    additionalneeds: "Breakfast"
  };

 const response = await request.post(`${BASE_URL}/booking`, {data:requestPayLoad})

 const responseBody = await response.json()

 //print response body 
 console.log(responseBody);

 // Validate the status code
 expect(response.status()).toBe(200);
  expect(response.statusText()).toBe('OK');

  //Validating the response body 
  expect (responseBody).toHaveProperty("bookingid");
  expect (responseBody).toHaveProperty("booking");
  expect (responseBody.bookingid).toEqual(expect.any(Number))

  //Validate booking fields 
  const booking =await  responseBody.bookingid
  expect(booking).toMatchObject(requestPayLoad);
  expect(booking.bookingDates).toMatchObject( { checkin: '2026-08-01', checkout: '2026-08-05' });


});
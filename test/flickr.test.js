const request = require("supertest");
const app = require("../index.js");


describe("test root route", () => {
  it('should redirect to postman documentation', async() => {
    const res = await request(app).get('/').redirects(0).expect(302);
    expect(res.headers.location).toMatch(/^https:\/\/documenter\.getpostman\.com.*$/gi);
  })
})

describe("Random fetching", () => {
  it("get random fetching", async () => {
    const res = await request(app).get("/random");
    expect(res.statusCode).toEqual(404);
  });
});



describe("Get All image from flickr", () => {
  it("get all image", async () => {
    const res = await request(app).get("/images");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("Get All image by tags name", () => {
  it("get image by tags name", async () => {
    const res = await request(app).get("/images?tags=apa");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

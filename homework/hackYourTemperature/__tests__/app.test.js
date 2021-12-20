"use strict";

import supertest from "supertest";
import app from "../app.js";

const request = supertest(app);

describe("POST /weather", () => {
  describe("User send a valid city name", () => {
    it("Should response with a 200 status code", async () => {
      const response = await request
        .post("/weather")
        .send({ cityName: "Amsterdam" });
      expect(response.statusCode).toBe(200);
    });

    it("Should specify json in the content type header", async () => {
      const response = await request
        .post("/weather")
        .send({ cityName: "Amsterdam" });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    it("Should specify json in the content type header", async () => {
      const response = await request
        .post("/weather")
        .send({ cityName: "Amsterdam" });
      expect(typeof response.body).toBe("object");
    });
  });

  describe("User send invalid city name", () => {
    it("Should response with a 404 status code", async () => {
      const response = await request
        .post("/weather")
        .send({ cityName: "non-exist city" });
      expect(response.statusCode).toBe(404);
    });

    it("Should response with 'City is not found'", async () => {
      const response = await request
        .post("/weather")
        .send({ cityName: "non-exist city" });
      expect(response.body.weatherText).toBe("City is not found");
    });
  });
});

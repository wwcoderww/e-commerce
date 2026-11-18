import supertest from "supertest";
import { describe, expect, inject, it } from "vitest";
import app from "../app.js";
import { TestFixtures } from "./globalSetup.js";

const injectFixture = inject as (key: "testFixtures") => TestFixtures;
const fixtures = injectFixture("testFixtures");
const { productId, userId } = fixtures;

describe("/cart", () => {
  it("POST | Should return status 200", async () => {
    const response = await supertest(app).post("/cart").send({
      userId,
      productId,
    });
    expect(response.status).toBe(200);
  });
  it("GET | Should return an array of cart items", async () => {
    const response = await supertest(app).get(`/cart/${userId}`);
    expect(response.status).toBe(200);
  });
  it("PUT | Change quantity | Should return quantity 2", async () => {
    const response = await supertest(app).put("/cart").send({
      userId,
      productId,
      quantity: 2,
    });
    expect(response.status).toBe(200);
    expect(response.body.data[0].quantity).toBe(2);
  });
  it("DELETE | Should return status 200", async () => {
    const response = await supertest(app).delete(`/cart`).send({
      userId,
      productId,
    });
    expect(response.status).toBe(200);
  });
});

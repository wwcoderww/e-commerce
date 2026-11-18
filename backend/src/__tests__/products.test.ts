import { beforeAll, describe, expect, inject, it } from "vitest";
import supertest from "supertest";
import app from "../app.js";
import { TestFixtures } from "./globalSetup.js";

let adminCookie: string;

const injectFixture = inject as (key: "testFixtures") => TestFixtures;
const fixtures = injectFixture("testFixtures");
const { productId, productName: testName } = fixtures;

beforeAll(async () => {
  const signInResponse = await supertest(app).post("/auth/sign-in/email").send({
    email: fixtures.adminEmail,
    password: fixtures.adminPassword,
  });

  const cookies = signInResponse.headers["set-cookie"];
  adminCookie = Array.isArray(cookies)
    ? cookies.map((cookie) => cookie.split(";")[0]).join("; ")
    : (cookies?.split(";")[0] ?? "");

  if (!adminCookie) {
    throw new Error(
      `Test admin sign-in failed with status ${signInResponse.status}: ${JSON.stringify(signInResponse.body)}`,
    );
  }
  if (!productId || !testName) {
    throw new Error("Global test setup did not provide product fixtures.");
  }
});

describe("/products", () => {
  it("GET | Should return an array of products", async () => {
    const response = await supertest(app).get("/products");
    expect(response.status).toBe(200);
  });

  it("POST | DUPLICATE | Should return status 400 with error name already exists", async () => {
    const response = await supertest(app)
      .post("/products")
      .set("Cookie", adminCookie)
      .send({
        name: testName,
        price: 100,
      });
    expect(response.status).toBe(400);
    expect(response.body.errors[0].message).toBe(
      "This product name is already in use.",
    );
  });
  it("PUT | Should return status 200", async () => {
    const response = await supertest(app)
      .put(`/products/${productId}`)
      .set("Cookie", adminCookie)
      .send({
        name: `1${testName}`,
        price: 100,
      });
    expect(response.status).toBe(200);
  });
  it("DELETE | Should return status 200", async () => {
    const response = await supertest(app)
      .delete(`/products/${productId}`)
      .set("Cookie", adminCookie);
    expect(response.status).toBe(200);
  });
});

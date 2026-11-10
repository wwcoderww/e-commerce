import { beforeAll, describe, expect, it } from "vitest";
import supertest from "supertest";
import app from "./app.js";

let adminCookie: string;
let productId: string;

beforeAll(async () => {
  const response = await supertest(app).post("/auth/sign-in/email").send({
    email: "a@a.com",
    password: "aaaaaaaaa",
  });

  const cookies = response.headers["set-cookie"];

  adminCookie = Array.isArray(cookies)
    ? cookies.map((cookie) => cookie.split(";")[0]).join("; ")
    : (cookies?.split(";")[0] ?? "");
});

describe("/products", () => {
  it("GET | Should return an array of products", async () => {
    const response = await supertest(app).get("/products");
    expect(response.status).toBe(200);
  });
  it("POST | Should return status 200", async () => {
    const response = await supertest(app)
      .post("/products")
      .set("Cookie", adminCookie)
      .send({
        name: "Test Product",
        price: 100,
      });
    productId = response.body.data[0].id;
    expect(response.status).toBe(200);
  });
  it("POST | DUPLICATE | Should return status 400 with error name already exists", async () => {
    const response = await supertest(app)
      .post("/products")
      .set("Cookie", adminCookie)
      .send({
        name: "Test Product",
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
        name: "Testz Product",
        price: 100,
        id: productId,
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

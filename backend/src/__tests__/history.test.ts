import supertest from "supertest";
import { describe, expect, inject, it } from "vitest";
import app from "../app.js";
import { TestFixtures } from "./globalSetup.js";

const injectFixture = inject as (key: "testFixtures") => TestFixtures;
const fixtures = injectFixture("testFixtures");
const { productId, userId } = fixtures;
let historyId: string;

describe("/history", () => {
  it("/POST | Return 200 with data: string", async () => {
    const purchases = [
      {
        name: "A",
        price: 1,
        quantity: 1,
        productId: productId,
      },
    ];
    const customerInfo = {
      email: "a@a.com",
      firstName: "string",
      lastName: "string",
      address: "string",
      address2: "",
      city: "string",
      state: "string",
      zip: "11111",
      country: "string",
    };

    const response = await supertest(app).post("/history").send({
      userId,
      purchases,
      customerInfo,
    });
    expect(response.status).toBe(200);
    expect(typeof response.body.data).toBe("string");
    historyId = response.body.data;
  });

  it("/GET histroy by id| Should return 200 and data.purchasesData and data.HistoryData", async () => {
    {
      const response = await supertest(app).get(`/history/${historyId}`);
      expect(response.status).toBe(200);
      expect(typeof response.body.data.historyData.id).toBe("string");
      expect(typeof response.body.data.purchaseData[0].id).toBe("string");
    }
  });

  it("/GET histroy by USER id| Should return 200 and data (History Data)", async () => {
    {
      const response = await supertest(app).get(`/history/user/${userId}`);
      expect(response.status).toBe(200);
      expect(typeof response.body.data[0].total).toBe("number");
    }
  });

  it("/ All history| Should return 200 and data (History Data)", async () => {
    {
      const response = await supertest(app).get(`/history`);
      expect(response.status).toBe(200);
      expect(typeof response.body.data[0].total).toBe("number");
    }
  });

  it("/ All purchases| Should return 200 and data (Purchase Data)", async () => {
    {
      const response = await supertest(app).get(`/history/purchases`);
      expect(response.status).toBe(200);
      expect(typeof response.body.data[0].historyId).toBe("string");
    }
  });
});

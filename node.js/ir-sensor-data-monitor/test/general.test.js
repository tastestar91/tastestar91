// app.test.js
const request = require("supertest");
const app = require("../ir-sensor-data-monitor");
const answer = require("./answer");
jest.mock("request-promise-native");

describe("General API Tests", () => {
  test("GET /v1/sensors/kw-aws-min1/1111051500", async () => {
    const response = await request(app).get("/v1/sensors/kw-aws-min1/1111051500");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(answer.awsV1Answer));
  });
  test("GET /v2/sensors/kw-aws-min1/1111051500", async () => {
    const response = await request(app).get("/v2/sensors/kw-aws-min1/1111051500");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(answer.awsV2Answer));
  });

  test("GET /v1/sensors/kw-vsrt1/1111051500", async () => {
    const response = await request(app).get("/v1/sensors/kw-vsrt1/1111051500");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(answer.vsrtV1Answer));
  });
  test("GET /v2/sensors/kw-vsrt1/1111051500", async () => {
    const response = await request(app).get("/v2/sensors/kw-vsrt1/1111051500");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(answer.vsrtV2Answer));
  });
});

describe("KwSensors API Tests", () => {
  test("GET /v1/kw-sensors/kw-aws-min1/1111051500", async () => {
    const response = await request(app).get("/v1/kw-sensors/kw-aws-min1/1111051500");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(answer.kwSensorsAwsV1Answer));
  });

  test("GET /v2/kw-sensors/kw-aws-min1/1111051500", async () => {
    const response = await request(app).get("/v2/kw-sensors/kw-aws-min1/1111051500");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(answer.kwSensorsAwsV2Answer));
  });

  test("GET /v1/kw-sensors/kw-vsrt1/1111051500", async () => {
    const response = await request(app).get("/v1/kw-sensors/kw-vsrt1/1111051500");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(answer.kwSensorsVsrtV1Answer));
  });

  test("GET /v2/kw-sensors/kw-vsrt1/1111051500", async () => {
    const response = await request(app).get("/v2/kw-sensors/kw-vsrt1/1111051500");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(answer.kwSensorsVsrtV2Answer));
  });
});

describe("Fail API Tests", () => {
  test("GET /v1/kw-sensors/kw-aws-min4", async () => {
    const response = await request(app).get("/v1/kw-sensors/kw-aws-min4");

    expect(response.status).toBe(404);
    expect(response.body).toEqual(expect.objectContaining(answer.failSidAnswer));
  });

  test("GET /v2/kw-sensors/kw-aws-min1/11110", async () => {
    const response = await request(app).get("/v2/kw-sensors/kw-aws-min1/11110");

    expect(response.status).toBe(206);
    expect(response.body).toEqual(expect.objectContaining(answer.failAidAnswer));
  });
});

const request = require("supertest");
const express = require("express");

const { maintenance, maxImageValidation } = require("../utils/form-validation");
const {
  getSettings,
  setMaintenance,
  setMaxImagesToConvert,
} = require("./settings-controler");

const app = express();
app.use(express.json());
app.get("/settings", getSettings);
app.post("/maintenance", maintenance, setMaintenance);
app.post("/max-images-to-convert", maxImageValidation, setMaxImagesToConvert);

describe("GET /settings", () => {
  it("responds with settings object", async () => {
    const response = await request(app).get("/settings");

    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toBe("object");
  });
});

describe("POST /maintenance", () => {
  it("Sets maintenance status to true and responds with the isUnderMaintenance data ", async () => {
    const response = await request(app)
      .post("/maintenance")
      .send({ isUnderMaintenance: true });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ isUnderMaintenance: true });
  });

  it("Sets maintenance status to false and responds with the isUnderMaintenance data ", async () => {
    const response = await request(app)
      .post("/maintenance")
      .send({ isUnderMaintenance: false });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ isUnderMaintenance: false });
  });

  it("responds with error for invalid input", async () => {
    const response = await request(app)
      .post("/maintenance")
      .send({ isUnderMaintenance: "invalid" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });

  it("Sets maxImagesToConvert value to 4 and responds with the maxImagesToConvert value 4 ", async () => {
    const response = await request(app)
      .post("/max-images-to-convert")
      .send({ maxImagesToConvert: 4 });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ maxImagesToConvert: 4 });
  });

  it("responds with error for invalid input", async () => {
    const response = await request(app)
      .post("/max-images-to-convert")
      .send({ maxImagesToConvert: "invalid" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });
});

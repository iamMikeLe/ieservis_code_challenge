const request = require("supertest");
const express = require("express");
const {
  getMaintenanceStatus,
  setMaintenanceStatus,
} = require("./maintenance-controler");
const { maintenance } = require("../utils/form-validation");

const app = express();
app.use(express.json());
app.get("/maintenance", getMaintenanceStatus);
app.post("/maintenance", maintenance, setMaintenanceStatus);

describe("GET /maintenance", () => {
  it("responds with maintenance status", async () => {
    const response = await request(app).get("/maintenance");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("isUnderMaintenance");
  });
});

describe("POST /maintenance", () => {
  it("Sets maintenance status to true and responds with the isUnderMaintenance data ", async () => {
    const response = await request(app)
      .post("/maintenance")
      .send({ isUnderMaintenance: "true" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ isUnderMaintenance: "true" });
  });

  it("Sets maintenance status to false and responds with the isUnderMaintenance data ", async () => {
    const response = await request(app)
      .post("/maintenance")
      .send({ isUnderMaintenance: "false" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ isUnderMaintenance: "false" });
  });

  it("responds with error for invalid input", async () => {
    const response = await request(app)
      .post("/maintenance")
      .send({ isUnderMaintenance: "invalid" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });
});

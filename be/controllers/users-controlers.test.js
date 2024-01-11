const request = require("supertest");
const express = require("express");
const { login } = require("./users-controler");

const app = express();
app.use(express.json());
app.post("/login", login);

describe("POST /login", () => {
  it("responds with user data for valid credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "user@email.com", password: "userPassword" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ email: "user@email.com", type: "user" });
  });

  it("responds with error for invalid credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "wrongUser@email.com", password: "wrongUserPassword" });

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      status: "error",
      statusCode: 401,
      message: "Invalid credentials",
    });
  });
});

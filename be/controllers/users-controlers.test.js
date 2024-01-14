const request = require("supertest");
const express = require("express");
const { login, adminLogin } = require("./users-controler");
const { userLogin } = require("../utils/form-validation");

const app = express();
app.use(express.json());
app.post("/login", userLogin, login);
app.post("/admin/login", userLogin, adminLogin);

const VALID_USER_EMAIL = "user@email.com";
const VALID_USER_PASSWORD = "userPassword";
const VALID_ADMIN_EMAIL = "admin@email.com";
const VALID_ADMIN_PASSWORD = "adminPassword";
const INVALID_USER_EMAIL = "wrongUser@email.com";
const INVALID_USER_PASSWORD = "wrongUserPassword";

const invalidCredentials = {
  status: "error",
  statusCode: 401,
  message: "Invalid credentials",
};

describe("POST /login", () => {
  it("responds with user data for valid credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: VALID_USER_EMAIL, password: VALID_USER_PASSWORD });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ email: VALID_USER_EMAIL, type: "user" });
  });

  it("responds with error for invalid credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: INVALID_USER_EMAIL, password: INVALID_USER_PASSWORD });

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual(invalidCredentials);
  });

  it("responds with error for valid user but invalid password", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: VALID_USER_EMAIL, password: INVALID_USER_PASSWORD });

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual(invalidCredentials);
  });

  it("responds with error when passing admin credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: VALID_ADMIN_EMAIL, password: VALID_ADMIN_PASSWORD });

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual(invalidCredentials);
  });

  it("responds with error when email is missing", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "", password: INVALID_USER_PASSWORD });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("errors");
  });

  it("responds with error when password is missing", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: VALID_USER_EMAIL, password: "" });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("errors");
  });

  it("responds with error when passing invalid email format", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "invalidemailformat", password: VALID_USER_EMAIL });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("errors");
  });
});

describe("POST /admin/login", () => {
  it("responds with admin user data for valid credentials", async () => {
    const response = await request(app)
      .post("/admin/login")
      .send({ email: VALID_ADMIN_EMAIL, password: VALID_ADMIN_PASSWORD });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ email: VALID_ADMIN_EMAIL, type: "admin" });
  });

  it("responds with error for valid admin user but invalid password", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: VALID_ADMIN_EMAIL, password: INVALID_USER_PASSWORD });

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual(invalidCredentials);
  });

  it("responds with error for invalid credentials", async () => {
    const response = await request(app)
      .post("/admin/login")
      .send({ email: INVALID_USER_EMAIL, password: INVALID_USER_PASSWORD });

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual(invalidCredentials);
  });

  it("responds with error when passing user credentials", async () => {
    const response = await request(app)
      .post("/admin/login")
      .send({ email: VALID_USER_EMAIL, password: VALID_USER_PASSWORD });

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual(invalidCredentials);
  });

  it("responds with error when email is missing", async () => {
    const response = await request(app)
      .post("/admin/login")
      .send({ email: "", password: VALID_ADMIN_PASSWORD });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("errors");
  });

  it("responds with error when password is missing", async () => {
    const response = await request(app)
      .post("/admin/login")
      .send({ email: VALID_USER_EMAIL, password: "" });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("errors");
  });

  it("responds with error when passing invalid email format", async () => {
    const response = await request(app)
      .post("/admin/login")
      .send({ email: "invalidemailformat", password: VALID_ADMIN_PASSWORD });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("errors");
  });
});

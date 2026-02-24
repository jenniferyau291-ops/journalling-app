import request from "supertest";
import app from "../../src/app.js";
import "../setup.js";  // in-memory MongoDB

describe("POST /api/auth/login", () => {
  test("should login successfully with correct credentials", async () => {
    // First register user
    await request(app).post("/api/auth/register").send({
      username: "loginuser",
      email: "loginuser@test.com",
      password: "password123",
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "loginuser@test.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("should fail with wrong password", async () => {
    await request(app).post("/api/auth/register").send({
      username: "loginuser2",
      email: "loginuser2@test.com",
      password: "password123",
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "loginuser2@test.com",
        password: "wrongpassword",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid/i);
  });
});

import request from "supertest";
import app from "../../src/app.js";

export const createUserAndToken = async () => {
  const res = await request(app)
    .post("/api/auth/register")
    .send({
      username: `user${Date.now()}`,
      email: `user${Date.now()}@test.com`,
      password: "password123",
    });

  return res.body.token;
};

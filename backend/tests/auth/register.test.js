import request from "supertest";
import app from "../../src/app.js";
import "../setup.js";  // in-memory MongoDB


//testing register route successfull path
describe("POST /api/auth/register", () => {
  test("should register a user successfully", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        username: "newuser",
        email: "newuser@test.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(201);
     expect(res.body.message).toBe("registered successful")
    expect(res.body.token).toBeDefined();
    expect(res.body.user.id).toBeDefined();
     expect(res.body.user.username).toBe("newuser");
    expect(res.body.user.email).toBe("newuser@test.com");
  });

  //test register route with same email 

  test("should fail with email already exists", async () => {
    await request(app).post("/api/auth/register").send({
      username: "user1",
      email: "user1@test.com",
      password: "password123",
    });

    const res = await request(app).post("/api/auth/register").send({
      username: "user2",
      email: "user1@test.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch("Email already exists");
  });
});

//test resgister route with same username
test("should fail with username already exists", async () => {
    await request(app).post("/api/auth/register").send({
      username: "user1",
      email: "user1@test.com",
      password: "password123",
    });

    const res = await request(app).post("/api/auth/register").send({
      username: "user1",
      email: "user2@test.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch("Username already exists");
  });


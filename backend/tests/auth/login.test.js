import request from "supertest";
import app from "../../src/app.js";
import "../setup.js";  // in-memory MongoDB



//testing the login route successful path 
describe("POST /api/auth/login", () => {
  test("should login successfully with correct credentials", async () => {
    // First register user
    await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "testuser@test.com",
      password: "password123",
    });
    
    //send the data to login 
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@test.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.message).toBe("Login successful");
    expect(res.body.user.email).toBe("testuser@test.com");
    expect(res.body.user.id).toBeDefined();
  });




  //testing login route with wrong password 
  test("should fail with wrong password", async () => {
    await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "testuser@test.com",
      password: "password123",
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@test.com",
        password: "wrongpassword",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch("Invalid credentials");
  });
});


//testing login route with wrong email 
  test("should fail with wrong email", async () => {
    await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "testuser@test.com",
      password: "password123",
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "wrongtestuser@test.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch("Invalid credentials");
  });

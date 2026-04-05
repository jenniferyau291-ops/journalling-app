import request from "supertest";
import app from "../../src/app.js";
import "../setup.js";
import { createUserAndToken } from "../utils/createUser.js";

describe("GET /api/journals", () => {
  let token;

  beforeEach(async () => {
    token = await createUserAndToken();
  });

  it("gets journals for logged-in user", async () => {
    // Create a journal first
    await request(app)
      .post("/api/journals")
      .set("Authorization", `Bearer ${token}`)
      .send({
  title: "My title",
  content: "My first journal",
  mood: { emoji: "🙂", value: 4 },
});


    // Fetch journals
    const res = await request(app)
      .get("/api/journals")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.journals.length).toBe(1);
  });
});

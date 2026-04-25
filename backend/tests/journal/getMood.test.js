import request from "supertest";
import app from "../../src/app.js";
import "../setup.js";
import { createToken } from "../utils/createUser.js";

describe("GET /api/journals/mood", () => {
  let token;
  

  //get token

  beforeEach(async () => {
   token  = await createToken();
  });
  

  // test get mood successfully 
  it("gets mood from journal for user", async () => {
    // Create a journal first
    await request(app)
      .post("/api/journals")
      .set("Authorization", `Bearer ${token}`)
      .send({
  title: "My title",
  content: "My first journal",
  mood: { emoji: "🙂", value: 4 },
});


    const res = await request(app)
      .get("/api/journals/mood")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body[0].mood.emoji).toBe("🙂");
expect(res.body[0].mood.value).toBe(4);
expect(res.body[0].createdAt).toBeDefined();

  });
});

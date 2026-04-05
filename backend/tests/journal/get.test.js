import request from "supertest";
import app from "../../src/app.js";
import "../setup.js";
import { createToken } from "../utils/createUser.js";

describe("GET /api/journals", () => {
  let token;

  //get token

  beforeEach(async () => {
    token = await createToken();
  });

  // test get journals successfully 
  it("gets journals for user", async () => {
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
      .get("/api/journals")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.journals.length).toBe(1);expect(res.body.journals[0].title).toBe("My title");
    expect(res.body.currentPage).toBe(1);
    expect(res.body.totalJournals).toBe(1);
    expect(res.body.totalPages).toBe(1);
  });
});

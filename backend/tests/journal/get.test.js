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

  //test pagination 

  it("test pagination limit", async () => {
    //create journals
  await request(app)
    .post("/api/journals")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "test1",
      content: "Test",
      mood: { emoji: "🙂", value: 4 },
    });

  await request(app)
    .post("/api/journals")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "test2",
      content: "Test",
      mood: { emoji: "🙂", value: 4 },
    });

  const res = await request(app)
    .get("/api/journals?page=1&limit=1")
    .set("Authorization", `Bearer ${token}`);

  expect(res.body.journals.length).toBe(1);
  expect(res.body.totalJournals).toBe(2);
  expect(res.body.totalPages).toBe(2);
});
});

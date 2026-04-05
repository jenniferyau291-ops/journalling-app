import request from "supertest";
import app from "../../src/app.js";
import "../setup.js";
import { createUserAndToken } from "../utils/createUser.js";

describe("GET /api/journals/:id", () => {
  let token;
  let journalId;
  let otherUserToken;

  beforeEach(async () => {
    // Main user
    token = await createUserAndToken();

    // Another user for forbidden test
    otherUserToken = await createUserAndToken({
      username: "otheruser",
      email: "other@test.com",
    });

    // Create a journal for main user
    const res = await request(app)
      .post("/api/journals")
      .set("Authorization", `Bearer ${token}`)
     .send({
  title: "My title",
  content: "My single journal",
  mood: { emoji: "🙂", value: 4 },
});


    journalId = res.body.journal._id;
  });

  // ✅ Happy path
  it("gets a single journal by ID for the owner", async () => {
    const res = await request(app)
      .get(`/api/journals/${journalId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.journal._id).toBe(journalId);
    expect(res.body.journal.content).toBe("My single journal");
  });

  // ❌ Journal not found (invalid ID)
  it("returns 404 for invalid journal ID", async () => {
    const res = await request(app)
      .get("/api/journals/invalid-id")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Journal not found");
  });

  // ❌ Journal not found (non-existent ID)
  it("returns 404 if journal does not exist", async () => {
    const fakeId = "507f191e810c19729de860ea";
    const res = await request(app)
      .get(`/api/journals/${fakeId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Journal not found");
  });

  // ❌ Forbidden (not owner)
  it("returns 403 if user does not own the journal", async () => {
    const res = await request(app)
      .get(`/api/journals/${journalId}`)
      .set("Authorization", `Bearer ${otherUserToken}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Forbidden");
  });
});

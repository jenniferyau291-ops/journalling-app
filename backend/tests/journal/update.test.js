import request from "supertest";
import app from "../../src/app.js";
import "../setup.js";
import { createUserAndToken } from "../utils/createUser.js";

describe("PATCH /api/journals/:id", () => {
  let token;
  let journalId;

  beforeEach(async () => {
    token = await createUserAndToken();

    // Create a journal first
    const res = await request(app)
      .post("/api/journals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        content: "Original content",
        mood: { emoji: "🙂", value: 3 },
      });

    journalId = res.body.journal._id;
  });

  // HAPPY PATH
  it("updates a journal successfully", async () => {
    const res = await request(app)
      .patch(`/api/journals/${journalId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        content: "Updated content",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Journal updated successfully");
    expect(res.body.journal.content).toBe("Updated content");
  });

  //  UNHAPPY PATHS

  it("fails without token", async () => {
    const res = await request(app)
      .patch(`/api/journals/${journalId}`)
      .send({ content: "No auth" });

    expect(res.statusCode).toBe(401);
  });

  it("fails with invalid journal ID", async () => {
    const res = await request(app)
      .patch("/api/journals/invalid-id")
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "Bad ID" });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Journal not found");
  });

  it("fails if journal does not exist", async () => {
    const fakeId = "507f191e810c19729de860ea";

    const res = await request(app)
      .patch(`/api/journals/${fakeId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "Does not exist" });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Journal not found");
  });

  it("fails when updating with empty content", async () => {
    const res = await request(app)
      .patch(`/api/journals/${journalId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "   " });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Journal content cannot be empty");
  });

  it("fails with invalid mood data", async () => {
    const res = await request(app)
      .patch(`/api/journals/${journalId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        mood: { emoji: "🙂", value: 10 },
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid mood data");
  });

  it("returns 403 if user does not own the journal", async () => {
    const token2 = await createUserAndToken({
      username: "otheruser",
      email: "other@test.com",
    });

    const res = await request(app)
      .patch(`/api/journals/${journalId}`)
      .set("Authorization", `Bearer ${token2}`)
      .send({ content: "Hacked update" });

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Forbidden");
  });
});

import request from "supertest";
import app from "../../src/app.js";
import "../setup.js";
import { createToken } from "../utils/createUser.js";

describe("PATCH /api/journals/:id", () => {
  let token;
  let journalId;
  const fakeId = "8788jn";
  let anotherUser;
  beforeEach(async () => {
    token = await createToken();
    anotherUser = await createToken({
      username: "anotheruser",
      email: "another user@test.com",
    });

    // Create a journal first
    const res = await request(app)
      .post("/api/journals")
      .set("Authorization", `Bearer ${token}`)
      .send({
  title: "My title",
  content: " my journal content",
        mood: { emoji: "🙂", value: 3 },
      });

    journalId = res.body.journal._id;
  });

  // test update jouranl route successfully 
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
  // test failed update journal with invalid id
  it("fails with invalid journal ID", async () => {
    const res = await request(app)
      .patch("/api/journals/invalid-id")
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "Bad ID" });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Journal not found");
  });

  //test failed update journal with journal does not exist
  it("fails with journal does not exist", async () => {
    const res = await request(app)
      .patch(`/api/journals/${fakeId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "Does not exist" });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Journal not found");
  });

  // test failed update journal not the owner 
  it("failed with not the journal owner", async () => {
    const res = await request(app)
      .patch(`/api/journals/${journalId}`)
      .set("Authorization", `Bearer ${anotherUser}`)
      .send({ content: "not the owner" });
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Forbidden");
  });
});

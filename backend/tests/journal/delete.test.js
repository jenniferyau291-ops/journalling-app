import request from "supertest";
import app from "../../src/app.js";
import "../setup.js";
import { createUserAndToken } from "../utils/createUser.js";

describe("DELETE /api/journals/:id", () => {
  let token;
  let journalId;
  let otherUserToken;

  beforeEach(async () => {
    token = await createUserAndToken();
    otherUserToken = await createUserAndToken({
      username: "otheruser",
      email: "other@test.com",
    });

    const res = await request(app)
      .post("/api/journals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        content: "Journal to delete",
        mood: { emoji: "🙂", value: 3 },
      });

    journalId = res.body.journal._id;
  });

  // Happy path
  it("deletes a journal successfully", async () => {
    const res = await request(app)
      .delete(`/api/journals/${journalId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Journal deleted successfully");
  });

  //  Unhappy paths
  it("returns 404 if journal does not exist", async () => {
    const fakeId = "64fbe99999a9999999999999";
    const res = await request(app)
      .delete(`/api/journals/${fakeId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Journal not found");
  });

  it("returns 403 if user is not owner", async () => {
    const res = await request(app)
      .delete(`/api/journals/${journalId}`)
      .set("Authorization", `Bearer ${otherUserToken}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Forbidden");
  });
});

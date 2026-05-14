import request from "supertest";
import app from "../../src/app.js";
import "../setup.js";
import { createUserAndToken } from "../utils/createUser.js";
import User from "../../src/models/User.js";

describe("PATCH /api/users/preferences", () => {
  let token;
  let userId;

  beforeEach(async () => {
    const testUser = await createUserAndToken();
    token = testUser.token;
    userId = testUser.userId;
  });

  // valid update
  it("should update aiSummary and aiPrompts to true", async () => {
    const res = await request(app)
      .patch("/api/users/preferences")
      .set("Authorization", `Bearer ${token}`)
      .send({
        aiSummary: true,
        aiPrompts: true,
      });

    expect(res.status).toBe(200);
    expect(res.body.aiPreferences.aiSummary).toBe(true);
    expect(res.body.aiPreferences.aiPrompts).toBe(true);
  });

  // invalid not boolean eg summary as a number
  it("not bboolean ", async () => {
    const res = await request(app)
      .patch("/api/users/preferences")
      .set("Authorization", `Bearer ${token}`)
      .send({
        aiSummary: 4,
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("ai Summary must be a true or false");
  });
});
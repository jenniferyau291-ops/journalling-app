import request from "supertest";
import app from "../../src/app.js";
import "../setup.js";
import { createUserAndToken } from "../utils/createUser.js";
import User from "../../src/models/User.js";

describe("GET /api/users", () => {
   let token;
let userId;

beforeEach(async () => {
  const testUser = await createUserAndToken();
  token = testUser.token;
  userId = testUser.userId;
});
 // get user details
  it(" should get user information ", async () => {
    const res = await request(app)
      .get("/api/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBeDefined();
    expect(res.body.email).toBeDefined();
    expect(res.body.username).toBeDefined();
    expect(res.body.streakCount).toBeDefined();
  });

  //edge - update streaks when missing a day
  it("should set streak to 0 when user missed a day", async () => {
  const user = await User.findOne(); 
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  twoDaysAgo.setHours(0, 0, 0, 0);

  user.lastJournalDate = twoDaysAgo;
  user.streakCount = 5;
  await user.save();

  const res = await request(app)
    .get("/api/users/me")
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body.streakCount).toBe(0);
});
});

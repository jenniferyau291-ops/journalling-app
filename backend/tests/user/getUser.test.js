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
 it("resets streak to 0 if a day was missed", async () => {
  //get user 
     const user = await User.findById(userId);
     //get current date
    const yesterday = new Date();
    //-2 day so missed a day 
yesterday.setDate(yesterday.getDate() - 2);
yesterday.setHours(0, 0, 0, 0); // normalise for streak logic
//set last journal created as 2 days ago
user.lastJournalDate = yesterday;
user.streakCount = 0;
await user.save();

    const res = await request(app)
      .post("/api/journals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Missed a day",
        content: "Missed entry",
        mood: { emoji: "🙂", value: 4 },
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.streakCount).toBe(0);
  });
});


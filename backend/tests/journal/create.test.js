import request from "supertest";
import app from "../../src/app.js";
import "../setup.js";
import { createUserAndToken } from "../utils/createUser.js";
import User from "../../src/models/User.js";

describe("POST /api/journals", () => {
 let token;
let userId;
// get the user id and token 
beforeEach(async () => {
  const testUser = await createUserAndToken();
  token = testUser.token;
  userId = testUser.userId;
});

//test create journal route successfully
  it("creates a journal successfully", async () => {
    const res = await request(app) 
      .post("/api/journals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "My title",
        content: "My first journal",
        mood: { emoji: "🙂", value: 4 },
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Journal entry created successfully");
    expect(res.body.journal.content).toBe("My first journal");
    expect(res.body.journal.title).toBe("My title");
    expect(res.body.journal.mood.emoji).toBe("🙂");
    expect(res.body.journal.mood.value).toBe(4);
  });

  //test empty content 
  it("fails to crease journal with empty content", async () => {
    const res = await request(app)
      .post("/api/journals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test title",
        content: "",
        mood: { emoji: "🙂", value: 4 },
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Journal content is required");
  });

  //test invalid mood value
  it("fails to create journal with invalid mood value", async () => {
    const res = await request(app)
      .post("/api/journals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test title",
        content: "Bad mood",
        mood: { emoji: "🙂", value: 10 },
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid mood data");
  });


 // test streak 

 //test first journal streaks should be 1 
  it("sets streak to 1 on first journal", async () => {
    const res = await request(app)
      .post("/api/journals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Day 1",
        content: "First entry",
        mood: { emoji: "🙂", value: 4 },
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.streakCount).toBe(1);
  });

  //test streaks should remain 1 if jounralling more than once same day
  it("sets streak to 1 on second journal same day", async () => {
    const res = await request(app)
      .post("/api/journals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Day 1 again",
        content: "Second entry same day",
        mood: { emoji: "🙂", value: 4 },
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.streakCount).toBe(1);
  });

  // testing streaks increase 
it("sets streak to 2 when next day", async () => {
  const user = await User.findById(userId);
  // set date to yesterdays 

  const yesterday = new Date();
  // take date and -1
  yesterday.setDate(yesterday.getDate() - 1);
  //set to midnight
  yesterday.setHours(0, 0, 0, 0);
  //set user last journalling date
  user.lastJournalDate = yesterday;
  user.streakCount = 1;
  await user.save();

  const res = await request(app)
    .post("/api/journals")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "Day 2",
      content: "Second entry next day",
      mood: { emoji: "🙂", value: 4 },
    });

  expect(res.statusCode).toBe(201);
  expect(res.body.streakCount).toBe(2);
});

// streaks reset to 0 if missed a day

  it("resets streak to 0 if a day was missed", async () => {
     const user = await User.findById(userId);

     //create date to be yesterdays
    const yesterday = new Date();
    //take the date and -2 
yesterday.setDate(yesterday.getDate() - 2);
// reset to midnight
yesterday.setHours(0, 0, 0, 0); 
//set user last journalling date
user.lastJournalDate = yesterday;
user.streakCount = 2;
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

  //testing if 0 streaks add 1 on same day after nournalling 
it("corrects streak from 0 to 1 on same day journal", async () => {
  const user = await User.findById(userId);

  user.streakCount = 0;
  user.lastJournalDate = new Date();
  await user.save();

  const res = await request(app)
    .post("/api/journals")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "Same day",
      content: "Same day",
      mood: { emoji: "🙂", value: 4 },
    });

  expect(res.body.streakCount).toBe(1);
});

})


import request from "supertest";
import app from "../../src/app.js";
import "../setup.js";
import { createToken, createUserAndToken } from "../utils/createUser.js";
import Journal from "../../src/models/Journal.js"; 
import mongoose from "mongoose";

describe("GET /api/journals/mood", () => {

let token, userId;

beforeEach(async () => {
  const data = await createUserAndToken();
  token = data.token;   
  userId = data.userId; 
});
//get mood
  it("gets mood from journal for user", async () => {
    // Directly create journals with specific timestamps
    const journal1 = await Journal.create({
      user: new mongoose.Types.ObjectId(userId),
      title: "Journal 1",
      content: "First",
      mood: { emoji: "🙂", value: 5 },
      createdAt: new Date("2026-04-08T12:00:00.000Z"),
      updatedAt: new Date("2026-04-08T12:00:00.000Z")
    });

    const journal2 = await Journal.create({
      user: new mongoose.Types.ObjectId(userId),
      title: "Journal 2",
      content: "Second",
      mood: { emoji: "🙂", value: 5 },
      createdAt: new Date("2026-04-09T12:00:00.000Z"),
      updatedAt: new Date("2026-04-09T12:00:00.000Z")
    });

    const journal3 = await Journal.create({
      user: new mongoose.Types.ObjectId(userId),
      title: "Journal 3",
      content: "Third",
      mood: { emoji: "🙂", value: 4 },
      createdAt: new Date("2026-04-10T12:00:00.000Z"),
      updatedAt: new Date("2026-04-10T12:00:00.000Z")
    });

    // debug
console.log(
  "Journal createdAt values:",
  (
    //got through all the journals from the user and sort
    await Journal.find({ user: new mongoose.Types.ObjectId(userId) }).sort({ createdAt: 1 })
  ).map(j => j.createdAt)
);
    const res = await request(app)
      .get("/api/journals/mood")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1); // only one month
    expect(res.body[0].dailymoodByMonth.length).toBe(3); // 3 days

    //store april month data 
    const month = res.body[0];

    //checking first day april 8th
    const day1 = month.dailymoodByMonth[0];
    expect(day1.day).toBe(8); 
    expect(day1.moods[0].emoji).toBe("🙂");
    expect(day1.moods[0].value).toBe(5);
    expect(day1.moods[0].date).toContain("2026-04-08");

    // checking second day April 9
    const day2 = month.dailymoodByMonth[1];
    expect(day2.day).toBe(9);
    expect(day2.moods[0].value).toBe(5);
    expect(day2.moods[0].date).toContain("2026-04-09");

    // checking third day April 10
    const day3 = month.dailymoodByMonth[2];
    expect(day3.day).toBe(10);
    expect(day3.moods[0].value).toBe(4);
    expect(day3.moods[0].date).toContain("2026-04-10");
  });
});
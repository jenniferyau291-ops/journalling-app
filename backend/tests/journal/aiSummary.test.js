import request from "supertest";
import app from "../../src/app.js";
import "../setup.js";
import { createUserAndToken } from "../utils/createUser.js";
import User from "../../src/models/User.js";
import { aiSummaryGenerator } from "../../src/services/aiSummary.js";

//mock the ai summary generator 
jest.mock("../../src/services/aiSummary.js", () => ({
  aiSummaryGenerator: jest.fn().mockResolvedValue("mock"),
}));

describe("POST /api/journals - AI summary", () => {
  let token;
  let userId;

  beforeEach(async () => {
    const user = await createUserAndToken();
    token = user.token;
    userId = user.userId;
  });

  //test for ai summary when turned on 
  it("testing ai summary when turned on ", async () => {
    const user = await User.findById(userId);
    //set summary as true 
    user.aiPreferences.aiSummary = true;
    await user.save();
    const res = await request(app)
      .post("/api/journals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "AI summary turned on",
        content: "good",
        mood: { emoji: "🙂", value: 5 },
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.journal.summary).toBe("mock");
  });

  // test ai summaer when not turned on - should be underdefined as skipped
  it("testing ai summary when turned off ", async () => {
    const user = await User.findById(userId);
    user.aiPreferences.aiSummary = false;
    await user.save();

    const res = await request(app)
      .post("/api/journals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "AI summary turned off",
        content: "good",
        mood: { emoji: "🙂", value: 5 },
      });
      //still created the journal
    expect(res.statusCode).toBe(201);
    expect(res.body.journal.summary).toBeUndefined();

  });

   // test empty journal 
  it("testing ai summary when empty journa;l ", async () => {
    const user = await User.findById(userId);

    user.aiPreferences.aiSummary = true;
    
    await user.save();

    const res = await request(app)
      .post("/api/journals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "",
        content: "good",
        mood: { emoji: "🙂", value: 5 },
      });

  expect(res.statusCode).toBe(400);
  expect(res.body.message).toBe("Journal title is required");

  });

  // system failure

  it("testing AI failure", async () => {
   const user = await User.findById(userId);
    user.aiPreferences.aiSummary = true;
    await user.save();

    //mock error message
    aiSummaryGenerator.mockRejectedValue(new Error("AI failed"));

  const res = await request(app)
    .post("/api/journals")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "journl",
      content: "good",
      mood: { emoji: "🙂", value: 5 },
    });

  expect(res.statusCode).toBe(201);
  expect(res.body.journal).toBeDefined();
  expect(res.body.journal.summary).toBeUndefined();
});
})
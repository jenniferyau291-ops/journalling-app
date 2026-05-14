
import request from "supertest";
import app from "../../src/app.js";
import "../setup.js";
import { createUserAndToken } from "../utils/createUser.js";
import User from "../../src/models/User.js";
import { aiGenerator } from "../../src/services/aiprompt.js";

//mock the ai generator

jest.mock("../../src/services/aiprompt.js", () => ({
  aiGenerator: jest.fn(),
}));


describe("POST /api/ai/aiGenerate", () => {
  let token;
  let userId;

  beforeEach(async () => {
    const user = await createUserAndToken();
    token = user.token;
    userId = user.userId;
  });

  //preference turned on 

  it("test AI prompts when preference is turned on ", async () => {
    const user = await User.findById(userId);
    user.aiPreferences.aiPrompts = true;
    await user.save();

    aiGenerator.mockResolvedValue("mock prompts");

    //const res = await request(app)
     // .post("/api/ai/generate")
     // .set("Authorization", `Bearer ${token}`);

      const res = await request(app)
  .post("/api/ai/aiGenerate")
  .set("Authorization", `Bearer ${token}`);
  //debug
       console.log("Satus:", res.status);
      console.log("response:", res.body);

    expect(res.body.description).toBe("mock prompts");
  
  });

  //turned off 
  it("test AI prompts when preference is turned off ", async () => {
    const user = await User.findById(userId);
    user.aiPreferences.aiPrompts = false;
    await user.save();

      const res = await request(app)
  .post("/api/ai/aiGenerate")
  .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(403);
  expect(res.body.error).toBe("AI prompts are disabled");
  
  });

  //testing AI failing 
  it("testing AI failure", async () => {
  const user = await User.findById(userId);
  user.aiPreferences.aiPrompts = true;
  await user.save();

  aiGenerator.mockRejectedValue(new Error("fail"));

  const res = await request(app)
    .post("/api/ai/aiGenerate")
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(500);
  expect(res.body.error).toBe("Failed to generate prompts");
});


})

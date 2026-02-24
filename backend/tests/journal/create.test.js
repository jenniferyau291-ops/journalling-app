import request from "supertest";
import app from "../../src/app.js";
import "../setup.js";
import { createUserAndToken } from "../utils/createUser.js";

describe("POST /api/journals", () => {
  let token;

  beforeEach(async () => {
    token = await createUserAndToken();
  });

  it("creates a journal successfully", async () => {
  const res = await request(app)
    .post("/api/journals")
    .set("Authorization", `Bearer ${token}`)
    .send({
      content: "My first journal",
      mood: { emoji: "🙂", value: 4 },
    });

  expect(res.statusCode).toBe(201);
  expect(res.body.message).toBe("Journal entry created successfully");
  expect(res.body.journal.content).toBe("My first journal");
});

it("fails with empty content", async () => {
  const res = await request(app)
    .post("/api/journals")
    .set("Authorization", `Bearer ${token}`)
    .send({
      content: "",
      mood: { emoji: "🙂", value: 4 },
    });

  expect(res.statusCode).toBe(400);
  expect(res.body.message).toBe("Journal content is required");
});

it("fails with invalid mood value", async () => {
  const res = await request(app)
    .post("/api/journals")
    .set("Authorization", `Bearer ${token}`)
    .send({
      content: "Bad mood",
      mood: { emoji: "🙂", value: 10 },
    });

  expect(res.statusCode).toBe(400);
  expect(res.body.message).toBe("Invalid mood data");
})});

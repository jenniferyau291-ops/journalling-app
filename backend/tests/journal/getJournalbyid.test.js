import request from "supertest";
import app from "../../src/app.js";
import "../setup.js";
import { createToken } from "../utils/createUser.js";

describe("GET /api/journals/:id", () => {
  let token;
  let journalId;
  let anotherUser;
    const fakeInvalidId = "dfsdfs";

  //get token

  beforeEach(async () => {
    token = await createToken();


    anotherUser = await createToken({
      username: "anotheruser",
      email: "another@test.com",
    });

    // Create a journal 
    const res = await request(app)
      .post("/api/journals")
      .set("Authorization", `Bearer ${token}`)
     .send({
  title: "My title",
  content: "My journal",
  mood: { emoji: "🙂", value: 4 },
});


    journalId = res.body.journal._id;
  });

  // test for getting journal route for by journal id 
  it("gets journal by journal ID", async () => {
    const res = await request(app)
      .get(`/api/journals/${journalId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.journal._id).toBe(journalId);
    expect(res.body.journal.content).toBe("My journal");
    expect(res.body.journal.title).toBe("My title");
expect(res.body.journal.mood.emoji).toBe("🙂");
expect(res.body.journal.mood.value).toBe(4);
expect(res.body.journal.user._id).toBeDefined();
  });



  // test failed get journal when does not exist 
  it("failed to get journal when does not exist", async () => {
    const res = await request(app)
      .get(`/api/journals/${fakeInvalidId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Journal not found");
  });

  //test failed get journal not the owner
  it("failed to get journal if not owner", async () => {
    const res = await request(app)
      .get(`/api/journals/${journalId}`)
      .set("Authorization", `Bearer ${anotherUser}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Forbidden");
  });
});

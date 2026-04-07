import request from "supertest";
import app from "../../src/app.js";
import "../setup.js";
import { createToken } from "../utils/createUser.js";

describe("DELETE /api/journals/:id", () => {
  let token;
  let journalId;
  let anotherUser;

  // get token

  beforeEach(async () => {
    token = await createToken();
     anotherUser = await createToken({
      username: "anotheruser",
      email: "anotheruser@test.com",
    });

    //created journal and get the id for testing
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

  // test delete successfully 

  it("deletes a journal successfully", async () => {
    const res = await request(app)
      .delete(`/api/journals/${journalId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Journal deleted successfully");
  });

  //  test failed delete wrong journal id 
  it("failed if journal does not exist", async () => {
    const fakeId = "64fbe9767f12345678912345";
    const res = await request(app)
      .delete(`/api/journals/${fakeId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Journal not found");
  });

  // test failed delete if not the user 
  it("failed if user is not the journal owner", async () => {
    const res = await request(app)
      .delete(`/api/journals/${journalId}`)
      .set("Authorization", `Bearer ${anotherUser}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Forbidden");
  });
});

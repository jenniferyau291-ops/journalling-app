import request from "supertest";
import app from "../../src/app.js";



// create test user and returninging token and user id 
export const createUserAndToken = async () => {
  const res = await request(app)
    .post("/api/auth/register")
    //sends data 
    .send({
      // everytime this runs sends new data 
      username: `user${Date.now()}`,
      email: `user${Date.now()}@test.com`,
      password: "password123",
      
    });
     

  return {
    token: res.body.token,
    userId: res.body.user.id,
  };

};


//create token and returns it 
export const createToken = async () => {
  const res = await request(app)
    .post("/api/auth/register")
    .send({
      username: `user${Date.now()}`,
      email: `user${Date.now()}@test.com`,
      password: "password123",

    });

  return res.body.token;
};
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

process.env.JWT_SECRET = "testsecret";


let mongo;


//before each test - creates temp in memory mongodb and connecting to mongoose
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

//after each test to clear the db - grabbing all collections and deleting 

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

//close connection and stop the in memory server

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

import express from "express";
import authRoutes from "./routes/authRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();
console.log(" loaded");

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/users", userRoutes);
//debug
console.log("au route:", aiRoutes);
app.use("/api/ai", aiRoutes); 

console.log("AI route done");


export default app;   // export for testing

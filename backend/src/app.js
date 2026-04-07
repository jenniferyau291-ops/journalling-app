import express from "express";
import authRoutes from "./routes/authRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import userRoutes from "./routes/userRoutes.js";


const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/users", userRoutes);



export default app;   // export for testing

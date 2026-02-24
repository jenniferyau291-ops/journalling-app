import express from "express";
import authRoutes from "./routes/authRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/journals", journalRoutes);

export default app;   // ✅ Export for tests

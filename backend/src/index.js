import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./lib/db.js";
//import job from "./lib/cron.js"; // optional

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});

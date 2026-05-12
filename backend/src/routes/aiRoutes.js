
console.log("route executed");


import express from "express";
import { aiGenerate } from "../controllers/aiGeneratorController.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/aiGenerate", protectRoute, aiGenerate);
//debug
//router.post("/aiGenerate", (req, res) => {
 // console.log("hitting route");
  ////res.json({ ok: true });
//});


export default router;

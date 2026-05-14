import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import {
  getCurrentUser,
  updatePreferences
} from "../controllers/userController.js";

const router = express.Router();

router.get("/me", protectRoute, getCurrentUser);
router.patch("/preferences", protectRoute, updatePreferences);


export default router;

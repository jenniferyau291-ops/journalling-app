import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import {
  getCurrentUser
} from "../controllers/userController.js";

const router = express.Router();

router.get("/me", protectRoute, getCurrentUser);



export default router;

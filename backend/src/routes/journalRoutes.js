import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import {
  createJournal,
  getJournals,
  deleteJournal,
  updateJournal,
} from "../controllers/journalController.js";

const router = express.Router();

router.post("/", protectRoute, createJournal);
router.get("/", protectRoute, getJournals);
router.delete("/:id", protectRoute, deleteJournal);
router.patch("/:id", protectRoute, updateJournal);

export default router;

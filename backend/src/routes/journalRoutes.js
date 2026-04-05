import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import {
  createJournal,
  getJournals,
  deleteJournal,
  updateJournal,
  getJournalById
} from "../controllers/journalController.js";

const router = express.Router();

router.post("/", protectRoute, createJournal);
router.get("/", protectRoute, getJournals);
router.delete("/:id", protectRoute, deleteJournal);
router.patch("/:id", protectRoute, updateJournal);
router.get("/:id", protectRoute, getJournalById);


export default router;

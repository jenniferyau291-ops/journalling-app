import Journal from "../models/Journal.js";
import mongoose from "mongoose";

/**
 * CREATE journal
 */
export const createJournal = async (req, res) => {
  try {
    const { title, content, mood } = req.body;

     if (!title || !title.trim()) {
      return res.status(400).json({ message: "Journal title is required" });
    }

    if (!content) {
      return res.status(400).json({ message: "Journal content is required" });
    }

    if (
      !mood ||
      !mood.emoji ||
      typeof mood.value !== "number" ||
      mood.value < 1 ||
      mood.value > 5
    ) {
      return res.status(400).json({ message: "Invalid mood data" });
    }

    const newJournal = new Journal({
      title,
      content,
      mood: {
        emoji: mood.emoji,
        value: mood.value,
      },
      user: req.user._id,
    });

    await newJournal.save();

    res.status(201).json({
      message: "Journal entry created successfully",
      journal: newJournal,
    });
  } catch (error) {
    console.error("Error creating journal:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * GET journals (pagination / infinite loading)
 */
export const getJournals = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const journals = await Journal.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username");

    const totalJournals = await Journal.countDocuments({
      user: req.user._id,
    });

    res.status(200).json({
      journals,
      currentPage: page,
      totalJournals,
      totalPages: Math.ceil(totalJournals / limit),
    });
  } catch (error) {
    console.log("Error in get all journals", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * DELETE journal
 */
export const deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    if (journal.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await journal.deleteOne();

    res.status(200).json({ message: "Journal deleted successfully" });
  } catch (error) {
    console.log("Error deleting journal", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * UPDATE journal
 */
export const updateJournal = async (req, res) => {
  try {
    const { title, content, mood } = req.body;

    // ✅ Check if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Journal not found" });
    }
    const journal = await Journal.findById(req.params.id);
    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    if (journal.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (title !== undefined) {
  if (!title.trim()) {
    return res.status(400).json({ message: "Journal title cannot be empty" });
  }
  journal.title = title;
}

    if (content !== undefined) {
      if (!content.trim()) {
        return res
          .status(400)
          .json({ message: "Journal content cannot be empty" });
      }
      journal.content = content;
    }

    if (mood !== undefined) {
      if (
        !mood.emoji ||
        typeof mood.value !== "number" ||
        mood.value < 1 ||
        mood.value > 5
      ) {
        return res.status(400).json({ message: "Invalid mood data" });
      }
      journal.mood = mood;
    }

    await journal.save();

    res.status(200).json({
      message: "Journal updated successfully",
      journal,
    });
  } catch (error) {
    console.error("Error updating journal:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  
};
/**
 * GET single journal
 */
export const getJournalById = async (req, res) => {
  try {
    // ✅ Validate ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Journal not found" });
    }

    const journal = await Journal.findById(req.params.id)
      .populate("user", "username");

    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    // 🔒 Make sure user owns this journal
    if (journal.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.status(200).json({ journal });
  } catch (error) {
    console.log("Error getting journal", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


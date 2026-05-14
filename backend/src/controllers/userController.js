
import User from "../models/User.js";
import mongoose from "mongoose";
import { differenceInCalendarDays } from "date-fns";

// GET user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); 
    if (!user) return res.status(404).json({ message: "User not found" });

    // Calculate streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streakCount = user.streakCount || 0;

    if (user.lastJournalDate) {
      const lastJournalDate = new Date(user.lastJournalDate);
      lastJournalDate.setHours(0, 0, 0, 0);

      const dayDifference = differenceInCalendarDays(today, lastJournalDate);

      if (dayDifference > 1) {
        streakCount = 0; // missed a day then reset streak
      }
    }

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      streakCount,
      lastJournalDate: user.lastJournalDate,
      aiPreferences: user.aiPreferences
    });
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePreferences = async (req, res) => {
  try {
    const userId = req.user._id;

    const { aiSummary, aiPrompts } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // check and update
    if (aiSummary !== undefined) {
      if (typeof aiSummary !== "boolean") {
        return res.status(400).json({
          message: "ai Summary must be a true or false",
        });
      }
      user.aiPreferences.aiSummary = aiSummary;
    }

    // check and update
    if (aiPrompts !== undefined) {
      if (typeof aiPrompts !== "boolean") {
        return res.status(400).json({
          message: "ai Prompts must be a true or false",
        });
      }
      user.aiPreferences.aiPrompts = aiPrompts;
    }

    await user.save();

    res.status(200).json({
      message: "Preferences updated",
      aiPreferences: user.aiPreferences,
    });
  } catch (error) {
    console.error("Error updating preferences:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
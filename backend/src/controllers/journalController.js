import Journal from "../models/Journal.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import { format, differenceInCalendarDays, addDays } from "date-fns";
import { aiSummaryGenerator } from "../services/aiSummary.js";


/**
 * CREATE journal
 */
export const createJournal = async (req, res) => {
  
  try {
    const { title, content, mood } = req.body;
    //debug
  console.log("create journal hit:", new Date().toISOString());

    // Validation
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Journal title is required" });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Journal content is required" });
    }
    if (!mood || !mood.emoji || typeof mood.value !== "number" || mood.value < 1 || mood.value > 5) {
      return res.status(400).json({ message: "Invalid mood data" });
    }

    const userId = req.user._id;

    //get user id
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
//debug
    console.log("debug start");
console.log("user:", user._id);
console.log("lastJournalDate:", user.lastJournalDate);
console.log("streakCount (before):", user.streakCount);



    // Create journal
    const newJournal = new Journal({
      title,
      content,
      mood: { emoji: mood.emoji, value: mood.value },
      user: userId,
    });
    await newJournal.save();

    // check if ai summary is set to true and call the method and get the summary and save it to db

    try {
  if (user.aiPreferences.aiSummary === true) {
    const summary = await aiSummaryGenerator(newJournal);
    newJournal.summary = summary;
    await newJournal.save();
  }
} catch (error) {
  console.error("AI summary failed:", error);
}
    // Update streak
    //set date as today
    const today = new Date();
    //set to midnight to remove hours
    today.setHours(0, 0, 0, 0);

    //get last journal date and set to midnight

    let lastJournalDate = user.lastJournalDate ? new Date(user.lastJournalDate) : null;
    if (lastJournalDate) lastJournalDate.setHours(0, 0, 0, 0);

    //debug
    console.log("today (normalise):", today);
console.log("lastJournalDate (normalised):", lastJournalDate);

    let newStreak = user.streakCount || 0;

       if (!lastJournalDate) {
      // First ever journal
      newStreak = 1;
    } else {
      //get the difference between last journal date and currrent date 
      const dayDifference = differenceInCalendarDays(today, lastJournalDate);
      if (newStreak === 0) {
  newStreak = 1;
} else
      if (dayDifference === 1) {
        newStreak += 1; // consecutive day
      } else if (dayDifference > 1) {
        newStreak = 0; // missed days
      } 
    }


    console.log("new streak:", newStreak);
    console.log("newStreak (before save):", newStreak);



    user.lastJournalDate = today;
    user.streakCount = newStreak;
    await user.save();

    console.log("saved to db:", {
  streakCount: user.streakCount,
  lastJournalDate: user.lastJournalDate
});

    // Send response
    res.status(201).json({
      message: "Journal entry created successfully",
      journal: newJournal,
      streakCount: newStreak,
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
    // read page number 
    const page = Number(req.query.page) || 1;
    //show how many on a page
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    //get journal from the user 
    const journals = await Journal.find({ user: req.user._id })
      .sort({ createdAt: -1 }) // sort newest first 
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

     if (!journal.user._id.equals( req.user._id)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await journal.deleteOne();

    res.status(200).json({ message: "Journal deleted successfully" });
  } catch (error) {
    console.log("Error deleting journal", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//update journal
export const updateJournal = async (req, res) => {
  try {
    const { title, content, mood } = req.body;
   //get the id from url
    const {id} = req.params
    //check if if is valid in mongodb and if not return invalid message
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Journal not found" });
    }
    // get journal by the id

    const journal = await Journal.findById(id);
    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    if (!journal.user._id.equals( req.user._id)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    //check if user put new title and if it is empty

    if (title !== undefined) {
  if (!title.trim()) {
    return res.status(400).json({ message: "title cannot be empty" });
  }
  journal.title = title;
}
//check if user put new journalling content and if it is empty 
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
// get journal by id 
export const getJournalById = async (req, res) => {
  try {
    //get the id from url
    const {id} = req.params
    //check if if is valid in mongodb and if not return invalid message
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Journal not found" });
    }
    // get journal by id and the owner id and username
    const journal = await Journal.findById(id).populate("user", "username");

    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    if (!journal.user._id.equals( req.user._id)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.status(200).json({ journal });
  } catch (error) {
    console.log("Error getting journal", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


/**
 * GET moods 
 */
export const getMood = async (req, res) => {
  try {
    //get the data from the journal
    const moodsByMonth = await Journal.aggregate([
      { $match: { user: req.user._id } }, //get the data for specific user 

      // normalise to midnight 
      {
        $addFields: {
          day: {
            //cut off the time part of the date - so only the date and no timestamp just 00:00
            $dateTrunc: {
              date: "$createdAt",
              unit: "day"
            }
          }
        }
      },

      // each day group of mood
      {
        $group: {
          _id: "$day",
          //mood array and get the data to put in the array
          moods: {
            $push: {
              emoji: "$mood.emoji",
              value: "$mood.value",
              date: "$createdAt"
            }
          }
        }
      },

      { $sort: { _id: 1 } },

      // group by month and year from previous
      {
        $group: {
          _id: {
            year: { $year: "$_id" },
            month: { $month: "$_id" }
          },
          //array for days in month
          dailymoodByMonth: {
            $push: {
              day: { $dayOfMonth: "$_id" },
              moods: "$moods",
              date: "$_id"
            }
          }
        }
      },

      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    return res.status(200).json(moodsByMonth);

  } catch (error) {
    console.log("Error in get all moods", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

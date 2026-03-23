import mongoose from "mongoose";


const journalSchema = new mongoose.Schema(

{
  title:{
    type: String,
    required: true
  },
  content:{
    type: String,
    required: true
  },

 mood: {
      emoji: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
    },
user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
},
{ timestamps: true }

);

const Journal = mongoose.model("Journal", journalSchema);

export default Journal;
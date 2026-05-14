import mongoose from "mongoose";

const PromptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    content: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const AIPrompt = mongoose.model("AIPrompt", PromptSchema);

export default AIPrompt;
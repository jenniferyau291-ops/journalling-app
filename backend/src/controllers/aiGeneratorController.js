import User from "../models/User.js";
import AIPrompt from "../models/Prompt.js"
import { aiGenerator } from "../services/aiprompt.js";


export const aiGenerate = async (req, res) => {
  
  try {

    //debug
    console.log("in controller");
  console.log("middleware:", req.user);

     const userId = req.user._id;
     //debug
     console.log("getting user:", userId);

     //find the user

        const user = await User.findById(userId);
       //if no user then error
        if (!user) {
  return res.status(404).json({ error: "User not found" });
        }

  // check if ai prompts exist 

  if (!user.aiPreferences.aiPrompts) {
  return res.status(403).json({
    error: "AI prompts are disabled"
  });
}

// false then disabled 
     if (user.aiPreferences.aiPrompts === false) {
      return res.status(403).json({
        error: "AI prompts are disabled"
      });
    }

    console.log("about to call aiGenerator");

    // pass the user and call aiGenerator and get results
    const result = await aiGenerator(userId);

    // save the prompts to db

     await AIPrompt.create({
      user: userId,
      content: result
    });
    //debug 
    console.log("result in controller", result);
    //display results 
    const prompts = result.split("\n");

res.json({ description: prompts });

  } catch (error) {
  console.error("AI Error:", error);

  res.status(500).json({
    error: "Failed to generate prompts"
  });
}
}
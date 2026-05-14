import openai from "../lib/ai.js";
import { buildaijournalPrompts } from "./prompt/prompts.js";
import Journal from "../models/Journal.js"

 export const aiGenerator = async (userId) => {

  //get jorunals from last 3 days for user and  sort them to newest only get summary mood and createdat
  const lastJournals = await Journal.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(3)
    .select("summary mood createdAt")

    // pass the last journals to the function to get the prompts 

  const prompt = buildaijournalPrompts(lastJournals);

  //send prompt to ai 
  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      { role: "user", content: prompt }
    ],
  });

  //return response
  return response.choices[0].message.content;
};
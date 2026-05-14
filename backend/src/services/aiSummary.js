
import { summariseJournal } from "./prompt/summariseJournal.js";
import openai from "../lib/ai.js"


//input journal 
export const aiSummaryGenerator = async (journal) => {
  if (!journal) return null;



  try {
    //call the method and send the journal and get the prompt 
    const prompt = summariseJournal(journal);

    //send the prompt to ai 
    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [{ role: "user", content: prompt }],
    });

    //return response
    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI Error:", error);
    return null;
  }
};
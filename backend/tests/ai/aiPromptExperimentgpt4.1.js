
import openai from "../../src/lib/ai.js";
const themes = [
  "relationships",
  "stress",
  "habits",
  "creativity",
  "self-esteem",
  "daily reflection",
  "future goals",
  "gratitues",
  "challenges"
];
//randomise to get random theme
const getRandomItem = (themes) =>
  //randon number x the length and then round down for index 
  themes[Math.floor(Math.random() * themes.length)];

const randomTheme = getRandomItem(themes);

//tests
const mockUser1 = {
  mood:{ emoji:"😄",
    value:5
  },
  journal: "I had a really good day today. I felt productive at work and enjoyed spending time with people I care about. I'm feeling grateful for the small things that went well.",
};

const mockUser4 = {
  mood:{
    emoji:"😞",
    value:1
  },
  journal: "I felt overwhelmed at work and couldn't focus properly.",
};

const mockUser7 = {
 mood: {
    emoji: "😐",
    value: 3
  },
  journal: "Today was fairly normal. Nothing particularly good or bad happened. I went through my usual routine and didn't feel very emotional either way.",
};

//negative mood and positive journal
const mockUser5 = {
   mood:{
    emoji:"😞",
    value:1
  },
  journal: "I had a really good day today. I felt productive at work and enjoyed spending time with people I care about. I'm feeling grateful for the small things that went well.",
};

//positive mood and negative journal 

const mockUser2= {
 mood:{ emoji:"😄",
    value:5
  },
  journal: "I felt overwhelmed at work and couldn't focus properly.",
};

//testing no mood 

const mockuser11 = {
  journal: "I felt overwhelmed at work"
};

//testing no journal 
const mockuser12 = {
mood: { emoji: "😞", value: 1 }
};

//testing both no journal and mood 
const Mockuser13 = {};

const mockUser17 = {
  mood: [
    { emoji: "😄", value: 5,  date: "2026-05-01" },
    { emoji: "😞", value: 1, date: "2026-05-01"}
  ],

  journal: [
  { text: "I started the day feeling great and focused.", date: "2026-05-01" },
  { text: "Yesterday Things got a bit overwhelming later on.", date: "2026-05-03" }
]
};

const tests = {
multipleDatesConstraints: (theme, user = {}) => {
  //if user exist get the values
  const mood = user?.mood;
  const journal = user?.journal;
//check if its array if not wrap it in array
  const moodArray = Array.isArray(mood) ? mood : mood ? [mood] : [];
const journalArray = Array.isArray(journal) ? journal : journal ? [journal] : [];

let moodEntry ="";
//go through loop to get each mood
if (moodArray.length > 0) {
      for (let i = 0; i < moodArray.length; i++) {
        const m = moodArray[i];
        //check date and mood
        moodEntry += m.date
          ? `(${m.date}) ${m.emoji} (score: ${m.value}/5)\n`
          : `${m.emoji} (score: ${m.value}/5)\n`;
      }
    } else {
      moodEntry = "Not provided";
    }
    let journalEntry = "";
    //go through loop to get all journals
    if (journalArray.length > 0) {
      for (let i = 0; i < journalArray.length; i++) {
        const j = journalArray[i];
        //get date and journal
        journalEntry += j.date
          ? `(${j.date}) ${j.text || j}\n`
          : `${j.text || j}\n`;
      }
    } else {
      journalEntry = "Not provided";
    }

  return `
Generate 3 short journalling prompts for a user.

User mood: ${moodEntry}

Recent journal: ${journalEntry}

Instruction:
Base all prompts primarily on the user's recent journal entries. The prompts should reflect or relate to what the user wrote.
the user may provide multiple mood entries and multiple journals entries. 
Treat the dates as the timeline of when each journal entry occurred and use them to interpret emotional changes over time.
Do not repeat or mention specific dates in the output. Use dates only for understanding order and progression.
Refer to time only in relative terms such as "earlier", "later", or "recently".


Use all mood entries collectively to determine emotional tone.
Use the user's mood to guide emotional tone:
positive mood then  more energetic and uplifting
negative mood then  more gentle and supportive
neutral mood then balanced and reflective
if there is no mood then neutral 

If relevant, you may incorporate the theme "${theme}" to help to create the prompt, but do not force it if it does not naturally fit the journal.
if no journal provided use the theme to provide the prompt 

Requirements:
Each prompt must be 1-2 sentences, friendly, fun, reflective tone
Add positive and encouraging comments where appropriate
Do vary the writing styles
Do not repeat ideas, themes, or sentence structures
Do not always start with the same pattern
Each prompt must be clearly different in focus
Do not suggest drawing, doodling, or any physical or external activities

`;
}
};


const run = async () => {
  try {
    const prompt = tests.multipleDatesConstraints(randomTheme, mockUser17);
    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        { role: "user", content: prompt }
      ],
    });

    console.log("Prompt:", prompt);
    console.log("output:", response.choices[0].message.content);
    console.log("gpt4.1")

  } catch (error) {
    console.error("AI Test Error:", error);
  }
};

run();

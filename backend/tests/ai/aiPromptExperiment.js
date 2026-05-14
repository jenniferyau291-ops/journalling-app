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
const getRandomItem = (themes) =>
  themes[Math.floor(Math.random() * themes.length)];

const randomTheme = getRandomItem(themes);

const tests = {

  // basic  test - check if it works 
  basic: "Generate 3 journalling prompts for user",

  //tests for the length of prompts 
  short: "Generate 3 short journalling prompts for user. Keep each 1-2 sentences.",
  long: "Generate 3 detailed journalling prompts for user. Each should be 4-6 sentences.",

  //tone 
  reflective: "Generate 3 short journalling prompts for user. Keep each 1-2 sentences. Make it in a reflective tone",
  motivational: "Generate 3 short journalling prompts for user. Keep each 1-2 sentences. Make it in a motivational tone",
  reflectiveAndMotivation : "Generate 3 short journalling prompts for user. Keep each 1-2 sentences. Make it in a reflective tone, where it is appropraite add a postive and encouraging comment",
  professional: "Generate 3 short journalling prompts for user. Keep each 1-2 sentences. Make it in a reflective tone, where it is appropraite add a postive and encouraging comment. Make it more professional tone",
  friendly: "Generate 3 short journalling prompts for user. Keep each 1-2 sentences. Make it in a friendly and fun reflective tone, where it is appropraite add a postive and encouraging comment",

//maaking sure no repeat of themes
noRepeat: "Generate 3 short journalling prompts for user. Keep each 1-2 sentences. Make it in a friendly and fun reflective tone, where it is appropraite add a postive and encouraging comment. no repeat of prompts",
noRepeatFix: "Generate 3 short journalling prompts for user. Requirements: Each prompt must be 1–2 sentences,  friendly, fun, reflective tone, Add positive and encouraging comments where appropriate. Structure: Emotional reflection, Scenario-based, Future-oriented Rules: Do not repeat ideas, themes, or sentence structures. Each prompt must be clearly different in focus.",

//adding random theme and writing styles
addingThemes: (theme) => `Generate 3 short journalling prompts for a user. Requirements: Each prompt must be 1-2 sentences, friendly, fun, reflective tone. Add positive and encouraging comments where appropriate. Structure: Emotional reflection, Scenario-based, Future-oriented. Rules: Do not repeat ideas, themes, or sentence structures. Each prompt must be clearly different in focus. Theme to use: ${theme}`,
addingThemesandwrtingStyles: (theme) => `Generate 3 short journalling prompts for a user. Requirements: Each prompt must be 1-2 sentences, friendly, fun, reflective tone. Add positive and encouraging comments where appropriate. Structure: Emotional reflection, Scenario-based, Future-oriented. Do vary the writing styles Rules: Do not repeat ideas, themes, or sentence structures. Do not always start with same pattern  Each prompt must be clearly different in focus. Theme to use: ${theme}`,
nostructure:  (theme) => `Generate 3 short journalling prompts for a user. Requirements: Each prompt must be 1-2 sentences, friendly, fun, reflective tone. Add positive and encouraging comments where appropriate Do vary the writing styles. Rules: Do not repeat ideas, themes, or sentence structures. Do not always start with same pattern  Each prompt must be clearly different in focus. Theme to use: ${theme}`,

//adding journal and mood to see what output 
addedJournalandMood:  (theme, user) => `
Generate 3 short journalling prompts for a user.
User mood: ${user.mood.emoji} (score: ${user.mood.value}/5)
Recent journal: ${user.journal}
Use the user's mood and recent journal as context to guide the tone and focus of the prompts. Requirements: Each prompt must be 1-2 sentences, friendly, fun, reflective tone. Add positive and encouraging comments where appropriate Do vary the writing styles. 
Rules: Do not repeat ideas, themes, or sentence structures. Do not always start with same pattern  Each prompt must be clearly different in focus. Theme to use: ${theme}`,

addedJournalandMoodagain:  (theme, user) => `
Generate 3 short journalling prompts for a user.
User mood: ${user.mood.emoji} (score: ${user.mood.value}/5)
Recent journal: ${user.journal}
Use the user's mood and recent journal as context to guide the tone and focus of the prompts. Requirements: Each prompt must be 1-2 sentences, friendly, fun, reflective tone. Add positive and encouraging comments where appropriate Do vary the writing styles. 
Rules: Do not repeat ideas, themes, or sentence structures. Do not always start with same pattern  Each prompt must be clearly different in focus. Theme to use: ${theme}`,

//making sure prompts relevant to journal and mood
addedJournalandMoodfixed: (theme, user) => `
Generate 3 short journalling prompts for a user.
User mood: ${user.mood.emoji} (score: ${user.mood.value}/5)
Recent journal: ${user.journal}
Instruction:
Base all prompts primarily on the user's recent journal. The prompts should reflect or relate to what the user wrote.

Use the user's mood to guide emotional tone:
positive mood then  more energetic and uplifting
negative mood then  more gentle and supportive
neutral mood then balanced and reflective

If relevant, you may incorporate the theme "${theme}" to help to create the prompt, but do not force it if it does not naturally fit the journal.

Requirements:
Each prompt must be 1-2 sentences, friendly, fun, reflective tone
Add positive and encouraging comments where appropriate
Do vary the writing styles
Do not repeat ideas, themes, or sentence structures
Do not always start with the same pattern
Each prompt must be clearly different in focus
`,
//taking in account missing mood 
noMoodandJournal: (theme, user) => `
Generate 3 short journalling prompts for a user.

User mood: ${user.mood.emoji} (score: ${user.mood.value}/5)
Recent journal: ${user.journal}

Instruction:
Base all prompts primarily on the user's recent journal. The prompts should reflect or relate to what the user wrote.

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
`,

//handle missing data
noMoodandJournaldata: (theme, user = {}) => {
  const mood = user?.mood;
  const journal = user?.journal;

  return `
Generate 3 short journalling prompts for a user.

User mood: ${
  mood ? `${mood.emoji} (score: ${mood.value}/5)` : "Not provided"
}
Recent journal: ${journal || "Not provided"}

Instruction:
Base all prompts primarily on the user's recent journal. The prompts should reflect or relate to what the user wrote.

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
`;
},

//adding constraints for non-writing activites and mutiple moods and journals
multiple: (theme, user = {}) => {
  const mood = user?.mood;
  const journal = user?.journal;

  let moodEntry = ""

  if (mood) {
  for (let i = 0; i < mood.length; i++) {
    moodEntry +=`${mood[i].emoji} (score: ${mood[i].value}/5)\n`;
    }
  } else {
    moodEntry = "Not provided";
  }

  let journalEntry = "";

if (journal) {
  for (let i = 0; i < journal.length; i++) {
    journalEntry += journal[i] + "\n";
  }
} else {
  journalEntry = "Not provided";
}
  return `
Generate 3 short journalling prompts for a user.

User mood: ${moodEntry}
}

Recent journal: ${journalEntry}

Instruction:
Base all prompts primarily on the user's recent journal entries. The prompts should reflect or relate to what the user wrote.

The user may provide multiple mood entries and multiple journal entries.
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
},
 // take account of dates
multipleDates: (theme, user = {}) => {
  const mood = user?.mood;
  const journal = user?.journal;

  let moodEntry = ""

  if (mood) {
  for (let i = 0; i < mood.length; i++) {
    moodEntry +=`(${mood[i].date}) ${mood[i].emoji} (score: ${mood[i].value}/5)\n`;
    }
  } else {
    moodEntry = "Not provided";
  }

  let journalEntry = "";

if (journal) {
  for (let i = 0; i < journal.length; i++) {
    journalEntry += `(${journal[i].date}) ${journal[i].text}\n`;
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
},
// dates constraints
multipleDatesConstraints: (theme, user = {}) => {
  const mood = user?.mood;
  const journal = user?.journal;
  let moodEntry = ""
  if (mood) {
  for (let i = 0; i < mood.length; i++) {
    moodEntry +=`(${mood[i].date}) ${mood[i].emoji} (score: ${mood[i].value}/5)\n`;
    }
  } else {
    moodEntry = "Not provided";
  }
  let journalEntry = "";

if (journal) {
  for (let i = 0; i < journal.length; i++) {
    journalEntry += `(${journal[i].date}) ${journal[i].text}\n`;
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

const mockUser1 = {
  mood:{ emoji:"😄",
    value:5
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

//positive mood and neutral journal 

const mockUser3 = {
  mood:{ emoji:"😄",
    value:5
  },
  journal: "Today was fairly normal. Nothing particularly good or bad happened. I went through my usual routine and didn't feel very emotional either way",
};

//negative mood and negative journal

const mockUser4 = {
  mood:{
    emoji:"😞",
    value:1
  },
  journal: "I felt overwhelmed at work and couldn't focus properly.",
};

//negative mood and positive journal
const mockUser5 = {
   mood:{
    emoji:"😞",
    value:1
  },
  journal: "I had a really good day today. I felt productive at work and enjoyed spending time with people I care about. I'm feeling grateful for the small things that went well.",
};

//negative mood and neutral journal 
const mockUser6 = {
  mood:{
    emoji:"😞",
    value:1
  },
  journal: "Today was fairly normal. Nothing particularly good or bad happened. I went through my usual routine and didn't feel very emotional either way",
};

//neutral mood and neutral journal 

const mockUser7 = {
 mood: {
    emoji: "😐",
    value: 3
  },
  journal: "Today was fairly normal. Nothing particularly good or bad happened. I went through my usual routine and didn't feel very emotional either way.",
};
//neutral mood and positive journal 
const mockUser8 = {
  mood: {
    emoji: "😐",
    value: 3

  },
  journal: "I had a really good day today. I felt productive at work and enjoyed spending time with people I care about. I'm feeling grateful for the small things that went well.",
};

//neutral mood and negative journal 
const mockUser9 = {
  mood: {
    emoji: "😐",
    value: 3

  },
  journal: "I felt overwhelmed at work and couldn't focus properly.",
};

//testing postive mood and journal again
const mockUser10 = {
  mood: {
    emoji: "😄",
    value: 5
  },
  journal: "I spent the day organising my room and cleaning up my workspace. It felt really satisfying to get everything in order and I feel more focused now."
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

//multiple journals and mood
const mockUser14 = {
  mood: [
    { emoji: "😄", value: 5 },
    { emoji: "😞", value: 1}
  ],

  journal: [
    "I started the day feeling great and focused.",
    "Things got a bit overwhelming later on."
  ]
};

const mockUser15 = {
  mood: [
    { emoji: "😄", value: 5 },
    { emoji: "😞", value: 1}
  ],

  journal: [
    "I started the day feeling great and focused at work.",
    "yesterday things got a bit overwhelming and tiring."
  ]
};

const mockUser16 = {
  mood: [
    { emoji: "😄", value: 5,  date: "2026-05-01" },
    { emoji: "😞", value: 1, date: "2026-05-01"}
  ],

  journal: [
  { text: "I started the day feeling great and focused.", date: "2026-05-01" },
  { text: "Things got a bit overwhelming later on.", date: "2026-05-03" }
],

};
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

const run = async () => {
  try {
    const prompt = tests.multipleDatesConstraints(randomTheme, mockUser17);
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: prompt }
      ],
    });

    console.log("Prompt:", prompt);
    console.log("output:", response.choices[0].message.content);

  } catch (error) {
    console.error("AI Test Error:", error);
  }
};

run();



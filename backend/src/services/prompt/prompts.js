

//get random themes 
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



// input journals

export const buildaijournalPrompts = (journal = []) => {
   const journalArray = journal || [];


  let moodEntry = "";
  let journalEntry = "";

  //go thorugh each journal 

  if (journalArray.length > 0 && journalArray[0]) {
    for (let i = 0; i < journalArray.length; i++) {
      const journal = journalArray[i];

      //get the date
      const date = journal.createdAt;

      //get the mood 

      const mood = journal.mood
        ? `${journal.mood.emoji} (score: ${journal.mood.value}/5)`
        : "Not provided";

        //get summary 
      const summary = journal.summary;

    

      moodEntry += `(${date}) ${mood}\n`;
      journalEntry += `(${date}) ${summary}\n`;
    }
  } else {
    moodEntry = "Not provided"; //handling empty
    journalEntry = "Not provided"; // handling empty
  }

  
  const finalTheme =  getRandomItem(themes);


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

If relevant, you may incorporate the theme "${finalTheme}" to help to create the prompt, but do not force it if it does not naturally fit the journal.
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
};


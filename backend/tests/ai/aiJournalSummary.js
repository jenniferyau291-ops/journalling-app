

import openai from "../../src/lib/ai.js";



//neg neg

const journal= {
    mood: { emoji: "😞", value: 1},
    journal:
      "Work was a bit overwhelming today. I had multiple tasks coming in at once and struggled to focus at times"
  }

//postive and postive 
const journal1 ={
     mood:{ emoji:"😄",
    value:5
  },
  journal: "I had a really good day today. I spent time with friends and felt relaxed for once. It was nice break from stress"
};


// negative and negative
const journal2 = {
  mood:{
    emoji:"😞",
    value:1
  },
  journal: "I've been feeling anxious about my coursework deadline. I keep overthinking everything and feel like I am falling behind even though I've started working on it"
};

//neutral and neutral
const journal3 = {
 mood: {
    emoji: "😐",
    value: 3
  },
  journal: "Today was fairly normal. Nothing particularly good or bad happened. I went through my usual routine and didn't feel very emotional either way."
  
};

//postive and negative
const journal4= {
 mood:{ emoji:"😄",
    value:5
  },
  journal: "I felt overwhelmed at work and couldn't focus properly.",
};

//negative and postive
const journal5 = {
   mood:{
    emoji:"😞",
    value:1
  },
  journal: "I had a really good day today. I felt productive at work and enjoyed spending time with people I care about. I'm feeling grateful for the small things that went well."
};


//null edge case 
const journal6 = {
   mood:{
    emoji:"😞",
    value:1
  },
  journal: "ok"

};

  const journal7 ={
    mood: { emoji: "😐", value: 3 },
    journal:
      "Today was fairly normal. I went through my usual routine lectures, lunch, and some studying. Nothing particularly good or bad happened, just an ordinary day that passed without much emotional impact."
  };

  //snesitive journal
  const journal8 = {
   mood:{
    emoji:"😞",
    value:1
  },
  journal: "I don't feel safe at home and I'm constantly anxious."
  };
  const journal9 = {
   mood:{
    emoji:"😞",
    value:1
  },
  journal: "I've been feeling extremely overwhelmed and like I can't cope with anything lately."
  };
  
  const journal10 = {
   mood:{
    emoji:"😞",
    value:1
  },
  journal: " I feel like I don't want to be here anymore and nothing feels worth it."
  };
 


const tests = {

  //
  baseline:  (journal) => `
User mood: ${journal.mood.emoji} (score: ${journal.mood.value}/5)
Recent journal: ${journal.journal}

Instruction:
summarise a user journal entry in 1-2 sentences
use the provided mood as the primary signal for emotional tone
`,



//one journal
SummariseOneJournal: (journal) => `
User mood: ${journal.mood.emoji} (score: ${journal.mood.value}/5)
Recent journal: ${journal.journal}

Instruction:
summarise a user journal entry in 1-2 sentences
use the provided mood as the primary signal for emotional tone

Rules
be neutral and factual
do not add information not presented in the journal
do not invent details or events

`,
//senstive topic 
SummariseJournal: (journal) => `
User mood: ${journal.mood.emoji} (score: ${journal.mood.value}/5)
Recent journal: ${journal.journal}

Instruction:
summarise a user journal entry in 1-2 sentences
use the provided mood as the primary signal for emotional tone
if the journal contains sensitive or distressing content, summarise it neutrally without offering advice, reassurance, or additional interpretation

Rules
be neutral and factual
do not add information not presented in the journal
do not invent details or events


`,


}



// run test
const run = async () => {
  try {
    const prompt = tests.SummariseJournal(journal8);

    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [{ role: "user", content: prompt }],
    });

    console.log("Prompt:\n", prompt);
    console.log("Output:\n", response.choices[0].message.content);

  } catch (error) {
    console.error("AI Test Error:", error);
  }
};

run();
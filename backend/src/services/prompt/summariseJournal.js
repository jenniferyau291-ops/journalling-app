

//input journal 
export const summariseJournal = (journal) => `
User mood: ${journal.mood.emoji} (score: ${journal.mood.value}/5)
Recent journal: ${journal.content}

Instruction:
Summarise a user journal entry in 1-2 sentences.
Use the provided mood as the primary signal for emotional tone.
if the journal contains sensitive or distressing content, summarise it neutrally without offering advice, reassurance, or additional interpretation

Rules:
Be neutral and factual
Do not add information not presented in the journal
 Do not invent details or events
`;
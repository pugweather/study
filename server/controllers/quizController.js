import { OpenAI } from "openai/client.js";
import { getDBConnection } from "../db/db";
import { verifyDeckOwnership } from "../services/deckServices";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

// type = fill-in-the-bank | use-in-sentence | multiple-choice
export async function generateQuiz(req, res) {
    try {

        const { deckId } = req.params
        const { type, numQuestions } = req.body
        const isDeckOwner = await verifyDeckOwnership(deckId, req.session.userId)
        if (!isDeckOwner) {
            return res.status(403).json({error: "Deck doesn't exist or user doesn't own this deck"})
        }

        const db = await getDBConnection()
        const cards = await db.all("SELECT term, answer FROM cards WHERE deck_id = ?", [deckId])
        if (cards.length === 0) {
            return res.status(400).json({error: "No cards to generate quiz from"})
        }

        if (!type || !numQuestions) {
            return res.status(400).json({"Quiz configurations required"})
        }

        let prompt = ""
        if (type === "multiple-choice") {
            prompt = `Using ONLY these flashcards as the source material: ${JSON.stringify(cards)}.
            Generate ${numQuestions} multiple choice questions. Each question should have 4 options where only one is correct.
            Return ONLY valid JSON (no markdown), in this format:
            [{"question": "...", "options": ["A", "B", "C", "D"], "correctAnswer": "A"}]`
        } else if (type === "fill-blank") {
            prompt = `Using ONLY these flashcards: ${JSON.stringify(cards)}.
            Generate ${numQuestions} fill-in-the-blank questions. Take the answer and replace the key term with "____".
            Return ONLY valid JSON:
            [{"question": "...", "answer": "..."}]`
        } else if (type === "use-in-sentence") {
            prompt = `Using ONLY these flashcards: ${JSON.stringify(cards)}.
            Generate ${numQuestions} "use in a sentence" prompts. For each, give the term and what a correct usage looks like.
            Return ONLY valid JSON:
            [{"term": "...", "exampleCorrectUsage": "..."}]`
        } else {
            return res.status(400).json({error: "Invalid quiz type"})
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: prompt}],
            response_format: {type: "json_object"}
        })

        const questions = JSON.parse(response.choices[0].message_content)
        return res.json({questions})

    } catch(err) {
        return res.status(500).json({error: "Server error"})
    }
}
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
        const isDeckOwner = await verifyDeckOwnership(deckId, req.session.userId)
        if (!isDeckOwner) {
            return res.status(403).json({error: "Deck doesn't exist or user doesn't own this deck"})
        }

    } catch(err) {
        return res.status(500).json({error: "Server error"})
    }
}
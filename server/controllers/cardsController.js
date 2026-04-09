import { getDBConnection } from "../db/db.js";

export async function getDeckCards(req, res) {
    try {

        const db = await getDBConnection()

        const { deckId } = req.params
        const cards = await db.all('SELECT * FROM cards c JOIN decks d ON c.deck_id = d.id WHERE d.user_id = ? AND c.deck_id = ?', [req.session.userId, deckId])

        return res.json(cards)

    } catch(err) {
        return res.status(500).json({error: "Server error"})
    }
}
import { getDBConnection } from "../db/db.js";
import { verifyDeckOwnership } from "../services/deckServices.js";

export async function getDeckCards(req, res) {
    try {

        const db = await getDBConnection()

        const { deckId } = req.params
        const cards = await db.all('SELECT c.id, c.term, c.answer, c.deck_id FROM cards c JOIN decks d ON c.deck_id = d.id WHERE d.user_id = ? AND c.deck_id = ?', [req.session.userId, deckId])

        return res.json(cards)

    } catch(err) {
        return res.status(500).json({error: "Server error"})
    }
}
export async function deleteCard(req, res) {
    try {
        const db = await getDBConnection()
        const { deckId, cardId } = req.params
        console.log("deckid + cardid, ", deckId, cardId)
        const isDeckOwner = await verifyDeckOwnership(deckId, req.session.userId)
        if (!isDeckOwner) {
            return res.status(403).json({error: "Deck doesn't exist or user doesn't own this deck"})
        }
        
        const result = await db.run("DELETE FROM cards WHERE id = ?", [cardId])
        if (result.changes === 0) {
            return res.status(404).json({error: "Card not found"})
        }

        return res.json({message: "Card deleted from deck"})

    } catch(err) {
        return res.status(500).json({error: "Server error"})
    }
}
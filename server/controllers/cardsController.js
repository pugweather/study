import { verify } from "node:crypto";
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

export async function updateCard(req, res) {
    try {

        const { deckId, cardId } = req.params
        const { term, answer } = req.body
        const isDeckOwner = await verifyDeckOwnership(deckId, req.session.userId)
        if (!isDeckOwner) {
            return res.status(403).json({error: "Deck doesn't exist or user doesn't own this deck"})
        }

        const db = await getDBConnection()

        const result = await db.run('UPDATE cards SET term = ?, answer = ? WHERE id = ?', [term, answer, cardId])
        if (result.changes === 0) {
            return res.status(404).json({error: "Card not found"})
        }

        return res.json({message: "Card updated"})

    } catch(err) {
        return res.status(500).json({error: "Server error"})
    }
}

export async function addCard(req, res) {
    try {
        const db = await getDBConnection()
        const {deckId} = req.params
        const isDeckOwner = await verifyDeckOwnership(deckId, req.session.userId)
        
        if (!isDeckOwner) {
            return res.status(403).json({error: "Deck doesn't exist or user doesn't own this deck"})
        }

        const {term, answer} = req.body
        const result = await db.run(`INSERT INTO cards (term, answer, deck_id) VALUES (?, ?, ?)`, [term, answer, deckId])

        return res.status(201).json({
            id: result.lastID,
            term: term,
            answer: answer,
            deck_id: deckId
        })

    } catch(err) {
        return res.status(500).json({error: "Server error"})
    }
}
import { getDBConnection } from "../db/db.js";
import { verifyDeckOwnership } from "../services/deckServices.js";

export async function getDecks(req, res) {
    try {
        const db = await getDBConnection()

        const decks = await db.all('SELECT d.*, COUNT(c.id) as card_count FROM decks d LEFT JOIN cards c ON c.deck_id = d.id WHERE d.user_id = ? GROUP BY d.id', [req.session.userId])

        return res.json(decks)

    } catch(err) {
        res.status(500).json({error: "Server error"})
    }
}

export async function getDeckById(req, res) {
    try {

        const db = await getDBConnection()

        const deckId = req.params.deckId
        const deck = await db.get("SELECT * from decks WHERE user_id = ? AND id = ?", [req.session.userId, deckId])

        if (!deck) {
            return res.status(404).json({error: `Deck with id ${deckId} not found`})
        }
        
        return res.json(deck)
        
    } catch(err) {
        return res.status(500).json({error: "Server error"})
    }   
}

export async function addDeck(req, res) {
    try {

        const db = await getDBConnection()

        const { title } = req.body
        const result = await db.run('INSERT INTO decks (title, user_id) VALUES (?, ?)', [title, req.session.userId])

        const newDeck = {
            id: result.lastID,
            title: title,
            user_id: req.session.userId
        }

        return res.status(201).json(newDeck)

    } catch(err) {
        res.status(500).json({error: "Server error"})
    }
}

export async function updateDeck(req, res) {
    try {
        const db = await getDBConnection()

        const { deckId } = req.params
        const { title } = req.body
        const isDeckOwner = await verifyDeckOwnership(deckId, req.session.userId)
        if (!isDeckOwner) {
            return res.status(403).status({error: "Deck doesn't exist or user doesn't own this deck"})
        }
        const result = await db.run("UPDATE decks SET title = ? WHERE id = ?", [title, deckId])
        if (result.changes === 0) {
            return res.status(404).status({error: "Deck not found"})
        }
        return res.json({message: "Deck updated"})

    } catch(err) {
        res.status(500).json({error: "Server error"})
    }
}

export async function deleteDeck(req, res) {
    try {

        const db = await getDBConnection()

        const { deckId } = req.params

        const isDeckOwner = await verifyDeckOwnership(deckId, req.session.userId)
        if (!isDeckOwner) {
            return res.status(403).json({error: "Deck doesn't exist or user doesn't own this deck"})
        }

        const result = await db.run('DELETE FROM decks WHERE id = ?', [deckId])
        if (result.changes === 0) {
            return res.status(404).json({error: "Deck not found"})
        }

        return res.json({message: "Deck deleted"})

    } catch(err) {
        return res.status(500).json({error: "Server error"})
    }
}
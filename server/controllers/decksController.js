import { getDBConnection } from "../db/db.js";

export async function getDecks(req, res) {
    try {
        const db = await getDBConnection()

        const decks = await db.all('SELECT * from decks WHERE user_id = ?', [req.session.userId])

        return res.json(decks)

    } catch(err) {
        res.status(500).json({error: "Server error"})
    }
}

export async function addDeck(req, res) {
    try {

        const db = await getDBConnection()

        const {title} = req.body
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
import { getDBConnection } from "../db/db";

export async function getDecks(req, res) {
    try {
        const db = await getDBConnection()

        if (!req.session.userId) {
            return res.status(400).json({error: "Can't get deck: no active sesion"})
        }

        const decks = await db('SELECT * from decks WHERE user_id = ?', [req.session.userId])

        return res.json(decks)

    } catch(err) {
        res.status(500).json({error: "Server error"})
    }
}
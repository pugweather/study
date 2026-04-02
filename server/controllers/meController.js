import { getDBConnection } from "../db/db.js"

export async function getCurrentUser(req, res) {

    try {

        if (!req.session.userId) {
            return res.status(400).json({error: "no session found"})
        }

        const db = await getDBConnection()

        const user = await db.get(`SELECT name from users WHERE id = ?`, [req.session.userId])

        res.json({isLoggedIn: true, name: user.name})

    } catch(err) {
        console.error("getUserError: " + err.message)
        res.status(500).json({error: "Internal server error"})
    }

}
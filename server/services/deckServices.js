import { getDBConnection } from "../db/db";

export async function verifyDeckOwnership(deckId, userId) {

    const db = await getDBConnection()
    const deck = await db.get('SELECT id FROM decks WHERE id = ? AND user_id = ?', [deckId, userId])
    return deck !== undefined
}
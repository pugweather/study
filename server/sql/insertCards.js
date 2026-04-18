import { getDBConnection } from "../db/db.js"

// Helper for inserting cards. Might generalize this in case we want to insert items into other tables
async function insertCards() {

    const db = await getDBConnection()

    const cards = [
        { id: 1, term: 'Photosynthesis', answer: 'The process by which plants convert light energy into chemical energy', deck_id: 2 },
        { id: 2, term: 'Mitochondria', answer: 'The powerhouse of the cell, responsible for producing ATP', deck_id: 2 },
        { id: 3, term: 'DNA', answer: 'Deoxyribonucleic acid, the molecule that carries genetic information', deck_id: 2 },
        { id: 4, term: 'Cell Membrane', answer: 'A protective barrier that controls what enters and exits the cell', deck_id: 2 },
        { id: 5, term: 'Ribosome', answer: 'Cellular structure responsible for protein synthesis', deck_id: 2 }
    ]

    for (const card of cards) {
        const { term, answer, deck_id } = card
        await db.run(`INSERT INTO cards (term, answer, deck_id) VALUES (?, ?, ?)`, [term, answer, deck_id])
    }
}

insertCards()

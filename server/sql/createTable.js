import { getDBConnection } from "../db/db.js"

async function createTable() {

    const db = await getDBConnection()

    // await db.exec(`CREATE TABLE users (
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     name TEXT,
    //     username TEXT UNIQUE NOT NULL,
    //     email TEXT UNIQUE NOT NULL,
    //     password TEXT NOT NULL,
    //     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    // )`)

    await db.exec(`CREATE TABLE decks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`)

    await db.exec(`CREATE TABLE cards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        term TEXT NOT NULL,
        answer TEXT NOT NULL,
        deck_id INTEGER NOT NULL,
        FOREIGN KEY (deck_id) REFERENCES decks(id)
    )`)

    await db.close()
} 

createTable()
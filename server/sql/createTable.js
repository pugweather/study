import { getDBConnection } from "../db/db.js"

async function createTable() {

    const db = await getDBConnection()

    await db.exec(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`)

    await db.close()
} 

createTable()
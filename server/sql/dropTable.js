import { getDBConnection } from "../db/db.js";

async function dropTable(tableName) {

    const db = await getDBConnection()

    await db.exec(`DROP TABLE IF EXISTS ${tableName}`)

    await db.close()

    console.log(`table ${tableName} dropped`)

}

dropTable("users")
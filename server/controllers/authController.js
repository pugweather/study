import { isValidName, isValidEmail, isValidPassword, isValidUsername, startsAndEndsWithAlphanumeric } from '../../src/utils/utils.js'
import { getDBConnection } from '../db/db.js'
import bcrypt from 'bcrypt'

export async function registerUser(req, res) {

    const {name, username, email, password} = req.body

    if (!username || !email || !password) {
        return res.status(400).json({error: "username, email, and password are required"})
    }

    // Name validation (optional field)
    if (name && (name.length < 3 || name.length > 50)) {
        return res.status(400).json({error: "name must be between 3 and 50 characters"})
    } else if (name && !isValidName(name)) {
        return res.status(400).json({error: "name must only contain valid characters (A-Z, hyphens, and spaces)"})
    }

    // Username validation
    if (username.length < 3 || username.length > 20) {
        return res.status(400).json({error: "username must be between 3 and 20 characters"})
    } else if (!isValidUsername(username)) {
        return res.status(400).json({error: "username must only contain letters, numbers, hyphens, and underscores"})
    } else if (!startsAndEndsWithAlphanumeric(username)) {
        return res.status(400).json({error: "username must begin and end with either a letter or number"})
    }

    // Email validation
    if (!isValidEmail(email)) {
        return res.status(400).json({error: "please enter a valid email"})
    }

    // Password validation
    if (password.length < 8) {
        return res.status(400).json({error: "password must be at least 8 characters"})
    } else if (!isValidPassword(password)) {
        return res.status(400).json({error: "password must contain at least one letter and one number"})
    }

    try {
        
        const db = await getDBConnection()

        const existing = await db.get('SELECT id FROM users WHERE username = ? OR email = ?', [username, email])

        if (existing) {
            return res.status(400).json({error: "email or username already taken"})
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const result = await db.run(`INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)`, [name, username, email, hashedPassword])
            req.session.userId = result.lastID
            res.status(201).json({message: 'User registered'})
        }

    } catch(err) {
        console.log("Registration error: ", err.message)
        res.status(500).json({message: 'Error registering user'})
    }
}
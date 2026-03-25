import express from 'express'
import session from 'express-session'
import cors from 'cors'
import { authRouter } from './routes/auth.js'
import 'dotenv/config'

const app = express()

const PORT = 8000

app.listen(PORT, function() {
    console.log("Connected to server :)")
}).on('error', (err) => {
    console.log("Error connecting to server: ", err)
}) 

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  }
}))

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRouter)
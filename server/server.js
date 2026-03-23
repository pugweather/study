import express from 'express'
import { authRouter } from './routes/auth'

const app = express()

const PORT = 8000

app.listen(PORT, function() {
    console.log("Connected to server :)")
}).on('error', (err) => {
    console.log("Error connecting to server: ", err)
}) 

app.use(express.json())

app.use("/api/auth", authRouter)
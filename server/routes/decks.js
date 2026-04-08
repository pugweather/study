import express from 'express'
import { requireAuth } from '../middleware/auth.js'
import { addDeck, getDecks, getDeckById } from '../controllers/decksController.js'

export const decksRouter = express.Router()

decksRouter.use(requireAuth)
decksRouter.get('/', getDecks)
decksRouter.get('/:deckId', getDeckById)
decksRouter.post('/', addDeck)
import express from 'express'
import { requireAuth } from '../middleware/auth.js'
import { addDeck, getDecks, getDeckById } from '../controllers/decksController.js'
import { getDeckCards } from '../controllers/cardsController.js'

export const decksRouter = express.Router()

// Decks
decksRouter.use(requireAuth)
decksRouter.get('/', getDecks)
decksRouter.get('/:deckId', getDeckById)
decksRouter.post('/', addDeck)

// Cards
decksRouter.get('/:deckId/cards', getDeckCards)
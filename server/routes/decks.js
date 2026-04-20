import express from 'express'
import { requireAuth } from '../middleware/auth.js'
import { addDeck, getDecks, getDeckById, deleteDeck, updateDeck } from '../controllers/decksController.js'
import { getDeckCards, deleteCard, addCard, updateCard } from '../controllers/cardsController.js'

export const decksRouter = express.Router()

// Decks
decksRouter.use(requireAuth)

decksRouter.get('/', getDecks)
decksRouter.get('/:deckId', getDeckById)
decksRouter.post('/', addDeck)
decksRouter.put('/:deckId', updateDeck)
decksRouter.delete('/:deckId', deleteDeck)

// Cards
decksRouter.get('/:deckId/cards', getDeckCards)
decksRouter.post('/:deckId/cards', addCard)
decksRouter.put('/:deckId/cards/:cardId', updateCard)
decksRouter.delete('/:deckId/cards/:cardId', deleteCard)
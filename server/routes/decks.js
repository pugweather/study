import express from 'express'
import { requireAuth } from '../middleware/auth'

const decksRouter = express.Router()

decksRouter.use(requireAuth)
decksRouter.get('/', getDecks)
decksRouter.post('/')
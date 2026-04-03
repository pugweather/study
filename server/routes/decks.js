import express from 'express'

const decksRouter = express.Router()

decksRouter.get('/', getDecks)
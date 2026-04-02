import express from 'express'
import { registerUser, loginUser } from '../controllers/authController.js'
import { getCurrentUser } from '../controllers/meController.js'

export const authRouter = express.Router()

authRouter.post('/signup', registerUser)
authRouter.post('/login', loginUser)
authRouter.get('/me', getCurrentUser)
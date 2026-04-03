import express from 'express'
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js'
import { getCurrentUser } from '../controllers/meController.js'

export const authRouter = express.Router()

authRouter.post('/signup', registerUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', logoutUser)
authRouter.get('/me', getCurrentUser)
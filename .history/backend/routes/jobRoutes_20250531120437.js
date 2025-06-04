import express from 'express'
import { editUser, getUser, login, signup } from '../controllers/userController.js'
import { authUser } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/signup', )

export default router
import express from 'express'
import { editUser, getUser, login, signup } from '../controllers/userController.js'
import { authUser } from '../middleware/authMiddleware.js'
import { createJob } from '../controllers/jobController.js'

const router = express.Router()

router.post('/', createJob)

export default router
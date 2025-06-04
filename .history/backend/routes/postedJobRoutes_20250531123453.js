import express from 'express'
import { editUser, getUser, login, signup } from '../controllers/userController.js'
import { authUser } from '../middleware/authMiddleware.js'
import { postJob } from '../controllers/postedJobController.js'

const router = express.Router()

router.post('/', postJob)
router.post('/login', login)
router.patch('/:id', authUser, editUser)
router.get('/', authUser, getUser)

export default router
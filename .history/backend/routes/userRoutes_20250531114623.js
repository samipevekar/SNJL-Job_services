import express from 'express'
import { editUser, getUser, login, signup } from '../controllers/userController'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.patch('/:id', editUser)
router.get('/:id', getUser)

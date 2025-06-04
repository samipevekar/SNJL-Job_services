import express from 'express'
import { editUser, login, signup } from '../controllers/userController'

const router = express.Router()

router.post('/', signup)
router.post('/login', login)
router.patch('/edit/:id', editUser)
router.delete('/')

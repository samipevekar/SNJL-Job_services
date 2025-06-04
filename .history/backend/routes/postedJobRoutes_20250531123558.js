import express from 'express'
import { editUser, getUser, login, signup } from '../controllers/userController.js'
import { authUser } from '../middleware/authMiddleware.js'
import { editPostedJob, getAllPostedJobs, getRecruiterPostedJobs, postJob } from '../controllers/postedJobController.js'

const router = express.Router()

router.post('/', postJob)
router.get('/recruiter',authUser, getRecruiterPostedJobs)
router.patch('/:id', authUser, editPostedJob)
router.get('/', getAllPostedJobs)

export default router
import express from 'express'
import { createJob, getAllJobs } from '../controllers/jobController.js'

const router = express.Router()

router.post('/', createJob)
router.post('/', getAllJobs)

export default router
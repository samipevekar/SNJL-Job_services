import express from 'express'
import { connectToMongo } from './lib/db.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 4000

connectToMongo()


app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`)) 
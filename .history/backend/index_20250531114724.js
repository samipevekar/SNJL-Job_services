import express from 'express'
import { connectToMongo } from './lib/db.js'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 4000

connectToMongo()

app.use('')


app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`)) 
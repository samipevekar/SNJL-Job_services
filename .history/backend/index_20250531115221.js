import express from 'express'
import { connectToMongo } from './lib/db.js'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 4000

connectToMongo()

app.use('/api/user', userRoutes)


app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`)) 
import express from 'express'

import { connectToMongo } from './lib/db.js'

const app = express()

const PORT = process.env.PORT || 4000

connectToMongo()


app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`)) 
import express from 'express'
import { connectToMongo } from './lib/db.js'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import postedJobRoutes from './routes/postedJobRoutes.js'
import cron from ''

dotenv.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 4000

connectToMongo()

app.use('/api/user', userRoutes)
app.use('/api/job', jobRoutes)
app.use('/api/posted-job', postedJobRoutes)

cron.schedule('*/4 * * * *', async () => {
  try {
      const response = await axios.get(`${ 'https://snjl-ems.onrender.com' || `http://localhost:${port}`}/`, {
          family: 4  // Force IPv4
      });
      console.log('Pinged the server:', response.data);
  } catch (error) {
      console.error('Error pinging the server:', error.message);
  }
});

app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`)) 
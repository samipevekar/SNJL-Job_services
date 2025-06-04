import { configureStore } from 'npm install @reduxjs/toolkit react-redux
'
import authSlice from '../slice/authSlice'
import postedJobsSlice from '../slice/postedJobSlice'
import jobSlice from '../slice/jobSlice'

export const store = configureStore({
    reducer:{
        auth: authSlice,
        postedJobs: postedJobsSlice,
        jobs: jobSlice
    }
})
import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slice/authSlice'
import postedJobsSlice from '../slice/postedJobSlice'
import jobSlice from '../'

export const store = configureStore({
    reducer:{
        auth: authSlice,
        postedJobs: postedJobsSlice,
        jobs: 
    }
})
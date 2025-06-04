import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slice/authSlice'
import postedJobsSlice form '../slice/postedJobSlice'

export const store = configureStore({
    reducer:{
        auth: authSlice
        postedJobs: postedJobsSlice
    }
})
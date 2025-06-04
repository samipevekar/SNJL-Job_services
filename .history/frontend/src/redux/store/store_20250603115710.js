import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slice/authSlice'
import posted

export const store = configureStore({
    reducer:{
        auth: authSlice
        postedJobs:
    }
})
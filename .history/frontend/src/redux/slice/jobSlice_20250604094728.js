
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosinstance";

// Initial State
const initialState = {
  jobs: [],
  loading: false,
  error: null,
  successMessage: null,
};


// Get all jobs (with optional status filter)
export const getAllJobsAsync = createAsyncThunk(
  "/getAllJobs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/job');
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.error || "Fetch failed");
    }
  }
);

// Slice
const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    clearJobError: (state) => {
      state.error = null;
    },
    clearJobSuccess: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all jobs
      .addCase(getAllJobsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllJobsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(getAllJobsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearJobError, clearJobSuccess } = jobSlice.actions;

export const selectJobs = (state) => state.jobs.jobs;
export const selectJobLoading = (state) => state.jobs.loading;
export const selectJobError = (state) => state.jobs.error;
export const selectJobSuccess = (state) => state.jobs.successMessage;

export default jobSlice.reducer;

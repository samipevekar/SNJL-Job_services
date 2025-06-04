
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
  "posted-job/getAllJobs",
  async (, { rejectWithValue }) => {
    try {
      const url = status ? `/posted-job?status=${status}` : "/posted-job";
      const res = await axiosInstance.get(url);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Fetch failed");
    }
  }
);

// Slice
const postedJobSlice = createSlice({
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
      // Post job
      .addCase(postJobAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postJobAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.jobs.unshift(action.payload.job);
      })
      .addCase(postJobAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit job
      .addCase(editJobAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editJobAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.jobs = state.jobs.map(job =>
          job._id === action.payload.job._id ? action.payload.job : job
        );
      })
      .addCase(editJobAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get recruiter jobs
      .addCase(getRecruiterJobsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecruiterJobsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(getRecruiterJobsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

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

export const { clearJobError, clearJobSuccess } = postedJobSlice.actions;

export const selectJobs = (state) => state.postedJobs.jobs;
export const selectJobLoading = (state) => state.postedJobs.loading;
export const selectJobError = (state) => state.postedJobs.error;
export const selectJobSuccess = (state) => state.postedJobs.successMessage;

export default postedJobSlice.reducer;

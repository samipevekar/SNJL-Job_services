
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosinstance";

// Initial State
const initialState = {
  jobs: [],
  loading: false,
  error: null,
  successMessage: null,
};

// 1. Post a new job (Recruiter)
export const postJobAsync = createAsyncThunk(
  "jobs/postJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/jobs", jobData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Job post failed");
    }
  }
);

// 2. Edit job status (Admin only)
export const editJobAsync = createAsyncThunk(
  "jobs/editJob",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/jobs/${id}`, updateData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Edit failed");
    }
  }
);

// 3. Get all jobs by recruiter
export const getRecruiterJobsAsync = createAsyncThunk(
  "jobs/getRecruiterJobs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/jobs/recruiter");
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Fetch failed");
    }
  }
);

// 4. Get all jobs (with optional status filter)
export const getAllJobsAsync = createAsyncThunk(
  "jobs/getAllJobs",
  async (status = "", { rejectWithValue }) => {
    try {
      const url = status ? `/jobs?status=${status}` : "/jobs";
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
export const selectJobLoading = (state) => state.jobs.loading;
export const selectJobError = (state) => state.jobs.error;
export const selectJobSuccess = (state) => state.jobs.successMessage;

export default postedJobSlice.reducer;

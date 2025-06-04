
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
  "postedJob/postJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/posted-job", jobData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.error || "Job post failed");
    }
  }
);

// 2. Edit job status (Admin only)
export const editPostedJobAsync = createAsyncThunk(
  "postedJob/editJob",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/posted-job/${id}`, updateData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.error || "Edit failed");
    }
  }
);

// 3. Get all jobs by recruiter
export const getRecruiterJobsAsync = createAsyncThunk(
  "postedJob/getRecruiterJobs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/posted-job/recruiter");
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.error || "Fetch failed");
    }
  }
);

// 4. Get all jobs (with optional status filter)
export const getAllPostedJobsAsync = createAsyncThunk(
  "postedJob/getAllJobs",
  async (status = "", { rejectWithValue }) => {
    try {
      const url = status ? `/posted-job?status=${status}` : "/posted-job";
      const res = await axiosInstance.get(url);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.error || "Fetch failed");
    }
  }
);

// Slice
const postedJobSlice = createSlice({
  name: "postedJobs",
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
      .addCase(getAllPostedJobsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPostedJobsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(getAllPostedJobsAsync.rejected, (state, action) => {
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

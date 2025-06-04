// src/redux/slices/authSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosinstance";
import { storeToken } from "../../storage/AuthStorage";

const initialState = {
  status: 'idle',
  user: null,
  loading: false,
  error: null,
};

// LOGIN
export const loginUserAsync = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/user/login', credentials);
      const data = response.data;

      if (data.token) {
        await storeToken(data.token);
      }

      if(!data.success)

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Login failed");
    }
  }
);

// SIGNUP
export const registerUserAsync = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/user/signup', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Signup failed");
    }
  }
);

// GET LOGGED-IN USER
export const getMeAsync = createAsyncThunk(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/user/me');
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Failed to fetch user data");
    }
  }
);

// EDIT USER
export const editUserAsync = createAsyncThunk(
  'auth/editUser',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/user/edit/${userId}`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Update failed");
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload.user;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })

      // Register
      .addCase(registerUserAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload.user;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })

      // Get Me
      .addCase(getMeAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getMeAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(getMeAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })

      // Edit User
      .addCase(editUserAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(editUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload.user;
      })
      .addCase(editUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      });
  }
});

export const { clearUser, clearError } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthLoading = (state) => state.auth.loading;

export default authSlice.reducer;

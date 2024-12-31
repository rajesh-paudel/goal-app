import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const checkAuth = createAsyncThunk(
  "checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/users/check");

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const signup = createAsyncThunk(
  "signup",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/users/signup", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const login = createAsyncThunk(
  "login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/users/login", formData);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/users/logout");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    authUser: null,
    isLoading: false,
    isError: false,
  },

  extraReducers: (builder) => {
    builder.addCase(checkAuth.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authUser = action.payload;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(signup.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authUser = action.payload;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      toast.error(action.payload);
    });
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authUser = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      toast.error(action.payload);
    });
    builder.addCase(logout.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authUser = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      toast.error(action.payload);
    });
  },
});

export default authSlice.reducer;

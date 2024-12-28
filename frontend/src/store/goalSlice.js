import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
const getGoals = createAsyncThunk(
  "getGoals",
  async (_, { rejectWithValue }) => {
    try {
      const res = axiosInstance.get("/goals/getGoals");
      return res.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const createGoal = createAsyncThunk(
  "createGoal",
  async (goal, { rejectWithValue }) => {
    try {
      const res = axiosInstance.post("/goals/createGoal", goal);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const updateGoal = createAsyncThunk(
  "updateGoal",
  async ({ id, goal }, { rejectWithValue }) => {
    try {
      const res = axiosInstance.put(`/goals/updateGoal/${id}`, goal);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const deleteGoal = createAsyncThunk(
  "deleteGoal",
  async (id, { rejectWithValue }) => {
    try {
      const res = axiosInstance.delete(`/goals/deleteGoal/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const goalSlice = createSlice({
  name: "Goal",
  initialState: {
    isLoading: false,
    isError: false,
    goals: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getGoals.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getGoals.fulfilled, (state, action) => {
      state.isLoading = false;
      state.goals = action.payload;
    });
    builder.addCase(getGoals.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(createGoal.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createGoal.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createGoal.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(updateGoal.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateGoal.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateGoal.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(deleteGoal.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteGoal.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteGoal.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default goalSlice.reducer;

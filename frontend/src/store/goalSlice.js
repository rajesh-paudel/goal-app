import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
export const getGoals = createAsyncThunk(
  "getGoals",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/goals/getGoals");

      return res.data;
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  }
);

export const createGoal = createAsyncThunk(
  "createGoal",
  async (goal, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/goals/createGoal", { goal });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteGoal = createAsyncThunk(
  "deleteGoal",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/goals/deleteGoal/${id}`);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
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
      toast.error(action.payload);
    });
    builder.addCase(createGoal.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createGoal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.goals.push(action.payload.goal);

      toast.success(action.payload.message);
    });
    builder.addCase(createGoal.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      toast.error(action.payload);
    });

    builder.addCase(deleteGoal.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteGoal.fulfilled, (state, action) => {
      state.isLoading = false;
      state.goals = state.goals.filter(
        (goal) => goal._id !== action.payload.goal._id
      );
      toast.success(action.payload.message);
    });
    builder.addCase(deleteGoal.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default goalSlice.reducer;

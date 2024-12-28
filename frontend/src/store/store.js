import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import goalReducer from "./goalSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    goal: goalReducer,
  },
});

export default store;

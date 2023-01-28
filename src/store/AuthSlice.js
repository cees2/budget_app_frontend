import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
  },
  reducers: {
    loginUser(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      localStorage.setItem("token", state.token);
      localStorage.setItem("userId", state.userId);
    },
    logoutUser(state) {
      state.token = "";
      state.userId = "";
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

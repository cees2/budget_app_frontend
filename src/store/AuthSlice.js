import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "Auth",
  initialState: { token: "", userId: "" },
  reducers: {
    loginUser(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    logoutUser(state) {
      state.token = "";
      state.userId = "";
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

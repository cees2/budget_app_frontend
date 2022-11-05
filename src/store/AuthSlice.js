import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "Auth",
  initialState: { token: "" },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    getToken(state) {
      return state.token;
    },
    removeToken(state) {
      state.token = "";
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

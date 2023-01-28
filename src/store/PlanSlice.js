import { createSlice } from "@reduxjs/toolkit";

const plansSlice = createSlice({
  name: "plans",
  initialState: { plans: [] },
  reducers: {
    setPlans(state, action) {
      state.plans = action.payload;
    },
    clearPlans(state) {
      state.plans = [];
    },
  },
});

export const plansActions = plansSlice.actions;

export default plansSlice.reducer;

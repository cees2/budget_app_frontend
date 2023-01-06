import { createSlice } from "@reduxjs/toolkit";

const plansSlice = createSlice({
  name: "plans",
  initialState: { plans: [] },
  reducers: {
    setPlans(state, action) {
      state.plans = action.payload;
    },
  },
});

export const plansActions = plansSlice.actions;

export default plansSlice.reducer;

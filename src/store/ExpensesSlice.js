import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: { expenses: [] },
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
    },
    clearExpenses(state) {
      state.expenses = [];
    },
  },
});

export const expensesActions = expensesSlice.actions;

export default expensesSlice.reducer;

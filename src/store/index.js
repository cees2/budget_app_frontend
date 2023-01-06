import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import expensesSlice from "./ExpensesSlice";
import plansSlice from "./PlanSlice";

const store = configureStore({
  reducer: { auth: authSlice, expenses: expensesSlice, plans: plansSlice },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import expensesSlice from "./ExpensesSlice";

const store = configureStore({
  reducer: { auth: authSlice, expenses: expensesSlice },
});

export default store;

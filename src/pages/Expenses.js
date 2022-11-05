import React from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import AddExpense from "../components/Expenses/AddExpense";
import AllExpenses from "../components/Expenses/ExpensesList/AllExpenses";
import ExpensesInfo from "../components/Expenses/ExpensesInfo";

const Expenses = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <Switch>
      {token && (
        <Route path="/expenses/add-expense">
          <AddExpense />
        </Route>
      )}
      {token && (
        <Route path="/expenses/my-expenses">
          <AllExpenses />
        </Route>
      )}
      {token && (
        <Route path="/expenses/expenses-details">
          <ExpensesInfo />
        </Route>
      )}
    </Switch>
  );
};

export default Expenses;

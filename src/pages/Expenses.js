import React from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import AddExpense from "../components/Expenses/AddExpense/AddExpense";
import AllExpenses from "../components/Expenses/ExpensesList/AllExpenses";
import ExpensesDetails from "../components/Expenses/ExpensesInfo/ExpensesDetails";
import BudgetPlans from "../components/Expenses/ExpensesPlans/BudgetPlans";

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
          <ExpensesDetails />
        </Route>
      )}
      {token && (
        <Route path="/expenses/budget-plans">
          <BudgetPlans />
        </Route>
      )}
    </Switch>
  );
};

export default Expenses;

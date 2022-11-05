import React from "react";
import Card from "../../UI/Card";
import SingleExpense from "./SingleExpense";
import classes from "./AllExpenses.module.css";

const AllExpenses = () => {
  return (
    <Card class={classes.expensesListWrapper}>
      <ul>
        <SingleExpense />
        <SingleExpense />
        <SingleExpense />
        <SingleExpense />
      </ul>
    </Card>
  );
};

export default AllExpenses;

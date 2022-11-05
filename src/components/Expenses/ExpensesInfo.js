import React from "react";
import Card from "../UI/Card";
import classes from "./ExpensesInfo.module.css";

const ExpensesInfo = () => {
  return (
    <Card class={classes.expInfoWrapper}>
      Expenses analysis will appear here.
    </Card>
  );
};

export default ExpensesInfo;

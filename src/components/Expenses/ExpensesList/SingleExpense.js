import React, { useState } from "react";
import classes from "./SingleExpense.module.css";
import { MONTHS } from "../ExpensesInfo/services/chartData";

const SingleExpense = (props) => {
  const { category, createdAt, name, value, onDelete, id } = props;
  const date = new Date(createdAt);

  const dateToBeDisplayed = `${date.getDate()} ${
    MONTHS[date.getMonth()].name
  } ${date.getFullYear()}`;

  const deleteExpenseHandler = () => onDelete(id);
  return (
    <li className={classes.expenseItemWrapper}>
      <section className={classes.expenseInfoWrapper}>
        <div className={classes.details}>
          <h2 className={classes.expenseName}>{name}</h2>
          <p className={classes.expenseCategory}>{`${category
            .slice(0, 1)
            .toUpperCase()}${category.slice(1)}`}</p>
        </div>
        <div className={classes.valueInfo}>
          <h2 className={classes.price}>{`${value} zł`}</h2>
          <p className={classes.date}>{dateToBeDisplayed}</p>
        </div>
      </section>
      <button
        className={classes.deleteExpenseButton}
        onClick={deleteExpenseHandler}
      >
        Delete Expense
      </button>
    </li>
  );
};

export default SingleExpense;

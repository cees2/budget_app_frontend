import React, { useState } from "react";
import classes from "./SingleExpense.module.css";

const SingleExpense = (props) => {
  const { category, createdAt, name, value, onDelete, id } = props;
  const date = new Date(createdAt);

  const deleteExpenseHandler = () => onDelete(id);
  return (
    <li className={classes.expenseItemWrapper}>
      <section className={classes.expenseInfoWrapper}>
        <div className={classes.details}>
          <h2 className={classes.expenseName}>{name}</h2>
          <p className={classes.expenseCategory}>{category}</p>
        </div>
        <div className={classes.valueInfo}>
          <h2 className={classes.price}>{`${value} zł`}</h2>
          <p
            className={classes.date}
          >{`${date.getDate()}:${date.getMonth()}`}</p>
        </div>
      </section>
      <button
        className={classes.deleteExpenseButton}
        onClick={deleteExpenseHandler}
      >
        Delete Expense
      </button>
      {/* do poprawy: wywalic do komponentu button? */}
    </li>
  );
};

export default SingleExpense;

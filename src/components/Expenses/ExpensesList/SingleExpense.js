import React from "react";
import classes from "./SingleExpense.module.css";

const SingleExpense = (props) => {
  const { category, createdAt, name, value, onDelete, id } = props;
  const date = new Date(createdAt);

  const getExpenseId = () => {
    onDelete(id);
  };

  return (
    <li className={classes.expenseItemWrapper}>
      <section className={classes.expenseInfoWrapper}>
        <div className={classes.details}>
          <h1>{name}</h1>
          <p>{category}</p>
        </div>
        <div className={classes.valueInfo}>
          <h1>{value}</h1>
          <p>{`${date.getDate()}:${date.getMonth()}`}</p>
        </div>
      </section>
      <button className={classes.deleteExpenseButton} onClick={getExpenseId}>
        Delete Expense
      </button>
      {/* do poprawy: wywalic do komponentu button? */}
    </li>
  );
};

export default SingleExpense;

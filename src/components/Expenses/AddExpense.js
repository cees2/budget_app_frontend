import React from "react";
import Card from "../UI/Card";
import classes from "./AddExpense.module.css";
import Header from "../UI/Header";
import UserInput from "../UI/UserInput";
import SubmitFormButton from "../UI/SubmitFormButton";

const AddExpense = () => {
  const expAddSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Card class={classes.addExpenseWrapper}>
      <Header>Add new expense</Header>
      <section className={classes.newExpenseSection}>
        <form onSubmit={expAddSubmitHandler}>
          <UserInput
            htmlFor="expname"
            label="Expense name"
            id="expName"
            type="text"
          />
          <div className={classes.newExpenseSingleInput}>
            <label htmlFor="expCategory">Expense category</label>
            <select className={classes.expAddCategory}>
              <option>Rozrywka</option>
              <option>Rozrywka</option>
              <option>Rozrywka</option>
              <option>Rozrywka</option>
              <option>Rozrywka</option>
            </select>
          </div>
          <SubmitFormButton caption="Add" />
        </form>
      </section>
    </Card>
  );
};

export default AddExpense;

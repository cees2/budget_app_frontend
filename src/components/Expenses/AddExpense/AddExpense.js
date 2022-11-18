import React, { useRef } from "react";
import Card from "../../UI/Card";
import classes from "./AddExpense.module.css";
import Header from "../../UI/Header";
import UserInput from "../../UI/UserInput";
import SubmitFormButton from "../../UI/SubmitFormButton";
import useExpenseCrud from "../../../hooks/use-expense-crud";

const AddExpense = () => {
  const expenseNameInput = useRef();
  const expenseValueInput = useRef();
  const expenseCategoryInput = useRef();
  const { createExpense } = useExpenseCrud();

  const expAddSubmitHandler = async (e) => {
    e.preventDefault();

    const expenseName = expenseNameInput.current.value;
    const expenseValue = expenseValueInput.current.value;
    const expenseCategory = expenseCategoryInput.current.value;

    const data = await createExpense(
      expenseName,
      expenseValue,
      expenseCategory
    );
    // do zrobienia: handler przy powodzeniu
  };

  return (
    <Card class={classes.addExpenseWrapper}>
      <Header>Add new expense</Header>
      <section className={classes.newExpenseSection}>
        <form onSubmit={expAddSubmitHandler}>
          <UserInput
            htmlFor="expName"
            label="Expense name"
            id="expName"
            type="text"
            inputRef={expenseNameInput}
          />
          <UserInput
            htmlFor="expValue"
            label="Expense value"
            id="expValue"
            type="number"
            inputRef={expenseValueInput}
          />
          <div className={classes.newExpenseSingleInput}>
            <label htmlFor="expCategory">Expense category</label>
            <select
              className={classes.expAddCategory}
              ref={expenseCategoryInput}
            >
              <option>Entertainment</option>
              <option>Food</option>
              <option>Bills</option>
              <option>Transportation</option>
              <option>Education</option>
              <option>Investments</option>
              <option>House</option>
            </select>
          </div>
          <SubmitFormButton caption="Add" />
        </form>
      </section>
    </Card>
  );
};

export default AddExpense;

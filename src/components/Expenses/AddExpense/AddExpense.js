import React, { useRef, useState } from "react";
import Card from "../../UI/Card";
import classes from "./AddExpense.module.css";
import Header from "../../UI/Header";
import UserInput from "../../UI/UserInput";
import SubmitFormButton from "../../UI/SubmitFormButton";
import useExpenseCrud from "../../../hooks/use-expense-crud";
import ActionResult from "../../UI/ActionResult";
import useActionResult from "../../../hooks/use-actionResult";
import { Link } from "react-router-dom";

const AddExpense = () => {
  const expenseNameInput = useRef();
  const expenseValueInput = useRef();
  const expenseCategoryInput = useRef();
  const { createExpense } = useExpenseCrud();
  const { isActive, activate } = useActionResult();
  const [error, setError] = useState(false);

  const expAddSubmitHandler = async (e) => {
    e.preventDefault();

    const expenseName = expenseNameInput.current.value;
    const expenseValue = expenseValueInput.current.value;
    const expenseCategory = expenseCategoryInput.current.value;

    try {
      await createExpense(expenseName, expenseValue, expenseCategory);
    } catch (err) {
      setError(err.message);
      activate();
    }

    activate();
  };

  const successMessage = (
    <p className={classes.successMessage}>
      Task has been sussceefully added.
      <Link to="/expenses/my-expenses">
        <span> See my expenses</span>
      </Link>
    </p>
  );
  return (
    <>
      <ActionResult
        visible={isActive.visible}
        type={error ? "error" : "success"}
        message={error ? error : successMessage}
      />
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
              step={0.01}
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
    </>
  );
};

export default AddExpense;

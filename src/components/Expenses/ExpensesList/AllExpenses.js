import React, { useEffect, useState } from "react";
import Card from "../../UI/Card";
import SingleExpense from "./SingleExpense";
import classes from "./AllExpenses.module.css";
import useExpenseCrud from "../../../hooks/use-expense-crud";

const AllExpenses = () => {
  const { getExpenses, deleteExpense } = useExpenseCrud();
  const [usersExpenses, setUsersExpenses] = useState([]);

  useEffect(() => {
    getExpenses().then((data) => setUsersExpenses(data.data.expenses));
  }, []);

  const deleteExpenseHandler = async (positionOfExpenseInArray) =>
    await deleteExpense(usersExpenses[positionOfExpenseInArray]._id);

  return (
    <Card class={classes.expensesListWrapper}>
      <ul className={classes.expensesList}>
        {usersExpenses.map((expense, i) => (
          <SingleExpense
            category={expense.category}
            createdAt={expense.dateCreated}
            name={expense.name}
            value={expense.value}
            key={i}
            id={i}
            onDelete={deleteExpenseHandler}
          />
        ))}
      </ul>
    </Card>
  );
};

export default AllExpenses;

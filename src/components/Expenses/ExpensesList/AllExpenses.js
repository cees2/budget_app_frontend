import React, { useEffect, useState } from "react";
import Card from "../../UI/Card";
import SingleExpense from "./SingleExpense";
import classes from "./AllExpenses.module.css";
import useExpenseCrud from "../../../hooks/use-expense-crud";
import ReactDOM from "react-dom";
import ConfirmationModal from "../../UI/ConfirmationModal";
import SortExpenses from "./SortExpenses/SortExpenses";
import { useSelector } from "react-redux";

const AllExpenses = () => {
  const expenses = useSelector((state) => state.expenses.expenses);
  const { getExpenses, deleteExpense } = useExpenseCrud();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [usersExpenses, setUsersExpenses] = useState([]);
  const [idOfElementToBeDeleted, setIdOfElementToBeDeleted] = useState(null);

  useEffect(() => {
    getExpenses().then((data) => {
      setUsersExpenses(data.data.expenses);
    });
  }, [expenses]);

  const acceptDeletionHandler = async () => {
    deleteExpense(usersExpenses[idOfElementToBeDeleted]._id);
    const data = await getExpenses();
    setUsersExpenses(data.data.expenses);
    setIdOfElementToBeDeleted(null);
  };

  const rejectDeletionHandler = () => setModalIsVisible(false);

  const showModalHandler = (id) => {
    setModalIsVisible(true);
    setIdOfElementToBeDeleted(id);
  };

  const sortNameHandler = (expenses) => {
    setUsersExpenses(expenses);
  };

  return (
    <>
      {modalIsVisible &&
        ReactDOM.createPortal(
          <ConfirmationModal
            message="Czy na pewno chcesz usunąć ten wydatek?"
            onAccept={acceptDeletionHandler}
            onReject={rejectDeletionHandler}
            visible={modalIsVisible}
          />,
          document.getElementById("modal")
        )}
      <SortExpenses
        expenses={usersExpenses}
        setExpenses={setUsersExpenses}
        onChangeSortName={sortNameHandler}
      />
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
              onDelete={showModalHandler}
            />
          ))}
        </ul>
      </Card>
    </>
  );
};

export default AllExpenses;

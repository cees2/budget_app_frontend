import React, { useRef, useState } from "react";
import classes from "./SortExpenses.module.css";
import sortArrow from "../../../../images/sortArrow.svg";
import {
  sortByAlphabet,
  sortByName,
  sortByValue,
  sortByDate,
} from "./Services";
import { useSelector } from "react-redux";

const SortExpenses = (props) => {
  const { expenses, onChangeSortName } = props;
  const [sortIsName, setSortIsName] = useState(false);
  const [arrowIsUp, setArrowIsUp] = useState(true);
  const sortNameInput = useRef();
  const nameInput = useRef();
  const allExpenses = useSelector((state) => state.expenses.expenses);

  const changeSortOrderHandler = () => {
    setArrowIsUp((prevState) => !prevState);
    sortHandler();
  };

  const sortHandler = () => {
    const sortDecision = sortNameInput.current.value;

    if (sortDecision !== "Name") setSortIsName(false);
    else setSortIsName(true);

    switch (sortDecision) {
      case "Date":
        onChangeSortName(sortByDate(expenses, arrowIsUp));
        break;
      case "Alphabet":
        onChangeSortName(sortByAlphabet(expenses, arrowIsUp));
        break;
      case "Value":
        onChangeSortName(sortByValue(expenses, arrowIsUp));
        break;
      case "Name":
        if (!nameInput.current?.value) onChangeSortName(allExpenses);
        else
          onChangeSortName(
            sortByName(expenses, arrowIsUp, nameInput.current.value)
          );
        break;
      default:
        return;
    }
  };

  const arrowClasses = `${classes.sortArrow} ${
    arrowIsUp ? "" : classes.arrowDown
  }`;

  return (
    <div className={classes.sortExpensesWrapper}>
      <div className={classes.mainSorts}>
        <h3 className={classes.sortHeader}>Sort by</h3>
        <select
          ref={sortNameInput}
          className={classes.sortSelect}
          onChange={sortHandler}
        >
          <option>Date</option>
          <option>Alphabet</option>
          <option>Value</option>
          <option>Name</option>
        </select>
        <img
          src={sortArrow}
          alt="Sort arrow"
          className={arrowClasses}
          onClick={changeSortOrderHandler}
        />
      </div>
      {sortIsName && (
        <div className={classes.sortByName}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="e.g phone"
            ref={nameInput}
            onChange={sortHandler}
          />
        </div>
      )}
    </div>
  );
};

export default SortExpenses;

import React, { useState } from "react";
import classes from "./MainHeader.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../../store/AuthSlice";
import { plansActions } from "../../store/PlanSlice";
import { expensesActions } from "../../store/ExpensesSlice";
import money from "../../images/money.svg";
import hamburger from "../../images/hamburger.svg";
import leftArrow from "../../images/left_arrow.svg";

const MainHeader = () => {
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(authActions.logoutUser());
    dispatch(plansActions.clearPlans());
    dispatch(expensesActions.clearExpenses());
  };

  const getClasses = function () {
    if (!isHamburgerActive) return classes.hamburgerDeactivated;
    else if (isHamburgerActive) return classes.hamburgerActive;

    return "";
  };

  const hamburgerMenuClasses = `${classes.hamburgerMainMenu} ${getClasses()}`;

  const menuList = (
    <>
      {token && (
        <Link to="/expenses/add-expense">
          <li>Add expense</li>
        </Link>
      )}
      {token && (
        <Link to="/expenses/my-expenses">
          <li>My expenses</li>
        </Link>
      )}
      {token && (
        <Link to="/expenses/expenses-details">
          <li>Expenses info</li>
        </Link>
      )}
      {token && (
        <Link to="/expenses/budget-plans">
          <li>Budget plans</li>
        </Link>
      )}
      {token && (
        <Link to="/home">
          <li onClick={logoutUser}>Log out</li>
        </Link>
      )}
      {!token && (
        <Link to="/authentication/login">
          <li>Log in</li>
        </Link>
      )}
    </>
  );

  return (
    <>
      <header className={classes.appMainHeader}>
        <Link to="/home">
          <h2>Budget app</h2>
        </Link>
        <img src={money} alt="Money" />
        <ul className={classes.headerList}>
          {menuList}
          <img
            src={hamburger}
            alt="hamburger"
            className={classes.hamburgerMenu}
            onClick={() => setIsHamburgerActive((prevVal) => !prevVal)}
          />
        </ul>
        {isHamburgerActive && (
          <div className={hamburgerMenuClasses}>
            <img
              src={leftArrow}
              alt="back arrow"
              className={classes.closeMenuArrow}
              onClick={() => setIsHamburgerActive(false)}
            />
            <ul className={classes.hamburgerList}>{menuList}</ul>
          </div>
        )}
      </header>
    </>
  );
};

export default MainHeader;

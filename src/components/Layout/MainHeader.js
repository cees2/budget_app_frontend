import React from "react";
import classes from "./MainHeader.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../../store/AuthSlice";
import money from "../../images/money.svg";

const MainHeader = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const removeToken = () => dispatch(authActions.removeToken());

  return (
    <header className={classes.appMainHeader}>
      <Link to="/home">
        <h2>Budget app</h2>
      </Link>
      <img src={money} alt="Money" />
      <ul className={classes.headerList}>
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
        {token && <li onClick={removeToken}>Log out</li>}
        {!token && (
          <Link to="/authentication/login">
            <li>Log in</li>
          </Link>
        )}
      </ul>
    </header>
  );
};

export default MainHeader;

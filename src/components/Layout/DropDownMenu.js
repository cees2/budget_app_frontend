import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./DropDownMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { authActions } from "../../store/AuthSlice";

const DropDownMenuItems = (props) => {
  const dispatch = useDispatch();

  const listItemClass = props.shorterThanTablet
    ? ""
    : `${classes.dropDownItem}`;

  return (
    <>
      <li className={listItemClass}>
        <Link to="/expenses/add-expense">
          <h6 className={classes.listItemText}>Add expense</h6>
        </Link>
      </li>
      <li className={listItemClass}>
        <Link to="/expenses/my-expenses">
          <h6 className={classes.listItemText}>My expenses</h6>
        </Link>
      </li>
      <li className={listItemClass}>
        <Link to="/home" onClick={() => dispatch(authActions.logoutUser())}>
          <h6 className={classes.listItemText}>Log out</h6>
        </Link>
      </li>
    </>
  );
};

const DropDownMenu = () => {
  const token = useSelector((state) => state.auth.token);
  const dropDownIsVisible = useSelector(
    (state) => state.auth.dropdownIsVisible
  );
  const dispatch = useDispatch();

  const toggleDropDown = (e) => {
    e.stopPropagation();
    dispatch(authActions.toggleDropdown());
  };

  const dropDownListClasses = dropDownIsVisible
    ? `${classes.dropDownList} ${classes.activeDropDownList}`
    : `${classes.dropDownList}`;

  const WiderThanTablet = ({ children }) => {
    const wider = useMediaQuery({ minWidth: 769 });
    return wider ? children : null;
  };

  const ShorterThanTablet = ({ children }) => {
    const shorter = useMediaQuery({ maxWidth: 768 });
    return shorter ? children : null;
  };

  return (
    <>
      <WiderThanTablet>
        <div className={classes.profileDetailsTrigger} onClick={toggleDropDown}>
          <ul className={dropDownListClasses}>
            <DropDownMenuItems />
          </ul>
        </div>
      </WiderThanTablet>
      <ShorterThanTablet>
        <DropDownMenuItems shorterThanTablet={true} />
      </ShorterThanTablet>
    </>
  );
};

export default DropDownMenu;

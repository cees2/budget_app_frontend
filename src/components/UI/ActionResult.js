import React from "react";
import classes from "./ActionResult.module.css";
import checkMark from "../../images/check_mark.svg";
import error from "../../images/error.svg";

const ActionResult = (props) => {
  const { type, message, visible } = props;

  const resultClasses = `${classes.actionResultWrapper} ${
    visible ? classes.visible : ""
  } ${type === "error" ? classes.error : classes.success}`;

  return (
    <div className={resultClasses}>
      <img
        src={type === "success" ? checkMark : error}
        alt={type === "success" ? "success" : "error"}
      />
      <h4 className={classes.actionResultMessage}>{message}</h4>
    </div>
  );
};

export default ActionResult;

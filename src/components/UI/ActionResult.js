import React from "react";
import classes from "./ActionResult.module.css";
import checkMark from "../../images/check_mark.svg";
import error from "../../images/error.svg";

const ActionResult = (props) => {
  const { type, caption, active } = props;

  const resultClasses = `${classes.actionResultWrapper} ${
    active ? classes.active : ""
  }`;

  return (
    <div className={resultClasses}>
      <img
        src={type === "success" ? checkMark : error}
        alt={type === "success" ? "success" : "error"}
      />
      <p>{caption}</p>
    </div>
  );
};

export default ActionResult;

import React from "react";
import classes from "./UserInput.module.css";

const UserInput = (props) => {
  const { htmlFor, label, id, type, inputRef, step } = props;
  return (
    <div className={classes.singleInput}>
      <label htmlFor={htmlFor}>{label}</label>
      <input id={id} type={type} ref={inputRef} step={step} />
    </div>
  );
};

export default UserInput;

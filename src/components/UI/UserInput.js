import React from "react";
import classes from "./UserInput.module.css";

const UserInput = (props) => {
  const { htmlFor, label, id, type, inputRef } = props;
  return (
    <div className={classes.singleInput}>
      <label htmlFor={htmlFor}>{label}</label>
      <input id={id} type={type} ref={inputRef} />
    </div>
  );
};

export default UserInput;

import React from "react";
import classes from "./SubmitFormButton.module.css";

const SubmitFormButton = (props) => {
  const { caption } = props;
  return <button className={classes.submitButton}>{caption}</button>;
};

export default SubmitFormButton;

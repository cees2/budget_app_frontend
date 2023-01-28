import React from "react";
import classes from "./SubmitFormButton.module.css";

const SubmitFormButton = (props) => {
  const { caption, customClass } = props;
  const buttonClasses = customClass
    ? `${classes.submitButton} ${customClass}`
    : `${classes.submitButton}`;
  return (
    <button className={buttonClasses} type="submit">
      {caption}
    </button>
  );
};

export default SubmitFormButton;

import React, { useRef } from "react";
import classes from "./Selectable.module.css";

const Selectable = (props) => {
  const { options, onSelectChange } = props;
  const selectInputRef = useRef();
  const changeSelectHandler = () => {
    const selectInput = selectInputRef.current?.value;

    onSelectChange(selectInput);
  };

  return (
    <select ref={selectInputRef} onChange={changeSelectHandler}>
      {options.map((option, i) => (
        <option key={i}>{option}</option>
      ))}
    </select>
  );
};

export default Selectable;

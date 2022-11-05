import React from "react";
import classes from "./Card.module.css";

const Card = (props) => {
  const cardClasses = `${classes.cardWrapper} ${
    props.class ? `${props.class}` : ""
  }`;

  return <div className={cardClasses}>{props.children}</div>;
};

export default Card;

import React from "react";
import classes from "./Header.module.css";

const Header = (props) => {
  const headerClasses = `${classes.componentHeader} ${
    props.class ? `${props.class}` : ""
  }`;

  return <h3 className={headerClasses}>{props.children}</h3>;
};

export default Header;

import React from "react";
import MainHeader from "./MainHeader";
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <React.Fragment>
      <MainHeader />
      <main className={classes.mainContent}>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;

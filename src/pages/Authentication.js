import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginForm from "../components/Authentication/LoginForm";
import SignUpForm from "../components/Authentication/SignUpForm";
import { useSelector } from "react-redux";

const Authentication = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <Switch>
      {!token && (
        <Route path="/authentication/login">
          <LoginForm />
        </Route>
      )}
      {!token && (
        <Route path="/authentication/signup">
          <SignUpForm />
        </Route>
      )}
    </Switch>
  );
};

export default Authentication;

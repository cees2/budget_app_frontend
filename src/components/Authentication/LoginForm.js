import React, { useRef, useState } from "react";
import Card from "../UI/Card";
import classes from "./LoginForm.module.css";
import Header from "../UI/Header";
import UserInput from "../UI/UserInput";
import SubmitFormButton from "../UI/SubmitFormButton";
import useHttp from "../../hooks/use-http";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/AuthSlice";
import { useHistory, Link } from "react-router-dom";
import useActionResult from "../../hooks/use-actionResult";
import ActionResult from "../../components/UI/ActionResult";

const LoginForm = () => {
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();
  const { isActive, activate } = useActionResult();
  const [error, setError] = useState("");

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    try {
      const data = await sendRequest({
        url: "/users/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          email,
          password,
        },
      });
      dispatch(
        authActions.loginUser({ token: data.token, userId: data.data.user._id })
      );
      history.replace("/home");
    } catch (err) {
      setError(err.message);
      activate();
    }
  };

  return (
    <>
      <ActionResult visible={isActive.visible} type="error" message={error} />
      <Card class={classes.loginWrapper}>
        <Header>Log into your account</Header>
        <section className={classes.loginSection}>
          <form onSubmit={loginSubmitHandler}>
            <UserInput
              htmlFor="email"
              label="Email"
              id="email"
              type="email"
              inputRef={emailInputRef}
            />
            <UserInput
              htmlFor="password"
              label="Password"
              id="password"
              type="password"
              inputRef={passwordInputRef}
            />
            <Link to="/authentication/signup">Create new account</Link>
            <SubmitFormButton caption="Login" />
          </form>
        </section>
      </Card>
    </>
  );
};

export default LoginForm;

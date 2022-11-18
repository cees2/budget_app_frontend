import React, { useRef } from "react";
import Card from "./../UI/Card";
import classes from "./SignUpForm.module.css";
import Header from "../UI/Header";
import UserInput from "../UI/UserInput";
import SubmitFormButton from "../UI/SubmitFormButton";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/AuthSlice";
import useHttp from "../../hooks/use-http";
import { useHistory } from "react-router-dom";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmInputRef = useRef();
  const { sendRequest } = useHttp();
  const history = useHistory();

  const signupFormSubmitHandler = async (e) => {
    e.preventDefault();
    const name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const passwordConfirm = passwordConfirmInputRef.current.value;

    const data = await sendRequest({
      url: "/users/signup",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    dispatch(
      authActions.loginUser({ token: data.token, userId: data.user._id })
    );
    history.replace("/home");
  };

  return (
    <Card class={classes.signUpWrapper}>
      <Header>Create new account</Header>
      <section className={classes.signUpSection}>
        <form onSubmit={signupFormSubmitHandler}>
          <UserInput
            htmlFor="name"
            label="Name"
            id="name"
            type="text"
            inputRef={nameInputRef}
          />
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
          <UserInput
            htmlFor="confirmPassword"
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            inputRef={passwordConfirmInputRef}
          />
          <SubmitFormButton caption="Create" />
        </form>
      </section>
    </Card>
  );
};

export default SignUpForm;

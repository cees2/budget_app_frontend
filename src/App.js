import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import Expenses from "./pages/Expenses";
import { useSelector } from "react-redux";

const App = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        {!token && (
          <Route path="/home">
            <Home loggedIn={false} />
          </Route>
        )}
        {token && (
          <Route path="/home">
            <Home loggedIn={true} />
          </Route>
        )}
        <Route path="/authentication">
          <Authentication />
        </Route>
        <Route path="/expenses">
          <Expenses />
        </Route>
        <Route path="*">
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Could not find that url
          </p>
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;

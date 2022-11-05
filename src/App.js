import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import Expenses from "./pages/Expenses";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
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

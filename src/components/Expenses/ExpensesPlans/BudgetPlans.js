import React from "react";
import classes from "./BudgetPlans.module.css";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import AddPlan from "./AddPlan/AddPlan";
import CompletedPlans from "./CompletedPlans/CompletedPlans";
import SeePlans from "./SeePlans/SeePlans";
import IncompletedPlans from "./IncompletedPlans/IncompletedPlans";

const BudgetPlans = () => {
  return (
    <section className={classes.budgetPlansWrapper}>
      <nav className={classes.budgetPlansNav}>
        <ul>
          <Link to={`/expenses/budget-plans/add-plan`}>
            <li>Add new plan</li>
          </Link>
          <Link to={`/expenses/budget-plans/see-plans`}>
            <li>See my plans</li>
          </Link>
          <Link to={`/expenses/budget-plans/completed-plans`}>
            <li>Completed Plans</li>
          </Link>
          <Link to={`/expenses/budget-plans/incompleted-plans`}>
            <li>Incompleted Plans</li>
          </Link>
        </ul>
      </nav>
      <Switch>
        <Route path="/expenses/budget-plans/" exact>
          <Redirect to="/expenses/budget-plans/see-plans" />
        </Route>
        <Route path="/expenses/budget-plans/add-plan">
          <AddPlan />
        </Route>
        <Route path="/expenses/budget-plans/completed-plans">
          <CompletedPlans />
        </Route>
        <Route path="/expenses/budget-plans/incompleted-plans">
          <IncompletedPlans />
        </Route>
        <Route path="/expenses/budget-plans/see-plans">
          <SeePlans />
        </Route>
      </Switch>
    </section>
  );
};

export default BudgetPlans;

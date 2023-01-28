import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./SeePlans.module.css";
import usePlanCrud from "../../../../hooks/use-plan-crud";
import { plansActions } from "../../../../store/PlanSlice";
import SinglePlan from "../Common/SinglePlan";
import Header from "../../../UI/Header";

const SeePlans = () => {
  const { getPlans } = usePlanCrud();
  const plans = useSelector((state) => state.plans.plans);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUsersPlans = async () => {
      const res = await getPlans();
      dispatch(plansActions.setPlans(res.data.plans));
    };
    if (!plans.length) getUsersPlans();
  }, []);

  const planCRUDHandler = async () => {
    const res = await getPlans();
    dispatch(plansActions.setPlans(res.data.plans));
  };

  const content = plans.map((plan, i) => {
    return plan.status === "Active" ? (
      <SinglePlan plan={plan} key={i} onCRUD={planCRUDHandler} />
    ) : (
      ""
    );
  });

  return (
    <div className={classes.currentPlansWrapper}>
      <Header class={classes.seePlansHeader}>Plans list</Header>
      <ul className={classes.plansList}>
        {content.every((c) => c === "") ? (
          <h5 style={{ textAlign: "center" }}>No plans found. Add some</h5>
        ) : (
          content
        )}
      </ul>
    </div>
  );
};

export default SeePlans;

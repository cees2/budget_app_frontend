import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./CompletedPlans.module.css";
import usePlanCrud from "../../../../hooks/use-plan-crud";
import { plansActions } from "../../../../store/PlanSlice";
import SinglePlan from "../Common/SinglePlan";

const CompletedPlans = () => {
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
    console.log("exec");
    const res = await getPlans();
    dispatch(plansActions.setPlans(res.data.plans));
  };

  return (
    <div className={classes.currentPlansWrapper}>
      <ul>
        {plans.map((plan, i) => {
          return !plan.completed ? (
            ""
          ) : (
            <SinglePlan plan={plan} key={i} onCRUD={planCRUDHandler} />
          );
        })}
      </ul>
    </div>
  );
};

export default CompletedPlans;

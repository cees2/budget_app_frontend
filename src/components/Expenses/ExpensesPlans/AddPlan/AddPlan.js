import React, { useRef, useState } from "react";
import classes from "./AddPlan.module.css";
import Selectable from "../../../UI/Selectable";
import usePlanCrud from "../../../../hooks/use-plan-crud";
import UserInput from "../../../UI/UserInput";
import ActionResult from "../../../UI/ActionResult";
import { useDispatch, useSelector } from "react-redux";
import { plansActions } from "../../../../store/PlanSlice";

const AddPlan = () => {
  const [priority, setPriority] = useState("High");
  const plans = useSelector((state) => state.plans.plans);
  const dispatch = useDispatch();
  console.log("plans", plans);
  const { createPlan } = usePlanCrud();
  const planNameInput = useRef();
  const priorityChangeHandler = (selectedInput) => {
    setPriority(selectedInput);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("tutaj", planNameInput.current.value);
    const res = await createPlan(
      planNameInput?.current?.value,
      priority,
      false
    );
    const updatedPlans = [...plans, { ...res.data.createdPlan }];
    dispatch(plansActions.setPlans(updatedPlans));
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={classes.singleInput}>
        <UserInput inputRef={planNameInput} type="text" />
      </div>
      <div className={classes.singleInput}>
        <label htmlFor="end_date">Priority</label>
        <Selectable
          options={["High", "Medium", "Low"]}
          onSelectChange={priorityChangeHandler}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddPlan;

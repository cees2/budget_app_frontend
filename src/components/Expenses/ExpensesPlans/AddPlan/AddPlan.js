import React, { useRef, useState } from "react";
import classes from "./AddPlan.module.css";
import Selectable from "../../../UI/Selectable";
import usePlanCrud from "../../../../hooks/use-plan-crud";
import UserInput from "../../../UI/UserInput";
import ActionResult from "../../../UI/ActionResult";
import { useDispatch, useSelector } from "react-redux";
import { plansActions } from "../../../../store/PlanSlice";
import SubmitFormButton from "../../../UI/SubmitFormButton";
import Header from "../../../UI/Header";

const AddPlan = () => {
  const [priority, setPriority] = useState("High");
  const plans = useSelector((state) => state.plans.plans);
  const dispatch = useDispatch();
  const { createPlan } = usePlanCrud();
  const planNameInput = useRef();
  const planPriorityInput = useRef();
  const priorityChangeHandler = (selectedInput) => {
    setPriority(selectedInput);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const res = await createPlan(
      planNameInput?.current?.value,
      priority,
      false
    );
    const updatedPlans = [...plans, { ...res.data.createdPlan }];
    dispatch(plansActions.setPlans(updatedPlans));
  };

  return (
    <div className={classes.addPlanWrapper}>
      <Header>Add new plan</Header>
      <form onSubmit={formSubmitHandler}>
        <UserInput
          htmlFor="planName"
          label="Plan name"
          id="planName"
          type="text"
          inputRef={planNameInput}
        />
        <div className={classes.singleInput}>
          <label htmlFor="end_date">Priority</label>
          <Selectable
            options={["High", "Medium", "Low"]}
            onSelectChange={priorityChangeHandler}
            customClass={classes.prioritySelectable}
          />
        </div>
        <SubmitFormButton caption="Add" />
      </form>
    </div>
  );
};

export default AddPlan;

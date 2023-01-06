import React from "react";
import classes from "./SinglePlan.module.css";
import usePlanCrud from "../../../../hooks/use-plan-crud";

const SinglePlan = (props) => {
  const {
    name,
    priority,
    dateCreated,
    completed,
    _id: id,
    dateCompleted,
  } = props.plan;
  const { onCRUD } = props;
  const { deletePlan, updatePlan } = usePlanCrud();

  const deletePlanHandler = async () => {
    await deletePlan(id);
    await onCRUD();
  };

  const markCompleteHandler = async () => {
    await updatePlan(id, {
      completed: true,
      dateCompleted: Date.now(),
    });
    await onCRUD();
  };

  const incompletedPlan = !completed && (
    <li>
      <p>{name}</p>
      <p>{priority}</p>
      <p>{dateCreated}</p>
      <div>
        <button onClick={deletePlanHandler}>Delete plan</button>
        <button onClick={markCompleteHandler}>Mark as complete</button>
      </div>
    </li>
  );

  const completedPlan = completed && (
    <li>
      <p>{name}</p>
      <p>{priority}</p>
      <p>{dateCreated}</p>
      <p>{dateCompleted}</p>
      <div>
        <button onClick={deletePlanHandler}>Delete plan</button>
      </div>
    </li>
  );

  return completed ? completedPlan : incompletedPlan;
};

export default SinglePlan;

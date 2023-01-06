import React from "react";
import classes from "./SinglePlan.module.css";
import usePlanCrud from "../../../../hooks/use-plan-crud";
import { MONTHS } from "../../ExpensesInfo/services/GetExpensesData";

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

  const dateCreatedObj = new Date(dateCreated);

  const dateCreatedToBeDisplayed = `${dateCreatedObj.getDate()} ${
    MONTHS[dateCreatedObj.getMonth()].name
  } ${dateCreatedObj.getFullYear()}`;

  let dateCompletedToBeDisplayed;
  if (dateCompleted) {
    const dateCompletedObj = new Date(dateCompleted);
    dateCompletedToBeDisplayed = `${dateCompletedObj.getDate()} ${
      MONTHS[dateCompletedObj.getMonth()].name
    } ${dateCompletedObj.getFullYear()}`;
  }

  const markFailedHandler = () => {};

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

  const renderListItem = () => {
    return (
      <li className={classes.plansListItem}>
        <div className={classes.plansListItemContent}>
          <div className={classes.planInfos}>
            <h2 className={classes.planName}>{name}</h2>
            <p className={classes.planPriority}>{priority}</p>
          </div>
          <div className={classes.planDates}>
            <p className={classes.planDate}>{dateCreatedToBeDisplayed}</p>
            {completed && (
              <p className={classes.planDate}>{dateCompletedToBeDisplayed}</p>
            )}
          </div>
        </div>
        <div className={classes.plansButtons}>
          {!completed && (
            <button
              onClick={markCompleteHandler}
              className={classes.completedPlanButton}
            >
              Mark as completed
            </button>
          )}
          <button
            onClick={deletePlanHandler}
            className={classes.deletePlanButton}
          >
            Delete plan
          </button>
          {!completed && (
            <button
              onClick={markFailedHandler}
              className={classes.deletePlanButton}
            >
              Mark as failed
            </button>
          )}
        </div>
      </li>
    );
  };

  return renderListItem();
};

export default SinglePlan;

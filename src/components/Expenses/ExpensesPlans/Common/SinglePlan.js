import React, { useState } from "react";
import classes from "./SinglePlan.module.css";
import usePlanCrud from "../../../../hooks/use-plan-crud";
import { MONTHS } from "../../ExpensesInfo/services/chartData";
import ConfirmationModal from "../../../UI/ConfirmationModal";
import ReactDOM from "react-dom";

const SinglePlan = (props) => {
  const [deleteModalIsVisible, setDeleteModalIsVisible] = useState(false);
  const [completeModalIsVisible, setCompleteModalIsVisible] = useState(false);
  const [incompleteModalIsVisible, setIncompleteModalIsVisible] =
    useState(false);
  const {
    name,
    priority,
    dateCreated,
    status,
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

  const markIncompleteHandler = async () => {
    await updatePlan(id, {
      status: "Incompleted",
      dateCompleted: Date.now(),
    });
    await onCRUD();
  };

  const deletePlanHandler = async () => {
    await deletePlan(id);
    await onCRUD();
  };

  const markCompleteHandler = async () => {
    await updatePlan(id, {
      status: "Completed",
      dateCompleted: Date.now(),
    });
    await onCRUD();
  };

  const rejectDeletionHandler = () => setDeleteModalIsVisible(false);
  const rejectCompletionHandler = () => setCompleteModalIsVisible(false);
  const rejectIncompletionHandler = () => setIncompleteModalIsVisible(false);

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
            {status !== "Active" && (
              <p className={classes.planDate}>{dateCompletedToBeDisplayed}</p>
            )}
          </div>
        </div>
        <div className={classes.plansButtons}>
          {status === "Active" && (
            <button
              onClick={() => {
                setCompleteModalIsVisible(true);
              }}
              className={classes.completedPlanButton}
            >
              Mark as completed
            </button>
          )}
          <button
            onClick={() => {
              setDeleteModalIsVisible(true);
            }}
            className={
              status === "Active"
                ? `${classes.deletePlanButton}`
                : `${classes.deletePlanButton} ${classes.singleButton}`
            }
          >
            Delete plan
          </button>
          {status === "Active" && (
            <button
              onClick={() => {
                setIncompleteModalIsVisible(true);
              }}
              className={classes.deletePlanButton}
            >
              Mark as incompleted
            </button>
          )}
        </div>
      </li>
    );
  };

  return (
    <>
      {deleteModalIsVisible &&
        ReactDOM.createPortal(
          <ConfirmationModal
            message="You are about to delete delete plan. Are you sure?"
            onAccept={deletePlanHandler}
            onReject={rejectDeletionHandler}
            visible={deleteModalIsVisible}
          />,
          document.getElementById("modal")
        )}
      {completeModalIsVisible &&
        ReactDOM.createPortal(
          <ConfirmationModal
            message="Are you sure you want to mark as complete this plan?"
            onAccept={markCompleteHandler}
            onReject={rejectCompletionHandler}
            visible={completeModalIsVisible}
          />,
          document.getElementById("modal")
        )}
      {incompleteModalIsVisible &&
        ReactDOM.createPortal(
          <ConfirmationModal
            message="Are you sure you want to mark as incomplete this plan?"
            onAccept={markIncompleteHandler}
            onReject={rejectIncompletionHandler}
            visible={incompleteModalIsVisible}
          />,
          document.getElementById("modal")
        )}
      {renderListItem()}
    </>
  );
};

export default SinglePlan;

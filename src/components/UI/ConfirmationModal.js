import React from "react";
import classes from "./ConfirmationModal.module.css";

const Backdrop = ({ children, onReject }) => {
  return (
    <div className={classes.backdrop} onClick={onReject}>
      {children}
    </div>
  );
};

const ConfirmationModal = ({ message, onAccept, onReject }) => {
  return (
    <Backdrop onReject={onReject}>
      <div className={classes.modalWrapper}>
        <h2 className={classes.modalHeader}>{message}</h2>
        <footer className={classes.modalFooter}>
          <button onClick={onAccept} className={classes.confirmModalButton}>
            Yes
          </button>
          <button onClick={onReject} className={classes.rejectModalButton}>
            No
          </button>
        </footer>
      </div>
    </Backdrop>
  );
};

export default ConfirmationModal;

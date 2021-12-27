import React from "react";
import { createPortal } from "react-dom";
import styles from "./Popup.module.scss";

const Popup = ({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => {};
  children: React.ReactNode;
}) => {
  return createPortal(
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span onClick={onClose} className={styles.close}>
          &times;
        </span>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.getElementById("top")!
  );
};

export default Popup;

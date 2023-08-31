import React from "react";
import styles from "./MessageItem.module.css";

function MessageItem(props) {
  const {
    data: { from, text },
  } = props;
  if (from === "client") {
    return (
      <div className={styles.container}>
        <div className={styles.client}>
          <i className="fa-regular fa-circle-user fa-2xl"></i>
          <p>{text}</p>
        </div>
      </div>
    );
  }
  if (from === "end") {
    return (
      <div className={styles.container}>
        <p className={styles.end}>User ended consultation session</p>
        <p className={styles.end}>
          System will auto remove this session affter 5s
        </p>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.staff}>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default MessageItem;

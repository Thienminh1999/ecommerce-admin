import React from "react";
import styles from "./Header.module.css";

function Header(props) {
  return (
    <div className={styles.container}>
      <button>Logout</button>
    </div>
  );
}

export default Header;

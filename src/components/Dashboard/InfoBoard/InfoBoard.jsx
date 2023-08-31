import React from "react";
import styles from "./InfoBoard.module.css";
import { USDollar } from "../../../utils/Utils";

function InfoBoard(props) {
  const {
    data: { sumOfOrder, sumOfRevenue, userAmount },
  } = props;
  const revenue = USDollar.format(sumOfRevenue);
  return (
    <div className={styles.container}>
      <div className={styles.info_card}>
        <div>
          <h2> {userAmount}</h2>
          <p>Clients</p>
        </div>
        <i className="fa-solid fa-user-plus"></i>
      </div>
      <div className={styles.info_card}>
        <div>
          <h2>
            {revenue}
            <sup> VND</sup>
          </h2>
          <p>Earning of month</p>
        </div>
        <i className="fa-solid fa-dollar-sign"></i>
      </div>
      <div className={styles.info_card}>
        <div>
          <h2> {sumOfOrder}</h2>
          <p>New Orders</p>
        </div>
        <i className="fa-solid fa-file-circle-plus"></i>
      </div>
    </div>
  );
}

export default InfoBoard;

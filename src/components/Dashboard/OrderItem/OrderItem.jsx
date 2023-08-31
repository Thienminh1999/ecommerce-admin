import React from "react";
import styles from "./OrderItem.module.css";
import { USDollar } from "../../../utils/Utils";

function OrderItem(props) {
  const { order } = props;
  const totalPrice = USDollar.format(order.price);
  return (
    <tr className={styles.container}>
      <td>{order.user}</td>
      <td>{order.customerInfo.fullName}</td>
      <td>{order.customerInfo.phone}</td>
      <td>{order.customerInfo.address}</td>

      <td>{totalPrice}</td>
      <td>{order.delivery}</td>
      <td>{order.status}</td>

      <td className={styles.actions}>
        <div className={styles.btns}>
          <button className={styles.green}>View</button>
        </div>
      </td>
    </tr>
  );
}

export default OrderItem;

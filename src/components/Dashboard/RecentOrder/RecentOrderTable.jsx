import React from "react";
import styles from "./RecentOrderTable.module.css";
import OrderItem from "../OrderItem/OrderItem";

function RecentOrderTable(props) {
  const { orders } = props;
  return (
    <div className={styles.container}>
      <h3>History</h3>
      {orders.length === 0 && <p>Recent order not found</p>}
      {orders.length > 0 && (
        <table>
          <thead>
            <tr className={styles.header}>
              <th>ID User</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Total</th>
              <th>Delivery</th>
              <th>Status</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <OrderItem key={index} order={item} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RecentOrderTable;

import React from "react";
import styles from "./Dashboard.module.css";
import { json, useLoaderData } from "react-router-dom";
import { AdminAPI } from "../../apis/adminAPIs";
import InfoBoard from "../../components/Dashboard/InfoBoard/InfoBoard";
import RecentOrderTable from "../../components/Dashboard/RecentOrder/RecentOrderTable";

function Dashboard(props) {
  const data = useLoaderData();
  return (
    <div className={styles.container}>
      <h3>Dashboard</h3>
      <InfoBoard data={data} />
      <div className={styles.card}>
        <RecentOrderTable orders={data.recentOrders} />
      </div>
    </div>
  );
}

export default Dashboard;
export const loader = async () => {
  const res = await AdminAPI.getInfoBoard();
  if (res.status === 200) {
    return res.data;
  } else {
    return json({ message: "Something went wrong" }, { status: 500 });
  }
};

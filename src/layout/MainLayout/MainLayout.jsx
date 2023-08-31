import React from "react";
import styles from "./MainLayout.module.css";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import ProtectionRoute from "../../components/ProtectionRoute/ProtectionRoute";

function MainLayout(props) {
  return (
    <ProtectionRoute>
      <div className={styles.container}>
        <NavBar />
        <div className={styles.body}>
          <Outlet />
        </div>
      </div>
    </ProtectionRoute>
  );
}

export default MainLayout;

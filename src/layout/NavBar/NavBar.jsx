import React from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { AuthAPI } from "../../apis/authAPIs";
import { enqueueSnackbar } from "notistack";
import { redirect, useNavigate } from "react-router-dom";

function NavBar(props) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await AuthAPI.logout();
    if (res.status === 200) {
      enqueueSnackbar("Logout Success", { variant: "success" });
      navigate("/login");
    } else {
      enqueueSnackbar("Logout Fail", { variant: "error" });
    }
  };
  return (
    <div className={styles.container}>
      <h2>Dashboard</h2>
      <ul className={styles.menu}>
        <li className={styles.nav_item}>
          <NavLink to="/dashboard">
            <i className="fa-solid fa-house"></i> Dashboard
          </NavLink>
        </li>
        <li className={styles.nav_item}>
          <NavLink to="/products">
            <i className="fa-solid fa-box-archive"></i> Products
          </NavLink>
        </li>
        <li className={styles.nav_item}>
          <NavLink to="/chat">
            <i className="fa-regular fa-comments"></i> Chat Rooms
          </NavLink>
        </li>
      </ul>
      <ul className={`${styles.menu} ${styles.bottom}`}>
        <li className={styles.nav_item}>
          <NavLink onClick={handleLogout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;

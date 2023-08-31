import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { Form, json, useNavigate } from "react-router-dom";
import { AuthAPI } from "../../apis/authAPIs";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { AuthActions } from "../../stores/auth";

function LoginPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    const res = await AuthAPI.login({ ...formProps, role: "ADMIN" });
    if (res.status !== 200) {
      enqueueSnackbar("Login Fail!", { variant: "error" });
      setErrors(res.data);
    } else {
      enqueueSnackbar("Login Success!", { variant: "success" });
      handleUserLogin(res.data.user);
    }
  };

  const handleUserLogin = (user) => {
    dispatch(AuthActions.onLogin(user));
    navigate("/dashboard");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Admin Login</h1>
        {errors && (
          <>
            <p className={`${styles["error-text"]}`}>{errors.message}</p>
          </>
        )}
        <Form className={styles.form} onSubmit={handleSubmit} method="post">
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />

          <button>Login</button>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;

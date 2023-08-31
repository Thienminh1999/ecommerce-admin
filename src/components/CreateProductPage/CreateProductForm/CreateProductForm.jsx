import React from "react";
import styles from "./CreateProductForm.module.css";
import { Form, useNavigate } from "react-router-dom";
import { ProductAPI } from "../../../apis/productAPIs";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

function CreateProductForm(props) {
  const navigate = useNavigate();
  const [errs, setErrors] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const res = await ProductAPI.addNewProduct(data);
    console.log(res);
    if (res.status === 201) {
      enqueueSnackbar("Add new product success!", { variant: "success" });
      navigate("/products");
    } else {
      setErrors(res.data.data);
      enqueueSnackbar("Add new product fail!", { variant: "error" });
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      method="post"
      className={styles.container}
    >
      {errs && (
        <ul className={styles.errors}>
          {errs.map((err, index) => (
            <li key={index}>{err.msg}</li>
          ))}
        </ul>
      )}
      <div className={styles.form_controller}>
        <label>Product Name</label>
        <input type="text" name="name" placeholder="Enter product name" />
      </div>
      <div className={styles.form_controller}>
        <label>Category</label>
        <input type="text" name="category" placeholder="Enter Category" />
      </div>
      <div className={styles.form_controller}>
        <label>Short description</label>
        <textarea
          rows={3}
          type="text"
          name="short_desc"
          placeholder="Enter Short description"
        />
      </div>
      <div className={styles.form_controller}>
        <label>Long description</label>
        <textarea
          rows={5}
          type="text"
          name="long_desc"
          placeholder="Enter Long description"
        />
      </div>
      <div className={styles.form_controller}>
        <label>Price</label>
        <input type="text" name="price" placeholder="Enter Price" />
      </div>
      <div className={styles.form_controller}>
        <label>Inventory Quantity</label>
        <input
          type="text"
          name="inventoryQuantity"
          placeholder="Enter Inventory Quantity"
        />
      </div>
      <div className={styles.form_controller}>
        <label>Upload images (4 images)</label>
        <input type="file" name="images" multiple="multiple" />
      </div>
      <button type="submit">Submit</button>
    </Form>
  );
}

export default CreateProductForm;

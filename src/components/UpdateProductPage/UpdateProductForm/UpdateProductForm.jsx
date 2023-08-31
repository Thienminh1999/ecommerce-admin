import React from "react";
import { Form, useNavigate } from "react-router-dom";
import { ProductAPI } from "../../../apis/productAPIs";
import { BASE_URL } from "../../../stores/variables";
import styles from "./UpdateProductForm.module.css";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

function UpdateProductForm(props) {
  const { product } = props;
  const navigate = useNavigate();
  const [errs, setErrors] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    const res = await ProductAPI.updateProduct(formProps);
    if (res.status === 200) {
      enqueueSnackbar("Update product success!", { variant: "success" });
      navigate("/products");
    } else {
      setErrors(res.data.data);
      enqueueSnackbar("Update product fail!", { variant: "error" });
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
      <input
        type="text"
        name="productId"
        hidden
        readOnly
        defaultValue={product._id}
      />
      <div className={styles.form_controller}>
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          defaultValue={product.name}
          placeholder="Enter product name"
        />
      </div>
      <div className={styles.form_controller}>
        <label>Category</label>
        <input
          type="text"
          defaultValue={product.category}
          name="category"
          placeholder="Enter Category"
        />
      </div>
      <div className={styles.form_controller}>
        <label>Short description</label>
        <textarea
          defaultValue={product.short_desc}
          rows={3}
          type="text"
          name="short_desc"
          placeholder="Enter Short description"
        />
      </div>
      <div className={styles.form_controller}>
        <label>Long description</label>
        <textarea
          defaultValue={product.long_desc}
          rows={5}
          type="text"
          name="long_desc"
          placeholder="Enter Long description"
        />
      </div>
      <div className={styles.form_controller}>
        <label>Price</label>
        <input
          type="text"
          defaultValue={product.price}
          name="price"
          placeholder="Enter Price"
        />
      </div>
      <div className={styles.form_controller}>
        <label>Inventory Quantity</label>
        <input
          type="text"
          name="inventoryQuantity"
          defaultValue={product.inventoryQuantity}
          placeholder="Enter Inventory Quantity"
        />
      </div>
      <div className={styles.form_controller}>
        <label>Upload images (4 images)</label>
        <div className={styles.images}>
          <img alt={product.name} src={`${BASE_URL}/${product.img1}`} />
          <img alt={product.name} src={`${BASE_URL}/${product.img2}`} />
          <img alt={product.name} src={`${BASE_URL}/${product.img3}`} />
          <img alt={product.name} src={`${BASE_URL}/${product.img4}`} />
        </div>
      </div>
      <button type="submit">Update</button>
    </Form>
  );
}

export default UpdateProductForm;

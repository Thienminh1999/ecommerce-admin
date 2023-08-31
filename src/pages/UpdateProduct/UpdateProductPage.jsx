import React from "react";
import { ProductAPI } from "../../apis/productAPIs";
import { useLoaderData } from "react-router-dom";
import styles from "./UpdateProductPage.module.css";
import UpdateProductForm from "../../components/UpdateProductPage/UpdateProductForm/UpdateProductForm";

function UpdateProductPage(props) {
  const data = useLoaderData();
  console.log(data);
  return (
    <div className={styles.container}>
      <h3>Update Product</h3>
      {data && <UpdateProductForm product={data.product} />}
      {!data && <p>Something went wrong</p>}
    </div>
  );
}

export default UpdateProductPage;

export const loader = async ({ params }) => {
  const productId = params.productId;
  const res = await ProductAPI.getProductDetails(productId);
  if (res.status === 200) {
    return res.data;
  }
  return null;
};

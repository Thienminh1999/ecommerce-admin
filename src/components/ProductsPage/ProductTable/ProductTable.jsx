import React from "react";
import styles from "./ProductTable.module.css";
import ProductItem from "../ProductItem/ProductItem";
import PaginationBar from "../PaginationBar/PaginationBar";
import { ProductAPI } from "../../../apis/productAPIs";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

function ProductTable(props) {
  const { products } = props;
  const navigate = useNavigate();
  const handleDelete = async ({ productId, rowElement }) => {
    const isRemove = window.confirm("Are you sure to remove this product");
    if (isRemove) {
      const res = await ProductAPI.deleteProduct(productId);
      if (res.status === 200) {
        rowElement.remove();
        enqueueSnackbar("Delete product success", { variant: "success" });
      } else {
        enqueueSnackbar("Delete product fail", { variant: "error" });
      }
    }
  };

  const handleUpdate = (productId) => {
    navigate(`update/${productId}`);
  };
  return (
    <div className={styles.container}>
      {products.results?.length === 0 && <p>No products found</p>}
      {products.results?.length > 0 && (
        <>
          <table>
            <thead>
              <tr className={styles.header}>
                <th>ID </th>
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Category</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {products.results?.map((item, index) => (
                <ProductItem
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  key={index}
                  product={item}
                />
              ))}
            </tbody>
          </table>
          <PaginationBar />
        </>
      )}
    </div>
  );
}

export default ProductTable;

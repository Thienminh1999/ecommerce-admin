import React from "react";
import styles from "./ProductItem.module.css";
import { USDollar } from "../../../utils/Utils";
import { BASE_URL } from "../../../stores/variables";

function ProductItem(props) {
  const { product, onDelete, onUpdate } = props;
  const price = USDollar.format(Number(product.price)) + " VND";
  const handleClickDelete = (event) => {
    const row = event.target.closest("#row");
    onDelete({ productId: product._id, rowElement: row });
  };
  const handleClickUpdate = () => {
    onUpdate(product._id);
  };
  return (
    <tr id="row" className={styles.container}>
      <td>{product._id}</td>
      <td>{product.name}</td>

      <td>{price}</td>

      <td className={styles.wrapper}>
        <img alt={product.name} src={`${BASE_URL}/${product.img1}`} />
      </td>
      <td>{product.category}</td>
      <td className={styles.actions}>
        <div className={styles.btns}>
          <button onClick={handleClickUpdate} className={styles.green}>
            Update
          </button>
          <button
            onClick={(event) => handleClickDelete(event)}
            className={styles.red}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ProductItem;

import React, { useEffect, useState } from "react";
import styles from "./ProductsPage.module.css";
import ProductTable from "../../components/ProductsPage/ProductTable/ProductTable";
import { ProductAPI } from "../../apis/productAPIs";
import { useDispatch, useSelector } from "react-redux";
import { FilterSearchActions } from "../../stores/productsFilter";
import { Link } from "react-router-dom";

function ProductsPage(props) {
  const { page, productName } = useSelector((state) => state.filterSearch);
  const [nameValue, setNameValue] = useState("");
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const fetchProduct = async () => {
    const res = await ProductAPI.searchProduct(
      { productName, category: "" },
      page
    );
    if (res.status === 200) {
      setProducts(res.data);
      dispatch(FilterSearchActions.setCurrentPage(res.data.page));
      dispatch(FilterSearchActions.setTotalPage(res.data.total_pages));
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [page, productName]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      dispatch(FilterSearchActions.setFilterName(nameValue));
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [nameValue]);

  const handleChangeProductName = (event) => {
    setNameValue(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h3>Products</h3>
      <div className={styles.action}>
        <input
          value={nameValue}
          onChange={handleChangeProductName}
          className={styles.search_input}
          placeholder="Enter Search!"
        />
        <Link to="create" className={styles.new_product}>
          New Product
        </Link>
      </div>

      <ProductTable products={products} />
    </div>
  );
}

export default ProductsPage;

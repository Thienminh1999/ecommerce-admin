import axiosInstance from "./config/AxiosConfig";

export const ProductAPI = {
  searchProduct: async function (dataFilter, page) {
    try {
      const response = await axiosInstance.post(
        `products/all?page=${page}`,
        dataFilter
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },
  addNewProduct: async function (data) {
    try {
      const response = await axiosInstance.post(`products/create`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
  deleteProduct: async function (productId) {
    try {
      const response = await axiosInstance.delete(`products/${productId}`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
  updateProduct: async function (data) {
    try {
      const response = await axiosInstance.post(`products/update`, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
  getProductDetails: async function (productId) {
    try {
      const response = await axiosInstance.get(`products/${productId}`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
};

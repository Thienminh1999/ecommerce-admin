import axiosInstance from "./config/AxiosConfig";

export const AuthAPI = {
  login: async function (data) {
    try {
      const response = await axiosInstance.post(`auth/login`, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
  logout: async function (data) {
    try {
      const response = await axiosInstance.post(
        `auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },
  getCurrentUser: async function () {
    try {
      const response = await axiosInstance.get("/auth/user", {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
};

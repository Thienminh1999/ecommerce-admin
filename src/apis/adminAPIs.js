import axiosInstance from "./config/AxiosConfig";

export const AdminAPI = {
  getInfoBoard: async function (data) {
    try {
      const response = await axiosInstance.get(`admin/info-board`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
};

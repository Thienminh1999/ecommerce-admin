import axios from "axios";
import { BASE_URL } from "../../stores/variables";

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  // withCredentials: true,
});

export default axiosInstance;

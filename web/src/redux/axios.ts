import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://159.89.15.199:3000",
});

export default axiosInstance;

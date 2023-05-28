import axios from "axios";
// config
const baseUrl = process.env.REACT_APP_HOST_URL || "http://localhost:3005";
// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use((config) => {
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

export default axiosInstance;

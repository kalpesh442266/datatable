import axios from "axios";
// config
const baseUrl = process.env.REACT_APP_HOST_URL || "http://localhost:3005";
// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
    if (
      error.response.status === 401 &&
      window.location.pathname !== "/auth/login"
    ) {
      // Redirect to the login page
      localStorage.removeItem("accessToken");
      window.location.href = "/auth/login";
    }
  }
);

export default axiosInstance;

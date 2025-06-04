import axios from "axios";
import { getToken } from "../storage/AuthStorage";


const BASE_URL = "http://192.168.182.81:4000/api";


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Request Interceptor: Automatically Add Token to Headers
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await get(); 
      if (token) {
        config.headers.Authorization = `token ${token}`; 
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

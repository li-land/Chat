import axios from "axios";
import { IAuthResponse } from "../interfaces";

// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = "http://localhost:4000/api";

export const http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  config!.headers!.Authtorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

http.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<IAuthResponse>(
          `${API_URL}/auth/refresh`,
          {
            withCredentials: true,
          }
        );
        localStorage.setItem("token", response.data.accessToken);
        return http.request(originalRequest);
      } catch (e) {
        console.log("Не авторизован");
      }
    }
    throw error;
  }
);

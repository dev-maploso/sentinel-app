import axios from "axios";
import { getToken, removeToken } from "@/lib/auth";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

const api = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
});

/**
 * Request Interceptor
 * Attach Bearer Token
 */
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 * Auto logout jika token invalid / expired
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      typeof window !== "undefined" &&
      error.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      removeToken();

      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default api;
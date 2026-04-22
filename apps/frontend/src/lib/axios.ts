import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// For token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const isAuthEndpoint = error.config.url.includes("/auth/login") || error.config.url.includes("/auth/register");

    if ((status === 401 || status === 403) && !isAuthEndpoint) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;

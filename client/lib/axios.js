import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const adminSecret = localStorage.getItem("adminSecret");

      if (adminSecret) {
        config.headers["x-admin-secret"] = adminSecret;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";

    // Allow admin routes to continue without forcing logout
    if (url.includes("/admin")) {
      return Promise.reject(error);
    }

    // 🚫 DO NOT redirect automatically on 401
    // This causes infinite redirect loops with cookie auth
    // Redux or middleware should handle auth state instead

    return Promise.reject(error);
  }
);

export default axiosInstance;

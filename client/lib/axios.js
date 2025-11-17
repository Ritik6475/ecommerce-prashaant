import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Request Interceptor (User Token + Admin Secret)
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const adminSecret = localStorage.getItem('adminSecret');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (adminSecret) {
        config.headers['x-admin-secret'] = adminSecret;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor (Prevent redirect for admin)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";

    // Do NOT redirect admin routes on 401
    if (url.includes('/admin')) {
      return Promise.reject(error);
    }

    // Normal user routes → logout if token expired
    if (status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

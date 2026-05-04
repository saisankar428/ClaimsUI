import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Attach token (example)
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Transform response if needed
    return response.data;
  },
  (error) => {
    const status = error.response?.status;

    // Normalize error
    const normalizedError = {
      message: error.response?.data?.message || "Something went wrong",
      status,
    };

    // Global handling
    if (status === 401) {
      console.error("Unauthorized - redirect to login");
    }

    if (status === 500) {
      console.error("Server error");
    }

    return Promise.reject(normalizedError);
  }
);
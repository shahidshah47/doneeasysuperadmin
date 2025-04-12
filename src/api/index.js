import axios from "axios";

const api = axios.create({
  baseURL: "https://pilot.doneeasy.io", // deploy test Replace with your API URL
  timeout: 10000, // Request timeout (optional)
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = axios.create({
  baseURL: "https://pilot.doneeasy.io", // Replace with your API URL
  timeout: 10000, // Request timeout (optional)
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add request and response interceptors
api.interceptors.request.use(
  (config) => {
    // Add authentication token if needed
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;

import axios from "axios";

const apiClient = axios.create({
  // baseURL: process.env.VITE_SERVICE_API,
  baseURL: "https://api.jikan.moe/v4",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;

import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.SERVICE_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;

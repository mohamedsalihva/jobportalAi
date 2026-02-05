
import axios from "axios";

const resolvedBaseUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: resolvedBaseUrl,
  withCredentials: true,
});
console.log("BACKEND URL:", resolvedBaseUrl);


export default api;

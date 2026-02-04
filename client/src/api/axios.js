
import axios from "axios";

const resolvedBaseUrl = import.meta.env.PROD
  ? "/api"
  : import.meta.env.VITE_BACKEND_URL || "";

const api = axios.create({
  baseURL: resolvedBaseUrl,
  withCredentials: true,
});
console.log("BACKEND URL:", resolvedBaseUrl);


export default api;

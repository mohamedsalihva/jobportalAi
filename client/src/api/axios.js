
import axios from "axios";

const resolvedBaseUrl =
  import.meta.env.VITE_BACKEND_URL || (import.meta.env.PROD ? "/api" : "");

const api = axios.create({
  baseURL: resolvedBaseUrl,
  withCredentials: true,
});
console.log("BACKEND URL:", resolvedBaseUrl);


export default api;

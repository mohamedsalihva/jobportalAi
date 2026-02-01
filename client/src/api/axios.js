
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});
console.log("BACKEND URL:", import.meta.env.VITE_BACKEND_URL);


export default api;

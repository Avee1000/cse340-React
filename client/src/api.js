import axios from "axios";

const API = import.meta.env.VITE_API_URL; // only here

const api = axios.create({
  baseURL: API,
  // You can also add headers, auth tokens, etc. here
});

export default api;

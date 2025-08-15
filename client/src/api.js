import axios from "axios";

// const API = import.meta.env.VITE_API_URL; 

const api = axios.create({
  baseURL: "/",
  // You can also add headers, auth tokens, etc. here
});

export default api;

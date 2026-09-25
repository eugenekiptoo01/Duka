import axios from "axios";

// In local dev, Vite's proxy (see vite.config.js) forwards "/api" to the
// backend on :5000, so a relative path works. In production there's no
// dev-server proxy, so we need the deployed backend's real URL instead -
// set via VITE_API_URL in the hosting platform's environment variables.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

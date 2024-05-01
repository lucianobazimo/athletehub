import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    throw Error(error);
  }
);

export default api;

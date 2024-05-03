import axios from 'axios';
import UniversalCookie from 'universal-cookie';

const cookies = new UniversalCookie(null, { path: '/'})

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Authorization': `Bearer ${cookies.get('token')}`
  }
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

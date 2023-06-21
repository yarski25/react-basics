import axios from 'axios';
import { AuthResponse } from '../types/interfaces/response/AuthResponse';

const API_URL = process.env.REACT_APP_API_URL as string;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        if (response.data.accessToken) localStorage.setItem('token', response.data.accessToken);
        return axios.request(originalRequest);
      } catch (e) {
        console.log('not authorized');
      }
    }
    throw error;
  },
);

export default $api;

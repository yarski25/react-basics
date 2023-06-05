import axios from 'axios';

export const API_URL = `http://localhost:3000`;

// API config
const $api = axios.create({
  withCredentials: true, // to use cookies
  baseURL: API_URL,
});

// each time request interceptor
$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default $api;

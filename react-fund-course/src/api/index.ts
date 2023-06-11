import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { AuthResponse } from '../types/interfaces/response/AuthResponse';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';

// axios base query config

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = {
      baseUrl: '',
    },
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      axios.defaults.withCredentials = true; // to use cookies
      //   const accessToken = localStorage.getItem('access_token');
      //   if (accessToken) {
      //     axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      //   }

      // each time request interceptor
      axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
      });

      // each time response interceptor
      axios.interceptors.response.use(
        (config) => {
          return config;
        },
        async (error) => {
          const originalRequest = error.config;
          if (error.response.status == 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
              const response = await axios.get<AuthResponse>(`${baseUrl}/refresh`, {
                withCredentials: true,
              });
              localStorage.setItem('token', response.data.accessToken);
              return axios.request(originalRequest);
            } catch (e) {
              console.log('not authorized');
            }
          }
          throw error;
        },
      );

      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;

import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { AuthResponse } from '../types/interfaces/response/AuthResponse';

export const API_URL = process.env.REACT_APP_API_URL as string;

// export interface User {
//   first_name: string;
//   last_name: string;
// }

// export interface UserResponse {
//   user: User;
//   token: string;
// }

export interface LoginRequest {
  email: string;
  password: string;
}

// type prepareHeaders = (
//   headers: Headers,
//   api: {
//     getState: () => unknown;
//     extra: unknown;
//     endpoint: string;
//     type: 'query' | 'mutation';
//     forced: boolean | undefined;
//   },
// ) => Headers | void;

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
      axios.defaults.withCredentials = true;
      //   const accessToken = localStorage.getItem('access_token');
      //   if (accessToken) {
      //     axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      //   }

      axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
      });

      axios.interceptors.response.use(
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

export const authAPI = createApi({
  reducerPath: 'Auth API',
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    registration: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/registration',
        method: 'POST',
        data: credentials,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        data: credentials,
      }),
    }),
    logout: builder.mutation<AuthResponse, null>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation } = authAPI;

//export const { useLoginMutation, useProtectedMutation } = api;

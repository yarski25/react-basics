import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { AuthResponse } from '../types/interfaces/response/AuthResponse';

export const API_URL = `http://localhost:4000/api`;

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
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      }
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
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        data: credentials,
        //withCredentials: true,
      }),
    }),
  }),
});

export const { useLoginMutation } = authAPI;

//export const { useLoginMutation, useProtectedMutation } = api;

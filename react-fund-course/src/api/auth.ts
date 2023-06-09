import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { AuthResponse } from '../types/interfaces/response/AuthResponse';

export const API_URL = `http://localhost:3000`;

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

type prepareHeaders = (
  headers: Headers,
  api: {
    getState: () => unknown;
    extra: unknown;
    endpoint: string;
    type: 'query' | 'mutation';
    forced: boolean | undefined;
  },
) => Headers | void;

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string; prepareHeaders?: prepareHeaders } = {
      baseUrl: '',
      prepareHeaders: (headers) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const accessToken = localStorage.getItem('access_token');
        //params.headers.Authorization = `Bearer ${accessToken}`;
        if (accessToken) {
          headers.set('authorization', `Bearer ${accessToken}`);
        }
        return headers;
      },
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
        url: 'login',
        method: 'POST',
        body: credentials,
        withCredentials: true,
      }),
    }),
  }),
});

export const { useLoginMutation } = authAPI;

//export const { useLoginMutation, useProtectedMutation } = api;

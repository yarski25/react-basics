import { createApi } from '@reduxjs/toolkit/query/react';
import { AuthResponse } from '../types/interfaces/response/AuthResponse';
import axiosBaseQuery from '.';

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

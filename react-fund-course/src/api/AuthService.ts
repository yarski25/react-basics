import { createApi } from '@reduxjs/toolkit/query/react';
//import { AuthResponse } from '../types/interfaces/response/AuthResponse';
import axiosBaseQuery from './AxiosBaseQuery';
import { AuthState } from '../store/reducers/AuthSlice';

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
    registration: builder.mutation<AuthState, LoginRequest>({
      query: (credentials) => ({
        url: '/registration',
        method: 'POST',
        data: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    login: builder.mutation<AuthState, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        data: credentials,
      }),
      invalidatesTags: ['Auth'],
      // Pick out data and prevent nested properties in a hook or selector
      // transformResponse: (response: { data: AuthState }) => {
      //   if (response.data.accessToken) localStorage.setItem('token', response.data.accessToken);
      //   return response.data;
      // },
      // // Pick out errors and prevent nested properties in a hook or selector
      // transformErrorResponse: (response: { status: string | number }) => response.status,
      // invalidatesTags: ['Auth'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const { useLoginMutation, useRegistrationMutation, useLogoutMutation } = authAPI;

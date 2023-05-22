import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../types/interfaces/User';

export const userAPI = createApi({
  reducerPath: 'User API',
  baseQuery: fetchBaseQuery({
    //baseUrl: 'https://jsonplaceholder.typicode.com',
    baseUrl: 'http://localhost:5000',
  }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    fetchAllUsers: build.query<IUser[], number>({
      query: (limit = 5) => ({
        url: '/users',
        params: {
          _limit: limit,
        },
      }),
      providesTags: (_result) => ['User'],
    }),
    createUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: 'DELETE',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

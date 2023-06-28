// export const testFunc = {};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse } from '../../types/interfaces/response/AuthResponse';
import { RootState } from '../store';
import { checkAuth, login, logout, registration } from './ActionCreators';
import { UserDTO } from '../../types/interfaces/response/UserDTO';
//import { useContext } from 'react';
//import { AuthContext } from '../../context';

export interface AuthState extends AuthResponse {
  isAuth: boolean;
  isLoading: boolean;
  isError: string;
}

//const { setIsAuth } = useContext(AuthContext);
// user: {id: '', email: '', isActivated: false }
const initialState: AuthState = {
  user: {} as UserDTO,
  isAuth: false,
  isLoading: false,
  isError: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.fulfilled.type, (state, action: PayloadAction<AuthState>) => {
        state.isLoading = false;
        state.isError = '';
        state.isAuth = false;
        state.user = action.payload.user;
      })
      .addCase(registration.pending.type, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(registration.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isAuth = false;
        state.isError = action.payload;
      })
      .addCase(login.fulfilled.type, (state, action: PayloadAction<AuthState>) => {
        state.isLoading = false;
        state.isError = '';
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(login.pending.type, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(login.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isAuth = false;
        state.isError = action.payload;
      })
      .addCase(logout.fulfilled.type, (state) => {
        state.isLoading = false;
        state.isError = '';
        state.isAuth = false;
      })
      .addCase(logout.pending.type, (state) => {
        state.isLoading = true;
        state.isAuth = true;
      })
      .addCase(logout.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isAuth = true;
        state.isError = action.payload;
      })
      .addCase(checkAuth.fulfilled.type, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.isError = '';
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(checkAuth.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isAuth = false;
        state.isError = action.payload;
      });
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state: RootState) => state.auth.user.email;

export const selectAuth = (state: RootState) => state.auth.isAuth;

export const selectLoading = (state: RootState) => state.auth.isLoading;

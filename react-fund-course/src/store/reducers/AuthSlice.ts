// export const testFunc = {};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse } from '../../types/interfaces/response/AuthResponse';
import { RootState } from '../store';
import { login, registration } from './ActionCreators';
//import { useContext } from 'react';
//import { AuthContext } from '../../context';

export interface AuthState extends AuthResponse {
  isAuth: boolean;
  isLoading: boolean;
  isError: string;
}

//const { setIsAuth } = useContext(AuthContext);

const initialState: AuthState = {
  user: { id: '', email: '', isActivated: false },
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
      });
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.authReducer.user.id;

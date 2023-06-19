// export const testFunc = {};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse } from '../../types/interfaces/response/AuthResponse';
import { RootState } from '../store';
//import { useContext } from 'react';
//import { AuthContext } from '../../context';

// interface LoginState extends AuthResponse {
//   isLogging: boolean;
//   error: string;
// }

//const { setIsAuth } = useContext(AuthContext);

const initialState: AuthResponse = {
  user: { id: '', email: '', isActivated: false },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user;
    },
  },
  //extraReducers: (builder) => {},
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.authReducer.user.id;

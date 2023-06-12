// export const testFunc = {};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse } from '../../types/interfaces/response/AuthResponse';

// interface LoginState extends AuthResponse {
//   isLogging: boolean;
//   error: string;
// }

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
  // extraReducers: (builder) => {},
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

//import { createSlice } from '@reduxjs/toolkit';
//import { authAPI } from '../../api/auth';

// type AuthState = {
//   user: User | null;
//   token: string | null;
// };

export const test = function () {
  console.log('TO DO');
};

// export const authSlice = createSlice({
//   name: 'auth',
//   //initialState: { user: null, token: null } as AuthState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addMatcher(authAPI.endpoints.login.matchFulfilled, (state, { payload }) => {
//       state.token = payload.token;
//       state.user = payload.user;
//     });
//   },
// });

// export default authSlice.reducer;

//export const selectCurrentUser = (state: RootState) => state.auth.user

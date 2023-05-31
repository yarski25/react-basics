import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../types/interfaces/User';
import { fetchUsers } from './ActionCreators';

interface UserState {
  users: IUser[];
  isUsersLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  isUsersLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    usersFetching(state) {
      state.isUsersLoading = true;
    },
    usersFetchingSuccess(state, action: PayloadAction<IUser[]>) {
      state.isUsersLoading = false;
      state.error = '';
      state.users = action.payload;
    },
    usersFetchingError(state, action: PayloadAction<string>) {
      state.isUsersLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled.type, (state, action: PayloadAction<IUser[]>) => {
        state.isUsersLoading = false;
        state.error = '';
        state.users = action.payload;
      })
      .addCase(fetchUsers.pending.type, (state) => {
        state.isUsersLoading = true;
      })
      .addCase(fetchUsers.rejected.type, (state, action: PayloadAction<string>) => {
        state.isUsersLoading = false;
        state.error = action.payload;
      });
  },
  // extraReducers: {
  //   [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
  //     state.isUsersLoading = false;
  //     state.error = '';
  //     state.users = action.payload;
  //   },
  //   [fetchUsers.pending.type]: (state) => {
  //     state.isUsersLoading = true;
  //   },
  //   [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.isUsersLoading = false;
  //     state.error = action.payload;
  //   },
  // },
});

export default userSlice.reducer;

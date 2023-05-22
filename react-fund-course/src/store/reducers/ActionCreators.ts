import axios from 'axios';
import { IUser } from '../../types/interfaces/User';
import { createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(userSlice.actions.usersFetching());
//     const response = await axios.get<IUser[]>(
//       `https://jsonplaceholder.typicode.com/users`,
//     );
//     dispatch(userSlice.actions.usersFetchingSuccess(response.data));
//   } catch (e) {
//     dispatch(userSlice.actions.usersFetchingError((e as Error).message));
//   }
// };

export const fetchUsers = createAsyncThunk(
  'user/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IUser[]>(
        `https://jsonplaceholder.typicode.com/userss`,
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(`No users loaded`);
    }
  },
);

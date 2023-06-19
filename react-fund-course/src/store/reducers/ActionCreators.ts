import axios from 'axios';
import { IUser } from '../../types/interfaces/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { AuthResponse } from '../../types/interfaces/response/AuthResponse';
// import { API_URL } from '../../api/AuthService';
// import { useDispatch } from 'react-redux';
// import { setCredentials } from './AuthSlice';

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
//const dispatch = useDispatch();

export const fetchUsers = createAsyncThunk('user/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get<IUser[]>(`https://jsonplaceholder.typicode.com/users`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(`No users loaded`);
  }
});

// export const checkAuth = createAsyncThunk('checkAuth', async (_, thunkAPI) => {
//   try {
//     const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
//     if (response.data.accessToken) localStorage.setItem('token', response.data.accessToken);
//     dispatch(setCredentials(response.data));
//     return response.data;
//   } catch (e) {
//     return thunkAPI.rejectWithValue(`No users loaded`);
//   }
// });

import axios from 'axios';
import { IUser } from '../../types/interfaces/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_URL,
  //API_URL,
  LoginRequest,
} from '../../api/AuthService';
import authAPI from '../../api/authAPI';
import { AuthResponse } from '../../types/interfaces/response/AuthResponse';
// import { AuthResponse } from '../../types/interfaces/response/AuthResponse';
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

export const fetchUsers = createAsyncThunk('user/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get<IUser[]>(`https://jsonplaceholder.typicode.com/users`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(`No users loaded`);
  }
});

// Auth thunks

export const registration = createAsyncThunk(
  'auth/registration',
  async ({ email, password }: LoginRequest, thunkAPI) => {
    try {
      const response = await authAPI.registration(email, password);
      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
      }
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(`User with email ${email} is not registered`);
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: LoginRequest, thunkAPI) => {
    try {
      const response = await authAPI.login(email, password);
      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
      }
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(`User with email ${email} is not logged in`);
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await authAPI.logout();
    localStorage.removeItem('token');
    return response;
  } catch (e) {
    return thunkAPI.rejectWithValue(`Error logout`);
  }
});

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, thunkAPI) => {
  try {
    const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
    if (response.data.accessToken) localStorage.setItem('token', response.data.accessToken);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(`Not authorized`);
  }
});

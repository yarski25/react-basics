import axios from 'axios';
import { IUser } from '../../types/interfaces/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  //API_URL,
  LoginRequest,
} from '../../api/AuthService';
import authAPI from '../../api/authAPI';
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

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: LoginRequest, thunkAPI) => {
    try {
      //const dispatch = useDispatch();
      const response = await authAPI.login(email, password);
      console.log(response);
      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        //dispatch(setCredentials(response.data));
      }
      // await loginUser({ email, password })
      //   .unwrap()
      //   .then((response) => {
      //     if (response.accessToken) {
      //       localStorage.setItem('token', response.accessToken);
      //     }
      //     console.log(response);
      //     return response;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(`User with email ${email} is not logged in`);
    }
  },
);

// export const userLogin = createAsyncThunk(
//   'auth/login',
//   async ({ email, password }: LoginRequest, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };

//       const { data } = await axios.post(`${API_URL}/login`, { email, password }, config);

//       // store user's token in local storage
//       localStorage.setItem('userToken', data.userToken);

//       return data;
//     } catch (error) {
//       // return custom error message from API if any
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   },
// );

export const registration = createAsyncThunk(
  'auth/registration',
  async ({ email, password }: LoginRequest, thunkAPI) => {
    try {
      const response = await authAPI.registration(email, password);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(`User with email ${email} is not registered`);
    }
  },
);

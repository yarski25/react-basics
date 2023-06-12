import { $CombinedState, PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/UserSlice';
import authReducer from './reducers/AuthSlice';
import { userAPI } from '../api/UserService';
import { authAPI } from '../api/AuthService';

const rootReducer = combineReducers({
  userReducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  authReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }).concat(
        userAPI.middleware,
        authAPI.middleware,
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer> & {
  readonly [$CombinedState]?: undefined;
};
export type AppStore = ReturnType<typeof setupStore> & {
  readonly [$CombinedState]?: undefined;
};
export type AppDispatch = AppStore['dispatch'];

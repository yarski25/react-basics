import { $CombinedState, PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/UserSlice';
import { userAPI } from '../api/UserService';
import { authAPI } from '../api/auth';

const rootReducer = combineReducers({
  userReducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
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

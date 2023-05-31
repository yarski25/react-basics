import { $CombinedState, PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/UserSlice';
import { userAPI } from '../api/UserService';

const rootReducer = combineReducers({
  userReducer,
  [userAPI.reducerPath]: userAPI.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }).concat(
        userAPI.middleware,
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

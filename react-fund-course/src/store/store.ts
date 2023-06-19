import {
  $CombinedState,
  PreloadedState,
  Reducer,
  Store,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import userReducer from './reducers/UserSlice';
import auth from './reducers/AuthSlice';
import { userAPI } from '../api/UserService';
import { authAPI } from '../api/AuthService';
import { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';

const rootReducer: Reducer = combineReducers({
  userReducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  auth,
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

const store: Store = setupStore({});

export default store;

// export type RootState = ReturnType<typeof rootReducer> & {
//   readonly [$CombinedState]?: undefined;
// };
export type AppStore = ReturnType<typeof setupStore> & {
  readonly [$CombinedState]?: undefined;
};
export type AppDispatch = AppStore['dispatch'];

export type RootState = ReturnType<typeof store.getState> & {
  readonly [$CombinedState]?: undefined;
};

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

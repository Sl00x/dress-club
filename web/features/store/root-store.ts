import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rootApi } from '../api/root-api';
import genderReducer from '../reducers/gender-reducer';
import productReducer from '../reducers/product-reducer';
import userReducer from '../reducers/user-reducer';

export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    [userReducer.reducerPath]: userReducer.reducer,
    [genderReducer.reducerPath]: genderReducer.reducer,
    [productReducer.reducerPath]: productReducer.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rootApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

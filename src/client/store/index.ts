import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector as $useSelector } from 'react-redux';
import { api } from '../api';
import session from './slices/sessionSlice';

export const store = configureStore({
  reducer: {
		session,
		[api.reducerPath]: api.reducer,
	},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = $useSelector;

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector as $useSelector } from 'react-redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { api } from '../api';
import session from './slices/sessionSlice';
import setting from './slices/settingSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
		'session',
		'setting',
	]
}

const combinedReducer = combineReducers({
	session,
	setting,
	[api.reducerPath]: api.reducer,
});

const reducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = $useSelector;

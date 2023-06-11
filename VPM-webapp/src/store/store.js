import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice } from './auth';

const persisConfig = {
  key: 'root',
  version: 1,
  storage,
};
const reducer = combineReducers({
  auth: authSlice.reducer,
});
const persitedReducer = persistReducer(persisConfig, reducer);
export const store = configureStore({
  reducer: persitedReducer,
});

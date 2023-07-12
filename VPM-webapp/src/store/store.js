import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  authSlice,
  criteriaSlice,
  areaSlice,
  activitySlice,
  subareaSlice,
  vectorSlice,
} from './';

const persisConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'],
};
const reducer = combineReducers({
  auth: authSlice.reducer,
  criteria: criteriaSlice.reducer,
  area: areaSlice.reducer,
  subarea: subareaSlice.reducer,
  activity: activitySlice.reducer,
  vector: vectorSlice.reducer,
});
const persitedReducer = persistReducer(persisConfig, reducer);

export const store = configureStore({
  reducer: persitedReducer,
});

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import processReducer from './process';

export const GlobalStore = configureStore({
  reducer: {
    user: userReducer,
    process: processReducer
  },
  devTools:true
})
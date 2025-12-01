import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import agencyCarReducer from './agencycarSlice/agencyCarsSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    agencyCars: agencyCarReducer,

  },
});

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import agencyCarReducer from './agencycarSlice/agencyCarsSlice';
import agency from './agencycarSlice/AgencySlice';
import homeReducer from './homeSlice';
import bookingReducer from '../redux/rentalbookingslice/RentalBookingSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    agencyCars: agencyCarReducer,
    agency: agency,
    home: homeReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

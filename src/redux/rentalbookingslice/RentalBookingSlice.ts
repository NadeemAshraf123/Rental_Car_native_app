import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../api/api';



export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData) => {
    const response = await API.post("/rentalBooking", bookingData);
    return response.data;
  }
);

const rentalBookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state) => {
        state.loading = false;
        state.error = "Booking Failed!";
      });
  }
});

export default rentalBookingSlice.reducer;

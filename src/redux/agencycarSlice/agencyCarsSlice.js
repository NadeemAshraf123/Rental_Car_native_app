import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAgencyCars, addAgencyCar } from '../../api/api';

export const getAgencyCars = createAsyncThunk(
  'agencyCars/getAgencyCars',
  async (agencyId) => {
    return await fetchAgencyCars(agencyId);
  }
);

export const createAgencyCar = createAsyncThunk(
  'agencyCars/createAgencyCar',
  async ({ agencyId, carData }) => {
    return await addAgencyCar(agencyId, carData);
  }
);

const agencyCarSlice = createSlice({
  name: 'agencyCars',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAgencyCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAgencyCars.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getAgencyCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createAgencyCar.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default agencyCarSlice.reducer;

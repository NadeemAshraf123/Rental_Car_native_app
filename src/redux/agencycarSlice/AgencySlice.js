import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addAgency, fetchAgencyById } from '../../api/api';

export const createAgency = createAsyncThunk('agency/createAgency', async (agencyData) => {
  const newAgency = await addAgency(agencyData);
  return newAgency;
});

export const getAgencyById = createAsyncThunk('agency/getAgencyById', async (id) => {
  const agency = await fetchAgencyById(id);
  return agency;
});

const agencySlice = createSlice({
  name: 'agency',
  initialState: {
    currentAgency: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAgency.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAgency.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAgency = action.payload;
      })
      .addCase(getAgencyById.fulfilled, (state, action) => {
        state.currentAgency = action.payload;
      });
  },
});

export default agencySlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addAgency, getAgencyByUserId } from '../../api/api';

interface Agency {
  id: string;
  userId: string;
  name: string;
  phone: string;
  address: string;
}

interface AgencyState {
  currentAgency: Agency | null;
  loading: boolean;
  error: string | null;
}

const initialState: AgencyState = {
  currentAgency: null,
  loading: false,
  error: null,
};

// 1️⃣ fetch agency by userId
export const fetchAgencyByUserId = createAsyncThunk(
  'agency/fetchByUserId',
  async (userId: string) => {
    return await getAgencyByUserId(userId);
  }
);

// 2️⃣ create agency
export const createAgencyThunk = createAsyncThunk(
  'agency/create',
  async (agencyData: Agency) => {
    return await addAgency(agencyData);
  }
);

const agencySlice = createSlice({
  name: 'agency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgencyByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgencyByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAgency = action.payload;
      })
      .addCase(fetchAgencyByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch agency';
      })
      .addCase(createAgencyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAgencyThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAgency = action.payload;
      })
      .addCase(createAgencyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create agency';
      });
  },
});

export default agencySlice.reducer;

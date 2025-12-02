import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addAgency, fetchAgencyById, updateAgencyById } from '../../api/api';


export const createAgency = createAsyncThunk(
  'agency/createAgency',
  async (agencyData) => {
    const newAgency = await addAgency(agencyData);
    return newAgency;
  }
);


export const getAgencyById = createAsyncThunk(
  'agency/getAgencyById',
  async (id) => {
    const agency = await fetchAgencyById(id);
    return agency;
  }
);

export const updateAgency = createAsyncThunk(
  'agency/updateAgency',
  async ({ agencyId, updatedData }) => {
    const data = await updateAgencyById(agencyId, updatedData);
    return data;
  }
);

const agencySlice = createSlice({
  name: 'agency',
  initialState: {
    currentAgency: null, 
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentAgency: (state, action) => {
        state.currentAgency = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(createAgency.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAgency.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAgency = action.payload;
      })
      .addCase(createAgency.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to create agency';
      })
      
      
      .addCase(getAgencyById.pending, (state) => { 
        state.loading = true;
        state.error = null;
      })
      .addCase(getAgencyById.fulfilled, (state, action) => { 
        state.loading = false;
        state.currentAgency = action.payload;
      })
      .addCase(getAgencyById.rejected, (state, action) => { 
        state.loading = false;
        state.error = action.error?.message || 'Failed to fetch agency';
      })


      .addCase(updateAgency.pending, (state) => { 
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAgency.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAgency = action.payload; 
      })
      .addCase(updateAgency.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to update agency';
      });
  },
});
export const { setCurrentAgency } = agencySlice.actions;
export default agencySlice.reducer;
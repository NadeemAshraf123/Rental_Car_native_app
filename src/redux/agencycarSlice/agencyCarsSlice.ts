import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchAgencyCars, addAgencyCar } from '../../api/api';

// Define types
interface Feature {
  icon: string;
  text: string;
}

export interface AgencyCar {
  id: string;
  name: string;
  image: string;
  features: Feature[];
  agencyId?: string;
}

interface AgencyCarsState {
  list: AgencyCar[];
  loading: boolean;
  error: string | null;
}

// Async thunk to get cars by agencyId
export const getAgencyCars = createAsyncThunk<AgencyCar[], string>(
  'agencyCars/getAgencyCars',
  async (agencyId: string) => {
    const cars = await fetchAgencyCars(agencyId);
    return cars;
  }
);

// Async thunk to add a car for a specific agency
export const createAgencyCar = createAsyncThunk<AgencyCar, { agencyId: string; carData: Omit<AgencyCar, 'id' | 'agencyId'> }>(
  'agencyCars/createAgencyCar',
  async ({ agencyId, carData }) => {
    const newCar = await addAgencyCar(agencyId, carData);
    return newCar;
  }
);

// Initial state
const initialState: AgencyCarsState = {
  list: [],
  loading: false,
  error: null,
};

// Slice
const agencyCarSlice = createSlice({
  name: 'agencyCars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAgencyCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAgencyCars.fulfilled, (state, action: PayloadAction<AgencyCar[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getAgencyCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cars';
      })
      .addCase(createAgencyCar.fulfilled, (state, action: PayloadAction<AgencyCar>) => {
        state.list.push(action.payload);
      })
      .addCase(createAgencyCar.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to add car';
      });
  },
});

export default agencyCarSlice.reducer;

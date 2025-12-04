import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API, getCarDetailById } from '../api/api';

export interface HomeCar {
  id: string | number;
  name: string;
  image: string; // image key from API, will be mapped to require in UI if needed
  rating: number;
}

export interface HomeAgencyCard {
  id: string | number;
  name: string;
  image: string;
  rating: number;
}

export interface HomeFamousItem {
  id: string | number;
  name: string;
  detail: string;
  image: string;
  price: string;
}

export interface CarDetail {
  id: string | number;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  specs: { icon: string; label: string; type: string }[];
  features: { icon: string; title: string; subtitle: string }[];
  renter: { name: string; role: string; image: string };
}

interface HomeState {
  carCategories: string[];
  cars: HomeCar[];
  agencyCategories: string[];
  agencies: HomeAgencyCard[];
  famousCategories: string[];
  famousItems: HomeFamousItem[];
  loading: boolean;
  error: string | null;
  currentCarDetail: CarDetail | null;
  carDetailLoading: boolean;
}

const initialState: HomeState = {
  carCategories: [],
  cars: [],
  agencyCategories: [],
  agencies: [],
  famousCategories: [],
  famousItems: [],
  loading: false,
  error: null,
  currentCarDetail: null,
  carDetailLoading: false,
};

// These endpoints assume you will add corresponding collections in db.json:
// "homeCars", "homeAgencies", "homeFamous"
export const fetchHomeData = createAsyncThunk(
  'home/fetchAll',
  async () => {
    const [carsRes, agenciesRes, famousRes] = await Promise.all([
      API.get('/homeCars'),
      API.get('/homeAgencies'),
      API.get('/homeFamous'),
    ]);

    return {
      cars: carsRes.data.cars || carsRes.data.items || carsRes.data,
      carCategories: carsRes.data.categories || [],
      agencies: agenciesRes.data.items || agenciesRes.data,
      agencyCategories: agenciesRes.data.categories || [],
      famousItems: famousRes.data.items || famousRes.data,
      famousCategories: famousRes.data.categories || [],
    };
  }
);

export const fetchCarDetail = createAsyncThunk<CarDetail, string | number>(
  'home/fetchCarDetail',
  async (id) => {
    const detail = await getCarDetailById(id);
    return detail;
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchHomeData.fulfilled,
        (
          state,
          action: PayloadAction<{
            cars: HomeCar[];
            carCategories: string[];
            agencies: HomeAgencyCard[];
            agencyCategories: string[];
            famousItems: HomeFamousItem[];
            famousCategories: string[];
          }>
        ) => {
          state.loading = false;
          state.cars = action.payload.cars || [];
          state.carCategories = action.payload.carCategories || [];
          state.agencies = action.payload.agencies || [];
          state.agencyCategories = action.payload.agencyCategories || [];
          state.famousItems = action.payload.famousItems || [];
          state.famousCategories = action.payload.famousCategories || [];
        }
      )
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load home data';
      })
      .addCase(fetchCarDetail.pending, (state) => {
        state.carDetailLoading = true;
        state.error = null;
      })
      .addCase(fetchCarDetail.fulfilled, (state, action: PayloadAction<CarDetail>) => {
        state.carDetailLoading = false;
        state.currentCarDetail = action.payload;
      })
      .addCase(fetchCarDetail.rejected, (state, action) => {
        state.carDetailLoading = false;
        state.error = action.error.message || 'Failed to load car details';
      });
  },
});

export default homeSlice.reducer;



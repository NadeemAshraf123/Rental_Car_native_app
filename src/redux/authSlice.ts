import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, registerUser, addNotification } from '../api/api';
import { storage } from '../../App';


interface User {
  id: string;
  fullName: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface LoginPayload {
  fullName: string;
  password: string;
}

interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

export const login = createAsyncThunk<User, LoginPayload>(
  'auth/login',
  async ({ fullName, password }, thunkAPI) => {
    const users = await loginUser(fullName, password);
    if (users.length === 0) throw new Error('Invalid credentials');

    const loggedInUser = users[0];

    // await addNotification({
    //   userId: loggedInUser.id,
    //   userName: loggedInUser.fullName,
    //   message: 'User logged in',
    //   timestamp: new Date().toISOString(),
    // });

    return loggedInUser;
  }
);


export const register = createAsyncThunk<User, RegisterPayload>(
  'auth/register',
  async (userData, thunkAPI) => {
    const user = await registerUser(userData);

    // await addNotification({
    //   userId: user.id,
    //   userName: user.fullName,
    //   message: 'User signed up',
    //   timestamp: new Date().toISOString(),
    // });

    return user;
  }
);

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      // Clear user data from storage
      storage.delete('userData');
    },
    restoreUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        // Save user data to storage for persistent login
        storage.set('userData', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })

     
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        // Save user data to storage for persistent login
        storage.set('userData', JSON.stringify(action.payload));
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      });
  },
});


export const { logout, restoreUser } = authSlice.actions;
export default authSlice.reducer;

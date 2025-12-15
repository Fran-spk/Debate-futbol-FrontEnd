import { authService } from "../../services/authServices";
import type { User } from "../../types/user";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// --- THUNK PARA CARGAR EL USUARIO ---
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      const user = await authService.getMe();
      console.log("aver aca:",user);
      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue("No autenticado");
    }
  }
);

export interface AuthState {
  User: User | null;
  Notifications: boolean;
}

const initialState: AuthState = {
  User: null,
  Notifications: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.User = null;
      authService.logout();
    },
    login: (state, action: PayloadAction<User>) => {
      state.User = action.payload;
    },
     setNotifications: (state, action: PayloadAction<boolean>) => {
      state.Notifications = action.payload;
    },
    clearNotifications: (state) => {
      state.Notifications = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.fulfilled, (state, action) => {
        state.User = action.payload as User;
      })
      .addCase(loadUser.rejected, (state) => {
        state.User = null; 
      });
  },
});

export const { login, logout,setNotifications,clearNotifications } = authSlice.actions;
export default authSlice.reducer;

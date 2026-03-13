import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { loginApi } from "./authService";
import toast from "react-hot-toast";
import { saveUser } from "../../utils/storage";
import type { AuthResponse } from "../../types";

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
};

export const login = createAsyncThunk<
  AuthResponse,
  { email: string; password: string }
>("auth/login", async (credentials) => {
  const response = await loginApi(credentials);
  return response;
});

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.token = action.payload.token;
          state.isAuthenticated = true;

          saveUser({ email: action.payload.user.email });
          localStorage.setItem("token", action.payload.token);

          toast.success("Login successful");
        },
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        toast.error((action.payload as string) || "Invalid Credentials");
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
export default authSlice.reducer;

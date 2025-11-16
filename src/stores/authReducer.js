import {
  clearToken,
  clearUser,
  getUser,
  setToken,
  setUser,
} from "@/utils/token";
import { userService } from "@/services/user.service";
import { authService } from "@/services/auth.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: getUser(),
  state: "idle",
};

export const logoutThunkAction = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      clearToken();
      clearUser();
      thunkApi.fulfillWithValue();
    } catch (error) {
      thunkApi.rejectWithValue(error?.response?.data);
      throw error?.response?.data;
    }
  }
);

export const loginThunkAction = createAsyncThunk(
  "auth/login",
  async (data, thunkApi) => {
    try {
      const res = await authService.login(data);
      setToken(res.data);

      const user = await userService.getProfile();
      setUser(user.data);

      thunkApi.fulfillWithValue(user.data);
      return user.data;
    } catch (error) {
      thunkApi.rejectWithValue(error?.response?.data);
      throw error?.response?.data;
    }
  }
);

export const { reducer: authSliceReducer, actions: authActions } = createSlice({
  initialState,
  name: "auth",
  extraReducers: (builder) => {
    builder.addCase(loginThunkAction.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(loginThunkAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "success";
    });
    builder.addCase(loginThunkAction.rejected, (state) => {
      state.status = "error";
    });
    builder.addCase(logoutThunkAction.fulfilled, (state) => {
      state.user = null;
    });
  },
});

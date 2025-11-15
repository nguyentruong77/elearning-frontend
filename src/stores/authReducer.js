import {
  clearToken,
  clearUser,
  getUser,
  setToken,
  setUser,
} from "@/utils/token";
import { LOGOUT_ACTION, SET_USER_ACTION } from "./action";
import { userService } from "@/services/user.service";
import { authService } from "@/services/auth.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: getUser(),
  state: "idle",
};

export const setUserAction = (data) => ({
  type: SET_USER_ACTION,
  payload: data,
});

export const logoutAction = (data) => {
  return (dispatch) => {
    clearUser();
    clearToken();
    dispatch({ type: LOGOUT_ACTION });
    data?.success();
  };
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_ACTION:
      return { user: null };
    case SET_USER_ACTION:
      return { user: action.payload };

    default:
      return state;
  }
};

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
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
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
  },
});

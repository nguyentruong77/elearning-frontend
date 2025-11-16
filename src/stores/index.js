//import { applyMiddleware, combineReducers, createStore } from "redux";
import { ENV } from "@/config";
import { authSliceReducer } from "./authReducer";
import { configureStore } from "@reduxjs/toolkit";

const logMiddleware = (store) => (next) => (action) => {
  console.log("Dispatching action:", action);
  const result = next(action);
  console.log("Next state:", store.getState());
  return result;
};

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logMiddleware),
  devTools: ENV === "development",
});

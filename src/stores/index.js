//import { applyMiddleware, combineReducers, createStore } from "redux";
import { ENV } from "@/config";
import { authReducer } from "./authReducer";
import { configureStore } from "@reduxjs/toolkit";

// const reducers = combineReducers({
//   auth: authReducer,
// });

const logMiddleware = (store) => (next) => (action) => {
  console.log("Dispatching action:", action);
  const result = next(action);
  console.log("Next state:", store.getState());
  return result;
};

// const thunk = (store) => (next) => (action) => {
//   if (typeof action === "function") {
//     action(store.dispatch);
//     return;
//   }
//   next(action);
// };

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logMiddleware),
  devTools: ENV === "development",
});

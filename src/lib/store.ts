import { configureStore } from "@reduxjs/toolkit";

import alertReducer from "@/lib/features/alert/alertSlice";
import authReducer from "@/lib/features/auth/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      alert: alertReducer,
      auth: authReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

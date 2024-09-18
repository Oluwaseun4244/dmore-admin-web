import { configureStore } from "@reduxjs/toolkit";

import alertReducer from "@/lib/features/alert/alertSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      alert: alertReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

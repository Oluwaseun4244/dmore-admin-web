import { RootState } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AlertType = "success" | "error" | "info" | "warning";

interface LayoutState {
  message: string;
  type: AlertType;
  isVisible: boolean;
}

const initialState: LayoutState = {
  message: "",
  type: "info",
  isVisible: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (
      state,
      action: PayloadAction<{ message: string; type: AlertType }>
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.isVisible = true;
    },
    hideAlert: (state) => {
      state.isVisible = false;
    },
  },
  extraReducers: (builder) => {},
});

export const { showAlert, hideAlert } = alertSlice.actions;

export const selectAlert = (state: RootState) => state.alert;

export default alertSlice.reducer;

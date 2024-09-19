import { BuyerRegisterData } from "@/app/types/auth.types";
import { useAppDispatch } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { showAlert } from "../alert/alertSlice";

interface AuthState {
  loading: boolean;
  userId: string;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  userId: "",
  error: null,
};

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const registerUserAsync = createAsyncThunk(
  "auth/registerUser",
  async (userData: BuyerRegisterData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/self-register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.messages[0]);

        throw new Error(errorData);
      }

      const responseData = await response.json();
      toast.success(responseData.message);

      return await response.json();
    } catch (error: any) {
      //   console.log(error.messages);
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.userId;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLoading } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;

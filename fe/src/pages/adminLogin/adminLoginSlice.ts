import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleLoginAsync } from "../../store/generalSlice";
import { RootState } from "../../store/store";

export type AdminLoginFormValue = {
  email: string;
  password: string;
};

export type AdminLoginSlice = {
  adminLoginFormValues: AdminLoginFormValue;
  loading: boolean;
};

const initialState: AdminLoginSlice = {
  adminLoginFormValues: {
    email: "",
    password: "",
  },
  loading: false,
};

export const adminLoginSlice = createSlice({
  name: "adminLogin",
  initialState,
  reducers: {
    setAdminLoginForm: (
      state,
      action: PayloadAction<{
        key: keyof AdminLoginFormValue;
        value: string;
      }>
    ) => {
      state.adminLoginFormValues[action.payload.key] = action.payload.value;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLoginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleLoginAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(handleLoginAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setLoading, setAdminLoginForm } = adminLoginSlice.actions;

export const selectAdminLoginFormValues = (state: RootState) =>
  state.adminLogin.adminLoginFormValues;
export const isAdminLoginLoading = (state: RootState) =>
  state.adminLogin.loading;

export default adminLoginSlice.reducer;

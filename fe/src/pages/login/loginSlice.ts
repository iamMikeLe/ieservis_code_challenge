import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleLoginAsync } from "../../store/generalSlice";
import { RootState } from "../../store/store";

export type LoginFormValue = {
  email: string;
  password: string;
};

export type LoginSlice = {
  loginFormValues: LoginFormValue;
  loading: boolean;
};

const initialState: LoginSlice = {
  loginFormValues: {
    email: "",
    password: "",
  },
  loading: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginForm: (
      state,
      action: PayloadAction<{
        key: keyof LoginFormValue;
        value: string;
      }>
    ) => {
      state.loginFormValues[action.payload.key] = action.payload.value;
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

export const { setLoading, setLoginForm } = loginSlice.actions;

export const selectLoginFormValues = (state: RootState) =>
  state.login.loginFormValues;
export const isLoginLoading = (state: RootState) => state.login.loading;

export default loginSlice.reducer;

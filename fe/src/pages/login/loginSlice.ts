import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export type LoginFormValue = {
  email: string;
  password: string;
};

export type loginSlice = {
  loginFormValues: LoginFormValue;
};

const initialState: loginSlice = {
  loginFormValues: {
    email: "",
    password: "",
  },
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setMealForm: (
      state,
      action: PayloadAction<{
        key: keyof LoginFormValue;
        value: string;
      }>
    ) => {
      state.loginFormValues[action.payload.key] = action.payload.value;
    },
  },
});

export const { setMealForm } = loginSlice.actions;

export const selectLoginFormValues = (state: RootState) =>
  state.login.loginFormValues;

export default loginSlice.reducer;

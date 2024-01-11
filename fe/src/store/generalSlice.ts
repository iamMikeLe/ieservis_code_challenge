import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type LoginFormValue = {
  email: string;
  password: string;
};

export type generalSlice = {
  loginFormValues: LoginFormValue;
};

const initialState: generalSlice = {
  loginFormValues: {
    email: "",
    password: "",
  },
};

export const generalSlice = createSlice({
  name: "general",
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

export const { setMealForm } = generalSlice.actions;

export const selectLoginFormValues = (state: RootState) =>
  state.general.loginFormValues;

export default generalSlice.reducer;

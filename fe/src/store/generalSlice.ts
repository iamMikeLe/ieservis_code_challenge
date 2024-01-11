import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleLogin } from "../API/userAPI";
import { RootState } from "./store";

export type LoginFormValue = {
  email: string;
  password: string;
};

export type UserData = {
  email: string;
  type: string;
};

export type generalSlice = {
  loginFormValues: LoginFormValue;
  userData: UserData | null | object;
};

const initialState: generalSlice = {
  userData: {},
  loginFormValues: {
    email: "",
    password: "",
  },
};

export const handleLoginAsync = createAsyncThunk(
  "general/handleLogin",
  async (loginFormValue: LoginFormValue) => {
    try {
      const userData = await handleLogin(loginFormValue);
      console.log(userData);
      return userData;
    } catch (error) {
      console.log("handle error in future, toast or sth", error);
      throw error;
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(handleLoginAsync.pending, (state) => {
        // resetting state to trigger loading
        state.userData = null;
      })
      .addCase(
        handleLoginAsync.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          console.log("action", action);
          state.userData = action.payload;
        }
      )
      .addCase(handleLoginAsync.rejected, (state) => {
        state.userData = {};
      });
  },
});

export const { setMealForm } = generalSlice.actions;

export const selectLoginFormValues = (state: RootState) =>
  state.general.loginFormValues;

export default generalSlice.reducer;

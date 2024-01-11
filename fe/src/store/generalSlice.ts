import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type LoginFormValue = {
  email: string;
  password: string;
};

type UserData = {
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

const handleLogin = async (
  loginFormValue: LoginFormValue
): Promise<UserData> => {
  const response = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginFormValue),
  });
  if (!response.ok) {
    console.log("response", response);
    throw new Error("Login failed");
  }
  const userData = await response.json();
  return userData;
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

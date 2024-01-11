import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type LoginFormValue = {
  email: string;
  password: string;
};

type UserData = {
  email: string;
  type: string;
  token: string;
};

export type generalSlice = {
  loginFormValues: LoginFormValue;
  userData: UserData | null;
};

const initialState: generalSlice = {
  userData: null,
  loginFormValues: {
    email: "",
    password: "",
  },
};

const handleLogin = (seconds: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("dummy Login success");
    }, seconds * 1000);
  });
};

export const handleLoginAsync = createAsyncThunk(
  "general/handleLogin",
  async () => {
    try {
      const result = await handleLogin(3);
      console.log(result);
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
    extraReducers: (builder) => {
      builder
        .addCase(handleLoginAsync.pending, (state) => {
          // resetting state to trigger loading
          state.userData = null;
        })
        .addCase(
          handleLoginAsync.fulfilled,
          (state, action: PayloadAction<UserData>) => {
            state.userData = action.payload;
          }
        )
        .addCase(handleLoginAsync.rejected, (state) => {
          state.userData = [];
        });
    },
  },
});

export const { setMealForm } = generalSlice.actions;

export const selectLoginFormValues = (state: RootState) =>
  state.general.loginFormValues;

export default generalSlice.reducer;

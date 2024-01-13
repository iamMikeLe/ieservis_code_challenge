import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleLogin } from "../API/userAPI";
import { LoginFormValue } from "../pages/login/loginSlice";
import { RootState } from "./store";

export type UserData = {
  email: string;
  type: string;
};

export type generalSlice = {
  userData: UserData | null | object;
};

const initialState: generalSlice = {
  userData: {},
};

export const handleLoginAsync = createAsyncThunk(
  "general/handleLogin",
  async (loginFormValue: LoginFormValue) => {
    try {
      const userData = await handleLogin(loginFormValue);
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
  reducers: {},
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
        state.userData = {};
      });
  },
});

export const selectUserData = (state: RootState) => state.general.userData;

export default generalSlice.reducer;

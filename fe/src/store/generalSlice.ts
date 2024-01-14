import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { getMaintenanceStatus, handleLogin } from "../API/userAPI";
import { LoginFormValue } from "../pages/login/loginSlice";
import { RootState } from "./store";

export type UserData = {
  email: string;
  type: string;
};

export type generalSlice = {
  userData: UserData | null;
  loading: boolean;
  maintenance: boolean;
};

const initialState: generalSlice = {
  maintenance: false,
  userData: null,
  loading: false,
};

export const handleLoginAsync = createAsyncThunk(
  "general/handleLogin",
  async (loginFormValue: LoginFormValue, { rejectWithValue }) => {
    try {
      const userDataPromise = handleLogin(loginFormValue);
      toast.dismiss();
      toast.promise(userDataPromise, {
        loading: "Logging in...",
        success: (data) => `Logged in as ${data.email}`,
        error: (err) => err.toString(),
      });
      const userData = await userDataPromise;
      return userData;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An error occurred");
    }
  }
);

export const fetchMaintenanceStatus = createAsyncThunk(
  "general/fetchMaintenanceStatus",
  async (_, { rejectWithValue }) => {
    try {
      const status = await getMaintenanceStatus();
      return status;
    } catch (error) {
      const err = error as AxiosError;
      toast.error(`Error: ${err.message || "Unknown error"}`);
      return rejectWithValue(err.message || "Unknown error");
    }
  }
);

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.userData = null;
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    setMaintenance: (state, action: PayloadAction<boolean>) => {
      state.maintenance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLoginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        handleLoginAsync.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.userData = action.payload;
          state.loading = false;
        }
      )
      .addCase(handleLoginAsync.rejected, (state) => {
        state.loading = false;
      });

    builder.addCase(
      fetchMaintenanceStatus.fulfilled,
      (state, action: PayloadAction<boolean>) => {
        state.maintenance = action.payload;
      }
    );
  },
});
export const { clearUserData, setUserData, setMaintenance } =
  generalSlice.actions;

export const selectUserData = (state: RootState) => state.general.userData;
export const isUserDataLoading = (state: RootState) => state.general.loading;
export const selectMaintenance = (state: RootState) =>
  state.general.maintenance;

export default generalSlice.reducer;

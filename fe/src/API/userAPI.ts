import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { LoginFormValue } from "../pages/login/loginSlice";
import { UserData } from "../store/generalSlice";

export const handleLogin = async (
  loginFormValue: LoginFormValue
): Promise<UserData> => {
  try {
    const response = await axios.post<UserData>(
      `${import.meta.env.VITE_API_URL}/login`,
      loginFormValue
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.response?.statusText || "Unknown error");
  }
};

export const getMaintenanceStatus = async (): Promise<boolean> => {
  try {
    const response = await axios.get<boolean>(
      `${import.meta.env.VITE_API_URL}/maintenance`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    toast.dismiss();
    toast.error(`Error: ${axiosError.message || "Unknown error"}`);
    throw new Error(axiosError.response?.statusText || "Unknown error");
  }
};

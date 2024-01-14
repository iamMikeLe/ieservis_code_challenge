import axios, { AxiosError, Method } from "axios";
import toast from "react-hot-toast";
import { LoginFormValue } from "../pages/login/loginSlice";
import { UserData } from "../store/generalSlice";

const apiRequest = async <T>(
  method: Method,
  endpoint: string,
  data?: unknown
): Promise<T> => {
  try {
    const response = await axios({
      method,
      url: `${import.meta.env.VITE_API_URL}/${endpoint}`,
      data,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    toast.dismiss();
    toast.error(`Error: ${axiosError.message || "Unknown error"}`);
    throw new Error(axiosError.response?.statusText || "Unknown error");
  }
};

export const handleLogin = (
  loginFormValue: LoginFormValue
): Promise<UserData> => {
  return apiRequest<UserData>("post", "login", loginFormValue);
};

export const getMaintenanceStatus = (): Promise<boolean> => {
  return apiRequest<boolean>("get", "maintenance");
};

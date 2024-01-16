import axios, { AxiosError, AxiosResponse, Method } from "axios";
import { AdminLoginFormValue } from "../pages/adminLogin/adminLoginSlice";
import { LoginFormValue } from "../pages/login/loginSlice";
import { UserData } from "../store/generalSlice";

type MaintenanceResponse = {
  isUnderMaintenance: boolean;
};

export const apiRequest = async <T>(
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
    console.log("axiosError", axiosError);
    let errMsg = axiosError.response?.statusText || "Unknown error";
    if (axiosError.code === "ERR_NETWORK") {
      errMsg = "No internet connection";
    }
    throw new Error(errMsg);
  }
};

export const handleLogin = (
  loginFormValue: LoginFormValue
): Promise<UserData> => {
  return apiRequest<UserData>("post", "login", loginFormValue);
};

export const handleAdminLogin = (
  adminLoginFormValue: AdminLoginFormValue
): Promise<UserData> => {
  return apiRequest<UserData>("post", "admin/login", adminLoginFormValue);
};

export const getMaintenanceStatus = (): Promise<boolean> => {
  return apiRequest<boolean>("get", "maintenance");
};

export const updateMaintenanceMode = async (
  isUnderMaintenance: boolean
): Promise<boolean> => {
  const response: AxiosResponse<MaintenanceResponse> = await axios.post(
    `${import.meta.env.VITE_API_URL}/maintenance`,
    {
      isUnderMaintenance: !isUnderMaintenance,
    }
  );

  return response.data.isUnderMaintenance;
};

import axios, { AxiosError } from "axios";
import { LoginFormValue } from "../pages/login/loginSlice";
import { UserData } from "../store/generalSlice";

export const handleLogin = async (
  loginFormValue: LoginFormValue
): Promise<UserData> => {
  try {
    const response = await axios.post<UserData>(
      "http://localhost:5000/login",
      loginFormValue
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.response?.statusText || "Unknown error");
  }
};

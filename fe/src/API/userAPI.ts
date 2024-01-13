import { LoginFormValue } from "../pages/login/loginSlice";
import { UserData } from "../store/generalSlice";

export const handleLogin = async (
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
    throw new Error(response.statusText);
  }
  const userData = await response.json();
  return userData;
};

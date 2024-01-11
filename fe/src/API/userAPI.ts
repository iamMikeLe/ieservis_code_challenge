import { LoginFormValue, UserData } from "../store/generalSlice";

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
    console.log("response", response);
    throw new Error("Login failed");
  }
  const userData = await response.json();
  return userData;
};

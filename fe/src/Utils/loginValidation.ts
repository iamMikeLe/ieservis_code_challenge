import toast from "react-hot-toast";

export const loginValidation = (email: string, password: string) => {
  if (!email || !password) {
    toast.error("Email and password cannot be empty");
    return false;
  }

  const emailIsValid = /\S+@\S+\.\S+/.test(email);
  if (!emailIsValid) {
    toast.error("Please enter a valid email address");
    return false;
  }

  return true;
};

import { combineReducers } from "@reduxjs/toolkit";
import adminLoginReducer from "../pages/adminLogin/adminLoginSlice";
import loginReducer from "../pages/login/loginSlice";
import generalReducer from "./generalSlice";

const rootReducer = combineReducers({
  general: generalReducer,
  login: loginReducer,
  adminLogin: adminLoginReducer,
});

export default rootReducer;

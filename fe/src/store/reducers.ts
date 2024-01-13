import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "../pages/login/loginSlice";
import generalReducer from "./generalSlice";

const rootReducer = combineReducers({
  general: generalReducer,
  login: loginReducer,
});

export default rootReducer;

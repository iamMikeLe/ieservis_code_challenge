import { combineReducers } from "@reduxjs/toolkit";
import generalReducer from "./generalSlice";

const rootReducer = combineReducers({
  general: generalReducer,
});

export default rootReducer;

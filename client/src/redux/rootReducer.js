import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart";
import profile from "./slices/profile";

const rootReducer = combineReducers({
  cart: cartReducer,
  profile: profile,
});

export default rootReducer;
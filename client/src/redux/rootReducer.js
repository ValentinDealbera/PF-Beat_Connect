import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart";

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
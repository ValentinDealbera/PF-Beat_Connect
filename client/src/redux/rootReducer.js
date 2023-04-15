import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart";
import profile from "./slices/profile";
import beats from "./slices/beats";
import client from "./slices/client";
import filters from "./slices/filters";
const rootReducer = combineReducers({
  cart: cartReducer,
  profile: profile,
  beats: beats,
  client: client,
  filters: filters,
});

export default rootReducer;
import { combineReducers } from "@reduxjs/toolkit";
import authSession from "./authSession";
import beats from "./beats";
import reviews from "./reviews";
import orders from "./orders";

const clientsReducer = combineReducers({
  authSession: authSession,
  beats: beats,
  reviews: reviews,
  orders: orders,
});

export default clientsReducer;

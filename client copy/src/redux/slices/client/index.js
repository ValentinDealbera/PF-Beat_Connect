import { combineReducers } from '@reduxjs/toolkit';
import authSession from './authSession';
import beats from './beats';
import reviews from './reviews';

const clientsReducer = combineReducers({
  authSession: authSession,
  beats : beats,
  reviews: reviews,
});

export default clientsReducer;

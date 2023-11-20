import { combineReducers } from '@reduxjs/toolkit'
import authSession from './authSession'
import beats from './beats'
import reviews from './reviews'
import orders from './orders'

const clientsReducer = combineReducers({
  authSession,
  beats,
  reviews,
  orders
})

export default clientsReducer

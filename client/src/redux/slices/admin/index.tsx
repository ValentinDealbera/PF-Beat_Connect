import { combineReducers } from '@reduxjs/toolkit'
import adminSession from './adminSession'
import beats from './beats'
import reviews from './reviews'
import users from './users'
import orders from './orders'

const clientsReducer = combineReducers({
  adminSession,
  beats,
  reviews,
  users,
  orders
})

export default clientsReducer

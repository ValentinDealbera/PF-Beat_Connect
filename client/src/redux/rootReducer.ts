import { combineReducers } from '@reduxjs/toolkit'
import cartReducer from './slices/cart'
import profile from './slices/profile'
import beats from './slices/beats'
import client from './slices/client/index'
import filters from './slices/filters'
import admin from './slices/admin/index'

const rootReducer = combineReducers({
  cart: cartReducer,
  profile,
  beats,
  client,
  filters,
  admin
})

export default rootReducer

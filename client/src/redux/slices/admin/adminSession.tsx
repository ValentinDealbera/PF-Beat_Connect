import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { adminGetUsers } from './users'
import { adminGetBeats } from './beats'
import { adminGetReviews } from './reviews'

const initialState = {
  users: [],
  currentEdtingUser: {}
}

export const adminGetData = createAsyncThunk('adminUsers/adminGetData', async (_, { dispatch }) => {
  await dispatch(adminGetUsers())
  await dispatch(adminGetBeats())
  await dispatch(adminGetReviews())
  return { success: true }
})

const adminUsersSlice = createSlice({
  name: 'adminUsers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminGetData.fulfilled, (state, action) => {})
      .addCase(adminGetData.rejected, (state, action) => {})
      .addCase(adminGetData.pending, (state, action) => {})
  }
})

export default adminUsersSlice.reducer

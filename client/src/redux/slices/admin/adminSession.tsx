import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { adminGetUsers } from './users'
import { adminGetBeats } from './beats'
import { adminGetReviews } from './reviews'

const initialState = {
  users: [],
  currentEdtingUser: {}
}

export const adminGetData = createAsyncThunk('adminUsers/adminGetData', async (_, { dispatch }) => {
  try {
    await dispatch(adminGetUsers())
    await dispatch(adminGetBeats())
    await dispatch(adminGetReviews())
    return { success: true }
  } catch (error) {
    throw error
  }
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

export const {} = adminUsersSlice.actions

export default adminUsersSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  settingsActiveIndex: 0
}

const cartSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setSettingsActiveIndex: (state, action) => {
      state.settingsActiveIndex = action.payload
    }
  }
})

export const { setSettingsActiveIndex } = cartSlice.actions
export default cartSlice.reducer

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  generalActiveIndex: 0,
  settingsActiveIndex: 0,
};

const cartSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setGeneralActiveIndex(state, action) {
      state.generalActiveIndex = action.payload;
    },
    setSettingsActiveIndex(state, action) {
      state.settingsActiveIndex = action.payload;
    },
  },
});

export const { setGeneralActiveIndex, setSettingsActiveIndex
} = cartSlice.actions;
export default cartSlice.reducer;

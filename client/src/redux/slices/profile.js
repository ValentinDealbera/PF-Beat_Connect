import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  activeIndex: 0,
};

const cartSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setActiveIndex(state, action) {
      state.activeIndex = action.payload;
    },
  },
});

export const { setActiveIndex } = cartSlice.actions;
export default cartSlice.reducer;

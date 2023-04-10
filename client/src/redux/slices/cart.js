import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      console.log("action", action.payload);

      const isInCart = state.cart.find((item) => item.id === action.payload.id);

      if (isInCart) {
        isInCart.quantity =
          parseInt(isInCart.quantity) + parseInt(action.payload.quantity);
      } else {
        const newCartItem = {
          id: action.payload.id,
          quantity: action.payload.quantity,
        };

        state.cart = [...state.cart, newCartItem];
      }
    },
    deleteFromCart(state, action) {
      console.log("action", action.payload);
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },

    manageCartQuantity(state, action) {
      console.log("action", action.payload);
      const item = state.cart.find((item) => item.id === action.payload.id);
      item.quantity = action.payload.quantity;
    },
    getCart(state, action) {
      state.cart = action.payload;
    },
  },
});

export const { addToCart, getCart, manageCartQuantity, deleteFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
﻿
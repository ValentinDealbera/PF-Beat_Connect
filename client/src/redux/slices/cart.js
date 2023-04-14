import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Toaster, toast } from "sonner";
const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      console.log("action", action.payload);

      const isInCart = state.cart.find((item) => item.id === action.payload);
      console.log("isInCart", isInCart);
      if (isInCart) {
        toast.success("Ya esta en el carrito", {
          style: {
            background: "#ECFDF3",
            color: "#008A2E",
          },
        });
      } else {
        const newCartItem = {
          id: action.payload,
        };
        state.cart = [...state.cart, newCartItem];

        toast.success("Se agregó al carrito", {
          style: {
            background: "#ECFDF3",
            color: "#008A2E",
          },
        });
      }
    },
    deleteFromCart(state, action) {
      console.log("action", action.payload);
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;

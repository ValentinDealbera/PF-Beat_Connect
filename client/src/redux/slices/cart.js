import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      console.log("action", action.payload);
      const isInCart = state.cart.some((item) => item === action.payload);

      console.log("state.cart", state.cart, action.payload);
      console.log("isInCart", isInCart);
      if (isInCart) {
        console.log("Ya esta en el carrito");
        toast.success("Ya esta en el carrito", {
          style: {
            background: "#ffedd5",
            color: "#c2410c",
          },
        });
      } else {
        console.log("Se agregó al carrito");
        state.cart = [...state.cart, action.payload];
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
      state.cart = state.cart.filter((item) => item !== action.payload.id);
      toast.success("Se eliminó del carrito", {
        style: {
          background: "#ECFDF3",
          color: "#008A2E",
        },
      });
    },
  },
});

export const { addToCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;

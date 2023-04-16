import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { useSelector } from "react-redux"; // importa el hook useSelector



const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      console.log("action", action.payload);
      state.cart = [...state.cart, action.payload];
    },
    deleteFromCart(state, action) {
      console.log("action", action.payload);
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      toast.success("Se eliminó del carrito", {
        style: {
          background: "#ECFDF3",
          color: "#008A2E",
        },
      });
    },
  },
});

export const { setCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;

export const addToCart = (obj) => async (dispatch, getState) => {
const state = getState().cart;
  const isInCart = state.cart.some((item) => item.id === obj.id);
console.log(obj, isInCart)
  if (isInCart === true) {
    console.log(state)
    console.log("Ya esta en el carrito");
    toast.success("Ya esta en el carrito", {
      style: {
        background: "#ffedd5",
        color: "#c2410c",
      },
    });
  } else {

    const {client} = getState();

    console.log("client", client.client._id, obj.authorId);
    if (client.client._id == obj.authorId) {
      console.log("No puedes comprar tus propios beats");
      toast.success("No puedes comprar tus propios beats", {
        style: {
          background: "#ffedd5",
          color: "#c2410c",
        },
      });
      return;
    }

    //state.cart = [...state.cart, action.payload];
    toast.success("Se agregó al carrito", {
      style: {
        background: "#ECFDF3",
        color: "#008A2E",
      },
    });
    dispatch(setCart(obj));
  }
};
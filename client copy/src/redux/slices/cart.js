/*FUNCION DE CART:*/
/* 1) ADD TO CART: Se agrega un beat al carrito. */
/* 2) DELETE FROM CART: Se elimina un beat del carrito. */

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { toastError, toastSuccess, toastWarning } from "@/utils/toastStyles";

const initialState = {
  cart: [],
};

//------------------ SLICE ------------------//

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //--------------------
    //SET CART
    setCart(state, action) {
      state.cart = [...state.cart, action.payload];
    },
    //--------------------
    //DELETE FROM CART
    deleteFromCart(state, action) {
      state.cart = state.cart.filter(
        (item) => item.beat._id !== action.payload.id
      );
      toast.success("Se eliminó del carrito", toastSuccess);
    },
  },
});

//------------------ ACTIONS ------------------//

export const addToCart = (obj) => async (dispatch, getState) => {
  const state = getState().cart;
  const isInCart = state.cart.some((item) => item.beat._id === obj.beat._id);

  if (isInCart === true) {
    toast.error("Ya esta en el carrito", toastWarning);
  } else {
    const id = getState().client.authSession.session.current._id;

    if (id == obj.authorId) {
      toast.error("No puedes comprar tus propios beats", toastError);
      return;
    }
    toast.success("Se agregó al carrito", toastSuccess);
    dispatch(setCart(obj));
  }
};

export const { setCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;

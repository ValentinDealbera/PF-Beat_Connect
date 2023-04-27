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
    resetCart(state, action) {
      state.cart = [];
    },
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
  const bougthBeats = getState().client.beats.bougthBeats;
  const beat = obj.beat;
  if (isInCart === true) {
    toast.error("Ya esta en el carrito", toastWarning);
  } else {
    const id = getState().client.authSession.session.current._id;

    const boughtBeat2 = bougthBeats.find(
      (boughtBeat) => boughtBeat._id === beat._id
    );

    const boughtBeat = Boolean(boughtBeat2);

    if (boughtBeat === true) {
      toast.error("Ya compraste este beat", toastWarning);
      return;
    }

    if (id == obj.authorId) {
      toast.error("No puedes comprar tus propios beats", toastError);
      return;
    }
    toast.success("Se agregó al carrito", toastSuccess);
    dispatch(setCart(obj));
  }
};

export const { setCart, deleteFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;

/*FUNCION DE CART:*/
/* 1) ADD TO CART: Se agrega un beat al carrito. */
/* 2) DELETE FROM CART: Se elimina un beat del carrito. */

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { toastError, toastSuccess, toastWarning } from "@/utils/toastStyles";
import i18next from 'i18next';

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
      let trad= i18next?.language == "en"? "Removed from cart" : "Se eliminó del carrito"
      toast.success(trad, toastSuccess);
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
    let trad= i18next?.language == "en"? "Beat obtained successfully" : "Ya está en el carrito"
    toast.error(trad, toastWarning);
  } else {
    const id = getState().client.authSession.session.current._id;

    const boughtBeat2 = bougthBeats.find(
      (boughtBeat) => boughtBeat._id === beat._id
    );

    const boughtBeat = Boolean(boughtBeat2);

    if (boughtBeat === true) {
      let trad= i18next?.language == "en"? "You already bought this beat" : "Ya compraste este beat"
      toast.error(trad, toastWarning);
      return;
    }

    if (id == obj.authorId) {
      let trad= i18next?.language == "en"? "You can't buy your own beats" : "No puedes comprar tus propios beats"
      toast.error(trad, toastError);
      return;
    }
    let trad= i18next?.language == "en"? "Already in cart" : "Se agregó al carrito"
    toast.success(trad, toastSuccess);
    dispatch(setCart(obj));
  }
};

export const { setCart, deleteFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { toastError, toastSuccess, toastWarning } from "@/utils/toastStyles";
import i18next from "i18next";
import { RootState } from "../store/store";

const initialState = {
  cart: [] as any,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (obj: any, { dispatch, getState }) => {
    try {
      const state2 = getState() as RootState;
      const state = state2;
      const isInCart = state.cart.cart.some(
        (item: any) => item.beat._id === obj.beat._id,
      );
      const bougthBeats = state.client.beats.bougthBeats;
      const beat = obj.beat;
      if (isInCart === true) {
        let trad =
          i18next?.language == "en"
            ? "Beat obtained successfully"
            : "Ya está en el carrito";
        toast.error(trad, toastWarning);
      } else {
        const id = state.client.authSession.session.current._id;

        const boughtBeat2 = bougthBeats.find(
          (boughtBeat: any) => boughtBeat._id === beat._id,
        );

        const boughtBeat = Boolean(boughtBeat2);

        if (boughtBeat === true) {
          let trad =
            i18next?.language == "en"
              ? "You already bought this beat"
              : "Ya compraste este beat";
          toast.error(trad, toastWarning);
          return;
        }

        if (id == obj.authorId) {
          let trad =
            i18next?.language == "en"
              ? "You can't buy your own beats"
              : "No puedes comprar tus propios beats";
          toast.error(trad, toastError);
          return;
        }
        let trad =
          i18next?.language == "en"
            ? "Successfully added"
            : "Se agregó al carrito";
        toast.success(trad, toastSuccess);
        dispatch(setCart(obj));
      }
      return;
    } catch (err) {
      console.error("fetchFeaturedBeats", err);
      throw err;
    }
  },
);

//------------------ SLICE ------------------//
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart(state) {
      state.cart = [];
    },
    //--------------------
    //SET CART
    setCart(state: any, action) {
      state.cart = [...state.cart, action.payload];
    },
    //--------------------
    //DELETE FROM CART
    deleteFromCart(state: any, action) {
      state.cart = state.cart.filter(
        (item: any) => item.beat._id !== action.payload.id,
      );
      let trad =
        i18next?.language == "en"
          ? "Removed from cart"
          : "Se eliminó del carrito";
      toast.success(trad, toastSuccess);
    },
  },
});

export const { setCart, deleteFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;

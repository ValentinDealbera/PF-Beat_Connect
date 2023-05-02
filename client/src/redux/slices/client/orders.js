import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "@/data/config";
import { toast } from "sonner";
import axios from "axios";
import { toastError, toastSuccess } from "@/utils/toastStyles";
import { getUserData } from "./authSession";
import { fetchBeats } from "../beats";
import { resetCart } from "../cart";
import i18next from 'i18next';

const initialState = {
  orders: [],
};

//------------------ ASYNC THUNKS ------------------//
//POST CLIENT ORDER
export const postClientOrder = createAsyncThunk(
  "client/postClientOrder",
  async (data, { rejectWithValue, dispatch, getState }) => {
    const id = getState().client.authSession.session.current._id;
    try {
      const response = await axios.post(`${serverUrl}orders`, data, {
        headers: {
          userid: id,
        },
      });

      await dispatch(getUserData(id));
      await dispatch(resetCart());
     // await dispatch(fetchBeats({}));
      return;
    } catch (error) {
      console.log("ERROR xx", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

//-------------------- SLICE -------------------//

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    //--------------------
    //SET ORDERS
    setOrders(state, action) {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //--------------------
      //POST CLIENT ORDER
      .addCase(postClientOrder.fulfilled, (state, action) => {
        let trad= i18next?.language == "en"? "Order loaded" : "Orden cargada"
        toast.success(trad, toastSuccess);
      })
      .addCase(postClientOrder.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(postClientOrder.pending, (state, action) => {
        let trad= i18next?.language == "en"? "Loading order..." : "Cargando orden..."
        toast(trad);
      });
  },
});

export const { setOrders } = ordersSlice.actions;

export default ordersSlice.reducer;

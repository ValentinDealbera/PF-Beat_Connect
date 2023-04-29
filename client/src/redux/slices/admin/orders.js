import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "@/data/config";
import { toast } from "sonner";
import axios from "axios";
import { toastError, toastSuccess } from "@/utils/toastStyles";
const tokenAdmin = process.env.NEXT_PUBLIC_TOKEN_ADMIN;

const initialState = {
  orders: [],
  currentEditingOrder: {},
};

//------------------ ASYNC THUNKS ------------------//
//GET ADMIN ORDERS
export const adminGetOrders = createAsyncThunk(
  "client/adminGetOrders",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${serverUrl}orders`);
      return { orderResponse: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//GET ADMIN ORDER
export const adminGetOrder = createAsyncThunk(
  "client/adminGetOrder",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${serverUrl}orders/${data}`);
      return { orderResponse: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//DELETE ADMIN ORDER
export const adminDeleteOrder = createAsyncThunk(
  "client/adminDeleteOrder",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`${serverUrl}admin/order/${data}`, {
        headers: {
          admintoken: tokenAdmin,
        },
      });
      await dispatch(adminGetOrders());
      return { orderResponse: response.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//POST ADMIN ORDER
export const adminPostOrder = createAsyncThunk(
  "client/adminPostOrder",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${serverUrl}orders`, data, {
        headers: {
          admintoken: tokenAdmin,
        },
      });
      await dispatch(adminGetOrders());
      return { orderResponse: response.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//------------------ SLICE ------------------//

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setCurrentEditingOrder(state, action) {
      state.currentEditingOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //GET ADMIN ORDERS
      .addCase(adminGetOrders.pending, (state, action) => {
        return;
      })
      .addCase(adminGetOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orderResponse;
      })
      .addCase(adminGetOrders.rejected, (state, action) => {
        return;
      })

      //GET ADMIN ORDER
      .addCase(adminGetOrder.pending, (state, action) => {
        return;
      })
      .addCase(adminGetOrder.fulfilled, (state, action) => {
        state.currentEditingOrder = action.payload.orderResponse;
      })
      .addCase(adminGetOrder.rejected, (state, action) => {
        return;
      })

      //DELETE ADMIN ORDER
      .addCase(adminDeleteOrder.pending, (state, action) => {
        toast("Borrando Orden...");
      })
      .addCase(adminDeleteOrder.fulfilled, (state, action) => {
        toast.success("Orden Borrada", toastSuccess);
      })
      .addCase(adminDeleteOrder.rejected, (state, action) => {
        toast.error("Error al borrar orden", toastError);
      })

      //POST ADMIN ORDER
      .addCase(adminPostOrder.pending, (state, action) => {
        toast("Creando Orden...");
      })
      .addCase(adminPostOrder.fulfilled, (state, action) => {
        toast.success("Orden Creada", toastSuccess);
      })
      .addCase(adminPostOrder.rejected, (state, action) => {
        toast.error("Error al crear orden", toastError);
      });
  },
});

export const { setCurrentEditingOrder } = ordersSlice.actions;

export default ordersSlice.reducer;

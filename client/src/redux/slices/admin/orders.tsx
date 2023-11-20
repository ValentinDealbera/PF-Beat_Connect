import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { serverUrl } from '@/data/config'
import { toast } from 'sonner'
import axios from 'axios'
import { toastError, toastSuccess } from '@/utils/toastStyles'
import i18next from 'i18next'
const tokenAdmin = process.env.NEXT_PUBLIC_TOKEN_ADMIN

const initialState = {
  orders: [] as any,
  currentEditingOrder: {} as any
}

// ------------------ ASYNC THUNKS ------------------//
// GET ADMIN ORDERS
export const adminGetOrders = createAsyncThunk('client/adminGetOrders', async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.get(`${serverUrl}orders`)
    return { orderResponse: response.data }
  } catch (error) {
    throw error
  }
})

// GET ADMIN ORDER
export const adminGetOrder = createAsyncThunk('client/adminGetOrder', async (data, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.get(`${serverUrl}orders/${data}`)
    return { orderResponse: response.data }
  } catch (error) {
    throw error
  }
})

// DELETE ADMIN ORDER
export const adminDeleteOrder = createAsyncThunk(
  'client/adminDeleteOrder',
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`${serverUrl}admin/order/${data}`, {
        headers: {
          admintoken: tokenAdmin
        }
      })
      await dispatch(adminGetOrders())
      return { orderResponse: response.data }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

// POST ADMIN ORDER
export const adminPostOrder = createAsyncThunk('client/adminPostOrder', async (data, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post(`${serverUrl}orders`, data, {
      headers: {
        admintoken: tokenAdmin
      }
    })
    await dispatch(adminGetOrders())
    return { orderResponse: response.data }
  } catch (error) {
    return rejectWithValue(error)
  }
})

// ------------------ SLICE ------------------//

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setCurrentEditingOrder(state, action) {
      state.currentEditingOrder = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // GET ADMIN ORDERS
      .addCase(adminGetOrders.pending, (state, action) => {})
      .addCase(adminGetOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orderResponse
      })
      .addCase(adminGetOrders.rejected, (state, action) => {})

      // GET ADMIN ORDER
      .addCase(adminGetOrder.pending, (state, action) => {})
      .addCase(adminGetOrder.fulfilled, (state, action) => {
        state.currentEditingOrder = action.payload.orderResponse
      })
      .addCase(adminGetOrder.rejected, (state, action) => {})

      // DELETE ADMIN ORDER
      .addCase(adminDeleteOrder.pending, (state, action) => {
        const trad = i18next?.language == 'en' ? 'Deleting order...' : 'Borrando Orden...'
        toast(trad)
      })
      .addCase(adminDeleteOrder.fulfilled, (state, action) => {
        const trad = i18next?.language == 'en' ? 'Order deleted' : 'Orden Borrada'
        toast.success(trad, toastSuccess)
      })
      .addCase(adminDeleteOrder.rejected, (state, action) => {
        const trad = i18next?.language == 'en' ? 'Error deleting order' : 'Error al borrar orden'
        toast.error(trad, toastError)
      })

      // POST ADMIN ORDER
      .addCase(adminPostOrder.pending, (state, action) => {
        const trad = i18next?.language == 'en' ? 'Creating order...' : 'Creando Orden...'
        toast(trad)
      })
      .addCase(adminPostOrder.fulfilled, (state, action) => {
        const trad = i18next?.language == 'en' ? 'Order created' : 'Orden Creada'
        toast.success(trad, toastSuccess)
      })
      .addCase(adminPostOrder.rejected, (state, action) => {
        const trad = i18next?.language == 'en' ? 'Error creating order' : 'Error al crear orden'
        toast.success(trad, toastError)
      })
  }
})

export const { setCurrentEditingOrder } = ordersSlice.actions

export default ordersSlice.reducer

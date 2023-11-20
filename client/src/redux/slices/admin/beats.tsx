import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { serverUrl } from '@/utils/config.const'
import { toast } from 'sonner'
import axios from 'axios'
import { toastSuccess } from '@/utils/toastStyles.const'
import i18next from 'i18next'
import { type BeatsClass } from '@/interfaces'

const tokenAdmin = process.env.NEXT_PUBLIC_TOKEN_ADMIN
const initialState = {
  beats: [] as BeatsClass[],
  currentEdtingBeat: {} as any
}

// ------------------ ASYNC THUNKS ------------------//
// POST ADMIN BEAT
export const adminPostBeat = createAsyncThunk(
  'beats/adminPostBeat',
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      delete data.id
      const response = await axios.post(`${serverUrl}admin/beat`, data, {
        headers: {
          admintoken: tokenAdmin,
          'Content-Type': 'multipart/form-data'
        }
      })

      await dispatch(adminGetBeats())

      return { beatResponse: response.data }
    } catch (error) {
      console.log('Error de post', error)
      throw error
    }
  }
)

// --------------------
// EDIT ADMIN BEAT
export const adminEditBeat = createAsyncThunk(
  'beats/adminEditBeat',
  async (data: any, { rejectWithValue, dispatch }) => {
    const response = await axios.put(`${serverUrl}admin/beat/${data.id}`, data, {
      headers: {
        admintoken: tokenAdmin,
        'Content-Type': 'multipart/form-data'
      }
    })
    await dispatch(adminGetBeats())
    return { beatResponse: response.data }
  }
)

// --------------------
// DELETE ADMIN BEAT
export const adminDeleteBeat = createAsyncThunk(
  'beats/adminDeleteBeat',
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`${serverUrl}admin/beat/${data._id}`, {
        headers: {
          admintoken: tokenAdmin
        }
      })
      await dispatch(adminGetBeats())
      return { userResponse: response.data }
    } catch (error) {
      console.log('error', error)
      throw error
    }
  }
)

// --------------------
// GET ADMIN BEATS
export const adminGetBeats = createAsyncThunk('beats/adminGetBeats', async (_, { rejectWithValue, dispatch }) => {
  const response = await axios.get(`${serverUrl}beats?limit=999999`)
  return { beatResponse: response.data.docs }
})

// --------------------
// GET ADMIN BEAT
export const adminGetBeat = createAsyncThunk('beats/adminGetBeat', async (data: any, { rejectWithValue, dispatch }) => {
  const response = await axios.get(`${serverUrl}beats/${data}`)
  return { beatResponse: response.data }
})

// ------------------ SLICE ------------------//

const adminBeatsSlice = createSlice({
  name: 'adminBeats',
  initialState,
  reducers: {
    setCurrentEditingBeat: (state, action) => {
      state.currentEdtingBeat = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // --------------------
      // POST ADMIN BEAT
      .addCase(adminPostBeat.fulfilled, (state, action) => {
        const trad = i18next?.language === 'en' ? 'Beat created successfully' : 'Beat creado correctamente'
        toast.success(trad, toastSuccess)
      })
      .addCase(adminPostBeat.rejected, (state, action) => {
        console.error('error', action.payload)
      })
      .addCase(adminPostBeat.pending, (state, action) => {
        const trad = i18next?.language === 'en' ? 'Creating beat...' : 'Creando beat...'
        toast(trad)
      })

      // --------------------
      // EDIT ADMIN BEAT
      .addCase(adminEditBeat.rejected, (state, action) => {
        console.error('error', action.payload)
      })
      .addCase(adminEditBeat.fulfilled, (state, action) => {
        const trad = i18next?.language === 'en' ? 'Beat edited successfully' : 'Beat editado correctamente'
        toast.success(trad, toastSuccess)
      })
      .addCase(adminEditBeat.pending, (state, action) => {
        const trad = i18next?.language === 'en' ? 'Editing beat...' : 'Editando beat...'
        toast(trad)
      })

      // --------------------
      // DELETE ADMIN BEAT
      .addCase(adminDeleteBeat.fulfilled, (state, action) => {
        const trad = i18next?.language === 'en' ? 'Beat deleted successfully' : 'Beat eliminado correctamente'
        toast.success(trad, toastSuccess)
      })
      .addCase(adminDeleteBeat.rejected, (state, action) => {
        console.error('error', action.payload)
      })
      .addCase(adminDeleteBeat.pending, (state, action) => {
        const trad = i18next?.language === 'en' ? 'Deleting beat...' : 'Eliminando beat...'
        toast(trad)
      })

      // --------------------
      // GET ADMIN BEATS
      .addCase(adminGetBeats.fulfilled, (state, action) => {
        state.beats = action.payload.beatResponse
        // toast.success("Beats obtenidos correctamente", toastSuccess);
      })
      .addCase(adminGetBeats.rejected, (state, action) => {
        console.error('error', action.payload)
      })
      .addCase(adminGetBeats.pending, (state, action) => {
        // toast("Cargando beat...");
      })

      // --------------------
      // GET ADMIN BEAT
      .addCase(adminGetBeat.fulfilled, (state, action) => {
        const trad = i18next?.language === 'en' ? 'Beat retrieved successfully' : 'Beat obtenido correctamente'
        toast.success(trad, toastSuccess)

        state.currentEdtingBeat = action.payload.beatResponse
      })
      .addCase(adminGetBeat.rejected, (state, action) => {
        console.error('error', action.payload)
      })
      .addCase(adminGetBeat.pending, (state, action) => {
        const trad = i18next?.language === 'en' ? 'Loading beat...' : 'Cargando beat...'
        toast(trad)
      })
  }
})

export const { setCurrentEditingBeat } = adminBeatsSlice.actions

export default adminBeatsSlice.reducer

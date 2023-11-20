/* FUNCION DE BEATS: */
/* 1) POST CLIENT BEAT: Se crea un beat y se guarda en la base de datos. */
/* 2) DELETE CLIENT BEAT: Se elimina un beat de la base de datos. */
/* 3) EDIT CLIENT BEAT: Se edita un beat de la base de datos. */
/* 4) SET ACTIVE EDITING BEAT: Se setea el beat que se esta editando. */
/* 5) SET BOUGTH BEATS: Se setean los beats comprados. */
/* 6) SET OWNED BEATS: Se setean los beats creados. */
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'sonner'
import { getUserData } from './authSession'
import { fetchBeats, fetchFeaturedBeats } from '../beats'
import i18next from 'i18next'
import { type BeatsClass } from '@/types'
import {
  createFormData,
  getActiveEditingBeat,
  getUserIdFromState,
  updateClientBeat,
  uploadClientBeat
} from '@/utils/state'
import { deleteClientBeatRequest } from '@/utils/state/deleteClientBeatRequest'
import { addFavoriteBeat } from '@/utils/state/addFavoriteBeat'
import { removeFavoriteBeat } from '@/utils/state/removeFavoriteBeat'

const initialState = {
  activeEditingBeat: {} as BeatsClass,
  bougthBeats: [] as BeatsClass[],
  ownedBeats: [] as BeatsClass[],
  favoriteBeats: [] as BeatsClass[]
}

// ------------------ ASYNC THUNKS ------------------//
// POST CLIENT BEAT
export const postClientBeat = createAsyncThunk('client/postClientBeat', async (data: any, { dispatch, getState }) => {
  try {
    const id = getUserIdFromState(getState)
    const response = await uploadClientBeat(data, id)
    await dispatch(getUserData(id))
    await dispatch(fetchBeats({}))
    return response
  } catch (error) {
    console.error('postClientBeat Error', error)
    throw error
  }
})
// --------------------
// DELETE CLIENT BEAT
export const deleteClientBeat = createAsyncThunk(
  'client/deleteClientBeat',
  async (beatId: string, { dispatch, getState }) => {
    try {
      const userId = getUserIdFromState(getState)
      const response = await deleteClientBeatRequest(beatId, userId)
      await dispatch(getUserData(userId))
      await dispatch(fetchBeats({}))
      return response
    } catch (error) {
      console.error('deleteClientBeat error', error)
      throw error
    }
  }
)

// --------------------
// EDIT CLIENT BEAT
export const editClientBeat = createAsyncThunk(
  'client/editClientBeat',
  async (data: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const userId = getUserIdFromState(getState)
      const { activeEditingBeatId } = getActiveEditingBeat(getState)
      const formData = createFormData(data)
      const response = await updateClientBeat(formData, activeEditingBeatId, userId)
      await dispatch(getUserData(userId))
      await dispatch(fetchBeats({}))
      await dispatch(fetchFeaturedBeats())
      return response
    } catch (error) {
      console.error('editClientBeat error', error)
      throw error
    }
  }
)

// --------------------
// POST FAVORITE BEAT
export const postFavoriteBeat = createAsyncThunk(
  'client/postFavoriteBeat',
  async (beat: BeatsClass, { dispatch, getState }) => {
    try {
      const beatId = beat._id
      const userId = getUserIdFromState(getState)
      const formData = createFormData({ beatId })
      await addFavoriteBeat(formData, userId)
      return beat
    } catch (error) {
      console.error('postFavoriteBeat error', error)
      throw error
    }
  }
)

// --------------------
// DELETE FAVORITE BEAT
export const deleteFavoriteBeat = createAsyncThunk(
  'client/deleteFavoriteBeat',
  async (beat: BeatsClass, { getState }) => {
    try {
      const userId = getUserIdFromState(getState)
      const beatId = beat._id
      const formData = createFormData({ beatId })
      await removeFavoriteBeat(formData, userId)
      return beat
    } catch (error) {
      console.error('deleteFavoriteBeat error', error)
      throw error
    }
  }
)

// ------------------ SLICE ------------------//

const clientBeats = createSlice({
  name: 'clientBeats',
  initialState,
  reducers: {
    setBougthBeats(state, action: PayloadAction<BeatsClass[]>) {
      state.bougthBeats = action.payload
    },
    setOwnedBeats(state, action: PayloadAction<BeatsClass[]>) {
      state.ownedBeats = action.payload
    },
    setFavoriteBeats(state, action: PayloadAction<BeatsClass[]>) {
      state.favoriteBeats = action.payload ?? []
    },
    setActiveEditingBeat(state, action: PayloadAction<BeatsClass>) {
      state.activeEditingBeat = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postClientBeat.pending, (state, action) => {
        const trad =
          i18next?.language == 'en'
            ? 'Uploading beat, please wait for confirmation...'
            : 'Subiendo beat, espera la confirmación...'
        toast(trad)
      })
      .addCase(postClientBeat.fulfilled, (state, action) => {
        const trad = i18next?.language == 'en' ? 'Beat uploaded successfully' : 'Beat subido correctamente'
        toast.success(trad)
      })
      .addCase(postClientBeat.rejected, (state, action) => {
        toast('action.payload')
      })
      .addCase(deleteClientBeat.fulfilled, (state, action) => {
        const trad = i18next?.language == 'en' ? 'Beat deleted successfully' : 'Beat borrado correctamente'
        toast.success(trad)
      })
      .addCase(deleteClientBeat.rejected, (state, action) => {
        toast('action.payload')
      })

      .addCase(editClientBeat.pending, (state, action) => {
        const trad =
          i18next?.language == 'en'
            ? 'Editing beat, please wait for confirmation...'
            : 'Editando beat, espera la confirmación...'
        toast(trad)
      })
      .addCase(editClientBeat.fulfilled, (state, action) => {
        const trad = i18next?.language == 'en' ? 'Beat edited successfully' : 'Beat editado correctamente'
        toast.success(trad)
      })
      .addCase(editClientBeat.rejected, (state, action) => {
        toast.error('action.payload')
      })
      .addCase(postFavoriteBeat.fulfilled, (state, action: PayloadAction<BeatsClass>) => {
        state.favoriteBeats.push(action.payload)
      })
      .addCase(postFavoriteBeat.rejected, (state, action) => {
        toast.error('action.payload')
      })
      .addCase(deleteFavoriteBeat.fulfilled, (state, action: PayloadAction<BeatsClass>) => {
        state.favoriteBeats = state.favoriteBeats.filter((beat) => beat._id !== action.payload._id)
      })
      .addCase(deleteFavoriteBeat.rejected, (state, action) => {
        toast.error('deleteFavoriteBeat error')
      })
  }
})

export const { setBougthBeats, setOwnedBeats, setActiveEditingBeat, setFavoriteBeats } = clientBeats.actions

export default clientBeats.reducer

/*FUNCION DE BEATS:*/
/* 1) POST CLIENT BEAT: Se crea un beat y se guarda en la base de datos. */
/* 2) DELETE CLIENT BEAT: Se elimina un beat de la base de datos. */
/* 3) EDIT CLIENT BEAT: Se edita un beat de la base de datos. */
/* 4) SET ACTIVE EDITING BEAT: Se setea el beat que se esta editando. */
/* 5) SET BOUGTH BEATS: Se setean los beats comprados. */
/* 6) SET OWNED BEATS: Se setean los beats creados. */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "@/data/config";
import { toast } from "sonner";
import axios from "axios";
import { toastError, toastSuccess } from "@/utils/toastStyles";
import { getUserData } from "./authSession";
import { fetchBeats } from "../beats";

const initialState = {
  activeEditingBeat: null,
  bougthBeats: [],
  ownedBeats: [],
  favoriteBeats: [],
};

//------------------ ASYNC THUNKS ------------------//
//POST CLIENT BEAT
export const postClientBeat = createAsyncThunk(
  "client/postClientBeat",
  async (data, { rejectWithValue, dispatch, getState }) => {
    console.log("data", data);
    const id = getState().client.authSession.session.current._id;
    try {
      const response = await axios.post(`${serverUrl}beats`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          userid: id,
        },
      });
      console.log(data);

      await dispatch(getUserData());
      await dispatch(fetchBeats({}));
      return response.data;
    } catch (error) {
      console.log("ERROR xx", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

//--------------------
//DELETE CLIENT BEAT
export const deleteClientBeat = createAsyncThunk(
  "client/deleteClientBeat",
  async (data, { rejectWithValue, dispatch, getState }) => {
    const id = getState().client.authSession.session.current._id;
    try {
      const response = await axios.delete(`${serverUrl}beats/${data}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          userid: id,
        },
      });

      await dispatch(getUserData(id));
      await dispatch(fetchBeats({}));

      return response.data;
    } catch (error) {
      console.log("ERROR xx", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

//--------------------
//EDIT CLIENT BEAT
export const editClientBeat = createAsyncThunk(
  "client/editClientBeat",
  async (data, { rejectWithValue, dispatch, getState }) => {
    console.log("data 555", data);
    const id = getState().client.authSession.session.current._id;
    const activeEditingBeat = getState().client.beats.activeEditingBeat;

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    try {
      console.log("data", data, activeEditingBeat._id, id);
      const response = await axios.put(
        `${serverUrl}beats/${activeEditingBeat._id}`,
        formData,
        {
          headers: {
            userid: id,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await dispatch(getUserData(id));
      await dispatch(fetchBeats({}));

      return response.data;
    } catch (error) {
      console.log("ERROR xx", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

//--------------------
//POST FAVORITE BEAT
export const postFavoriteBeat = createAsyncThunk(
  "client/postFavoriteBeat",
  async (data, { rejectWithValue, dispatch, getState }) => {
    const id = getState().client.authSession.session.current._id;
    try {
      const response = await axios.post(
        `${serverUrl}beats/favorite/${data}`,
        {},
        {
          headers: {
            userid: id,
          },
        }
      );

      await dispatch(getUserData(id));
      //  await dispatch(fetchBeats({}));

      return response.data;
    } catch (error) {
      console.log("ERROR xx", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

//--------------------
//DELETE FAVORITE BEAT
export const deleteFavoriteBeat = createAsyncThunk(
  "client/deleteFavoriteBeat",
  async (data, { rejectWithValue, dispatch, getState }) => {
    const id = getState().client.authSession.session.current._id;
    try {
      const response = await axios.delete(
        `${serverUrl}beats/favorite/${data}`,
        {
          headers: {
            userid: id,
          },
        }
      );

      await dispatch(getUserData(id));

      return response.data;
    } catch (error) {
      console.log("ERROR xx", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

//------------------ SLICE ------------------//

const authSession = createSlice({
  name: "authSession",
  initialState,
  reducers: {
    //--------------------
    //SET BOUGHT BEATS
    setBougthBeats(state, action) {
      console.log("action.payload setBoughtBeats", action.payload);
      state.bougthBeats = action.payload;
    },
    //--------------------
    //SET OWNED BEATS
    setOwnedBeats(state, action) {
      state.ownedBeats = action.payload;
    },

    //--------------------
    //SET FAVORITE BEATS
    setFavoriteBeats(state, action) {
      state.favoriteBeats = action.payload;
    },
    //--------------------
    //SET ACTIVE EDITING BEAT
    setActiveEditingBeat(state, action) {
      state.activeEditingBeat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //--------------------
      //DELETE CLIENT BEAT
      .addCase(postClientBeat.pending, (state, action) => {
        toast("Subiendo beat, espera la confirmación...");
      })
      .addCase(postClientBeat.fulfilled, (state, action) => {
        toast.success("Beat subido correctamente", toastSuccess);
      })
      .addCase(postClientBeat.rejected, (state, action) => {
        toast(action.payload, toastError);
      })

      //--------------------
      //DELETE CLIENT BEAT
      .addCase(deleteClientBeat.pending, (state, action) => {
        toast("Borrando beat, espera la confirmación...");
      })
      .addCase(deleteClientBeat.fulfilled, (state, action) => {
        toast.success("Beat borrado correctamente", toastSuccess);
      })
      .addCase(deleteClientBeat.rejected, (state, action) => {
        toast(action.payload, toastError);
      })

      //--------------------
      //EDIT CLIENT BEAT
      .addCase(editClientBeat.pending, (state, action) => {
        toast("Editando beat, espera la confirmación...");
      })
      .addCase(editClientBeat.fulfilled, (state, action) => {
        toast.success("Beat editado correctamente", toastSuccess);
      })
      .addCase(editClientBeat.rejected, (state, action) => {
        toast(action.payload, toastError);
      })

      //--------------------
      //POST FAVORITE BEAT
      .addCase(postFavoriteBeat.pending, (state, action) => {
        toast("Añadiendo a favoritos, espera la confirmación...");
      })
      .addCase(postFavoriteBeat.fulfilled, (state, action) => {
        toast.success("Beat añadido a favoritos correctamente", toastSuccess);
      })
      .addCase(postFavoriteBeat.rejected, (state, action) => {
        toast(action.payload, toastError);
      })

      //--------------------
      //DELETE FAVORITE BEAT
      .addCase(deleteFavoriteBeat.pending, (state, action) => {
        toast("Borrando de favoritos, espera la confirmación...");
      })
      .addCase(deleteFavoriteBeat.fulfilled, (state, action) => {
        toast.success("Beat borrado de favoritos correctamente", toastSuccess);
      })
      .addCase(deleteFavoriteBeat.rejected, (state, action) => {
        toast(action.payload, toastError);
      });
  },
});

export const {
  setBougthBeats,
  setOwnedBeats,
  setActiveEditingBeat,
  setFavoriteBeats,
} = authSession.actions;

export default authSession.reducer;

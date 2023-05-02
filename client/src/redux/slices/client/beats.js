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
import { fetchBeats, fetchFeaturedBeats } from "../beats";
import i18next from 'i18next';

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
    console.log("DELETE BEAT data", data);
    try {
      const response = await axios.delete(`${serverUrl}beats/${data}`, {
        headers: {
          userid: id,
        },
      });

      console.log("DELETE BEAT", data,  response.data);
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
    await dispatch(fetchFeaturedBeats());

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
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    try {
      const response = await axios.put(`${serverUrl}user/${id}`, formData, {
        headers: {
          userid: id,
        },
      });

      setTimeout(async () => {
        await dispatch(getUserData(id));
      }, 200);
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
    console.log("data", data);
    const id = getState().client.authSession.session.current._id;
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    console.log("DELETE FAVORITE BEAT", formData);
    try {
      const response = await axios.put(`${serverUrl}user/${id}`, formData, {
        headers: {
          userid: id,
        },
      });

      setTimeout(async () => {
        await dispatch(getUserData(id));
      }, 200);

      return response.data;
    } catch (error) {
      console.log("ERROR xx", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

//------------------ SLICE ------------------//

const clientBeats = createSlice({
  name: "clientBeats",
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
      state.favoriteBeats = action.payload ?? [];
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
        let trad= i18next?.language == "en"? "Uploading beat, please wait for confirmation..." : "Subiendo beat, espera la confirmación..."
        toast(trad);
      })
      .addCase(postClientBeat.fulfilled, (state, action) => {
        let trad= i18next?.language == "en"? "Beat uploaded successfully" : "Beat subido correctamente"
        toast.success(trad, toastSuccess);
      })
      .addCase(postClientBeat.rejected, (state, action) => {
        toast(action.payload, toastError);
      })

      //--------------------
      //DELETE CLIENT BEAT
      .addCase(deleteClientBeat.pending, (state, action) => {
        let trad= i18next?.language == "en"? "Deleting beat, please wait for confirmation..." : "Borrando beat, espera la confirmación..."
        toast(trad);
      })
      .addCase(deleteClientBeat.fulfilled, (state, action) => {
        let trad= i18next?.language == "en"? "Beat deleted successfully" : "Beat borrado correctamente"
        toast.success(trad, toastSuccess);
      })
      .addCase(deleteClientBeat.rejected, (state, action) => {
        toast(action.payload, toastError);
      })

      //--------------------
      //EDIT CLIENT BEAT
      .addCase(editClientBeat.pending, (state, action) => {
        let trad= i18next?.language == "en"? "Editing beat, please wait for confirmation..." : "Editando beat, espera la confirmación..."
        toast(trad);
      })
      .addCase(editClientBeat.fulfilled, (state, action) => {
        let trad= i18next?.language == "en"? "Beat edited successfully" : "Beat editado correctamente"
        toast.success(trad, toastSuccess);
      })
      .addCase(editClientBeat.rejected, (state, action) => {
        toast(action.payload, toastError);
      })

      //--------------------
      //POST FAVORITE BEAT
      .addCase(postFavoriteBeat.pending, (state, action) => {
        let trad= i18next?.language == "en"? "Adding to favorites, please wait for confirmation..." : "Añadiendo a favoritos, espera la confirmación..."
        toast(trad);
      })
      .addCase(postFavoriteBeat.fulfilled, (state, action) => {
        let trad= i18next?.language == "en"? "Beat added to favorites successfully" : "Beat añadido a favoritos correctamente"
        toast.success(trad, toastSuccess);
      })
      .addCase(postFavoriteBeat.rejected, (state, action) => {
        toast(action.payload, toastError);
      })

      //--------------------
      //DELETE FAVORITE BEAT
      .addCase(deleteFavoriteBeat.pending, (state, action) => {
        let trad= i18next?.language == "en"? "Removing from favorites, please wait for confirmation..." : "Borrando de favoritos, espera la confirmación..."
        toast(trad);
      })
      .addCase(deleteFavoriteBeat.fulfilled, (state, action) => {
        let trad= i18next?.language == "en"? "Beat removed from favorites successfully" : "Beat borrado de favoritos correctamente"
        toast.success(trad, toastSuccess);
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
} = clientBeats.actions;

export default clientBeats.reducer;

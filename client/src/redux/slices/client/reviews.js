/*FUNCION DE REVIEWS:*/
/* 1) POST CLIENT REVIEW: Se crea un review y se guarda en la base de datos. */
/* 2) DELETE CLIENT REVIEW: Se elimina un review de la base de datos. */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "@/data/config";
import { toast } from "sonner";
import axios from "axios";
import { toastError, toastSuccess } from "@/utils/toastStyles";
import { getUserData } from "./authSession";
import { fetchBeats, fetchFeaturedBeats } from "../beats";
import i18next from 'i18next';

const initialState = {
  activeBeatCreateReview: null,
  activeEditingReview: null,
  reviews: [],
};

//------------------ ASYNC THUNKS ------------------//
//POST CLIENT REVIEW
export const postClientReview = createAsyncThunk(
  "client/postClientReview",
  async (data, { rejectWithValue, dispatch, getState }) => {
    const id = getState().client.authSession.session.current._id;
    try {
      const response = await axios.post(`${serverUrl}review`, data, {
        headers: {
          userid: id,
        },
      });

      await dispatch(getUserData(id));
      await dispatch(fetchBeats({}));
      await dispatch(fetchFeaturedBeats());
      return;
    } catch (error) {
      console.log("ERROR xx", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

//--------------------
//DELETE CLIENT REVIEW
export const deleteClientReview = createAsyncThunk(
  "client/deleteClientReview",
  async (data, { rejectWithValue, dispatch, getState }) => {
   
    const id = getState().client.authSession.session.current._id;
    try {
      const response = await axios.delete(`${serverUrl}review/${data}`, {
        headers: {
          userid: id,
        },
      });

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
//EDIT CLIENT REVIEW
export const editClientReview = createAsyncThunk(
  "client/editClientReview",
  async (data, { rejectWithValue, dispatch, getState }) => {
    const id = getState().client.authSession.session.current._id;
    const reviewId = getState().client.reviews.activeEditingReview._id;
   
    try {
      const response = await axios.put(
        `${serverUrl}review/${reviewId}`,
        data,
        {
          headers: {
            userid: id,
          },
        }
      );
      await dispatch(getUserData());
      await dispatch(fetchBeats({}));
      return response.data;
    } catch (error) {
      console.log("ERROR xx", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

//-------------------- SLICE -------------------//

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    //--------------------
    //SET ACTIVE EDITING REVIEW
    setActiveEditingReview(state, action) {

      state.activeEditingReview = action.payload;
    },

    //--------------------
    //SET OWN REVIEWS
    setOwnedReviews(state, action) {

      state.reviews = action.payload;
    },

    //--------------------
    //SET ACTIVE BEAT CREATE REVIEW
    setActiveBeatCreateReview(state, action) {
      state.activeBeatCreateReview = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //--------------------
      //POST CLIENT REVIEW
      .addCase(postClientReview.fulfilled, (state, action) => {
        let trad= i18next?.language == "en"? "Review created" : "Review creada"
        toast.success(trad, toastSuccess);
      })
      .addCase(postClientReview.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(postClientReview.pending, (state, action) => {
        let trad= i18next?.language == "en"? "Creating review..." : "Creando review..."
        toast(trad);
      })

      //--------------------
      //DELETE CLIENT REVIEW
      .addCase(deleteClientReview.fulfilled, (state, action) => {
        let trad= i18next?.language == "en"? "Review deleted" : "Review eliminada"
        toast.success(trad, toastSuccess);
      })
      .addCase(deleteClientReview.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(deleteClientReview.pending, (state, action) => {
        let trad= i18next?.language == "en"? "Deleting review..." : "Eliminando review..."
        toast(trad);
      })

      //--------------------
      //EDIT CLIENT REVIEW
      .addCase(editClientReview.fulfilled, (state, action) => {
        let trad= i18next?.language == "en"? "Review edited" : "Review editada"
        toast.success(trad, toastSuccess);
      })
      .addCase(editClientReview.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(editClientReview.pending, (state, action) => {
        let trad= i18next?.language == "en"? "Editing review..." : "Editando review..."
        toast(trad);
      });
  },
});

export const { setActiveEditingReview, setOwnedReviews, setActiveBeatCreateReview } = reviewsSlice.actions;

export default reviewsSlice.reducer;

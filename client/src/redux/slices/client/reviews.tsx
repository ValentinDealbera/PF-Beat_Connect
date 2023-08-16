/*FUNCION DE REVIEWS:*/
/* 1) POST CLIENT REVIEW: Se crea un review y se guarda en la base de datos. */
/* 2) DELETE CLIENT REVIEW: Se elimina un review de la base de datos. */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { getUserData } from "./authSession";
import { fetchBeats, fetchFeaturedBeats } from "../beats";
import i18next from "i18next";
import { axiosDeleter, axiosPoster, axiosPutter } from "@/utils/requests";
import { RootState } from "@/redux/store/store";
import { ReviewsClass } from "@/types";

const initialState = {
  activeBeatCreateReview: {} as ReviewsClass,
  activeEditingReview: {} as ReviewsClass,
  reviews: [] as ReviewsClass[],
};

//------------------ ASYNC THUNKS ------------------//
//POST CLIENT REVIEW
export const postClientReview = createAsyncThunk(
  "client/postClientReview",
  async (data: any, { rejectWithValue, dispatch, getState }) => {
    const state = getState() as RootState;
    const id = state.client.authSession.session.current._id;
    try {
      await axiosPoster({
        url: `review`,
        body: data,
        headers: {
          userid: id,
        },
      });

      await dispatch(getUserData(id));
      await dispatch(fetchBeats({}));
      await dispatch(fetchFeaturedBeats());
      return;
    } catch (error) {
      console.log("postClientReview error", error);
      throw error;
    }
  },
);

//--------------------
//DELETE CLIENT REVIEW
export const deleteClientReview = createAsyncThunk(
  "client/deleteClientReview",
  async (data: string, { rejectWithValue, dispatch, getState }) => {
    const state = getState() as RootState;
    const id = state.client.authSession.session.current._id;
    try {
      const response = await axiosDeleter({
        url: `review/${data}`,
        headers: {
          userid: id,
        },
      });

      await dispatch(getUserData(id));
      await dispatch(fetchBeats({}));

      return response;
    } catch (error) {
      console.log("deleteClientReview error", error);
      throw error;
    }
  },
);

//--------------------
//EDIT CLIENT REVIEW
export const editClientReview = createAsyncThunk(
  "client/editClientReview",
  async (data: any, { rejectWithValue, dispatch, getState }) => {
    const state = getState() as RootState;
    const id = state.client.authSession.session.current._id;
    const reviewId = state.client.reviews.activeEditingReview._id;

    try {
      const response = await axiosPutter({
        url: `review/${reviewId}`,
        body: data,
        headers: {
          userid: id,
        },
      });

      await dispatch(getUserData(id));
      await dispatch(fetchBeats({}));
      return response;
    } catch (error) {
      console.log("editClientReview error", error);
      throw error;
    }
  },
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
        let trad =
          i18next?.language == "en" ? "Review created" : "Review creada";
        toast.success(trad);
      })
      .addCase(postClientReview.rejected, (state, action) => {
        toast.error("action.payload");
      })
      .addCase(postClientReview.pending, (state, action) => {
        let trad =
          i18next?.language == "en"
            ? "Creating review..."
            : "Creando review...";
        toast(trad);
      })

      //--------------------
      //DELETE CLIENT REVIEW
      .addCase(deleteClientReview.fulfilled, (state, action) => {
        let trad =
          i18next?.language == "en" ? "Review deleted" : "Review eliminada";
        toast.success(trad);
      })
      .addCase(deleteClientReview.rejected, (state, action) => {
        toast.error("action.payload");
      })
      .addCase(deleteClientReview.pending, (state, action) => {
        let trad =
          i18next?.language == "en"
            ? "Deleting review..."
            : "Eliminando review...";
        toast(trad);
      })

      //--------------------
      //EDIT CLIENT REVIEW
      .addCase(editClientReview.fulfilled, (state, action) => {
        let trad =
          i18next?.language == "en" ? "Review edited" : "Review editada";
        toast.success(trad);
      })
      .addCase(editClientReview.rejected, (state, action) => {
        toast.error("action.payload");
      })
      .addCase(editClientReview.pending, (state, action) => {
        let trad =
          i18next?.language == "en"
            ? "Editing review..."
            : "Editando review...";
        toast(trad);
      });
  },
});

export const {
  setActiveEditingReview,
  setOwnedReviews,
  setActiveBeatCreateReview,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;

/*FUNCION DE REVIEWS:*/
/* 1) POST CLIENT REVIEW: Se crea un review y se guarda en la base de datos. */
/* 2) DELETE CLIENT REVIEW: Se elimina un review de la base de datos. */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "@/data/config";
import { toast } from "sonner";
import axios from "axios";
import { toastError, toastSuccess } from "@/utils/toastStyles";

const initialState = {
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
      const response = await axios.post(`${serverUrl}reviews`, data, {
        headers: {
          userid: id,
        },
      });

      // const reviews = userReviews.map((review) => ({
      //   rating: review.rating,
      //   title: review.title,
      //   comment: review.comment,
      //   _id: review._id,
      //   username: review.createdBy.username,
      //   beat: id,
      // }));

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
//DELETE CLIENT REVIEW
export const deleteClientReview = createAsyncThunk(
  "client/deleteClientReview",
  async (data, { rejectWithValue, dispatch, getState }) => {
    const id = getState().client.authSession.session.current._id;
    try {
      const response = await axios.delete(`${serverUrl}reviews/${data}`, {
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
    try {
      const response = await axios.put(
        `${serverUrl}reviews/${data._id}`,
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
  },
  extraReducers: (builder) => {
    builder
      //--------------------
      //POST CLIENT REVIEW
      .addCase(postClientReview.fulfilled, (state, action) => {
        toast.success("Review creada", toastSuccess);
        state.reviews = action.payload;
      })
      .addCase(postClientReview.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(postClientReview.pending, (state, action) => {
        toast("Creando review...");
      })

      //--------------------
      //DELETE CLIENT REVIEW
      .addCase(deleteClientReview.fulfilled, (state, action) => {
        toast.success("Review eliminada", toastSuccess);
      })
      .addCase(deleteClientReview.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(deleteClientReview.pending, (state, action) => {
        toast("Eliminando review...");
      })

      //--------------------
      //EDIT CLIENT REVIEW
      .addCase(editClientReview.fulfilled, (state, action) => {
        toast.success("Review editada", toastSuccess);
      })
      .addCase(editClientReview.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(editClientReview.pending, (state, action) => {
        toast("Editando review...");
      });
  },
});

export const { setActiveEditingReview, setOwnedReviews } = reviewsSlice.actions;

export default reviewsSlice.reducer;

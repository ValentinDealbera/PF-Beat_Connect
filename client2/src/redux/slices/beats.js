/*FUNCION DE BEATS:*/
/* 1) FETCH BEATS: Se obtienen los beats de la base de datos. */
/* 2) FETCH BEAT DETAIL: Se obtiene el detalle de un beat de la base de datos. */
/* 3) PAGINADOR: Se obtienen los beats de la base de datos. */
/* 4) FETCH AUTHOR: Se obtiene el detalle de un autor de la base de datos. */
/* 5) FETCH AUTHOR BEATS: Se obtienen los beats de un autor de la base de datos. */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "@/data/config";
import axios from "axios";

import { data } from "autoprefixer";
import { throttle } from "lodash";
import createAbortController from "@/utils/abortController";

const initialState = {
  //LOADING
  loadingBeats: false,
  //BEATS
  publicItems: [],
  activeItems: [],
  featuredItems: [],
  activeItemDetail: null,
  generalActiveIndex: 0,
  //REVIEWS
  activeReviewDetail: [],
  reviewFetchStatus: false,
  //AUTHOR
  currentAuthor: {},
  currentAuthorBeats: [],
  loadingcurrentAuthor: false,
  //PAGINATION
  pageIndex: 1,
  pages: {
    next: null,
    prev: null,
    current: 1,
    limit: null,
  },
};

//------------------ ASYNC THUNKS ------------------//
//FETCH BEATS
export const fetchBeats = createAsyncThunk(
  "beats/fetchBeats",

  async (
    {
      page = 1,
      minPrice,
      maxPrice,
      minBPM,
      maxBPM,
      name,
      BPM,
      priceAmount,
      rating,
      genre,
      searchFilter,
    },
    { rejectWithValue }
  ) => {
    try {
      const queryParameters = {
        ...(minPrice !== 0 && !isNaN(minPrice) && { minPrice }),
        ...(maxPrice !== 0 && !isNaN(maxPrice) && { maxPrice }),
        ...(minBPM !== 0 && !isNaN(minBPM) && { minBPM }),
        ...(maxBPM !== 0 && !isNaN(maxBPM) && { maxBPM }),
        ...(name && { name }),
        ...(BPM && { BPM }),
        ...(priceAmount && { priceAmount }),
        ...(rating && { rating }),
        ...(genre && { genre }),
        ...(searchFilter && { searchFilter }),
      };

      let queryString = "?";
      Object.entries(queryParameters).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          queryString += `&${key}=${encodeURIComponent(value)}`;
        }
      });

      const response = await axios.get(
        `${serverUrl}beats?page=${page}${queryString.substr(1)}`,
        {
          headers: {
            genre,
          },
        }
      );

      //si tiene soft delete, no se muestra
      const beats = response.data.docs.filter((beat) => !beat.softDelete);
      //si las reviews tienen soft delete, no se muestran las reviews pero si el beat
      const beatsConReviewsFiltradas = beats.map((beat) => {
        const reviewsFiltradas = beat.review.filter(
          (review) => !review.softDelete
        );
        return { ...beat, review: reviewsFiltradas };
      });

      console.log("beats", beats);

      return {
        docs: beatsConReviewsFiltradas,
        next: response.data.nextPage,
        prev: response.data.prevPage,
        current: response.data.page,
        limit: response.data.totalPages,
      };
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

//--------------------
//FETCH FEATURED BEATS
export const fetchFeaturedBeats = createAsyncThunk(
  "beats/fetchFeaturedBeats",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${serverUrl}beats?relevance=desc&limit=5`
      );

      const beats = response.data.docs.filter((beat) => !beat.softDelete);
      const beatsConReviewsFiltradas = beats.map((beat) => {
        const reviewsFiltradas = beat.review.filter(
          (review) => !review.softDelete
        );
        return { ...beat, review: reviewsFiltradas };
      });
      return {
        docs: beatsConReviewsFiltradas,
      };
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data.message);
    }
  }
);

//--------------------
//FETCH CURRENT AUTHOR
export const fetchCurrentAuthor = createAsyncThunk(
  "beats/fetchCurrentAuthor",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${serverUrl}user/${id}`);
      const currentAuthorBeats = response.data.createdBeats;
      const currentAuthor = {
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        _id: response.data._id,
        profilePicture: response.data.image,
        username: response.data.username,
        bio: response.data.bio,
        backImage: response.data.backImage,
      };
      return { beats: currentAuthorBeats, currentAuthor };
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

//-------------------- SLICE -------------------//

const beatsSlice = createSlice({
  name: "beats",
  initialState,
  reducers: {
    //--------------------
    //SET BEATS DISPLAY MODE
    setBeatsDisplayMode(state, action) {
      state.beatsDisplayMode = action.payload;
      if (action.payload === 0 || action.payload === 1) {
        state.activeItems = state.publicItems;
      }
    },

    //--------------------
    //SET ACTIVE ITEM DETAIL
    setActiveItemDetail(state, action) {
      state.activeItemDetail = action.payload;
    },

    //--------------------
    //SET CURRENT PAGE
    setCurrentPage(state, action) {
      state.pageIndex = action.payload;
    },

    //--------------------
    //SET GENERAL ACTIVE INDEX
    setGeneralActiveIndex(state, action) {
      state.generalActiveIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //--------------------
      //Extra reducers para los beats publicos 0 1
      .addCase(fetchBeats.pending, (state, action) => {
        state.loadingBeats = true;
      })
      .addCase(fetchBeats.fulfilled, (state, action) => {
        if (
          !Array.isArray(action.payload.docs) ||
          action.payload.docs.length === 0 ||
          action.payload.docs === null ||
          action.payload.docs === undefined
        ) {
          state.publicItems = [];
          state.activeItems = [];
          return;
        }
        state.publicBeatsFetchStatus = true;
        state.publicItems = action.payload.docs || [];
        state.activeItems = action.payload.docs || [];
        state.pages.next = action.payload.next;
        state.pages.prev = action.payload.prev;
        state.pages.current = action.payload.current;
        state.pages.limit = action.payload.limit;
        state.loadingBeats = false;
      })
      .addCase(fetchBeats.rejected, (state, action) => {
        console.error(" fetch error", action.error);
      })

      //--------------------
      //Extra reducers para el perfil del autor 3
      .addCase(fetchCurrentAuthor.pending, (state, action) => {
        state.authorFetchStatus = false;
        state.loadingcurrentAuthor = true;
      })
      .addCase(fetchCurrentAuthor.fulfilled, (state, action) => {
        state.currentAuthor = action.payload.currentAuthor;
        state.currentAuthorBeats = action.payload.beats;
        state.beatsDisplayMode = 3;
        state.loadingcurrentAuthor = false;
      })
      .addCase(fetchCurrentAuthor.rejected, (state, action) => {
        console.error(action.error);
      })

      //--------------------
      //Extra reducers para los beats destacados
      .addCase(fetchFeaturedBeats.pending, (state, action) => {
        state.loadingBeats = true;
      })
      .addCase(fetchFeaturedBeats.fulfilled, (state, action) => {
        state.featuredItems = action.payload.docs || [];
      })
      .addCase(fetchFeaturedBeats.rejected, (state, action) => {
        console.error(" etch error", action.error);
      });
  },
});

export const {
  setBeats,
  setActiveItemDetail,
  setBeatsDisplayMode,
  setGeneralActiveIndex,
  setCurrentAuthorBeats,
  setActiveItemsForProfile,
  setCurrentPage,
} = beatsSlice.actions;

export default beatsSlice.reducer;

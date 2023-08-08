/*FUNCION DE FILTERS:*/
/* 1) SET SEARCH FILTER: */
/* 2) SET GENRES FILTER: */
/* 3) SET PRICE FILTER: */
/* 4) SET BPM FILTER: */
/* 5) SET SORTER: */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "@/data/config";
import axios from "axios";
import { sortArr } from "@/data/fakeDB";
import { toastError } from "@/utils/toastStyles";
import { toast } from "sonner";
import i18next from 'i18next';

const initialState = {
  searchFilter: "",
  genres: [],
  genresFilter: [],
  priceFilter: {
    min: 0,
    max: 0,
  },
  BpmFilter: {
    min: 0,
    max: 0,
  },
  sorter: "default",
  sorterValues: sortArr,
};

//------------------ ASYNC THUNKS ------------------//
//GENRES
export const fetchGenres = createAsyncThunk(
  "genres/fetchGenres",
  async (_, { rejectWithValue }) => {
    try {
      const { data: genresResponse } = await axios.get(`${serverUrl}genre`);
      return genresResponse;
    } catch (error) {
      console.log("ERROR", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

//------------------ SLICE ------------------//

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    //--------------------
    //SET SEARCH FILTER
    setSearchFilter(state, action) {
      state.searchFilter = action.payload;
    },

    //--------------------
    //SET GENRES FILTER
    setGenresFilter(state, action) {
      const isSelected = state.genresFilter.includes(action.payload);
      if (isSelected) {
        state.genresFilter = state.genresFilter.filter(
          (genre) => genre !== action.payload
        );
        return;
      }
      state.genresFilter = action.payload;
    },

    //--------------------
    //SET PRICE FILTER
    setPriceFilter(state, action) {
      state.priceFilter = action.payload;
    },

    //--------------------
    //SET BPM FILTER
    setBpmFilter(state, action) {
      state.BpmFilter = action.payload;
 
    },

    //--------------------
    //SET SORTER
    setSorter(state, action) {
      state.sorter = action.payload;
    },

    //--------------------
    //RESTORE FILTERS
    restoreFilters(state, action) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      //--------------------
      //FETCH GENRES
      .addCase(fetchGenres.fulfilled, (state, action) => {
        const formatedGenres = action.payload.map((genre) => ({
          label: genre.name,
          value: genre._id,
        }));
        state.genres = formatedGenres;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.genres = [];
        let trad= i18next?.language == "en"? "Error loading genres" : "Error al cargar los géneros"
        toast.error(trad, toastError);
      })
      .addCase(fetchGenres.pending, (state, action) => {
        state.genres = [];
      });
  },
});

export const {
  setSearchFilter,
  setGenresFilter,
  restoreFilters,
  setPriceFilter,
  setBpmFilter,
  setSorter,
} = filtersSlice.actions;

export default filtersSlice.reducer;

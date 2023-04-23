import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "@/data/config";
import axios from "axios";
import { sortArr } from "@/data/fakeDB";
import { throttle } from "lodash";
import createAbortController from "@/utils/abortController";

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
  typesFilter: [],
  filteredBeats: [],
};

export const fetchFilteredBeats = createAsyncThunk(
  "filters/fetchFilteredBeats",
  async (data, { rejectWithValue }) => {
    try {
      console.log("fabi console.log", data);
      const response = await axios.get(`${serverUrl}beats${data}`);
      const filteredBeats = response.data.docs;

      return filteredBeats;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchGenres = createAsyncThunk(
  "genres/fetchGenres",
  async (_, { signal }) => {
    const { data } = await axios.get(`${serverUrl}genre`, {
      signal,
    });
      const genresResponse = data;
      return genresResponse;
  }
);



// export const fetchGenres = createAsyncThunk("genres/fetchGenres",
//   throttle(
//     async () => {
//       const { data } = await axios.get(`${serverUrl}genre`);
//       const genresResponse = data;
//       return genresResponse;
//     }
//     , 3000));

const filtersSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setSearchFilter(state, action) {
      state.searchFilter = action.payload;
    },
    setGenresFilter(state, action) {
      const isSelected = state.genresFilter.includes(action.payload);

      if (isSelected) {
        state.genresFilter = state.genresFilter.filter(
          (genre) => genre !== action.payload
        );
      } else {
        state.genresFilter = action.payload;
      }
    },
    setTypesFilter(state, action) {
      const isSelected = state.typesFilter.includes(action.payload);

      if (isSelected) {
        state.typesFilter = state.typesFilter.filter(
          (genre) => genre !== action.payload
        );
      } else {
        state.typesFilter = action.payload;
      }
    },
    setPriceFilter(state, action) {
      state.priceFilter = action.payload;
    },

    setBpmFilter(state, action) {
      state.BpmFilter = action.payload;
      console.log("BPM FILTER", state.BpmFilter);
    },
    setSorter(state, action) {
      state.sorter = action.payload;
    },

    restoreFilters(state, action) {
      state.searchFilter = "";
      state.genresFilter = [];
      state.typesFilter = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.fulfilled, (state, action) => {
        //puede cambiar a _id
        const formatedGenres = action.payload.map((genre) => ({
          label: genre.name,
          value: genre._id,
        }));

        state.genres = formatedGenres;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.genres = [];
      })
      .addCase(fetchGenres.pending, (state, action) => {
        state.genres = [];
      })

      //fetchFilteredBeats

      .addCase(fetchFilteredBeats.fulfilled, (state, action) => {
        console.log("Filtered beats fetched successfully");

        state.filteredBeats = action.payload;
      })
      .addCase(fetchFilteredBeats.rejected, (state, action) => {
        console.error("fetch error");
      })
      .addCase(fetchFilteredBeats.pending, (state, action) => {
        console.log("Trayendo los beats...");
      });
  },
});

export const {
  setSearchFilter,
  setGenresFilter,
  setTypesFilter,
  restoreFilters,
  setPriceFilter,
  setBpmFilter,
  setSorter,
} = filtersSlice.actions;

export default filtersSlice.reducer;

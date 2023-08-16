import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { serverUrl } from "@/data/config";
import axios from "axios";
import { toast } from "sonner";
import i18next from "i18next";

const sortArr = [
  { value: "default", label: "Default" },
  { value: "Price-AS", label: "Price ↑" },
  { value: "Price-DES", label: "Price ↓" },
  { value: "BPM-AS", label: "BPM ↑" },
  { value: "BPM-DES", label: "BPM ↓" },
  { value: "A-Z", label: "A-Z" },
  { value: "Z-A", label: "Z-A" },
];

const initialState = {
  searchFilter: "",
  genres: [] as any[],
  genresFilter: [] as any[],
  priceFilter: {
    min: 0,
    max: 0,
  },
  BpmFilter: {
    min: 0,
    max: 0,
  },
  sorter: "default",
  sorterValues: sortArr as any[],
};

//------------------ ASYNC THUNKS ------------------//
//GENRES
export const fetchGenres = createAsyncThunk(
  "genres/fetchGenres",
  async (_, { rejectWithValue }) => {
    try {
      const { data: genresResponse } = await axios.get(`${serverUrl}genre`);
      return genresResponse;
    } catch (error: any) {
      console.log("ERROR", error);
      return rejectWithValue(error.response.data.message);
    }
  },
);

//------------------ SLICE ------------------//
const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchFilter(state, action) {
      state.searchFilter = action.payload;
    },
    setGenresFilter(state, action: PayloadAction<any>) {
      const isSelected = state.genresFilter.includes(action.payload);
      if (isSelected) {
        state.genresFilter = state.genresFilter.filter(
          (genre) => genre !== action.payload,
        );
        return;
      }
      console.log("setGenresFilter action.payload", action.payload);
      state.genresFilter = action.payload;
    },
    setPriceFilter(state, action) {
      state.priceFilter = action.payload;
    },
    setBpmFilter(state, action) {
      state.BpmFilter = action.payload;
    },
    setSorter(state, action) {
      state.sorter = action.payload;
    },
    restoreFilters(state, action) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.fulfilled, (state, action: PayloadAction<any>) => {
        const formatedGenres = action.payload.map((genre: any) => ({
          label: genre.name,
          value: genre._id,
        }));
        state.genres = formatedGenres;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.genres = [];
        let trad =
          i18next?.language == "en"
            ? "Error loading genres"
            : "Error al cargar los géneros";
        toast.error(trad);
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

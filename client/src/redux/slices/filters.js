import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  searchFilter: "",
  genresFilter: [],
  typesFilter: [],
};

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
    restoreFilters(state, action) {
      state.searchFilter = "";
      state.genresFilter = [];
      state.typesFilter = [];
    },
  },
});

export const {
  setSearchFilter,
  setGenresFilter,
  setTypesFilter,
  restoreFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;

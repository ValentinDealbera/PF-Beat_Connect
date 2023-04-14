import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { beats } from "../../data/fakeDB";

const initialState = {
  beatsDisplayMode: null,
  publicItems: [],
  userFavoriteBeats: [],
  userPurchasedBeats: [],
  userOwnedBeats: [],
  activeItems: [],
  activeItemDetail: null,
  generalActiveIndex: 0,
};

const beatsSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setBeats(state, action) {
      state.publicItems = action.payload;
    },
    setActiveItemDetail(state, action) {
      state.activeItemDetail = action.payload;
    },
    setBeatsDisplayMode(state, action) {
      console.log("action.payload", action.payload);
      state.beatsDisplayMode = action.payload;

      if (action.payload === "shop") {
        state.activeItems = state.publicItems;
      } else {
        if (state.generalActiveIndex === 0) {
          state.activeItems = state.userPurchasedBeats;
        } else if (state.generalActiveIndex === 1) {
          state.activeItems = state.userOwnedBeats;
        } else if (state.generalActiveIndex === 2) {
          state.activeItems = state.userFavoriteBeats;
        }
      }
    },
    setGeneralActiveIndex(state, action) {
      state.generalActiveIndex = action.payload;
    },
  },
});

export const {
  setBeats,
  setActiveItemDetail,
  setBeatsDisplayMode,
  setGeneralActiveIndex,
} = beatsSlice.actions;
export default beatsSlice.reducer;

export const fetchBeats = () => async (dispatch, getState) => {
  // if (getState().beats.items.length > 0) return;
  console.log("beats", beats);
  try {
    dispatch(setBeats(beats));
  } catch (error) {
    console.error(error);
  }
};

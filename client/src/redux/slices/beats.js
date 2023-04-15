import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { beats } from "../../data/fakeDB";

const initialState = {
  beatsDisplayMode: null,
  currentAuthorLastId: null,
  currentAuthor : {},
  publicItems: [],
  userFavoriteBeats: [],
  userPurchasedBeats: [],
  userOwnedBeats: [],
  currentAuthorBeats: [],
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
    setCurrentAuthor(state, action) {
      console.log("action.payload2", action.payload);
      state.currentAuthor = action.payload;
    },
    setUserOwnedBeats(state, action) {
      state.userOwnedBeats = action.payload;
    },
    setUserPurchasedBeats(state, action) {
      state.userPurchasedBeats = action.payload;
    },
    setUserFavoriteBeats(state, action) {
      state.userFavoriteBeats = action.payload;
    },
    setCurrentAuthorBeats(state, action) {
      if (state.currentAuthorLastId !== action.payload.id) {
        state.currentAuthorLastId = action.payload.id;
        state.currentAuthorBeats = action.payload.beats;
      }
    },
    setActiveItemDetail(state, action) {
      state.activeItemDetail = action.payload;
    },
    setBeatsDisplayMode(state, action) {
      //beatsDisplayMode = shop 0, demo 1, profile 2, currentAuthorBeats 3
      console.log("action.payload", action.payload);
      state.beatsDisplayMode = action.payload;

      if (action.payload === 0 || action.payload === 1) {
        state.activeItems = state.publicItems;
      } else if (action.payload === 2) {
        if (state.generalActiveIndex === 0) {
          state.activeItems = state.userPurchasedBeats;
        } else if (state.generalActiveIndex === 1) {
          state.activeItems = state.userOwnedBeats;
        } else if (state.generalActiveIndex === 2) {
          state.activeItems = state.userFavoriteBeats;
        }
      } else if (action.payload === 3) {
        state.activeItems = state.currentAuthorBeats;
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
  setUserOwnedBeats,
  setUserPurchasedBeats,
  setUserFavoriteBeats,
  setCurrentAuthorBeats,
} = beatsSlice.actions;
export default beatsSlice.reducer;

export const fetchBeats = () => async (dispatch, getState) => {
  try {
    dispatch(setBeats(beats));
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserOwnedBeats = () => async (dispatch, getState) => {
  try {
    dispatch(setUserOwnedBeats(beats));
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserPurchasedBeats = () => async (dispatch, getState) => {
  try {
    dispatch(setUserPurchasedBeats(beats));
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserFavoriteBeats = () => async (dispatch, getState) => {
  try {
    dispatch(setUserFavoriteBeats(beats));
  } catch (error) {
    console.error(error);
  }
};

export const fetchCurrentAuthorBeats = (id) => async (dispatch, getState) => {
  try {
    console.log("id", id);
    dispatch(setCurrentAuthorBeats({ id, beats }));
    dispatch(setBeatsDisplayMode(3));
  } catch (error) {
    console.error(error);
  }
};

export const fetchCurrentAuthor = (id) => async (dispatch, getState) => {
  try {
    console.log("id", id);
    dispatch(setCurrentAuthor(id));
  } catch (error) {
    console.error(error);
  }
};

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { beats } from "../../data/fakeDB";
import axios from "axios";

const initialState = {
  publicBeatsFetchStatus: false,
  beatsDisplayMode: null,
  currentAuthorLastId: null,
  currentAuthor: {},
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
    //Establecemos los beats en el estado global
    setBeats(state, action) {
      console.log("setBeats", action.payload);
      state.publicBeatsFetchStatus = true;
      state.publicItems = action.payload;
    },
    setUserOwnedBeats(state, action) {
      state.userOwnedBeats = action.payload;
    },
    setUserPurchasedBeats(state, action) {
      console.log("setUserPurchasedBeats", action.payload);
      state.userPurchasedBeats = action.payload;
    },
    setUserFavoriteBeats(state, action) {
      state.userFavoriteBeats = action.payload;
    },
    setCurrentAuthorBeats(state, action) {
      state.currentAuthorBeats = action.payload;
    },
    setActiveItemDetail(state, action) {
      state.activeItemDetail = action.payload;
    },
    //Establecemos los beats activos en el estado global
    setActiveItemsForProfile(state, action) {
      if (action.payload === undefined || action.payload === null) {
        action.payload = state.generalActiveIndex;
      }
      action.payload === 0
        ? (state.activeItems = state.userPurchasedBeats)
        : action.payload === 1
        ? (state.activeItems = state.userOwnedBeats)
        : (state.activeItems = state.userFavoriteBeats);
    },
    //Establecemos el modo de visualización de los beats
    setBeatsDisplayMode(state, action) {
      //beatsDisplayMode = shop 0, demo 1, profile 2, currentAuthorBeats 3
      state.beatsDisplayMode = action.payload;
      if (action.payload === 0 || action.payload === 1) {
        console.log("Establecemos active", action.payload);
        state.activeItems = state.publicItems;
      }
    },
    //Establecemos el indice de la pestaña activa en el perfil
    setGeneralActiveIndex(state, action) {
      state.generalActiveIndex = action.payload;
    },
    //Establecemos el autor actual
    setCurrentAuthor(state, action) {
      state.currentAuthor = action.payload;
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
  setActiveItemsForProfile,
} = beatsSlice.actions;
export default beatsSlice.reducer;

export const fetchBeats = () => async (dispatch, getState) => {

  try {
    //solicitamos get con axios
    const data = await axios.get("http://localhost:3001/beats");
    const beatsResponse = data.data;
    dispatch(setBeats(beatsResponse));
    console.log("data", beatsResponse);
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserBeats = () => async (dispatch, getState) => {
  try {
    console.log("fetchUserBeats, beats");
    dispatch(setUserOwnedBeats(beats));
    dispatch(setUserPurchasedBeats(beats));
    dispatch(setUserFavoriteBeats(beats));
    dispatch(setActiveItemsForProfile());
  } catch (error) {
    console.error(error);
  }
};

export const fetchCurrentAuthor = (id) => async (dispatch, getState) => {
  try {
    console.log("id", id);
    dispatch(setCurrentAuthor(id));
    dispatch(setCurrentAuthorBeats(beats));
    dispatch(setBeatsDisplayMode(3));
  } catch (error) {
    console.error(error);
  }
};

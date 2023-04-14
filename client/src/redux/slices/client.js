import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { currentClient } from "../../data/fakeDB";

const initialState = {
  isLogged: false,
  client: {
    name: "Thomas Barenghi",
    bio: "Status",
    profilePicture: "/images/profile-picture.png",
    email: "Email",
  },
};

const cartSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setCurrentClient(state, action) {
      state.client = {
        name: "Thomas Barenghi",
        bio: "you are loged in",
        profilePicture: "/images/profile-picture.png",
        email: "Email",
      };
      state.isLogged = true;
    },
    resetReducer(state, action) {
      state.client = {
        name: "",
        bio: "",
        profilePicture: "",
        email: "",
      };
      state.isLogged = false;
    },
  },
});

export const { setCurrentClient, resetReducer } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "@/data/config";

const initialState = {
  isLogged: false,
  authSettings: {
    isSeller: false,
    superAdmin: false,
    token: "",
  },
  client: {
    name: "Placeholder",
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
      console.log("setCurrentClient", action.payload);
      state.client = {
        bio: action.payload.bio,
        profilePicture: action.payload.profilePicture,
        _id: action.payload._id,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        userName: action.payload.userName,
      };
    },
    setAuthSettings(state, action) {
      state.authSettings = action.payload;
      state.isLogged = true;
    },
    resetReducer(state, action) {
      state.client = {};
      state.isLogged = false;
    },
  },
});

export const { setCurrentClient, resetReducer, setAuthSettings } =
  cartSlice.actions;
export default cartSlice.reducer;

//Creamos sistema asincrono para el login, recibimos la respuesta del servidor y la guardamos en el estado, usamos axios
export const loginSystem = (email, password) => async (dispatch) => {
  try {
    // const { data } = await axios.post("/api/login", { email, password });
    //hacemos un get a la base de datos
    const { data } = await axios.get(`${serverUrl}currentUser`);
    //quizas en un futuro sea data.data
    const userResponse = data;

    console.log("userResponse", userResponse);
    const newClient = {
      bio: "a la espera de backend",
      profilePicture: userResponse.image,
      _id: userResponse._id,
      email: userResponse.email,
      firstName: userResponse.firstName,
      lastName: userResponse.lastName,
      userName: userResponse.username,
    };

    const authSettings = {
      isSeller: userResponse.isSeller,
      superAdmin: userResponse.superAdmin,
      token: "a la espera de backend",
    };

    dispatch(setCurrentClient(newClient));
    dispatch(setAuthSettings(authSettings));
  } catch (error) {
    console.log(error);
  }
};

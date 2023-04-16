import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "@/data/config";
import { fetchBeats, fetchUserBeats } from "@/redux/slices/beats";

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

export const postClientBeat = createAsyncThunk("client/postClientBeat", async (data) => {
  const response = await axios.post(`${serverUrl}beats`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(data);
  return response.data;
});

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
  extraReducers: (builder) => {
    builder

      //--------------------
      //Extra reducers para los beats publicos 0 1
      .addCase(postClientBeat.pending, (state, action) => {
        console.log('posting...');
      })
      .addCase(postClientBeat.fulfilled, (state, action) => {
        console.log('post finished!');
       // state.beatsDisplayMode = 1;
      })
      .addCase(postClientBeat.rejected, (state, action) => {
        console.error(action.error);
      })
    }
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

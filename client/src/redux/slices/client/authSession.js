/*FUNCION DE AUTHSESSION:*/
/* 1) LOGIN: Se loguea el usuario, se guarda el token en el local storage y se guarda el usuario en el estado. */
/* 2) LOGOUT: Se desloguea el usuario, se reincia el estado */
/* 3) REGISTER: Se registra el usuario.*/
/* 4) EDIT: Se actualiza el usuario en redux y en la base de datos. */
/* 5) CONVERT IN SELLER: Se convierte el usuario en seller. */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "@/data/config";
import { toast } from "sonner";
import axios from "axios";
import { createUserSession } from "@/utils/userSession";
import { toastError, toastSuccess } from "@/utils/toastStyles";
import { setBougthBeats, setOwnedBeats } from "./beats";
import {setOwnedReviews} from "./reviews"

const initialState = {
  auth: {
    isLogged: false,
    loginMethod: "",
    isSeller: false,
    isAdmin: false,
    tokenValid: false,
    google: {
      googleSessionID: "",
    },
    json: {
      token: "",
    },
  },
  session: {
    current: {
      firstName: "",
      lastName: "",
      bio: "",
      profilePicture: "",
      _id: "",
      email: "",
      userName: "",
      backImage: "",
    },
  },
};

//------------------ ASYNC THUNKS ------------------//
//JSON LOGIN
export const jsonLogin = createAsyncThunk(
  "authSession/jsonLogin",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const { data: userResponse } = await axios.post(`${serverUrl}auth`, data);
      const session = createUserSession(userResponse.user);
      console.log("userResponse yy", userResponse);
      const auth = {
        isLogged: true,
        loginMethod: "json",
        isSeller: userResponse.user.isSeller,
        isAdmin: userResponse.user.superAdmin,
        tokenValid: true,
        json: {
          token: userResponse.token,
        },
      };
      dispatch(getUserData(userResponse.user._id));
      return { auth, session };
    } catch (error) {
      console.log("ERROR", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

//--------------------
//JSON REGISTER
export const jsonRegister = createAsyncThunk(
  "authSession/registerClientUser",
  async (data, { rejectWithValue }) => {
    try {
      const { data: response } = await axios.post(
        `${serverUrl}auth/register`,
        data
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//--------------------
//RECOVER PASSWORD
export const recoverPassword = createAsyncThunk(
  "authSession/recoverPassword",
  async (data, { rejectWithValue }) => {
    try {
      const { data: response } = await axios.post(
        `${serverUrl}mail/password`,
        data
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//--------------------
//CONVERT IN SELLER
export const convertInSeller = createAsyncThunk(
  "authSession/convertInSeller",
  async (data, { rejectWithValue, getState }) => {
    const clientId = getState().client.authSession.session.current._id;
    const send = { seller: "VENDEDOR" };

    try {
      const { data: response } = await axios.put(
        `${serverUrl}user/${clientId}`,
        send,
        { headers: { userid: clientId } }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//--------------------
//EDIT CLIENT
export const editClient = createAsyncThunk(
  "authSession/editClient",
  async (data, { rejectWithValue, getState }) => {
    const clientId = getState().client.authSession.session.current._id;
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    try {
      console.log("prev", data, clientId);
      const response = await axios.put(
        `${serverUrl}user/${clientId}`,
        formData,
        {
          headers: {
            userid: clientId,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const userResponse = createUserSession(response.data);
      return { userResponse };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//--------------------
//GET USER DATA
export const getUserData = createAsyncThunk(
  "authSession/getUserData",
  async (data, { rejectWithValue, getState, dispatch }) => {
    console.log("GET USER DATA");
    const clientId = data
      ? data
      : getState().client.authSession.session.current._id;

    try {
      const { data: response } = await axios.get(
        `${serverUrl}user/${clientId}`
      );

      const bougthBeats = response.bougthBeats;
      const ownedBeats = response.createdBeats;
      const ownedReviews = response.userReviews;

      console.log(
        "bougthBeats",
        bougthBeats,
        "ownedBeats",
        ownedBeats,
        clientId,
        response
      );
      await dispatch(setBougthBeats(bougthBeats));
      await dispatch(setOwnedBeats(ownedBeats));
      await dispatch(setOwnedReviews(ownedReviews));

      const auth = {
        isSeller: response.isSeller,
        isAdmin: response.superAdmin,
      };

      const session = createUserSession(response);
      console.log("response", response);
      return { auth, session };
    } catch (error) {
      console.log("ERROR getUserData", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

//------------------ SLICE ------------------//

const authSession = createSlice({
  name: "authSession",
  initialState,
  reducers: {
    //--------------------
    //SET LOGIN METHOD
    setLoginMethod(state, action) {
      state.auth.loginMethod = action.payload;
    },

    //--------------------
    //SET GOOGLE SUCCESSFUL
    setGoogleSuccessful(state, action) {
      state.auth.isLogged = true;
      state.auth.tokenValid = true;
      state.auth.google.googleSessionID = action.payload.googleSessionID;
      // state.session.current = {
      //   ...state.session.current,
      //   ...action.payload.session,
      // };
    },

    //--------------------
    //RESET REDUCER
    resetReducer(state, action) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      //--------------------
      //JSON LOGIN
      .addCase(jsonLogin.pending, (state, action) => {
        return;
      })
      .addCase(jsonLogin.fulfilled, (state, action) => {
        state.auth = { ...state.auth, ...action.payload.auth };
        state.session.current = {
          ...state.session.current,
          ...action.payload.session,
        };
        toast.success("Se logueó correctamente", toastSuccess);
      })
      .addCase(jsonLogin.rejected, (state, action) => {
        console.log("jsonLogin.rejected", action);
        toast.error(action.payload, toastError);
      })

      //--------------------
      //JSON REGISTER
      .addCase(jsonRegister.pending, (state, action) => {
        return;
      })
      .addCase(jsonRegister.fulfilled, (state, action) => {
        toast.success("Se registró correctamente", toastSuccess);
      })
      .addCase(jsonRegister.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })

      //--------------------
      //CONVERT IN SELLER
      .addCase(convertInSeller.pending, (state, action) => {
        toast("Se está convirtiendo en vendedor...");
      })
      .addCase(convertInSeller.fulfilled, (state, action) => {
        state.auth.isSeller = true;
        toast.success("Se convirtió en vendedor", toastSuccess);
      })
      .addCase(convertInSeller.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })

      //--------------------
      //EDIT CLIENT
      .addCase(editClient.pending, (state, action) => {
        toast("Se está editando...");
      })
      .addCase(editClient.fulfilled, (state, action) => {
        state.session.current = {
          ...state.session.current,
          ...action.payload.userResponse,
        };
        toast.success("Se editó correctamente", toastSuccess);
      })
      .addCase(editClient.rejected, (state, action) => {
        console.log("editClient.rejected", action.error);
        toast.error(action.payload, toastError);
      })

      //--------------------
      //GET USER DATA
      .addCase(getUserData.pending, (state, action) => {
        return;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.session.current = {
          ...state.session.current,
          ...action.payload.session,
        };
        state.auth = { ...state.auth, ...action.payload.auth };
        console.log("action.payload", action.payload);
      })
      .addCase(getUserData.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })

      //--------------------
      //RECOVER PASSWORD
      .addCase(recoverPassword.pending, (state, action) => {
        toast("Te estamos enviando un email con la solicitud de recuperación...");
      })
      .addCase(recoverPassword.fulfilled, (state, action) => {
        toast.success("Se envió el email", toastSuccess);
      })
      .addCase(recoverPassword.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
  },
});

export const { setLoginMethod, setGoogleSuccessful, resetReducer } =
  authSession.actions;

export default authSession.reducer;

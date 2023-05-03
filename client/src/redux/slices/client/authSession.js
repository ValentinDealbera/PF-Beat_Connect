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
import { setBougthBeats, setOwnedBeats, setFavoriteBeats } from "./beats";
import { setOwnedReviews } from "./reviews";
import { setOrders } from "./orders";
import i18next from 'i18next';

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
  actionStatus: {
    getUserDataLoading: false,
  },
  theme: "light",
};

//------------------ ASYNC THUNKS ------------------//
//JSON LOGIN
export const jsonLogin = createAsyncThunk(
  "authSession/jsonLogin",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const { data: userResponse } = await axios.post(`${serverUrl}auth`, data);
      const session = createUserSession(userResponse.user);
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
    const send = { seller: "VENDEDOR", mpcode: data.mpcode };

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
//PASSWORD RECOVERY
export const passwordRecovery = createAsyncThunk(
  "authSession/passwordRecovery",
  async (data, { rejectWithValue }) => {
    try {
      await axios.put(`${serverUrl}recover/password`, data);
    } catch (error) {
      console.log("ERROR passwordRecovery", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

//--------------------
//CHANGE PASSWORD
export const changePassword = createAsyncThunk(
  "authSession/changePassword",
  async (data, { rejectWithValue, getState }) => {
    const clientId = getState().client.authSession.session.current._id;
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    try {
      await axios.put(`${serverUrl}user/${clientId}`, formData, {
        headers: { userid: clientId },
      });
    } catch (error) {
      console.log("ERROR changePassword", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

//--------------------
//GET USER DATA
export const getUserData = createAsyncThunk(
  "authSession/getUserData",
  async (data, { rejectWithValue, getState, dispatch }) => {
  
    const clientId = data
      ? data
      : getState().client.authSession.session.current._id;

    try {
      const { data: response } = await axios.get(
        `${serverUrl}user/${clientId}`
      );

      //si tiene softDelete, no lo muestro
      //filtramos las reviews que no tengan softDelete
      const bougthBeats = response.bougthBeats.filter( beat => !beat.softDelete).map( beat => {
        const reviewsFiltradas = beat.review.filter( review => !review.softDelete);
        return {...beat, review: reviewsFiltradas}
      });

      const ownedBeats = response.createdBeats.filter( beat => !beat.softDelete).map( beat => {
        const reviewsFiltradas = beat.review.filter( review => !review.softDelete);
        return {...beat, review: reviewsFiltradas}
      });

      const ownedReviews = response.userReviews.filter( review => !review.softDelete);
      const orders = response.userOrders;

      const favoriteBeats = response.userFavorites.filter( beat => !beat.softDelete).map( beat => {
        const reviewsFiltradas = beat.review.filter( review => !review.softDelete);
        return {...beat, review: reviewsFiltradas}
      });



      await dispatch(setBougthBeats(bougthBeats));
      await dispatch(setOwnedBeats(ownedBeats));
      await dispatch(setOwnedReviews(ownedReviews));
      await dispatch(setOrders(orders));

      await dispatch(setFavoriteBeats(favoriteBeats));

      const auth = {
        isSeller: response.isSeller,
        isAdmin: response.superAdmin,
      };

      const session = createUserSession(response);
 
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
      console.log("setGoogleSuccessful", action.payload);
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
      state.auth = initialState.auth;
      state.session = initialState.session;
    },

    //--------------------
    //SET THEME
    setTheme(state, action) {

      state.theme = action.payload;
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
     
        // if(i18next.language == "en"){ 
        //   toast.success("Logged in successfully", toastSuccess);
        // }
        // else {
        //   toast.success("Se logueo correctamente", toastSuccess);
        // }
        let trad= i18next?.language == "en"? "Logged in successfully" :"Se logueo correctamente"
        toast.success(trad, toastSuccess);
      })
      .addCase(jsonLogin.rejected, (state, action) => {
    
        toast.error(action.payload, toastError);
      })

      //--------------------
      //JSON REGISTER
      .addCase(jsonRegister.pending, (state, action) => {
        return;
      })
      .addCase(jsonRegister.fulfilled, (state, action) => {
        let trad= i18next?.language == "en"? "Registered successfully" :"Se registró correctamente"
        toast.success(trad, toastSuccess);
      })
      .addCase(jsonRegister.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })

      //--------------------
      //CONVERT IN SELLER
      .addCase(convertInSeller.pending, (state, action) => {
        let trad= i18next?.language == "en"? "Becoming a seller..." :"Se está convirtiendo en vendedor..."
        toast(trad);
      })
      .addCase(convertInSeller.fulfilled, (state, action) => {
        state.auth.isSeller = true;
        let trad= i18next?.language == "en"? "Became a seller" :"Se convirtió en vendedor"
        toast.success(trad, toastSuccess);
      })
      .addCase(convertInSeller.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })

      //--------------------
      //EDIT CLIENT
      .addCase(editClient.pending, (state, action) => {
        let trad= i18next?.language == "en"? "Editing..." :"Se está editando..."
        toast(trad);
      })
      .addCase(editClient.fulfilled, (state, action) => {
        state.session.current = {
          ...state.session.current,
          ...action.payload.userResponse,
        };
        let trad= i18next?.language == "en"? "Edited successfully" :"Se editó correctamente"
        toast.success(trad, toastSuccess);
      })
      .addCase(editClient.rejected, (state, action) => {
  
        toast.error(action.payload, toastError);
      })

      /***************** PASSWORD RECOVERY ******************/
      .addCase(passwordRecovery.pending, (state, action) => {
        return;
      })
      .addCase(passwordRecovery.fulfilled, (state, action) => {
        let trad= i18next?.language == "en"? "Your password has been changed successfully" :"Tu contraseña se cambio correctamente"
        toast.success(trad, toastSuccess);
      })
      .addCase(passwordRecovery.rejected, (state, action) => {

        toast.error(action.payload, toastError);
      })

      //--------------------
      //GET USER DATA
      .addCase(getUserData.pending, (state, action) => {
   
        state.actionStatus.getUserDataLoading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {

        if(action.payload.session.softDelete == true){
          state.auth.isLogged = false;
          toast.error("Fuiste baneado", toastError);
          return;
        }

        state.session.current = {
          ...state.session.current,
          ...action.payload.session,
        };
        state.auth = { ...state.auth, ...action.payload.auth };
   
        state.actionStatus.getUserDataLoading = false;
      })
      .addCase(getUserData.rejected, (state, action) => {
        toast.error(action.payload, toastError);
  
      })

      //--------------------
      //RECOVER PASSWORD
      .addCase(recoverPassword.pending, (state, action) => {
        let trad= i18next?.language == "en"? "Sending you an email with recovery request..." :"Te estamos enviando un email con la solicitud de recuperación..."
        toast(trad);
      })
      .addCase(recoverPassword.fulfilled, (state, action) => {
        let trad= i18next?.language == "en"? "Email sent" :"Se envió el email"
        toast.success(trad, toastSuccess);
      })
      .addCase(recoverPassword.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })

      //--------------------
      //CHANGE PASSWORD
      .addCase(changePassword.pending, (state, action) => {
        let trad= i18next?.language == "en"? "Changing password..." :"Se está cambiando la contraseña..."
        toast(trad);
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        let trad= i18next?.language == "en"? "Password changed" :"Se cambió la contraseña"
        toast.success(trad, toastSuccess);
      })
      .addCase(changePassword.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      });
  },
});

export const { setLoginMethod, setGoogleSuccessful, resetReducer, setTheme } =
  authSession.actions;

export default authSession.reducer;

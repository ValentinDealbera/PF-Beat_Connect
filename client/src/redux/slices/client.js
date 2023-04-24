import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "@/data/config";
import { toast } from "sonner";

import { fetchBeats, fetchUserBeats } from "@/redux/slices/beats";
import { headers } from "next/dist/client/components/headers";

const tokenAdmin = process.env.NEXT_PUBLIC_TOKEN_ADMIN;



const initialState = {
  activeEditingItem: null,

  isLogged: false,

  authSettings: {
    isSeller: false,
    superAdmin: false,
    token: "",
    accessToken: "",
    loginMethod: "",
    tokenValid: false,
  },
  client: {
    name: "",
    bio: "",
    profilePicture: "/images/profile-picture.png",
    email: "",
    _id: "",
    firstName: "",
    lastName: "",
    userName: "",
  },
  clientEdit: null,
};


export const loginSystem = createAsyncThunk(
  "client/loginSystem",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data", data);
      const response = await axios.post(`${serverUrl}auth`, data, { timeout: 5000 });
      const userResponse = response.data;
      console.log(userResponse);
      const newClient = {
        bio: "a la espera de backend",
        profilePicture: userResponse.user.image,
        _id: userResponse.user._id,
        email: userResponse.user.email,
        firstName: userResponse.user.firstName,
        lastName: userResponse.user.lastName,
        userName: userResponse.user.username,
      };

      const authSettings = {
        isSeller: userResponse.user.isSeller,
        superAdmin: userResponse.user.superAdmin,
        token: userResponse.token,
        accessToken: userResponse.user?.accessToken,
        loginMethod: "json",
      };
      return { authSettings, newClient };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const postClientBeat = createAsyncThunk(
  "client/postClientBeat",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    try {
      const response = await axios.post(`${serverUrl}beats`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          userid: data.userCreator,
        },
      });
      console.log(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const postBeatReview = createAsyncThunk(
  "client/postBeatReview",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data: ", data);
      const response = await axios.post(`${serverUrl}review`, data, {
        headers: {
          userid: data.createdBy,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const registerClientUser = createAsyncThunk(
  "client/registerClientUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${serverUrl}auth/register`, data);
      console.log("error", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const convertInSeller = createAsyncThunk(
  "client/convertInSeller",
  async (data, { rejectWithValue, getState }) => {
    const clientId = getState().client.client._id;
    console.log("clientId", clientId);

    const send = { seller: "VENDEDOR" };

    try {
      const response = await axios.put(`${serverUrl}user/${clientId}`, send);
      console.log("error", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchCurrentBeat = createAsyncThunk(
  "beats/fetchCurrentAuthor",
  async (id, { rejectWithValue, getState }) => {
    try {
      console.log("id", id);

      const res = await axios.get(`${serverUrl}beats/${id}`);
      //solo obtenemos el nombre y el id del objeto original
      const response = res.data;
      console.log("response", response);
      const currentBeat = {
        name: response.name,
        _id: response._id,
        BPM: response.BPM,
        priceAmount: response.priceAmount,
        softDelete: response.softDelete,
        image: response.image,
        genre: {
          name: response.genre.name,
          _id: response.genre._id,
        },
      };
      return { currentBeat };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const editClient = createAsyncThunk(
  "client/editClient",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await axios.put(`${serverUrl}user/${data.id}`, data, {
        headers: {
          userid: data.id,
        },
      });
      const userResponse = response.data;

      return { userResponse };
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

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
    //Establecemos el estado de la sesión de google
    setGoogleSuccessful(state, action) {
      console.log("setGoogleSuccessful", action.payload);
      state.isLogged = true;
      state.authSettings.tokenValid = true;
    //  state.client._id = action.payload.clientId;
      state.authSettings.googleSessionID = action.payload.googleSessionID;
    },
    //Establecemos los datos del cliente
    setClientData(state, action) {
      console.log("setClientData", action.payload);
      state.client = action.payload;
    },  
    setTokenValid(state, action) {
      state.authSettings.tokenValid = action.payload;
    },
    setAuthSettings(state, action) {
      state.authSettings = isLogged = true;
    },
    resetReducer(state, action) {
      state.client = {};
      state.isLogged = false;
      state.authSettings = {
        isSeller: false,
        superAdmin: false,
        token: "",
        tokenValid: false,
        googleSessionID: "",
        accessToken: "",
        loginMethod: "",
      };
    },
    setLoginMethod(state, action) {
      state.authSettings.loginMethod = action.payload;
    },
    setClientEdit(state, action) {
      state.clientEdit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      //--------------------  Beat
      .addCase(postClientBeat.pending, (state, action) => {
        console.log("posting...");
        toast("Subiendo beat...");
      })
      .addCase(postClientBeat.fulfilled, (state, action) => {
        console.log("post finished!");
        toast.success("Se subió correctamente", {
          style: {
            background: "#ECFDF3",
            color: "#1F9D55",
          },
        });
      })
      .addCase(postClientBeat.rejected, (state, action) => {
        console.error(action.error);
        toast.error(action.payload, {
          style: {
            background: "#FFF0F0",
            color: "#E60000",
          },
        });
      })

      //--------------------  Log-in
      .addCase(loginSystem.pending, (state, action) => {
        console.log("loging...");
      })
      .addCase(loginSystem.fulfilled, (state, action) => {
        state.authSettings.tokenValid = true;
        state.client = {
          bio: action.payload.newClient.bio,
          profilePicture: action.payload.newClient.profilePicture,
          _id: action.payload.newClient._id,
          email: action.payload.newClient.email,
          firstName: action.payload.newClient.firstName,
          lastName: action.payload.newClient.lastName,
          userName: action.payload.newClient.userName,
        };
        state.authSettings = action.payload.authSettings;
        state.isLogged = true;
        console.log(state.client);
      })
      .addCase(loginSystem.rejected, (state, action) => {
        console.error(action.error);
        toast.error(action.payload, {
          style: {
            background: "#FFF0F0",
            color: "#E60000",
          },
        });
      })

      //--------------------  Register
      .addCase(registerClientUser.pending, (state, action) => {
        console.log("sing-in up...");
      })
      .addCase(registerClientUser.fulfilled, (state, action) => {
        console.log("succesfully registered!");
        toast.success("Se registró correctamente", {
          style: {
            background: "#ECFDF3",
            color: "#008A2E",
          },
        });
      })
      .addCase(registerClientUser.rejected, (state, action) => {
        console.log(action.payload);
        toast.error(action.payload, {
          style: {
            background: "#FFF0F0",
            color: "#E60000",
          },
        });
      })

      //--------------------  Convert in seller
      .addCase(convertInSeller.pending, (state, action) => {
        console.log("converting...");
      })
      .addCase(convertInSeller.fulfilled, (state, action) => {
        console.log("succesfully converted!");
        state.authSettings.isSeller = true;
        toast.success("Se convirtió correctamente", {
          style: {
            background: "#ECFDF3",
            color: "#008A2E",
          },
        });
      })
      .addCase(convertInSeller.rejected, (state, action) => {
        console.log(action.payload);
        toast.error(action.payload, {
          style: {
            background: "#FFF0F0",
            color: "#E60000",
          },
        });
      })

      //--------------------
      //Extra reducer para el beat que esta en el detalle
      .addCase(fetchCurrentBeat.pending, (state, action) => {
        console.log("fetching current beat");
        // toast("Cargando beat...");
      })
      .addCase(fetchCurrentBeat.fulfilled, (state, action) => {
        state.activeEditingItem = action.payload.currentBeat;
        //console.log("current beat", state.activeEditingItem);
        // toast.success("Se cargó correctamente", {
        //   style: {
        //     background: "#ECFDF3",
        //     color: "#1F9D55",
        //   },
        // });
      })
      .addCase(fetchCurrentBeat.rejected, (state, action) => {
        console.error(action.error);
        // toast.error(action.payload, {
        //   style: {
        //     background: "#FFF0F0",
        //     color: "#E60000",
        //   },
        // });
      })

      //--------------------
      //Extra reducer para postBeatReview

      .addCase(postBeatReview.pending, (state, action) => {
        console.log("posting review...");
        toast("Subiendo review...");
      })
      .addCase(postBeatReview.fulfilled, (state, action) => {
        console.log("post finished!");
        toast.success("Se subió correctamente", {
          style: {
            background: "#ECFDF3",
            color: "#1F9D55",
          },
        });
      })
      .addCase(postBeatReview.rejected, (state, action) => {
        console.error(action.error);
        toast.error(action.payload, {
          style: {
            background: "#FFF0F0",
            color: "#E60000",
          },
        });
      })
      //--------------------
      //Extra reducer para editClient
      .addCase(editClient.fulfilled, (state, action) => {
        console.log("action.payload ok", action.payload);
        toast.success("Usuario editado correctamente", {
          style: {
            background: "#F0FFF0",
            color: "#00B300",
          },
        });
      })
      .addCase(editClient.rejected, (state, action) => {
        console.log("action.payload error", action.payload);
        toast.error(action.payload, {
          style: {
            background: "#FFF0F0",
            color: "#E60000",
          },
        });
        throw new Error(action.payload);
      })
      .addCase(editClient.pending, (state, action) => {
        console.log("action.payload pending");
        toast("Editando usuario...");
      });
  },
});

export const {
  setTokenValid,
  setCurrentClient,
  resetReducer,
  setAuthSettings,
  setReviewPostStatus,
  setClientEdit,
  setLoginMethod,
  setGoogleSuccessful,
  setClientData,
} = cartSlice.actions;
export default cartSlice.reducer;

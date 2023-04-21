import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "@/data/config";
import { toast } from "sonner";
import { fetchBeats, fetchUserBeats } from "@/redux/slices/beats";

const initialState = {
  activeEditingItem: null,
  tokenValid: false,
  isLogged: false,
  authSettings: {
    isSeller: false,
    superAdmin: false,
    token: "",
    accessToken: "",
  },
  client: {
    name: "Placeholder",
    bio: "Status",
    profilePicture: "/images/profile-picture.png",
    email: "Email",
  },
};

export const loginSystem = createAsyncThunk(
  "client/loginSystem",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${serverUrl}auth`, data);
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
          "userid": data.userCreator,
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
    setTokenValid(state, action) {
      state.tokenValid = action.payload;
    },
    setAuthSettings(state, action) {
      state.authSettings = sLogged = true;
    },
    resetReducer(state, action) {
      state.client = {};
      state.isLogged = false;
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
        state.tokenValid = true;
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
      });
  },
});

export const {
  setTokenValid,
  setCurrentClient,
  resetReducer,
  setAuthSettings,
  setReviewPostStatus,
} = cartSlice.actions;
export default cartSlice.reducer;

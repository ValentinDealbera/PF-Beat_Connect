import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "@/data/config";
import { toast } from "sonner";
import { fetchBeats, fetchUserBeats } from "@/redux/slices/beats";

const initialState = {
  tokenValid: false,
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

export const loginSystem = createAsyncThunk("client/loginSystem", async (data, {rejectWithValue}) => {
  try {
    const response = await axios.post(`${serverUrl}auth`, data);
    const userResponse = response.data
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
      };
      return {authSettings, newClient}
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
});

export const postClientBeat = createAsyncThunk("client/postClientBeat", async (data) => {
  const response = await axios.post(`${serverUrl}beats`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(data);
  return response.data;
});

export const registerClientUser = createAsyncThunk("client/registerClientUser", async (data, {rejectWithValue}) => {
  try {
    const response = await axios.post(`${serverUrl}auth/register`, data);
    console.log('error' ,response);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
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
    setTokenValid(state, action){
      state.tokenValid = action.payload
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

      //--------------------  Beat
      .addCase(postClientBeat.pending, (state, action) => {
        console.log('posting...');
      })
      .addCase(postClientBeat.fulfilled, (state, action) => {
        console.log('post finished!');
      })
      .addCase(postClientBeat.rejected, (state, action) => {
        console.error(action.error);
      })

      //--------------------  Log-in
      .addCase(loginSystem.pending, (state, action) => {
        console.log('loging...');
      })
      .addCase(loginSystem.fulfilled, (state, action) => {
        state.tokenValid = true
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
        console.log('sing-in up...');
      })
      .addCase(registerClientUser.fulfilled, (state, action) => {
        console.log('succesfully registered!');
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
      
    }
});

export const {setTokenValid, setCurrentClient, resetReducer, setAuthSettings } =
  cartSlice.actions;
export default cartSlice.reducer;
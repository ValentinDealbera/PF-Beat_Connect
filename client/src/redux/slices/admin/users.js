import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "@/data/config";
import { toast } from "sonner";
import axios from "axios";
import i18next from 'i18next';
import { toastError, toastSuccess } from "@/utils/toastStyles";
const tokenAdmin = process.env.NEXT_PUBLIC_TOKEN_ADMIN;
const initialState = {
  users: [],
  currentEdtingUser: {},
};

//------------------ ASYNC THUNKS ------------------//
//POST ADMIN USER
export const adminPostUser = createAsyncThunk(
  "users/adminPostUser",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      delete data.id;
      const response = await axios.post(`${serverUrl}admin/user`, data, {
        headers: {
          admintoken: tokenAdmin,
          "Content-Type": "multipart/form-data",
        },
      });

      await dispatch(adminGetUsers());

      return { userResponse: response.data };
    } catch (error) {
      console.log("Error de post", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

//--------------------
//EDIT ADMIN USER
export const adminEditUser = createAsyncThunk(
  "users/adminEditUser",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(
        `${serverUrl}admin/user/${data.id}`,
        data,
        {
          headers: {
            admintoken: tokenAdmin,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await dispatch(adminGetUsers());
      return { userResponse: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//--------------------
//DELETE ADMIN USER
export const adminDeleteUser = createAsyncThunk(
  "users/adminDeleteUser",
  async (data, { rejectWithValue, dispatch }) => {
    console.log("adminDeleteUser", data);
    try {
      const response = await axios.delete(
        `${serverUrl}admin/user/${data._id}`,
        {
          headers: {
            admintoken: tokenAdmin,
          },
        }
      );
      console.log("response", response);
      await dispatch(adminGetUsers());
      return { userResponse: response.data };
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

//--------------------
//GET ADMIN USERS
export const adminGetUsers = createAsyncThunk(
  "users/adminGetUsers",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      console.log("procesando");
      const response = await axios.get(`${serverUrl}user`);
      console.log("response user", response);
      return { userResponse: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//--------------------
//GET ADMIN USER
export const adminGetUser = createAsyncThunk(
  "users/adminGetUser",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${serverUrl}user/${data}`);
      return { userResponse: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//------------------ SLICE ------------------//

const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {
    setCurrentEditingUser(state, action) {
      console.log("action users", action.payload);
      state.currentEdtingUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //--------------------
      //POST ADMIN USER
      .addCase(adminPostUser.fulfilled, (state, action) => {
        let trad= i18next?.language == "en"? "User created successfully" : "Usuario creado correctamente"
        toast.success(trad, toastSuccess);;
      })
      .addCase(adminPostUser.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(adminPostUser.pending, (state, action) => {
        let trad= i18next?.language == "en"? "Creating user..." : "Creando usuario..."
        toast(trad);
      })

      //--------------------
      //EDIT ADMIN USER
      .addCase(adminEditUser.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(adminEditUser.fulfilled, (state, action) => {
        let trad= i18next?.language == "en"? "User edited successfully" : "Usuario editado correctamente"
        toast.success(trad, toastSuccess);
      })
      .addCase(adminEditUser.pending, (state, action) => {
        let trad= i18next?.language == "en"? "Editing user..." : "Editando usuario..."
        toast(trad);
      })

      //--------------------
      //DELETE ADMIN USER
      .addCase(adminDeleteUser.fulfilled, (state, action) => {
        let trad= i18next?.language == "en"? "User deleted successfully" : "Usuario borrado correctamente"
        toast.success(trad, toastSuccess);
      })
      .addCase(adminDeleteUser.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(adminDeleteUser.pending, (state, action) => {
        let trad= i18next?.language == "en"? "Deleting user..." : "Borrando usuario..."
        toast(trad);
      })

      //--------------------
      //GET ADMIN BEATS
      .addCase(adminGetUsers.fulfilled, (state, action) => {
        console.log("action", action.payload.userResponse);
        state.users = action.payload.userResponse;
        //toast.success("Beats obtenidos correctamente", toastSuccess);
      })
      .addCase(adminGetUsers.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(adminGetUsers.pending, (state, action) => {
        // toast("Cargando beat...");
      })

      //--------------------
      //GET ADMIN USER
      .addCase(adminGetUser.fulfilled, (state, action) => {
        state.currentEdtingUser = action.payload.userResponse;
      })
      .addCase(adminGetUser.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(adminGetUser.pending, (state, action) => {
        //toast("Cargando beat...");
      });
  },
});

export const { setCurrentEditingUser } = adminUsersSlice.actions;

export default adminUsersSlice.reducer;

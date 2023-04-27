import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "@/data/config";
import { toast } from "sonner";
import axios from "axios";
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
      const response = await axios.post(`${serverUrl}users/admin`, data, {
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
        `${serverUrl}user/admin/${data.id}`,
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
        `${serverUrl}user/admin/${data._id}`,
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
        toast.success("Usuario creado correctamente", toastSuccess);
      })
      .addCase(adminPostUser.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(adminPostUser.pending, (state, action) => {
        toast("Creando usuario...");
      })

      //--------------------
      //EDIT ADMIN USER
      .addCase(adminEditUser.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(adminEditUser.fulfilled, (state, action) => {
        toast.success("Usuario eliminado correctamente", toastSuccess);
      })
      .addCase(adminEditUser.pending, (state, action) => {
        toast("Editando usuario...");
      })

      //--------------------
      //DELETE ADMIN USER
      .addCase(adminDeleteUser.fulfilled, (state, action) => {
        toast.success("Usuario eliminado correctamente", toastSuccess);
      })
      .addCase(adminDeleteUser.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(adminDeleteUser.pending, (state, action) => {
        toast("Eliminando usuario...");
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
        toast.success("usuario obtenido correctamente", toastSuccess);
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
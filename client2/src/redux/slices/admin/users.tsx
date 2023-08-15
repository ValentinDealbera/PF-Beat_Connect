import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "@/data/config";
import { toast } from "sonner";
import axios from "axios";
import i18next from "i18next";
import { toastSuccess } from "@/utils/toastStyles";
import { UserClass } from "@/types";
const tokenAdmin = process.env.NEXT_PUBLIC_TOKEN_ADMIN;

const initialState = {
  users: [] as UserClass[],
  currentEdtingUser: {} as UserClass,
};

//------------------ ASYNC THUNKS ------------------//
//POST ADMIN USER
export const adminPostUser = createAsyncThunk(
  "users/adminPostUser",
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
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
      throw error;
    }
  },
);

//--------------------
//EDIT ADMIN USER
export const adminEditUser = createAsyncThunk(
  "users/adminEditUser",
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(
        `${serverUrl}admin/user/${data.id}`,
        data,
        {
          headers: {
            admintoken: tokenAdmin,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      await dispatch(adminGetUsers());
      return { userResponse: response.data };
    } catch (error) {
      throw error;
    }
  },
);

//--------------------
//DELETE ADMIN USER
export const adminDeleteUser = createAsyncThunk(
  "users/adminDeleteUser",
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `${serverUrl}admin/user/${data._id}`,
        {
          headers: {
            admintoken: tokenAdmin,
          },
        },
      );

      await dispatch(adminGetUsers());
      return { userResponse: response.data };
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);

//--------------------
//GET ADMIN USERS
export const adminGetUsers = createAsyncThunk(
  "users/adminGetUsers",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${serverUrl}user`);

      return { userResponse: response.data };
    } catch (error) {
      throw error;
    }
  },
);

//--------------------
//GET ADMIN USER
export const adminGetUser = createAsyncThunk(
  "users/adminGetUser",
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${serverUrl}user/${data}`);
      return { userResponse: response.data };
    } catch (error) {
      throw error;
    }
  },
);

//------------------ SLICE ------------------//

const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {
    setCurrentEditingUser(state, action) {
      state.currentEdtingUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //--------------------
      //POST ADMIN USER
      .addCase(adminPostUser.fulfilled, (state, action) => {
        let trad =
          i18next?.language == "en"
            ? "User created successfully"
            : "Usuario creado correctamente";
        toast.success(trad, toastSuccess);
      })
      .addCase(adminPostUser.rejected, (state, action) => {
        console.error(action.payload);
      })
      .addCase(adminPostUser.pending, (state, action) => {
        let trad =
          i18next?.language == "en" ? "Creating user..." : "Creando usuario...";
        toast(trad);
      })

      //--------------------
      //EDIT ADMIN USER
      .addCase(adminEditUser.rejected, (state, action) => {
        console.error(action.payload);
      })
      .addCase(adminEditUser.fulfilled, (state, action) => {
        let trad =
          i18next?.language == "en"
            ? "User edited successfully"
            : "Usuario editado correctamente";
        toast.success(trad, toastSuccess);
      })
      .addCase(adminEditUser.pending, (state, action) => {
        let trad =
          i18next?.language == "en" ? "Editing user..." : "Editando usuario...";
        toast(trad);
      })

      //--------------------
      //DELETE ADMIN USER
      .addCase(adminDeleteUser.fulfilled, (state, action) => {
        let trad =
          i18next?.language == "en"
            ? "User deleted successfully"
            : "Usuario borrado correctamente";
        toast.success(trad, toastSuccess);
      })
      .addCase(adminDeleteUser.rejected, (state, action) => {
        console.error(action.payload);
      })
      .addCase(adminDeleteUser.pending, (state, action) => {
        let trad =
          i18next?.language == "en"
            ? "Deleting user..."
            : "Borrando usuario...";
        toast(trad);
      })

      //--------------------
      //GET ADMIN BEATS
      .addCase(adminGetUsers.fulfilled, (state, action) => {
        state.users = action.payload.userResponse;
        //toast.success("Beats obtenidos correctamente", toastSuccess);
      })
      .addCase(adminGetUsers.rejected, (state, action) => {
        console.error(action.payload);
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
        console.error(action.payload);
      })
      .addCase(adminGetUser.pending, (state, action) => {
        //toast("Cargando beat...");
      });
  },
});

export const { setCurrentEditingUser } = adminUsersSlice.actions;

export default adminUsersSlice.reducer;

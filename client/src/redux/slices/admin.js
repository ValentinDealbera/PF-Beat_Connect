import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "@/data/config";
import axios from "axios";
import { toast } from "sonner";

//traemos el token del admin
const tokenAdmin = process.env.NEXT_PUBLIC_TOKEN_ADMIN;

const initialState = {
  users: [],
  currentEditUser: null,
};

export const adminGetUsers = createAsyncThunk(
  "client/adminGetUsers",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data", data);
      const response = await axios.get(`${serverUrl}user`);
      const userResponse = response.data;

      return { userResponse };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const adminDeleteUser = createAsyncThunk(
  "client/adminDeleteUser",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data", data);
      const response = await axios.delete(`${serverUrl}user/admin/${data}`, {
        headers: {
          admintoken: tokenAdmin,
        },
      });
      const userResponse = response.data;

      return { userResponse };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const adminPostUser = createAsyncThunk(
  "client/adminPostUser",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data", data);

      //quitamos id del objeto data para que no de error
      delete data.id;

      const response = await axios.post(`${serverUrl}user/admin`, data, {
        headers: {
          admintoken: tokenAdmin,
        },
      });
      const userResponse = response.data;

      return { userResponse };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const adminEditUser = createAsyncThunk(
  "client/adminEditUser",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data", data);
      const response = await axios.put(
        `${serverUrl}user/admin/${data.id}`,
        data,
        {
          headers: {
            admintoken: tokenAdmin,
          },
        }
      );
      const userResponse = response.data;

      return { userResponse };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const beatsSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setCurrentEditUser(state, action) {
      state.currentEditUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      //--------------------
      //Extra reducers para adminPostUser
      .addCase(adminPostUser.fulfilled, (state, action) => {
        console.log("action.payload ok", action.payload);
        toast.success("Usuario creado correctamente", {
          style: {
            background: "#F0FFF0",
            color: "#00B300",
          },
        });
      })
      .addCase(adminPostUser.rejected, (state, action) => {
        console.log("action.payload error", action.payload);
        toast.error(action.payload, {
          style: {
            background: "#FFF0F0",
            color: "#E60000",
          },
        });

        throw new Error(action.payload);
      })
      .addCase(adminPostUser.pending, (state, action) => {
        console.log("action.payload pending");
        toast("Subiendo usuario...");
      })

      //--------------------
      //Extra reducers para adminGetUsers
      .addCase(adminGetUsers.fulfilled, (state, action) => {
        console.log("action.payload ok", action.payload);
        state.users = action.payload.userResponse;
        toast.success("Usuarios cargados correctamente", {
          style: {
            background: "#F0FFF0",
            color: "#00B300",
          },
        });
      })
      .addCase(adminGetUsers.rejected, (state, action) => {
        console.log("action.payload error", action.payload);
        toast.error(action.payload, {
          style: {
            background: "#FFF0F0",
            color: "#E60000",
          },
        });
      })
      .addCase(adminGetUsers.pending, (state, action) => {
        console.log("action.payload pending");
        toast("Cargando usuarios...");
      })

      //--------------------
      //Extra reducers para adminDeleteUser
      .addCase(adminDeleteUser.fulfilled, (state, action) => {
        console.log("action.payload ok", action.payload);
        toast.success("Usuario borrado correctamente", {
          style: {
            background: "#F0FFF0",
            color: "#00B300",
          },
        });
      })
      .addCase(adminDeleteUser.rejected, (state, action) => {
        console.log("action.payload error", action.payload);
        toast.error(action.payload, {
          style: {
            background: "#FFF0F0",
            color: "#E60000",
          },
        });
      })
      .addCase(adminDeleteUser.pending, (state, action) => {
        console.log("action.payload pending");
        toast("Borrando usuario...");
      })

      //--------------------
      //Extra reducers para adminEditUser
      .addCase(adminEditUser.fulfilled, (state, action) => {
        console.log("action.payload ok", action.payload);
        toast.success("Usuario editado correctamente", {
          style: {
            background: "#F0FFF0",
            color: "#00B300",
          },
        });
      })
      .addCase(adminEditUser.rejected, (state, action) => {
        console.log("action.payload error", action.payload);
        toast.error(action.payload, {
          style: {
            background: "#FFF0F0",
            color: "#E60000",
          },
        });
        throw new Error(action.payload);
      })
      .addCase(adminEditUser.pending, (state, action) => {
        console.log("action.payload pending");
        toast("Editando usuario...");
      });
  },
});

export const { setCurrentEditUser } = beatsSlice.actions;

export default beatsSlice.reducer;

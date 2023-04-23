import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "@/data/config";
import axios from "axios";
import { toast } from "sonner";

//traemos el token del admin
const tokenAdmin = process.env.NEXT_PUBLIC_TOKEN_ADMIN;

const initialState = {
  users: [],
  reviews: [],
  beats: [],
  currentEditUser: null,
  currentEditReview: null,
  currentEditBeat: null,
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
      const response = await axios.delete(`${serverUrl}user/admin/${data._id}`, {
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

//Reviews

export const adminGetReviews = createAsyncThunk(
  "client/adminGetReviews",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data", data);
      const response = await axios.get(`${serverUrl}review`);
      const reviewResponse = response.data;

      return { reviewResponse };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const adminDeleteReview = createAsyncThunk(
  "client/adminDeleteReview",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data", data);
      const response = await axios.delete(`${serverUrl}review/admin/${data}`, {
        headers: {
          admintoken: tokenAdmin,
        },
      });
      const reviewResponse = response.data;

      return { reviewResponse };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const adminPostReview = createAsyncThunk(
  "client/adminPostReview",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data", data);

      //quitamos id del objeto data para que no de error
      delete data.id;

const response = await axios.post(`${serverUrl}review/admin`, data, {
        headers: {
          admintoken: tokenAdmin,
        },
      });
      const reviewResponse = response.data;
      return { reviewResponse };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const adminEditReview = createAsyncThunk(
  "client/adminEditReview",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data", data);
      const response = await axios.put(
        `${serverUrl}review/admin/${data.id}`,
        data,
        {
          headers: {
            admintoken: tokenAdmin,
          },
        }
      );
      const reviewResponse = response.data;

      return { reviewResponse };

      // return { reviewResponse };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Beats

export const adminGetBeats = createAsyncThunk(
  "beats/adminGetBeats",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data", data);
      const response = await axios.get(`${serverUrl}beats?limit=100`);
      const beatResponse = response.data.docs;

      return beatResponse;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const adminPostBeat = createAsyncThunk(
  "beats/adminPostBeat",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data", data);

      //quitamos id del objeto data para que no de error
      delete data.id;

      const response = await axios.post(`${serverUrl}beats/admin`, data, {
        headers: {
          admintoken: tokenAdmin,
          "Content-Type": "multipart/form-data",
        },
      });
      const beatResponse = response.data;

      return { beatResponse };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const adminEditBeat = createAsyncThunk(
  "beats/adminEditBeat",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data", data);
      const response = await axios.put(
        `${serverUrl}beats/admin/${data.id}`,
        data,
        {
          headers: {
            admintoken: tokenAdmin,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const beatResponse = response.data;

      return { beatResponse };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const adminDeleteBeat = createAsyncThunk(
  "beats/adminDeleteBeat",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data", data);
      const response = await axios.delete(`${serverUrl}beats/admin/${data._id}`, {
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

const beatsSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setCurrentEditUser(state, action) {
      state.currentEditUser = action.payload;
    },
    setCurrentEditReview(state, action) {
      state.currentEditReview = action.payload;
    },
    setCurrentEditBeat(state, action) {
      state.currentEditBeat = action.payload;
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
      })

      //--------------------
      //Extra reducers para adminGetReviews
      .addCase(adminGetReviews.fulfilled, (state, action) => {
        console.log("action.payload ok review", action.payload);
        state.reviews = Array.isArray(action.payload.reviewResponse) ? action.payload.reviewResponse : [];
        toast.success("Reviews cargadas correctamente", {
          style: {
            background: "#F0FFF0",
            color: "#00B300",
          },
        });
      })
      .addCase(adminGetReviews.rejected, (state, action) => {
        console.log("action.payload error", action.payload);
        toast.error(action.payload, {
          style: {
            background: "#FFF0F0",
            color: "#E60000",
          },
        });
      })
      .addCase(adminGetReviews.pending, (state, action) => {
        console.log("action.payload pending");
        toast("Cargando reviews...");
      })

      //--------------------
      //Extra reducers para adminDeleteReview
      .addCase(adminDeleteReview.fulfilled, (state, action) => {
        console.log("action.payload ok", action.payload);
        toast.success("Review borrada correctamente", {
          style: {
            background: "#F0FFF0",
            color: "#00B300",
          },
        });
      })
      .addCase(adminDeleteReview.rejected, (state, action) => {
        console.log("action.payload error", action.payload);
        toast.error(action.payload, {
          style: {
            background: "#FFF0F0",
            color: "#E60000",
          },
        });
      })
      .addCase(adminDeleteReview.pending, (state, action) => {
        console.log("action.payload pending");
        toast("Borrando review...");
      })

      //--------------------
      //Extra reducers para adminEditReview
      .addCase(adminEditReview.fulfilled, (state, action) => {
        console.log("action.payload ok", action.payload);
        toast.success("Review editada correctamente", {
          style: {
            background: "#F0FFF0",
            color: "#00B300",
          },
        });
      })

      .addCase(adminEditReview.rejected, (state, action) => {
        console.log("action.payload error", action.payload);
        toast.error(action.payload, {
          style: {
            background: "#FFF0F0",
            color: "#E60000",
          },
        });
        throw new Error(action.payload);
      })
      .addCase(adminEditReview.pending, (state, action) => {
        console.log("action.payload pending");
        toast("Editando review...");
      })

      //--------------------
      //Extra reducers para adminPostReview

      .addCase(adminPostReview.fulfilled, (state, action) => {
        console.log("action.payload ok", action.payload);
        toast.success("Review creada correctamente", {
          style: {
            background: "#F0FFF0",
            color: "#00B300",
          },
        });
      })
      .addCase(adminPostReview.rejected, (state, action) => {

        console.log("action.payload error", action.payload);
        toast.error(action.payload, {
          style: {
            background: "#FFF0F0",
            color: "#E60000",
          },
        });
        throw new Error(action.payload);
      })
      .addCase(adminPostReview.pending, (state, action) => {
        console.log("action.payload pending");
        toast("Creando review...");
      })

      //--------------------
      //Extra reducers para adminPostBeat
      .addCase(adminPostBeat.fulfilled, (state, action) => {
        console.log("action.payload ok", action.payload);
        toast.success("Beat subido correctamente", {
          style: {
            background: "#F0FFF0",
            color: "#00B300",
          },
        });
        state.beats = action.payload.beatResponse;
        console.log("state.beats", state.beats);
      })
      .addCase(adminPostBeat.rejected, (state, action) => {
        console.log("action.payload error", action.payload);
        toast.error(action.payload, {
          style: {
            background: "#FFF0F0",
            color: "#E60000",
          },
        });
        throw new Error(action.payload);
      })
      .addCase(adminPostBeat.pending, (state, action) => {
        console.log("action.payload pending");
        toast("Subiendo beat...");
      })

      //--------------------
      //Extra reducers para adminGetBeats
      .addCase(adminGetBeats.fulfilled, (state, action) => {
        console.log("action.payload ok", action.payload);
        state.beats = action.payload;
        toast.success("Beats cargados correctamente", {
            style: {
                background: "#F0FFF0",
                color: "#00B300",
            },
        });
    })
      .addCase(adminGetBeats.rejected, (state, action) => {
        console.log("action.payload error", action.payload);
        toast.error(action.payload, {
          style: {
            background: "#FFF0F0",
            color: "#E60000",
          },
        });
      })
      .addCase(adminGetBeats.pending, (state, action) => {
        console.log("action.payload pending");
        toast("Cargando beats...");
      })

      //--------------------
      //Extra reducers para adminDeleteUser
      .addCase(adminDeleteBeat.fulfilled, (state, action) => {
        console.log("action.payload ok", action.payload);
        toast.success("Beat borrado correctamente", {
          style: {
            background: "#F0FFF0",
            color: "#00B300",
          },
        });
      })
      .addCase(adminDeleteBeat.rejected, (state, action) => {
        console.log("action.payload error", action.payload);
        toast.error(action.payload, {
          style: {
            background: "#FFF0F0",
            color: "#E60000",
          },
        });
      })
      .addCase(adminDeleteBeat.pending, (state, action) => {
        console.log("action.payload pending");
        toast("Borrando beat...");
      })

      //--------------------
      //Extra reducers para adminEditBeat
      .addCase(adminEditBeat.fulfilled, (state, action) => {
        console.log("action.payload ok", action.payload);
        toast.success("Beat editado correctamente", {
          style: {
            background: "#F0FFF0",
            color: "#00B300",
          },
        });
      })
      .addCase(adminEditBeat.rejected, (state, action) => {
        console.log("action.payload error", action.payload);
        toast.error(action.payload, {
          style: {
            background: "#FFF0F0",
            color: "#E60000",
          },
        });
        throw new Error(action.payload);
      })
      .addCase(adminEditBeat.pending, (state, action) => {
        console.log("action.payload pending");
        toast("Editando Beat...");
      });
  },
});

export const { setCurrentEditUser, setCurrentEditReview, setCurrentEditBeat } = beatsSlice.actions;


export default beatsSlice.reducer;

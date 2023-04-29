import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "@/data/config";
import { toast } from "sonner";
import axios from "axios";
import { toastError, toastSuccess } from "@/utils/toastStyles";
const tokenAdmin = process.env.NEXT_PUBLIC_TOKEN_ADMIN;
const initialState = {
  beats: [],
  currentEdtingBeat: {},
};

//------------------ ASYNC THUNKS ------------------//
//POST ADMIN BEAT
export const adminPostBeat = createAsyncThunk(
  "beats/adminPostBeat",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      delete data.id;
      const response = await axios.post(`${serverUrl}admin/beat`, data, {
        headers: {
          admintoken: tokenAdmin,
          "Content-Type": "multipart/form-data",
        },
      });

      await dispatch(adminGetBeats());

      return { beatResponse: response.data };
    } catch (error) {
      console.log("Error de post", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

//--------------------
//EDIT ADMIN BEAT
export const adminEditBeat = createAsyncThunk(
  "beats/adminEditBeat",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(
        `${serverUrl}admin/beat/${data.id}`,
        data,
        {
          headers: {
            admintoken: tokenAdmin,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await dispatch(adminGetBeats());
      return { beatResponse: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//--------------------
//DELETE ADMIN BEAT
export const adminDeleteBeat = createAsyncThunk(
  "beats/adminDeleteBeat",
  async (data, { rejectWithValue, dispatch }) => {
    console.log("adminDeleteBeat", data);
    try {
      const response = await axios.delete(
        `${serverUrl}admin/beat/${data._id}`,
        {
          headers: {
            admintoken: tokenAdmin,
          },
        }
      );
      console.log("response", response);
      await dispatch(adminGetBeats());
      return { userResponse: response.data };
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

//--------------------
//GET ADMIN BEATS
export const adminGetBeats = createAsyncThunk(
  "beats/adminGetBeats",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      console.log("procesando");
      const response = await axios.get(`${serverUrl}beats?limit=999999`);
      console.log("response", response);
      return { beatResponse: response.data.docs };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//--------------------
//GET ADMIN BEAT
export const adminGetBeat = createAsyncThunk(
  "beats/adminGetBeat",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${serverUrl}beats/${data}`);
      return { beatResponse: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//------------------ SLICE ------------------//

const adminBeatsSlice = createSlice({
  name: "adminBeats",
  initialState,
  reducers: {
    setCurrentEditingBeat(state, action) {
      state.currentEdtingBeat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //--------------------
      //POST ADMIN BEAT
      .addCase(adminPostBeat.fulfilled, (state, action) => {
        toast.success("Beat creado correctamente", toastSuccess);
      })
      .addCase(adminPostBeat.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(adminPostBeat.pending, (state, action) => {
        toast("Creando beat...");
      })

      //--------------------
      //EDIT ADMIN BEAT
      .addCase(adminEditBeat.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(adminEditBeat.fulfilled, (state, action) => {
        toast.success("Beat editado correctamente", toastSuccess);
      })
      .addCase(adminEditBeat.pending, (state, action) => {
        toast("Editando beat...");
      })

      //--------------------
      //DELETE ADMIN BEAT
      .addCase(adminDeleteBeat.fulfilled, (state, action) => {
        toast.success("Beat eliminado correctamente", toastSuccess);
      })
      .addCase(adminDeleteBeat.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(adminDeleteBeat.pending, (state, action) => {
        toast("Eliminando beat...");
      })

      //--------------------
      //GET ADMIN BEATS
      .addCase(adminGetBeats.fulfilled, (state, action) => {
        console.log("action", action.payload.beatResponse);
        state.beats = action.payload.beatResponse;
        //toast.success("Beats obtenidos correctamente", toastSuccess);
      })
      .addCase(adminGetBeats.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(adminGetBeats.pending, (state, action) => {
       // toast("Cargando beat...");
      })

      //--------------------
      //GET ADMIN BEAT
      .addCase(adminGetBeat.fulfilled, (state, action) => {
        toast.success("Beat obtenido correctamente", toastSuccess);
        state.currentEdtingBeat = action.payload.beatResponse;
      })
      .addCase(adminGetBeat.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(adminGetBeat.pending, (state, action) => {
        toast("Cargando beat...");
      });
  },
});

export const { setCurrentEditingBeat } = adminBeatsSlice.actions;

export default adminBeatsSlice.reducer;
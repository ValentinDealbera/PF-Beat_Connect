import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "@/data/config";
import { toast } from "sonner";
import axios from "axios";
import { toastError, toastSuccess } from "@/utils/toastStyles";
import i18next from 'i18next';


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
    try {
      const response = await axios.delete(
        `${serverUrl}admin/beat/${data._id}`,
        {
          headers: {
            admintoken: tokenAdmin,
          },
        }
      );
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
      const response = await axios.get(`${serverUrl}beats?limit=999999`);
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
        let trad= i18next?.language == "en"? "Beat created successfully" :"Beat creado correctamente"
        toast.success(trad, toastSuccess);
      })
      .addCase(adminPostBeat.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(adminPostBeat.pending, (state, action) => {
        let trad= i18next?.language == "en"? "Creating beat..." :"Creando beat..."
        toast(trad);
      })

      //--------------------
      //EDIT ADMIN BEAT
      .addCase(adminEditBeat.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(adminEditBeat.fulfilled, (state, action) => {
        let trad= i18next?.language == "en"? "Beat edited successfully" :"Beat editado correctamente"
        toast.success(trad, toastSuccess);
      })
      .addCase(adminEditBeat.pending, (state, action) => {
        let trad= i18next?.language == "en"? "Editing beat..." : "Editando beat..."
        toast(trad);
      })

      //--------------------
      //DELETE ADMIN BEAT
      .addCase(adminDeleteBeat.fulfilled, (state, action) => {
        let trad= i18next?.language == "en"? "Beat deleted successfully" :"Beat eliminado correctamente"
        toast.success(trad, toastSuccess);
      })
      .addCase(adminDeleteBeat.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(adminDeleteBeat.pending, (state, action) => {
        let trad= i18next?.language == "en"? "Deleting beat..." : "Eliminando beat..."
        toast(trad);
      })

      //--------------------
      //GET ADMIN BEATS
      .addCase(adminGetBeats.fulfilled, (state, action) => {
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
        let trad= i18next?.language == "en"? "Beat retrieved successfully" :"Beat obtenido correctamente"
        toast.success(trad, toastSuccess);
        
        state.currentEdtingBeat = action.payload.beatResponse;
      })
      .addCase(adminGetBeat.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(adminGetBeat.pending, (state, action) => {
        let trad= i18next?.language == "en"? "Loading beat..." : "Cargando beat..."
        toast(trad);
      });
  },
});

export const { setCurrentEditingBeat } = adminBeatsSlice.actions;

export default adminBeatsSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "@/data/config";
import { toast } from "sonner";
import axios from "axios";
import { toastError, toastSuccess } from "@/utils/toastStyles";
const tokenAdmin = process.env.NEXT_PUBLIC_TOKEN_ADMIN;
const initialState = {
  reviews: [],
  currentEditingReview: {},
};

//------------------ ASYNC THUNKS ------------------//
//GET ADMIN REVIEWS
export const adminGetReviews = createAsyncThunk(
  "client/adminGetReviews",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      console.log("procesando");
      const response = await axios.get(`${serverUrl}review`);
      // console.log("cargandolol");
      // return { reviewResponse: response.data.docs };
      console.log("response review", response);
      const reviewResponse = response.data;
      return { reviewResponse };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//GET ADMIN REVIEW
export const adminGetReview = createAsyncThunk(
  "client/adminGetReview",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${serverUrl}review/${data}`);
      return { reviewResponse: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//DELETE ADMIN REVIEW
export const adminDeleteReview = createAsyncThunk(
  "client/adminDeleteReview",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      console.log("data", data);
      const response = await axios.delete(`${serverUrl}review/admin/${data}`, {
        headers: {
          admintoken: tokenAdmin,
        },
      });
      await dispatch(adminGetReviews());
      return { reviewResponse: response.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//POST ADMIN REVIEW
export const adminPostReview = createAsyncThunk(
  "client/adminPostReview",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      //Quitamos id del objeto data para que no de error
      delete data.id;

      const response = await axios.post(`${serverUrl}review/admin`, data, {
        headers: {
          admintoken: tokenAdmin,
          "Content-Type": "multipart/form-data",
        },
      });
      await dispatch(adminGetReviews());
      return { reviewResponse: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
//EDIT ADMIN REVIEW
export const adminEditReview = createAsyncThunk(
  "client/adminEditReview",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(
        `${serverUrl}review/admin/${data.id}`,
        data,
        {
          headers: {
            admintoken: tokenAdmin,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await dispatch(adminGetReviews());
      return { reviewResponse: response.data };

      // return { reviewResponse };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
const adminReviewsSlice = createSlice({
  name: "adminReviews",
  initialState,
  reducers: {
    setCurrentEditingReview(state, action) {
      state.currentEditingReview = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      //--------------------
      //GET ADMIN REVIEWS
      .addCase(adminGetReviews.fulfilled, (state, action) => {
        console.log("action.payload ok review", action.payload);
        // state.reviews = action.payload.reviewResponse;
        state.reviews = Array.isArray(action.payload.reviewResponse)
          ? action.payload.reviewResponse
          : [];
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
      })
      //--------------------
      //DELETE ADMIN REVIEWS
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
      //EDIT ADMIN REVIEW
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
      //POST ADMIN REVIEW

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
      //GET ADMIN REVIEW
      .addCase(adminGetReview.fulfilled, (state, action) => {
        toast.success("Beat obtenido correctamente", toastSuccess);
        state.setCurrentEditingReview = action.payload.reviewResponse;
      })
      .addCase(adminGetReview.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(adminGetReview.pending, (state, action) => {
        toast("Cargando beat...");
      });
  },
});

export const { setCurrentEditingReview } = adminReviewsSlice.actions;

export default adminReviewsSlice.reducer;

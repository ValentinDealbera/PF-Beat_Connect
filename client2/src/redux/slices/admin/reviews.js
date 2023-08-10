import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "@/data/config";
import { toast } from "sonner";
import axios from "axios";
import { toastError, toastSuccess } from "@/utils/toastStyles";
import i18next from "i18next";
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
      const response = await axios.get(`${serverUrl}review`);

      // return { reviewResponse: response.data.docs };
      const reviewResponse = response.data;
      return { reviewResponse };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

//GET ADMIN REVIEW
export const adminGetReview = createAsyncThunk(
  "client/adminGetReview",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${serverUrl}admin/review/${data}`);
      return { reviewResponse: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

//DELETE ADMIN REVIEW
export const adminDeleteReview = createAsyncThunk(
  "client/adminDeleteReview",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`${serverUrl}admin/review/${data}`, {
        headers: {
          admintoken: tokenAdmin,
        },
      });
      await dispatch(adminGetReviews());
      return { reviewResponse: response.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//POST ADMIN REVIEW
export const adminPostReview = createAsyncThunk(
  "client/adminPostReview",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      //Quitamos id del objeto data para que no de error
      delete data.id;

      const response = await axios.post(`${serverUrl}admin/review`, data, {
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
  },
);
//EDIT ADMIN REVIEW
export const adminEditReview = createAsyncThunk(
  "client/adminEditReview",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(
        `${serverUrl}admin/review/${data.id}`,
        data,
        {
          headers: {
            admintoken: tokenAdmin,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      await dispatch(adminGetReviews());
      return { reviewResponse: response.data };

      // return { reviewResponse };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
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
        // state.reviews = action.payload.reviewResponse;
        state.reviews = Array.isArray(action.payload.reviewResponse)
          ? action.payload.reviewResponse
          : [];
      })

      .addCase(adminGetReviews.rejected, (state, action) => {
        toast.error(action.payload, {
          style: {
            background: "#FFF0F0",
            color: "#E60000",
          },
        });
      })
      .addCase(adminGetReviews.pending, (state, action) => {})
      //--------------------
      //DELETE ADMIN REVIEWS
      .addCase(adminDeleteReview.fulfilled, (state, action) => {
        let trad =
          i18next?.language == "en"
            ? "Review deleted successfully"
            : "Review borrada correctamente";
        toast.success(trad, {
          style: {
            background: "#F0FFF0",
            color: "#00B300",
          },
        });
      })
      .addCase(adminDeleteReview.rejected, (state, action) => {
        toast.error(action.payload, {
          style: {
            background: "#FFF0F0",
            color: "#E60000",
          },
        });
      })
      .addCase(adminDeleteReview.pending, (state, action) => {
        let trad =
          i18next?.language == "en"
            ? "Deleting review..."
            : "Borrando review...";
        toast(trad);
      })
      //--------------------
      //EDIT ADMIN REVIEW
      .addCase(adminEditReview.fulfilled, (state, action) => {
        let trad =
          i18next?.language == "en"
            ? "Review edited successfully"
            : "Review editada correctamente";
        toast.success(trad, {
          style: {
            background: "#F0FFF0",
            color: "#00B300",
          },
        });
      })

      .addCase(adminEditReview.rejected, (state, action) => {
        toast.error(action.payload, {
          style: {
            background: "#FFF0F0",
            color: "#E60000",
          },
        });
        throw new Error(action.payload);
      })
      .addCase(adminEditReview.pending, (state, action) => {
        let trad =
          i18next?.language == "en"
            ? "Editing review..."
            : "Editando review...";
        toast(trad);
      })
      //--------------------
      //POST ADMIN REVIEW

      .addCase(adminPostReview.fulfilled, (state, action) => {
        let trad =
          i18next?.language == "en"
            ? "Review created successfully"
            : "Review creada correctamente";
        toast.success(trad, {
          style: {
            background: "#F0FFF0",
            color: "#00B300",
          },
        });
      })
      .addCase(adminPostReview.rejected, (state, action) => {
        toast.error(action.payload, {
          style: {
            background: "#FFF0F0",
            color: "#E60000",
          },
        });
        throw new Error(action.payload);
      })
      .addCase(adminPostReview.pending, (state, action) => {
        let trad =
          i18next?.language == "en"
            ? "Creating review..."
            : "Creando review...";
        toast(trad);
      })
      //--------------------
      //GET ADMIN REVIEW
      .addCase(adminGetReview.fulfilled, (state, action) => {
        let trad =
          i18next?.language == "en"
            ? "Beat obtained successfully"
            : "Beat obtenido correctamente";
        toast.success(trad, toastSuccess);
        state.setCurrentEditingReview = action.payload.reviewResponse;
      })
      .addCase(adminGetReview.rejected, (state, action) => {
        toast.error(action.payload, toastError);
      })
      .addCase(adminGetReview.pending, (state, action) => {
        let trad =
          i18next?.language == "en" ? "Loading beat..." : "Cargando beat...";
        toast(trad);
      });
  },
});

export const { setCurrentEditingReview } = adminReviewsSlice.actions;

export default adminReviewsSlice.reducer;

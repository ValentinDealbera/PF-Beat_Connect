import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "@/data/config";
import { toast } from "sonner";
import axios from "axios";
import { toastError, toastSuccess } from "@/utils/toastStyles";
import { adminGetUsers } from "./users";
import { adminGetBeats } from "./beats";
import { adminGetReviews } from "./reviews";
const tokenAdmin = process.env.NEXT_PUBLIC_TOKEN_ADMIN;
const initialState = {
  users: [],
  currentEdtingUser: {},
};

//------------------ ASYNC THUNKS ------------------//
//GET DASHBOARD DATA
export const adminGetData = createAsyncThunk(
  "adminUsers/adminGetData",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await dispatch(adminGetUsers());
      await dispatch(adminGetBeats());
      await dispatch(adminGetReviews());
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

//------------------ SLICE ------------------//

const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminGetData.fulfilled, (state, action) => {})
      .addCase(adminGetData.rejected, (state, action) => {})
      .addCase(adminGetData.pending, (state, action) => {});
  },
});

export const {} = adminUsersSlice.actions;

export default adminUsersSlice.reducer;

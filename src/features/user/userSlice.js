import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userReducer";

const initialState = {
  arr: [],
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(resetPassword.pending, (state) => {})
    //   .addCase(resetPassword.fulfilled, (state, action) => {
    //   })
    //   .addCase(resetPassword.rejected, (state, action) => {});
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;

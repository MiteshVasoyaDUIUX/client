/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productServiceForClient from "./productForClientReducer";

const initialState = {
  products: [],
  isError: false,
  isFetching: false,
  isFetched: false,
  message: "",
};

export const fetchProduct = createAsyncThunk(
  "productsForClient/fetch",
  async (thunkAPI) => {
    try {
      const products = await productServiceForClient.fetchProduct();
      // console.log(products);
      return products;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productForClientSlice = createSlice({
  name: "productsForClient",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isError = false;
        state.isFetching = true;
        state.isFetched = false;
        state.message = "";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isFetching = false;
        state.isFetched = true;
        state.products = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isError = true;
        state.isFetching = false;
        state.isFetched = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = productForClientSlice.actions;
export default productForClientSlice.reducer;

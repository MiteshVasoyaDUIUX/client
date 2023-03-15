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

export const addToCart = createAsyncThunk(
  "productsForClient/addToCart",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const message = await productServiceForClient.addToCart(
        data,
        token
      );
      console.log("TOTKEOKE : ", message);
      return message;
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
      })
      .addCase(addToCart.pending, (state) => {
        state.isError = false;
        state.isAdding = true;
        state.isAdded = false;
        state.message = "";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isAdding = false;
        state.isAdded = true;
        state.message = "Added to Cart";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isError = true;
        state.isAdding = false;
        state.isAdded = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = productForClientSlice.actions;
export default productForClientSlice.reducer;

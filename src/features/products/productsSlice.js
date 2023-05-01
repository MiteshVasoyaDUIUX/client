/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import products from "./productsReducer";

const initialState = {
  products: [],
  product: [],
  wishlist: [],
  wishlistProducts: [],
  searchedProducts: [],
  cart: [],
  isError: false,
  isFetching: false,
  isFetched: false,
  message: "",
};

export const fetchProducts = createAsyncThunk(
  "productsForClient/fetchProducts",
  async (thunkAPI) => {
    try {
      const response = await products.fetchProducts();
      // console.log(products);
      return response;
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

export const searchProduct = createAsyncThunk(
  "productsForClient/searchProduct",
  async (quary, thunkAPI) => {
    try {
      const response = await products.searchProduct(quary);
      // console.log("Searched Products : ", products);
      return response;
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

export const fetchOneProduct = createAsyncThunk(
  "productsForClient/fetchOneProducts",
  async (productId, thunkAPI) => {
    try {
      const response = await products.fetchOneProduct(productId);
      return response;
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

const productsSlice = createSlice({
      name: "products",
      initialState,
      reducers: {
        reset: (state) => initialState,
      },
      extraReducers: (builder) => {
        builder
          .addCase(fetchProducts.pending, (state) => {
            state.isError = false;
            state.isFetching = true;
            state.isFetched = false;
            state.message = "";
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
            state.isError = false;
            state.isFetching = false;
            state.isFetched = true;
            state.products = action.payload;
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.isError = true;
            state.isFetching = false;
            state.isFetched = false;
            state.message = action.payload;
          })
          .addCase(searchProduct.pending, (state) => {
            state.isError = false;
            state.isFetching = true;
            state.isFetched = false;
            state.message = "";
          })
          .addCase(searchProduct.fulfilled, (state, action) => {
            state.isError = false;
            state.isFetching = false;
            state.isFetched = true;
            state.searchedProducts = action.payload;
          })
          .addCase(searchProduct.rejected, (state, action) => {
            state.isError = true;
            state.isFetching = false;
            state.isFetched = false;
            state.message = action.payload;
          })
          .addCase(fetchOneProduct.pending, (state) => {
            state.isError = false;
            state.isFetching = true;
            state.isFetched = false;
            state.message = "";
          })
          .addCase(fetchOneProduct.fulfilled, (state, action) => {
            state.isError = false;
            state.isFetching = false;
            state.isFetched = true;
            state.product = action.payload;
          })
          .addCase(fetchOneProduct.rejected, (state, action) => {
            state.isError = true;
            state.isFetching = false;
            state.isFetched = false;
            state.message = action.payload;
          })
      },
    });
    
    export const { reset } = productsSlice.actions;
    export default productsSlice.reducer;
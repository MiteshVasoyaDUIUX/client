/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productServiceForClient from "./productForClientReducer";

const initialState = {
  products: [],
  wishlist: [],
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
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const message = await productServiceForClient.addToCart(
        userId,
        token
      );
      // console.log("TOTKEOKE : ", message);
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

export const addToWishList = createAsyncThunk(
  "productsForClient/addToWishList",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const message = await productServiceForClient.addToWishList(
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

export const fetchWishList = createAsyncThunk(
  "productsForClient/fetchWishList",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const message = await productServiceForClient.fetchWishList(
        data,
        token
      );
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
      })
      .addCase(fetchWishList.pending, (state) => {
        state.isError = false;
        state.isFetchingWishList = true;
        state.isFetchedWishList = false;
        state.message = "";
      })
      .addCase(fetchWishList.fulfilled, (state, action) => {
        state.isError = false;
        state.isFetchingWishList = false;
        state.isFetchedWishList = true;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishList.rejected, (state, action) => {
        state.isError = true;
        state.isFetchingWishList = false;
        state.isFetchedWishList = false;
        state.message = action.payload;
      })
      .addCase(addToWishList.pending, (state) => {
        state.isError = false;
        state.isAddingToWishList = true;
        state.isAddedToWishList = false;
        state.message = "";
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.isError = false;
        state.isAddingToWishList = false;
        state.isAddedToWishList = true;
        state.wishlist = action.payload;
        // console.log("Slice : ", action.payload);
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.isError = true;
        state.isAddingToWishList = false;
        state.isAddedToWishList = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = productForClientSlice.actions;
export default productForClientSlice.reducer;
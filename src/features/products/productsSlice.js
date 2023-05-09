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
  productMessage: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetch/products",
  async (productReqData, thunkAPI) => {
    try {
      const response = await products.fetchProducts(productReqData);
      // console.log(productReqData);
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

export const fetchNewArrivals = createAsyncThunk(
  "products/fetch/new-arrivals",
  async (thunkAPI) => {
    try {
      const response = await products.fetchNewArrivals();
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
  "products/fetch/search-products",
  async (quary, thunkAPI) => {
    try {
      const response = await products.searchProduct(quary);
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
  "products/fetch/one",
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

export const fetchTrendingProducts = createAsyncThunk(
  "products/fetch/new-",
  async (thunkAPI) => {
    try {
      const response = await products.fetchTrendingProducts();
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
        state.productMessage = "";
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
        state.productMessage = action.payload;
      })
      .addCase(searchProduct.pending, (state) => {
        state.isError = false;
        state.isFetching = true;
        state.isFetched = false;
        state.productMessage = "";
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
        state.productMessage = action.payload;
      })
      .addCase(fetchOneProduct.pending, (state) => {
        state.isError = false;
        state.isFetching = true;
        state.isFetched = false;
        state.productMessage = "";
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
        state.productMessage = action.payload;
      })
      .addCase(fetchNewArrivals.pending, (state) => {
        state.productMessage = "";
      })
      .addCase(fetchNewArrivals.fulfilled, (state, action) => {
        state.products = action.payload;
        // console.log("State.Products : ", state.products.length);
      })
      .addCase(fetchNewArrivals.rejected, (state, action) => {
        state.productMessage = action.payload;
      });
  },
});

export const { reset } = productsSlice.actions;
export default productsSlice.reducer;

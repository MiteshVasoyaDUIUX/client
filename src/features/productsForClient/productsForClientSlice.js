/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productServiceForClient from "./productForClientReducer";

const initialState = {
  products: [],
  product: [],
  wishlist: [],
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
      const products = await productServiceForClient.fetchProducts();
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

export const searchProduct = createAsyncThunk(
  "productsForClient/searchProduct",
  async (quary, thunkAPI) => {
    try {
      const products = await productServiceForClient.searchProduct(quary);
      console.log("Searched Products : ", products);
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

export const fetchOneProduct = createAsyncThunk(
  "productsForClient/fetchOneProducts",
  async (productId, thunkAPI) => {
    try {
      const product = await productServiceForClient.fetchOneProduct(productId);
      return product;
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

      const message = await productServiceForClient.addToCart(userId, token);
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

export const updateCartQuantity = createAsyncThunk(
  "productsForClient/updateCart",
  async (newData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const message = await productServiceForClient.updateCart(newData, token);
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

export const removeFromCart = createAsyncThunk(
  "productsForClient/removeFromCart",
  async (productId, thunkAPI) => {
    try {
      //'token' may be not use because only user can add the goal...
      const token = thunkAPI.getState().auth.user.token;

      return await productServiceForClient.removeFromCart(productId, token);
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

      const message = await productServiceForClient.addToWishList(data, token);
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

export const fetchWishList = createAsyncThunk(
  "productsForClient/fetchWishList",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const message = await productServiceForClient.fetchWishList(data, token);
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

export const fetchCart = createAsyncThunk(
  "productsForClient/fetchCart",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const message = await productServiceForClient.fetchCart(data, token);
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
      .addCase(addToCart.pending, (state) => {
        state.isError = false;
        state.isAddingCart = true;
        state.isAddedCart = false;
        state.message = "";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isAddingCart = false;
        state.isAddedCart = true;
        state.message = "Added to Cart";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isError = true;
        state.isAddingCart = false;
        state.isAddedCart = false;
        state.message = action.payload;
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isError = false;
        state.isAddingCart = true;
        state.isAddedCart = false;
        state.isUpdateCart = false;
        state.message = "";
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isError = false;
        state.isAddingCart = false;
        state.isAddedCart = true;
        state.isUpdateCart = true;
        state.cart = action.payload;
        state.message = "Added to Cart";
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isError = true;
        state.isAddingCart = false;
        state.isAddedCart = false;
        state.isUpdateCart = false;
        state.message = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.message = "";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isRemoved = true;
        // state.message = "Added to Cart";
        console.log("NEW DAAATA : ", action.payload);
        state.cart = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isError = true;
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
      .addCase(fetchCart.pending, (state) => {
        state.isError = false;
        state.isFetchingWishList = true;
        state.isFetchedWishList = false;
        state.message = "";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isFetchingWishList = false;
        state.isFetchedWishList = true;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
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

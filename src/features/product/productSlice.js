/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productReducer";
const initialState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const uploadProduct = createAsyncThunk(
  "prouduct/upload",
  async (productData, thunkAPI) => {
    try {
      //'token' may be not use because only user can add the goal...
      const token = thunkAPI.getState().auth.user.token;

      return await productService.uploadProduct(productData, token);
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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadProduct.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.products.push(action.payload);
        // console.log("New State : ", initialState.products);
      })
      .addCase(uploadProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
    // .addCase(fetchProduct.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(fetchProduct.fulfilled, (state, action) => {
    //   state.isSuccess = true;
    //   state.isLoading = false;
    //   state.products = action.payload;
    //   // console.log("New State : ", initialState.products);
    // })
    // .addCase(fetchProduct.rejected, (state, action) => {
    //   state.isError = true;
    //   state.isLoading = false;
    //   state.message = action.payload;
    // })
    // .addCase(removeProduct.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(removeProduct.fulfilled, (state, action) => {
    //   state.isSuccess = true;
    //   state.isLoading = false;
    //   state.products = state.products.filter(
    //     (goal) => goal._id !== action.payload._id
    //   );
    //   // console.log("New State : ", state.products);
    //   // console.log("Action Payload : ", action.payload._id);
    //   // console.log("Goal Id : ", goal._id);
    // })
    // .addCase(removeProduct.rejected, (state, action) => {
    //   state.isError = true;
    //   state.isError = false;
    //   state.isLoading = false;
    //   state.message = action.payload;
    // });
  },
});

export const {reset} = productSlice.actions;
export default productSlice.reducer;
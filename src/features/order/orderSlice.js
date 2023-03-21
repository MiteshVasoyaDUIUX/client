/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderReducer";

const initialState = {
  order: [],
  orderId : '',
  isError: false,
  isPlaced: false,
  isPlacing: false,
  message: "",
};

export const placeOrder = createAsyncThunk(
  "order/place",
  async (checkoutData, thunkAPI) => {
    try {
      //'token' may be not use because only user can add the goal...
      const token = thunkAPI.getState().auth.user.token;

      return await orderService.placeOrder(checkoutData, token);
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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.isPlaced = false;
        state.isPlacing = false;
        state.isError = false;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isPlaced = true;
        state.isPlacing = false;
        state.isError = false;
        state.orderId = action.payload;
      //   console.log("New State : ", state.orderId);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isError = true;
        state.isPlaced = false;
        state.isPlacing = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;

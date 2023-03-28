import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminReducer";

const initialState = {
  allOrders: [],
  isOrderFetching: false,
  isOrdersFetched: false,
  isAccepted: false,
  isRejected: false,
  isError: false,
};

export const acceptOrder = createAsyncThunk(
  "admin/order/accept",
  async (orderId, thunkAPI) => {
    try {
      //'token' may be not use because only user can add the goal...
      const token = thunkAPI.getState().auth.user.token;
      console.log("ORDER ID SLICE  : ", orderId);
      return await adminService.acceptOrder(orderId, token);
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

export const cancelOrder = createAsyncThunk(
  "admin/order/cancel",
  async (orderId, thunkAPI) => {
    try {
      //'token' may be not use because only user can add the goal...
      const token = thunkAPI.getState().auth.user.token;
      console.log("ORDER ID SLICE  : ", orderId);
      return await adminService.cancelOrder(orderId, token);
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

export const fetchAllOrders = createAsyncThunk(
  "admin/order/fetchAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.fetchAllOrders(token);
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

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(acceptOrder.pending, (state) => {
        state.isAccepted = false;
        state.isRejected = false;
      })
      .addCase(acceptOrder.fulfilled, (state, action) => {
        state.isAccepted = true;
        state.isRejected = false;
      //   console.log("ACTION PAYLOAD : ", action.payload)
        state.allOrders = action.payload;
      })
      .addCase(acceptOrder.rejected, (state, action) => {
        state.isAccepted = false;
        state.isRejected = false;
        state.isError = true;
      })
      .addCase(cancelOrder.pending, (state) => {
        state.isAccepted = false;
        state.isRejected = false;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.isAccepted = false;
        state.isRejected = true;
        state.allOrders = action.payload;
        console.log("New State : ", action.payload);
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.isOrderFetching = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.isOrdersFetched = true;
        state.isOrderFetching = false;
        state.allOrders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.isError = true;
        state.isOrderFetching = false;
        state.message = action.payload;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.isAccepted = false;
        state.isRejected = false;
        state.isError = true;
      });
  },
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;

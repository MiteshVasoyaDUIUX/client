import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "./usersReducer";

const initialState = {
  users: [],
  ordersUserwise: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isFetched: false,
  message: "",
};

export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async (usersList, thunkAPI) => {
    try {
      //'token' may be not use because only user can add the goal...
      const token = thunkAPI.getState().auth.user.token;

      return await usersService.fetchUsers(token);
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

export const fetchOrderUserwise = createAsyncThunk(
  "user/products/fetch",
  async (userId, thunkAPI) => {
    try {
      //'token' may be not use because only user can add the goal...
      const token = thunkAPI.getState().auth.user.token;

      return await usersService.fetchOrderUserwise(userId, token);
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

const usersSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isFetched = true;
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(fetchOrderUserwise.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderUserwise.fulfilled, (state, action) => {
        state.isOrdersFetched = true;
        state.isLoading = false;
        state.ordersUserwise = action.payload;
      })
      .addCase(fetchOrderUserwise.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = usersSlice.actions;
export default usersSlice.reducer;
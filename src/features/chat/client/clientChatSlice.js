import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientChatService from "./clientChatReducer";

const initialState = {
  msgs: [],
  isError: false,
  isMsgSent: false,
  isMsgSending: false,
  message: "",
};

export const connectChat = createAsyncThunk(
  "client/chat",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // console.log("CHAT IN SLICE  : ");
      return await clientChatService.connectChat(token);
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

const clientChatSlice = createSlice({
  name: "clientChat",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectChat.pending, (state) => {
      //   state.isPlaced = false;
      //   state.isPlacing = false;
      //   state.isError = false;
      })
      .addCase(connectChat.fulfilled, (state, action) => {
      //   state.isPlaced = true;
      //   state.isPlacing = false;
      //   state.isError = false;
      //   state.message = action.payload.message;
        // state.orderId = action.payload;
        //   console.log("New State : ", state.orderId);
      })
      .addCase(connectChat.rejected, (state, action) => {
      //   state.isError = true;
      //   state.isPlaced = false;
      //   state.isPlacing = false;
      //   state.message = action.payload;
      });
  },
});

export const { reset } = clientChatSlice.actions;
export default clientChatSlice.reducer;

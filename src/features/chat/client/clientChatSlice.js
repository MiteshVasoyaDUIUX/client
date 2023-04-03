import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientChatService from "./clientChatReducer";

const initialState = {
  messages: [],
  isError: false,
  isMsgSent: false,
  isMsgSending: false,
  message: "",
};

export const fetchChat = createAsyncThunk(
  "client/chat",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // console.log("CHAT IN SLICE  : ");
      return await clientChatService.fetchChat(token);
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

export const insertSocketID = createAsyncThunk(
  "client/insertSocketId",
  async (socketID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log("CHAT IN SLICE  : ");
      return await clientChatService.insertSocketID(socketID, token);
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
      .addCase(fetchChat.pending, (state) => {
      })
      .addCase(fetchChat.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(fetchChat.rejected, (state, action) => {
      })
      .addCase(insertSocketID.pending, (state) => {
      })
      .addCase(insertSocketID.fulfilled, (state, action) => {
        console.log("SocketID Insterted Successsfully")
      })
      .addCase(insertSocketID.rejected, (state, action) => {
      });
  },
});

export const { reset } = clientChatSlice.actions;
export default clientChatSlice.reducer;

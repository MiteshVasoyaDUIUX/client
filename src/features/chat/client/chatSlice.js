import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "./chatReducer";

const initialState = {
  messages: [],
  conversations : [],
  activeSocketIds : [],
  isSaved: false,
  message: "",
};

export const fetchChat = createAsyncThunk(
  "client/fetchChat",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // console.log("CHAT IN SLICE  : ");
      return await chatService.fetchChat(token);
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

export const fetchAllConversation = createAsyncThunk(
  "client/fetchAllConversations",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // console.log("CHAT IN SLICE  : ");
      return await chatService.fetchAllConversation(token);
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

export const saveChat = createAsyncThunk(
  "client/saveChat",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await chatService.saveChat(data, token);
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
      .addCase(saveChat.pending, (state) => {
      })
      .addCase(saveChat.fulfilled, (state, action) => {
        // state.messages = action.payload;
        state.isSaved = true;
      })
      .addCase(saveChat.rejected, (state, action) => {
      })
      .addCase(fetchAllConversation.pending, (state) => {
      })
      .addCase(fetchAllConversation.fulfilled, (state, action) => {
        state.conversations = action.payload;
        // console.log("ACTIOND PAYL  OAD  :", action.payload);
        state.isSaved = true;
      })
      .addCase(fetchAllConversation.rejected, (state, action) => {
      });
  },
});

export const { reset } = clientChatSlice.actions;
export default clientChatSlice.reducer;

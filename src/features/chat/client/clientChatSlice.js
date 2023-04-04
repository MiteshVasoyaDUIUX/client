import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientChatService from "./clientChatReducer";

const initialState = {
  messages: [],
  activeSocketIds : [],
  isSaved: false,
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
  async (socketIOData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // console.log("CHAT IN SLICE  : ");
      return await clientChatService.insertSocketID(socketIOData, token);
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

export const deleteSocketID = createAsyncThunk(
  "client/deleteSocketId",
  async (socketIOData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // console.log("CHAT IN SLICE  : ");
      return await clientChatService.deleteSocketID(socketIOData, token);
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
      return await clientChatService.saveChat(data, token);
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
      .addCase(insertSocketID.pending, (state) => {
      })
      .addCase(insertSocketID.fulfilled, (state, action) => {
        console.log("SocketID Insterted Successsfully")
      })
      .addCase(insertSocketID.rejected, (state, action) => {
      })
      .addCase(deleteSocketID.pending, (state) => {
      })
      .addCase(deleteSocketID.fulfilled, (state, action) => {
        console.log("SocketID Deleted Successsfully")
      })
      .addCase(deleteSocketID.rejected, (state, action) => {
      });
  },
});

export const { reset } = clientChatSlice.actions;
export default clientChatSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authReducer";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isVerified: false,
  isDataUpdated: false,
  message: "",
};

//User Registration...
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
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

//User Login...
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const verifyUser = createAsyncThunk(
  "user/email/verification",
  async (userEmail, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.verifyUser(token);
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

export const resetPassword = createAsyncThunk(
  "user/reset-password",
  async (email, thunkAPI) => {
    try {
      // console.log("___Reset Password Slice...", email);
      return await authService.resetPassword(email);
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

export const addNewAddress = createAsyncThunk(
  "user/add-address",
  async (addressData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const addAddress = await authService.addNewAddress(addressData, token);
      return addAddress;
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

export const removeAddress = createAsyncThunk(
  "user/remove-address",
  async (addressData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const removeAddress = await authService.removeAddress(addressData, token);
      return removeAddress;
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

export const logout = createAsyncThunk("auth/logout", async () => {
  return await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(verifyUser.pending, (state) => {
        state.isVerifying = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isVerifying = false;
        state.isVerified = true;
        state.user.user = action.payload.user;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isVerifying = false;
        state.isVerified = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {})
      .addCase(resetPassword.fulfilled, (state, action) => {})
      .addCase(resetPassword.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addNewAddress.pending, (state) => {})
      .addCase(addNewAddress.fulfilled, (state, action) => {
        // state.userSliceMessage = action.payload;
        state.user.user.address.push(action.payload);
      })
      .addCase(addNewAddress.rejected, (state, action) => {
        // console.log("Message : ", action.payload);
        state.userSliceMessage = action.payload;
      })
      .addCase(removeAddress.pending, (state) => {})
      .addCase(removeAddress.fulfilled, (state, action) => {
        state.user.user.address.splice(action.payload, 1)
      })
      .addCase(removeAddress.rejected, (state, action) => {
        state.isError = true;
        // console.log("Message : ", action.payload);
        state.userSliceMessage = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

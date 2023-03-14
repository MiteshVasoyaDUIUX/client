import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/product/productSlice";
import usersReducer from "../features/users/usersSlice";
import productsForClientReducers from "../features/productsForClient/productsForClientSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    user: usersReducer,
    productsForClient : productsForClientReducers
  },
});

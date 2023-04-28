import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/product/productSlice";
import userReducer from "../features/user/userSlice";
import usersReducer from "../features/users/usersSlice";
import productsForClientReducers from "../features/productsForClient/productsForClientSlice";
import orderReducers from "../features/order/orderSlice";
import adminReducers from "../features/admin/adminSlice";
import chatReducers from "../features/chat/client/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    user: userReducer,
    users: usersReducer,
    productsForClient: productsForClientReducers,
    order: orderReducers,
    admin: adminReducers,
    chat: chatReducers,
  },
});

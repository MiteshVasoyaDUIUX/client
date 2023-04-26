/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Client Pages/Cart";
import MyOrders from "./pages/Client Pages/MyOrders";
import AdminDashboard from "./pages/Admin Pages/AdminDashboard";
import AddProduct from "./pages/Admin Pages/AddProduct";
import AllUser from "./pages/Admin Pages/AllUser";
import AllProduct from "./pages/Admin Pages/AllProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProduct from "./pages/Admin Pages/EditProduct";
import EditAdminProfile from "./pages/EditAdminProfile";
import Clothes from "./components/Products/Clothes";
import OtherProducts from "./components/Products/OtherProducts";
import Accessories from "./components/Products/Accessories";
import DetailedProductPage from "./pages/Client Pages/DetailedProductPage";
import BuyProduct from "./pages/Client Pages/BuyProduct";
import Orders from "./pages/Admin Pages/Orders";
import Messages from "./pages/Admin Pages/Messages";
import ChatAdmin from "./pages/Admin Pages/ChatAdmin";
import Chat from "./pages/Client Pages/Chat";
import SearchedQuary from "./pages/Client Pages/SearchedQuary";
import DeletedUser from "./pages/Client Pages/DeletedUser";
import BlockedUser from "./pages/Client Pages/BlockedUser";
import Wishlist from "./pages/Client Pages/Wishlist";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/blockeduser" element={<BlockedUser />} />
            <Route path="/deleteduser" element={<DeletedUser />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search/:params" element={<SearchedQuary />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/mywishlist" element={<Wishlist />} />
            <Route path="/buyer/chat" element={<Chat />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/addproduct" element={<AddProduct />} />
            <Route path="/admin/allproduct" element={<AllProduct />} />
            <Route path="/admin/alluser" element={<AllUser />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/messages" element={<ChatAdmin />} />
            <Route path="/admin/editproduct" element={<EditProduct />} />
            <Route path="/admin/profile" element={<EditAdminProfile />} />
            <Route path="/products/other" element={<OtherProducts />} />
            <Route path="/products/accessories" element={<Accessories />} />
            <Route path="/products/clothes" element={<Clothes />} />
            <Route path="/product/:id" element={<DetailedProductPage />} />
            <Route path="/product/placeorder/:id" element={<BuyProduct />} />
            <Route path="/logout" />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

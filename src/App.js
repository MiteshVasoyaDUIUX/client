/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import AllUser from "./pages/AllUser";
import AllProduct from "./pages/AllProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProduct from "./pages/EditProduct";
import EditAdminProfile from "./pages/EditAdminProfile";
import Clothes from "./components/Products/Clothes";
import OtherProducts from "./components/Products/OtherProducts";
import Accessories from "./components/Products/Accessories";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/addproduct" element={<AddProduct />} />
            <Route path="/admin/allproduct" element={<AllProduct />} />
            <Route path="/admin/alluser" element={<AllUser />} />
            <Route path="/admin/editproduct" element={<EditProduct />} />
            <Route path="/admin/profile" element={<EditAdminProfile />} />
            <Route path="/products/other" element={<OtherProducts />} />
            <Route path="/products/accessories" element={<Accessories />} />
            <Route path="/products/clothes" element={<Clothes />} />
            <Route path="/logout" />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { FaIcons } from "react-icons/fa";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AddIcon from "@mui/icons-material/Add";
import InventoryIcon from "@mui/icons-material/Inventory";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MessageIcon from "@mui/icons-material/Message";
import "./Header.css";
import { searchProduct } from "../features/productsForClient/productsForClientSlice";
import SideBar from "./SideBar";

const pagesForAdmin = [
  "Dashboard",
  "Orders",
  "Add Product",
  "Inventory",
  "All Users",
  "Messages",
];
const optionsForClient = ["Cart", "My Orders", "My Wishlist", "Logout"];
const optionsForAdmin = ["Profile", "Logout"];
const optionIfNotLoggedIn = ["Login", "Register"];

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user } = useSelector((state) => state.auth);

  const [sidebar, setSideBar] = useState(false);

  // console.log("User Role : ", user);

  const onLogout = () => {
    navigate("/");
    dispatch(logout());
    dispatch(reset());
    console.log("OnLogOUT");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearchBar = (e) => {
    const quary = document.getElementById("header-searchbar-input").value;

    if (quary !== "" && e.type === "click") {
      navigate(`/search/${quary}`);
      // console.log("Key Code : ", e.type);
    } else if (quary !== "" && e.keyCode == 13) {
      // console.log("Key Code : ", e.keyCode);
      navigate(`/search/${quary}`);
    }
    // dispatch(searchProduct(quary));
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    return () => {
      reset();
    };
  }, [user, dispatch]);

  return (
    <>
      <div className="header">
        <div className="header-logo">
          {user ? (
            user.role === "admin" ? (
              <Link
                to="/admin/dashboard"
                style={{ color: "#f0f3ed", textDecoration: "none" }}
              >
                LOGO
              </Link>
            ) : (
              <Link to="/" style={{ color: "#f0f3ed", textDecoration: "none" }}>
                LOGO
              </Link>
            )
          ) : (
            <>
              <Link to="/" style={{ color: "#f0f3ed", textDecoration: "none" }}>
                LOGO
              </Link>
            </>
          )}
        </div>

        {(!user || user.role === "buyer") &&
        (!user?.user.isBlocked || !user?.user.isDeleted) ? (
          <div className="header-searchbar">
            <input
              type="text"
              name="header-searchbar-input"
              id="header-searchbar-input"
              onKeyUp={handleSearchBar}
            />
            <button onClick={handleSearchBar}>
              <SearchIcon />
            </button>
          </div>
        ) : (
          <></>
        )}

        <div className="header-signin">
          {user ? (
            user.role === "admin" ? (
              <>
                <div style={{ display: "flex" }}>
                  <div
                    className="header-user-name"
                    style={{ color: "#f0f3ed" }}
                  >
                    Hello, {user.user.name}
                  </div>
                  <Tooltip>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar />
                    </IconButton>
                  </Tooltip>
                </div>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    key={optionsForAdmin[0]}
                    onClick={handleCloseUserMenu}
                    disabled
                  >
                    <Link
                      style={{ textDecoration: "None", color: "black" }}
                      to="/admin/profile"
                    >
                      {optionsForAdmin[0]}
                    </Link>
                  </MenuItem>
                  <MenuItem
                    key={optionsForAdmin[1]}
                    onClick={handleCloseUserMenu}
                    className="menu-icon-options"
                    sx={{
                      backgroundColor: "#f0f3ed",
                      color: "#f0f3ed",
                    }}
                  >
                    <Link
                      style={{ textDecoration: "None", color: "black" }}
                      onClick={onLogout}
                    >
                      {optionsForAdmin[1]}
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            ) : user?.user.isBlocked || user?.user.isDeleted ? (
              <>
                <MenuItem
                  key={optionsForClient[3]}
                  onClick={handleCloseUserMenu}
                >
                  <Link
                    style={{ textDecoration: "None", color: "black" }}
                    onClick={onLogout}
                  >
                    {optionsForClient[3]}
                  </Link>
                </MenuItem>
              </>
            ) : (
              <>
                <div style={{ display: "flex" }}>
                  <div
                    className="header-user-name"
                    style={{ color: "#f0f3ed" }}
                  >
                    Hello, {user.user?.name}
                  </div>
                  <Tooltip>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar />
                    </IconButton>
                  </Tooltip>
                </div>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    key={optionsForClient[0]}
                    onClick={handleCloseUserMenu}
                  >
                    <Link
                      style={{ textDecoration: "None", color: "black" }}
                      to="/cart"
                    >
                      {optionsForClient[0]}
                    </Link>
                  </MenuItem>
                  <MenuItem
                    key={optionsForClient[1]}
                    onClick={handleCloseUserMenu}
                  >
                    <Link
                      style={{ textDecoration: "None", color: "black" }}
                      to="/myorders"
                    >
                      {optionsForClient[1]}
                    </Link>
                  </MenuItem>
                  <MenuItem
                    key={optionsForClient[2]}
                    onClick={handleCloseUserMenu}
                  >
                    <Link
                      style={{ textDecoration: "None", color: "black" }}
                      to="/mywishlist"
                    >
                      {optionsForClient[2]}
                    </Link>
                  </MenuItem>
                  <MenuItem
                    key={optionsForClient[3]}
                    onClick={handleCloseUserMenu}
                  >
                    <Link
                      style={{ textDecoration: "None", color: "black" }}
                      onClick={onLogout}
                    >
                      {optionsForClient[3]}
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            )
          ) : (
            <>
              <Tooltip>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="No Image" src="#" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  key={optionIfNotLoggedIn[0]}
                  onClick={handleCloseUserMenu}
                >
                  <Link
                    style={{ textDecoration: "None", color: "black" }}
                    to="/login"
                  >
                    {optionIfNotLoggedIn[0]}
                  </Link>
                </MenuItem>
                <MenuItem
                  key={optionIfNotLoggedIn[1]}
                  onClick={handleCloseUserMenu}
                >
                  <Link
                    style={{ textDecoration: "None", color: "black" }}
                    to="/register"
                  >
                    {optionIfNotLoggedIn[1]}
                  </Link>
                </MenuItem>
              </Menu>
            </>
          )}
        </div>
      </div>
      {user && user.role === "admin" ? (
        <>
          <SideBar />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
export default Header;

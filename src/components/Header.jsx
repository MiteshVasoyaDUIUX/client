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

const pagesForAdmin = [
  "Dashboard",
  "Orders",
  "Add Product",
  "Inventory",
  "All Users",
  "Messages",
];
const optionsForClient = ["Cart", "My Orders", "Chat", "Logout"];
const optionsForAdmin = ["Profile", "Logout"];
const optionIfNotLoggedIn = ["Login", "Register"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const [isUserLoggedIn, setUserLoggedIn] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [sidebar, setSideBar] = useState(false);

  // console.log("User Role : ", user);

  const onLogout = () => {
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
        <div className="sidebar-toggle-button">
          <IconButton onClick={() => setSideBar(!sidebar)}>
            {user ? (
              user.role === "admin" ? (
                sidebar ? (
                  <>
                    <CloseIcon className="sidebar-close-button" />
                  </>
                ) : (
                  <>
                    <MenuIcon className="sidebar-menu-button" />
                  </>
                )
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </IconButton>
        </div>

        <div className="header-logo">
          {user ? (
            user.role === "admin" ? (
              <Link
                to="/admin/dashboard"
                style={{ color: "#1d2133", textDecoration: "none" }}
              >
                LOGO
              </Link>
            ) : (
              <Link to="/" style={{ color: "#1d2133", textDecoration: "none" }}>
                LOGO
              </Link>
            )
          ) : (
            <>
              <Link to="/" style={{ color: "#1d2133", textDecoration: "none" }}>
                LOGO
              </Link>
            </>
          )}
        </div>

        <div className="header-signin">
          {user ? (
            user.role === "admin" ? (
              <>
                <div style={{ display: "flex" }}>
                  <div className="header-user-name" sx={{ color: "#f4ede2" }}>
                    Hello, {user.role}
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
            ) : (
              <>
                <Tooltip>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="P Image"
                      src="#"
                      sx={{ backgroundColor: " #1d2133" }}
                    />
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
      {user ? (
        sidebar && user.role === "admin" ? (
          <>
            <div className="sidebar-menu">
              <Link
                style={{ textDecoration: "None", color: "#f9f3ea" }}
                to="/admin/dashboard"
              >
                <div className="sidebar-submenu">
                  <div style={{ marginRight: "10px" }}>
                    <DashboardIcon fontSize="medium" />
                  </div>
                  {pagesForAdmin[0]}
                </div>
              </Link>
              <Link
                style={{ textDecoration: "None", color: "#f9f3ea" }}
                to="/admin/orders"
              >
                <div className="sidebar-submenu">
                  <div style={{ marginRight: "10px" }}>
                    <LocalMallIcon fontSize="medium" />
                  </div>
                  {pagesForAdmin[1]}
                </div>
              </Link>
              <Link
                style={{ textDecoration: "None", color: "#f9f3ea" }}
                to="/admin/addproduct"
              >
                <div className="sidebar-submenu">
                  <div style={{ marginRight: "10px" }}>
                    <AddIcon fontSize="medium" />
                  </div>
                  {pagesForAdmin[2]}
                </div>
              </Link>
              <Link
                style={{ textDecoration: "None", color: "#f9f3ea" }}
                to="/admin/allproduct"
              >
                <div className="sidebar-submenu">
                  <div style={{ marginRight: "10px" }}>
                    <InventoryIcon fontSize="medium" />
                  </div>
                  {pagesForAdmin[3]}
                </div>
              </Link>
              <Link
                style={{ textDecoration: "None", color: "#f9f3ea" }}
                to="/admin/alluser"
              >
                <div className="sidebar-submenu">
                  <div style={{ marginRight: "10px" }}>
                    <PersonIcon fontSize="medium" />
                  </div>
                  {pagesForAdmin[4]}
                </div>
              </Link>
              <Link
                style={{ textDecoration: "None", color: "#f9f3ea" }}
                to="/admin/messages"
              >
                <div className="sidebar-submenu">
                  <div style={{ marginRight: "10px" }}>
                    <MessageIcon fontSize="medium" />
                  </div>
                  {pagesForAdmin[5]}
                </div>
              </Link>
            </div>
          </>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </>
  );
}
export default Header;

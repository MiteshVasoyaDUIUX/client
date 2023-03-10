/* eslint-disable no-unused-vars */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const pagesForAdmin = ["Dashboard", "Add Product", "All Products", "All Users"];
const optionsForClient = ["Cart", "My Orders", "Logout"];
const optionsForAdmin = ["Profile", "Logout"];
const optionIfNotLoggedIn = ["Login", "Register"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const [isUserLoggedIn, setUserLoggedIn] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

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

  return (
    <AppBar position="fixed" style={{ backgroundColor: "#457b9d" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            link="/"
          >
            {/* Link  to Dashboard... */}
            {/* <Link style={{ textDecoration: "None", color: "white" }} to="/"> */}
            LOGO
            {/* </Link> */}
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button></Button>
          </Box>

          {user ? (
            user.role === "admin" ? (
              <>
                <Box sx={{ flexGrow: 50, display: { xs: "none", md: "flex" } }}>
                  <Button
                    key={pagesForAdmin[0]}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Link
                      style={{ textDecoration: "None", color: "white " }}
                      to="/"
                    >
                      {pagesForAdmin[0]}
                    </Link>
                  </Button>
                  <Button
                    key={pagesForAdmin[1]}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Link
                      style={{ textDecoration: "None", color: "white " }}
                      to="/admin/addproduct"
                    >
                      {pagesForAdmin[1]}
                    </Link>
                  </Button>
                  <Button
                    key={pagesForAdmin[2]}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Link
                      style={{ textDecoration: "None", color: "white " }}
                      to="/admin/allproduct"
                    >
                      {pagesForAdmin[2]}
                    </Link>
                  </Button>
                  <Button
                    key={pagesForAdmin[3]}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Link
                      style={{ textDecoration: "None", color: "white " }}
                      to="/admin/alluser"
                    >
                      {pagesForAdmin[3]}
                    </Link>
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  <Button disabled></Button>
                </Box>
              </>
            )
          ) : (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button disabled></Button>
              </Box>
            </>
          )}

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              user.role === "admin" ? (
                <>
                  <Tooltip>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="No Image" src="#" />
                    </IconButton>
                  </Tooltip>{" "}
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
                      <Avatar alt="No Image" src="#" />
                    </IconButton>
                  </Tooltip>{" "}
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
                        onClick={onLogout}
                      >
                        {optionsForClient[2]}
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;

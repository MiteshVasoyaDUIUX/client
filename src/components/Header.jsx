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

const pages = [""];
const options = ["Cart", "My Orders", "Logout"];
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
    navigate("/");
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
            <Button disabled></Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
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
                  <MenuItem key={options[0]} onClick={handleCloseUserMenu}>
                    <Link
                      style={{ textDecoration: "None", color: "black" }}
                      to="/cart"
                    >
                      {options[0]}
                    </Link>
                  </MenuItem>
                  <MenuItem key={options[1]} onClick={handleCloseUserMenu}>
                    <Link
                      style={{ textDecoration: "None", color: "black" }}
                      to="/myorders"
                    >
                      {options[1]}
                    </Link>
                  </MenuItem>
                  <MenuItem key={options[2]} onClick={handleCloseUserMenu}>
                    <Link
                      style={{ textDecoration: "None", color: "black" }}
                      onClick={onLogout}
                    >
                      {options[2]}
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

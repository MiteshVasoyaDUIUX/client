/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (message) {
      toast.error(message);
    }
    if (isSuccess || user) {
      // console.log("User : ", user.role);
      if (user.role === "buyer") {
        if (user.user.isDeleted === true) {
          navigate("/deleteduser");
        } else if (user.user.isBlocked === true) {
          navigate("/blockeduser");
        } else {
          navigate(location.state?.from || "/");
        }
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      }
    }

    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleChanges = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    // window.alert(`Email : ${email}, Password : ${password}`);
    if (email === "" || password === "") {
      window.alert("Fill all the fields...");
    } else {
      const userData = {
        email,
        password,
      };
      dispatch(login(userData));
    }
  };
  return (
    <>
      <div className="loginform">
        <h1
          style={{
            textAlign: "center",
            marginTop: "70px",
            marginBottom: "50px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "20px",
            fontFamily: "sans-serif",
            borderBottom: "1px solid #000000",
            width: "fit-content",
            color: "#000000",
            backgroundColor: "#f0f3ed",
            cursor: "default",
          }}
        >
          Login
        </h1>
        <FormGroup
          style={{
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            paddingTop: "110px",
            paddingBottom: "110px",
            paddingLeft: "60px",
            paddingRight: "60px",
            border: "1px solid #1d21338F",
            boxShadow: "3px 3px 20px -1px #0C2D488F",
            borderRadius: "30px",
            backgroundColor: "#f0f3ed",
          }}
        >
          {/* Change color of border of the box */}
          <FormControl>
            <InputLabel> Enter Email :</InputLabel>
            <Input
              name="email"
              value={email}
              id="email"
              onChange={handleChanges}
              required
            />
          </FormControl>
          <br />
          <FormControl>
            <InputLabel> Enter Password :</InputLabel>
            <Input
              type="password"
              name="password"
              value={password}
              id="password"
              onChange={handleChanges}
              required
            />
          </FormControl>
          <br />
          <Button
            variant="contained"
            style={{
              backgroundColor: "#2a3035",
              color: "White",
              fontWeight: "bold",
              fontSize: "15px",
              marginTop: "20px",
            }}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </FormGroup>
      </div>
    </>
  );
}

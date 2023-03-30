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
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { GridLoader } from "react-spinners";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
    }
    if (isSuccess || user) {
      // console.log("User : ", user.role);
      if(user.role === "buyer"){
        navigate("/");
      } else if (user.role === "admin"){
        navigate("/admin/dashboard");  
      }
    }

    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  if(isLoading) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left : "48%",
          transform: "translate(0, -50%)",
          padding: "10px",
        }}
      >
        <GridLoader color="#437b9f" speedMultiplier="0.75"/>
      </div>
    );
  };

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
            cursor : "default"
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
            border: "1px solid #1d2133",
            boxShadow: "10px 10px 50px 1px rgba(50, 100, 100, 0.6)",
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
            style={{ backgroundColor: "#1d2133", color: "White", fontWeight : "bold", fontSize : "15px" }}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </FormGroup>
      </div>
    </>
  );
}

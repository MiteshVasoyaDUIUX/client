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
        navigate("/adminpanel");
      }
    }

    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  if(isLoading) {
    // return <Spinner/>;
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
            marginLeft: "auto",
            marginRight: "auto",
            padding: "20px",
            fontFamily: "sans-serif",
            borderBottom: "1px solid #457b9d",
            width: "fit-content",
            color: "#457b9d",
            backgroundColor: "white",
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
            border: "1px solid #457b9d",
            boxShadow: "10px 10px 25px 1px rgba(69, 123, 157, 0.6)",
            borderRadius: "30px",
            backgroundColor: "white",
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
            style={{ backgroundColor: "#457b9d", color: "White" }}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </FormGroup>
      </div>
    </>
  );
}

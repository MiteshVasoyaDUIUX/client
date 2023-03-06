/* eslint-disable no-unused-vars */
import React from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, register } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mono: "",
    password: "",
    password2: "",
    role: "",
  });

  //Default Role...
  const role = "buyer";

  const { name, email, password, phoneNumber, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      // toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
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
    e.preventDefault();

    if (password !== password2) {
      window.alert("Password doesn't match...");
    } else {
      const userData = {
        name,
        email,
        password,
        phoneNumber,
        role,
      };
      console.log("In register Page...");
      dispatch(register(userData));
    }
  };

  return (
    <>
      <div className="registerform">
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
          Register
        </h1>
        <form>
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
              boxShadow: "7px 7px 29px 1px rgba(69, 123, 157, 0.6) ",
              borderRadius: "30px",
              backgroundColor: "white",
            }}
          >
            {/* Change color of border of the box */}
            <FormControl>
              <InputLabel> Enter Name :</InputLabel>
              <Input
                value={name}
                onChange={handleChanges}
                name="name"
                required
              />
            </FormControl> 
            <br />
            <FormControl>
              <InputLabel> Enter Email :</InputLabel>
              <Input
                type="email"
                value={email}
                onChange={handleChanges}
                name="email"
                required
              />
            </FormControl>
            <br />
            <FormControl>
              <InputLabel> Enter Mobile No. :</InputLabel>
              <Input
                value={phoneNumber}
                onChange={handleChanges}
                name="phoneNumber"
                required
              />
            </FormControl>
            <br />
            <FormControl>
              <InputLabel> Enter Password :</InputLabel>
              <Input
                type="password"
                value={password}
                onChange={handleChanges}
                name="password"
                required
              />
            </FormControl>{" "}
            <br />
            <FormControl>
              <InputLabel> Re-Enter Password :</InputLabel>
              <Input
                type="password"
                value={password2}
                onChange={handleChanges}
                name="password2"
                required
              />
            </FormControl>{" "}
            <br />
            <Button
              variant="contained"
              style={{ backgroundColor: "#457b9d", color: "White" }}
              onClick={handleSubmit}
            >
              Register
            </Button>
          </FormGroup>
        </form>
      </div>
    </>
  );
}

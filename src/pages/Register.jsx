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
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, register } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

export default function Register() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    password2: "",
    street: "",
    city: "",
    state: "",
    pincode: null,
    role: "",
  });

  //Default Role...
  const role = "buyer";

  const {
    name,
    email,
    password,
    phoneNumber,
    password2,
    street,
    city,
    state,
    pincode,
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (message) {
      toast.error(message);
    }

    if (isSuccess || user) {
      // toast.success("Verification Email has been sent to you Email Address...")
      // navigate("/");
      navigate("/", { state: { from: location.pathname } });
      console.log("Location : ", location.pathname);
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
        address: {
          street,
          city,
          state,
          pincode,
        },
        role,
      };
      console.log("In register Page User Data : ", userData);
      dispatch(register(userData));
    }
  };

  return (
    <>
      <div className="registerform">
        <h1
          style={{
            textAlign: "center",
            marginTop: "40px",
            marginBottom: "50px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "20px",
            fontFamily: "sans-serif",
            borderBottom: "1px solid #000000",
            width: "fit-content",
            color: "#2a3035",
            backgroundColor: "#f0f3ed",
          }}
        >
          Register
        </h1>
        <form>
          <FormGroup
            style={{
              width: "40%",
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
              <InputLabel> Enter Name </InputLabel>
              <Input
                value={name}
                onChange={handleChanges}
                name="name"
                required
              />
            </FormControl>
            <br />
            <FormControl>
              <InputLabel> Enter Email </InputLabel>
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
              <InputLabel> Enter Mobile No. </InputLabel>
              <Input
                value={phoneNumber}
                onChange={handleChanges}
                name="phoneNumber"
                required
              />
            </FormControl>
            <br />
            <div style={{ display: "flex" }}>
              <FormControl
                style={{ width: "48%", marginLeft: "0px", marginRight: "auto" }}
              >
                <InputLabel> Enter Password </InputLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={handleChanges}
                  name="password"
                  required
                />
              </FormControl>
              <FormControl style={{ width: "48%", marginRight: "0px" }}>
                <InputLabel> Re-Enter Password </InputLabel>
                <Input
                  type="password"
                  value={password2}
                  onChange={handleChanges}
                  name="password2"
                  required
                />
              </FormControl>
            </div>
            <br />
            <FormControl>
              <InputLabel> Enter Address </InputLabel>
              <Input
                type="text"
                value={street}
                onChange={handleChanges}
                name="street"
                required
              />
            </FormControl>
            <br />
            <div style={{ display: "flex" }}>
              <FormControl
                style={{ width: "32%", marginLeft: "0px", marginRight: "auto" }}
              >
                <InputLabel> City </InputLabel>
                <Input
                  type="text"
                  value={city}
                  onChange={handleChanges}
                  name="city"
                  required
                />
              </FormControl>
              <FormControl
                style={{
                  width: "32%",
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
              >
                <InputLabel> State </InputLabel>
                <Input
                  type="text"
                  value={state}
                  onChange={handleChanges}
                  name="state"
                  required
                />
              </FormControl>
              <FormControl
                style={{ width: "32%", marginRight: "0px", marginLeft: "auto" }}
              >
                <InputLabel> Pin Code</InputLabel>
                <Input
                  type="text"
                  value={pincode}
                  onChange={handleChanges}
                  name="pincode"
                  required
                />
              </FormControl>
            </div>

            <Button
              variant="contained"
              style={{
                backgroundColor: "#2a3035",
                color: "#f0f3ed",
                fontWeight: "bold",
                fontSize: "15px",
                marginTop: "20px",
              }}
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

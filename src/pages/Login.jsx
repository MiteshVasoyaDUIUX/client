import React from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";

export default function Login() {
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
            backgroundColor : "white"
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
            backgroundColor : "white"
          }}
        >
          {/* Change color of border of the box */}
          <FormControl>
            <InputLabel> Enter Email :</InputLabel>
            <Input required/>
          </FormControl>
          <br />
          <FormControl>
            <InputLabel> Enter Password :</InputLabel>
            <Input required/>
          </FormControl>{" "}
          <br />
          <Button
            variant="contained"
            style={{ backgroundColor: "#457b9d", color: "White" }}
          >
            Login
          </Button>
        </FormGroup>
      </div>
    </>
  );
}

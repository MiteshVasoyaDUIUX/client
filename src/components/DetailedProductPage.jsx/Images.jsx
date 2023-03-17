import React from "react";
import { ErrorBoundary } from "../ErrorBoundary";
import "./Images.css";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

function ImageSlider({ prodImage }) {
  return (
    <Carousel className="carousel-class" indicators={false}>
      {prodImage.map((item) => (
        <Item item={item} key={item}/>
      ))}
    </Carousel>
  );
}

function Item({ item }) {
  return (
    <img
      src={item}
      alt="Images"
      className="carousel-image"
      style={{ boxShadow: "none" }}
    />
  );
}

function Images({ prodImage }) {

  if (prodImage !== undefined) {
    return <ImageSlider prodImage={prodImage} />;
  }
}

export default Images;

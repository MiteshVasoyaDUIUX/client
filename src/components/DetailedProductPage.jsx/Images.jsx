import React from "react";
import { ErrorBoundary } from "../ErrorBoundary";
import "./Images.css";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

function ImageSlider({ prodImage }) {
  return (
    <Carousel className="carousel-class" indicators={false}>
      {prodImage.map((item) => (
        <Item item={item} key={item} />
      ))}
    </Carousel>
  );
}

function OneImage({ prodImage }) {
  const item = prodImage[0];
  return (
    <Carousel
      className="carousel-one-image-class"
      indicators={false}
      NextIcon={false}
      PrevIcon={false}
      navButtonsAlwaysInvisible={true}
    >
      <img
      src={item}
      alt="Images"
      className="carousel-one-image"
      style={{ boxShadow: "none" }}
    />
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

export default function Images({ prodImage }) {
  if (prodImage !== undefined) {
    return <ImageSlider prodImage={prodImage} />;
  }
}

export const Image = ({ prodImage }) => {
  if (prodImage !== undefined) {
    return <OneImage prodImage={prodImage} />;
  }
};

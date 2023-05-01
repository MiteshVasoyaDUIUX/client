import React from "react";
import "./Images.css";
import Carousel from "react-material-ui-carousel";

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

export const ImageForCard = ({ prodImage }) => {
  if (prodImage !== undefined) {
    return (
      <>
        <Carousel
          className="carousel-one-image-for-card-class"
          indicators={false}
          NextIcon={false}
          PrevIcon={false}
          navButtonsAlwaysInvisible={true}
        >
          <img
            src={prodImage[0]}
            alt="Images"
            className="carousel-image-for-card"
            style={{ boxShadow: "none" }}
          />
        </Carousel>
      </>
    );
  }
};

export const ImageForList = ({ prodImage }) => {
  if (prodImage !== undefined) {
    return (
      <>
        <Carousel
          className="carousel-one-image-for-list"
          indicators={false}
          NextIcon={false}
          PrevIcon={false}
          navButtonsAlwaysInvisible={true}
        >
          <img
            src={prodImage[0]}
            alt="Images"
            className="carousel-image-for-list"
            style={{ boxShadow: "none", zIndex: "0" }}
          />
        </Carousel>
      </>
    );
  }
};

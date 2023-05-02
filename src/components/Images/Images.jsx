import React, { useState } from "react";
import "./Images.css";
import Carousel from "react-material-ui-carousel";

function Item({ item }) {
  return <img src={item} alt="Images" className="carousel-image" />;
}

function ImageSlider({ prodImage }) {
  const [activeThumb, setActiveThumb] = useState(1);

  let newImageData = [];

  const imgThumb = "img-thumb";
  const activeImgThumb = imgThumb + " active-img-thumb";

  const onImgChanges = (id) => {
    setActiveThumb(id);
  };

  for (let index = 0; index < prodImage.length; index++) {
    const element = prodImage[index];

    newImageData.push({
      id: index,
      imgURL: element,
    });
  }

  return (
    <>
      <Carousel
        className="carousel-class"
        indicators="true"
        navButtonsProps={{
          style: {
            backgroundColor: "black",
            borderRadius: "50%",
            opacity: "0.4",
          },
        }}
        onChange={(id) => onImgChanges(id)}
        navButtonsAlwaysVisible
      >
        {newImageData.map((item) => (
          <>
            <Item item={item.imgURL} key={item.id} />
          </>
        ))}
      </Carousel>
      <div className="thumbnails-imgs">
        {newImageData.map((item) => (
          <>
            <img
              src={item.imgURL}
              alt={item.id}
              className={activeThumb === item.id ? activeImgThumb : imgThumb}
            />
          </>
        ))}
      </div>
    </>
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

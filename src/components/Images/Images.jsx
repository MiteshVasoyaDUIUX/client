import React from "react";
import "./Images.css";
import Carousel from "react-material-ui-carousel";

function Item({ item }) {
  return <img src={item} alt="Images" className="carousel-image" />;
}

function ImageSlider({ prodImage }) {
  let newImageData = [];

  for (let index = 0; index < prodImage.length; index++) {
    const element = prodImage[index];
    newImageData.push(<img src={element} alt="" height="90px" width="100px" />);
  }

  let activeThumb = 0;

  const handleImgChange = (id) => {
    console.log("ID : ", id);
    activeThumb = id;
  };

  return (
    <>
      <div className="carousel-class">
        <Carousel
          sx={{}}
          height="700px"
          indicators
          onChange={(id) => {
            handleImgChange(id);
          }}
          navButtonsProps={{
            style: {
              backgroundColor: "black",
              borderRadius: "50%",
              opacity: "0.9",
            },
          }}
          IndicatorIcon={newImageData}
          indicatorIconButtonProps={{
            className:
              activeThumb === newImageData.id
                ? console.log("asaasasa")
                : "indicator-icon-button",
            style: {
              border: "1px solid rgba(26, 26, 26, 0.6)",
              borderRadius: "5px",
              padding: "5px",
              objectFit: "cover",
            },
          }}
          indicatorContainerProps={{
            style: {
              marginTop: "20px",
              marginBottom: "20px",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-evenly",
            },
          }}
          navButtonsAlwaysVisible
        >
          {prodImage.map((item) => (
            <>
              <Item item={item} key={item} />
            </>
          ))}
        </Carousel>
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
import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ImageSlider() {
  const Array = [
    {
      url: "https://www.innermedia.co.uk/wp-content/uploads/2016/06/luxe.jpg",
      link: "/products/accessories",
    },
    {
      url: "https://wallpaperaccess.com/full/1448067.jpg",
      link: "/products/clothes",
    },
    {
      url: "https://media.istockphoto.com/id/689373484/photo/still-life-of-casual-man-modern-male-accessories-on-black.jpg?b=1&s=170667a&w=0&k=20&c=Wqrt6XlYrTyD9YjHKqBaWbFIhlEeJJrVOhwQbH4ggCs=",
      link: "/products/other",
    },
  ];
  return (
    <>
      <div className="image-slider" style={{ marginTop: "20px" }}>
        <Slider image={Array} />
      </div>
    </>
  );
}

function Slider(props) {
  const images = props;
  return (
    <>
      <div className="carousel-wrapper" style={{zIndex : "0"}}>
        <Carousel showThumbs={false} swipeable>
          <Link to={images.image[0].link}>
            <div>
              <img
                src={images.image[0].url}
                style={{ height: "500px", width: "100%", borderRadius: "15px" }}
                alt=""
              />
            </div>
          </Link>
          <Link to={images.image[1].link}>
            <div>
              <img
                src={images.image[1].url}
                style={{ height: "500px", width: "100%", borderRadius: "15px" }}
                alt=""
              />
            </div>
          </Link>
          <Link to={images.image[2].link}>
            <div>
              <img
                src={images.image[2].url}
                style={{ height: "500px", width: "100%", borderRadius: "15px" }}
                alt=""
              />
            </div>
          </Link>
        </Carousel>
      </div>
    </>
  );
}

export default ImageSlider;

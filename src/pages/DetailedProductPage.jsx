/* eslint-disable default-case */
/* eslint-disable no-lone-blocks */
import { IconButton, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Images from "../components/DetailedProductPage.jsx/Images";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { fetchOneProduct } from "../features/productsForClient/productsForClientSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavouriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import "./DetailedProductPage.css";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

function DetailedProductPage() {
  const dispatch = useDispatch();
  const [wishList, setWishList] = useState(false);
  const [addtoCart, setAddToCart] = useState(false);

  //Directly get Params from URLs...

  const { user } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.productsForClient);
  const { product } = useSelector((state) => state.productsForClient);
  const [quantity, setQuantity] = useState(1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    dispatch(fetchOneProduct("64104882a04e33e631c70b31"));
  }, []);

  const handleQunatityChange = (sign) => {
    switch (sign) {
      case "+":
        {
          quantity < 15
            ? setQuantity(quantity + 1)
            : window.alert("You can Select Max 15 Quantity...");
        }
        break;
      case "-":
        {
          quantity > 0 ? setQuantity(quantity - 1) : setQuantity(quantity);
        }
        break;
    }
  };
  return (
    <>
      <ErrorBoundary>
        <div className="details-page">
          <div className="detailed-page-image">
            <Images prodImage={product.prodImage} />
          </div>

          <div className="page-details">
            <div style={{ display: "flex" }}>
              <div className="detailed-page-title">{product.prodName}</div>
              <div className="detailed-page-wishlist-button">
                <IconButton>
                  {wishlist.includes(product._id) ? (
                    <FavouriteRoundedIcon color="error" size="large" />
                  ) : (
                    <FavoriteBorderIcon sx={{ fontSize: "40px" }} />
                  )}
                </IconButton>
              </div>
            </div>
            <div className="detailed-page-rating">
              <div style={{ marginRight: "10px", marginTop: "0px" }}>
                {product.rating !== undefined ? (
                  <Rating name="read-only" value={product.rating} readOnly />
                ) : (
                  ""
                )}
              </div>
              <div style={{ fontSize: "17px" }}>(333 Reviews)</div>
            </div>
            <div className="detailed-page-price">
              Price : {product.prodPrice} ₹
            </div>
            <div className="detailed-page-description">
              <h2>Description :</h2>
              <ul>
                <li style={{ margin: "5px" }}>{product.prodDesc}</li>
                <li style={{ margin: "5px" }}>{product.prodDesc}</li>
                <li style={{ margin: "5px" }}>{product.prodDesc}</li>
                <li style={{ margin: "5px" }}>{product.prodDesc}</li>
                <li style={{ margin: "5px" }}>{product.prodDesc}</li>
              </ul>
            </div>
            <br />
            <hr style={{width : "700px"}}/>
            <div className="detail-page-features">
              
            </div>
          </div>

          <div className="buying-details">
            <div className="detailed-page-quantity">
              <div style={{ width: "120px", marginTop: "4px" }}>Quantity :</div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div style={{ width: "150px" }}>
                <button
                  id="quantity-decrease"
                  onClick={() => handleQunatityChange("-")}
                >
                  ‒
                </button>
                <input
                  type="text"
                  name="quantity"
                  id="quantity-text-field"
                  value={quantity}
                  max="10"
                  readOnly
                />
                <button
                  id="quantity-increase"
                  onClick={() => handleQunatityChange("+")}
                >
                  +
                </button>
              </div>
            </div>
            <div style={{ marginTop: "100px" }}>
              <button id="add-to-cart-button">Add To Cart</button>
              <button id="buy-now-button">Buy Now</button>
            </div>

            <div className="detailed-page-share-icons">
              <div className="share-title">Share With : </div>
              <div className="share-icons">
                <IconButton>
                  <WhatsAppIcon style={{ fontSize: "40px" }} />
                </IconButton>
                <IconButton>
                  <FacebookIcon style={{ fontSize: "40px" }} />
                </IconButton>
                <IconButton>
                  <TwitterIcon style={{ fontSize: "40px" }} />
                </IconButton>
                <IconButton>
                  <InstagramIcon style={{ fontSize: "40px" }} />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}

export default DetailedProductPage;

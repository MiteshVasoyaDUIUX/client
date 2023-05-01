import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Wishlist.css";

import { Card, Grid, Rating, Typography } from "@mui/material";
import { fetchWishListProducts, removeFromWishlist } from "../../features/user/userSlice";

function ProductCard({ item, userId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveButton = (id) => {
    // console.log("Remove Button is Clicked...", id);

    const data = {
      userId,
      productId: id,
    };
    dispatch(removeFromWishlist(data));
    // console.log("User id : ", userId);
  };

  const handleCardClick = () => {
    navigate(`/product/${item._id}`);
  };

  return (
    <Grid
      item
      xl={10}
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        width: "50%",
        marginTop: "0.8%",
      }}
    >
      <Card style={{ height: "144px" }}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "auto",
              height: "auto",
              borderRight: "1px solid rgb(100, 100, 100, 0.2)",
              padding: "20px",
            }}
          >
            <img
              src={item.prodImage[0]}
              className="card-image-content"
              alt=""
              style={{ width: "100px", height: "100px" }}
            />
          </div>
          <div
            style={{
              width: "73%",
              padding: "15px",
              cursor: "pointer",
            }}
            onClick={handleCardClick}
          >
            <div className="wishlist-card-title">{item.prodName}</div>
            <div style={{ display: "flex" }}>
              <div className="wishlist-card-price">
                Price : {item.prodPrice.toLocaleString("en-IN")} ₹
              </div>
              <div className="wishlist-card-rating">
                <Rating
                  name="read-only"
                  value={item.rating}
                  precision={0.5}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="wishlist-card-remove-btn">
            <input
              type="button"
              value="Remove"
              onClick={() => {
                handleRemoveButton(item._id);
              }}
            />
          </div>
        </div>
      </Card>
    </Grid>
  );
}

function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { wishlistProducts, isAddedCart, isError, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    if (user) {
      const userId = user.user._id;
      dispatch(fetchWishListProducts(userId));
    }
  }, []);

  // console.log("Wishlist : ", wishlistProducts);
  return (
    <>
      {wishlistProducts.length > 0 ? (
        <>
          <div
            style={{
              margin: "2% auto 0 auto",
              width: "fit-content",
              fontSize: "30px",
              fontFamily: "sans-serif",
              textDecoration: "underline",
            }}
          >
            Wishlist
          </div>
          <div>
            {wishlistProducts.map((wishlist) => {
              return <ProductCard item={wishlist} userId={user?.user._id} />;
            })}
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              width: "fit-content",
              margin: "4% auto 0 auto",
              fontSize: "35px",
              fontFamily : "sans-serif",
              textDecoration : "underline"
            }}
          >
            Wishlist Is Empty
          </div>
        </>
      )}
    </>
  );
}

export default Wishlist;

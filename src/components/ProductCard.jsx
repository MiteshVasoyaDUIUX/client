import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavouriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { IconButton } from "@mui/material";
import { ImageForCard } from "./Images/Images";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import {
  addToCart,
  addToWishList,
  fetchWishList,
  reset,
} from "../features/user/userSlice";

export default function ProductCard({ product }) {
  // console.log("ProductCard");

  const [wishList, setWishList] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { wishlist, isError, message } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (user) {
      const userId = user.user?._id;
      dispatch(fetchWishList(userId));
    }

    return () => {
      reset();
    };
  }, [dispatch, isError]);

  const handleCartButton = (e) => {
    e.stopPropagation();
    if (user) {
      const productId = product?._id;
      const userData = user;
      const userId = userData.user?._id;
      const data = {
        userId,
        productId,
      };
      // console.log("Data : ", data);
      dispatch(addToCart(data));
    } else {
      toast.error("Not Logged In");
    }
  };

  const handleCardClick = () => {
    // console.log(product._id);
    navigate(`/product/${product._id}`);
  };

  const handleWishListButton = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (user) {
      setWishList(!wishList);
      const productId = product?._id;
      const userData = user;
      const userId = userData.user?._id;
      const data = {
        userId,
        productId,
      };
      // console.log("Data : ", data);
      dispatch(addToWishList(data));
    } else {
      toast.error("Not Logged In");
    }
  };

  return (
    <>
      <Card
        sx={{
          width: 390,
          height: 650,
          paddingBottom: "10px",
          textAlign: "center",
          marginBottom: "30px",
          marginRight: "30px",
          border: "0.5px solid white",
          boxShadow: "none",
          borderRadius: "15px",
          cursor: "pointer",
        }}
        key={product?._id}
        className="product-card"
        onClick={handleCardClick}
      >
        <div className="detailed-page-image">
          <ImageForCard prodImage={product?.prodImage} />
        </div>
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            style={{
              textAlign: "left",
              overflow: "hidden",
              whiteSpace: "wrap",
              textOverflow: "ellipsis",
              height: "60px",
              marginBottom: "10px",
            }}
          >
            {product?.prodName}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="justify"
            className="products-card-desc"
          >
            {product?.prodDesc}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="justify"
            style={{ fontSize: "17px", marginTop: "13px" }}
          >
            Price : {product?.prodPrice?.toLocaleString("en-IN")} ₹
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={handleCartButton}>
            {!addToCart ? (
              <AddShoppingCartIcon color="primary" />
            ) : (
              <AddShoppingCartIcon />
            )}
          </IconButton>
          <IconButton onClick={handleWishListButton}>
            {user && wishlist.includes(product?._id) ? (
              <FavouriteRoundedIcon color="error" />
            ) : (
              <FavoriteBorderIcon color="error" />
            )}
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}

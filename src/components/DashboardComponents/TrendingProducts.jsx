import React, { useEffect, useState } from "react";
import "./TrendingProducts.css";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToWishList,
  fetchProducts,
  fetchWishList,
  reset,
} from "../../features/productsForClient/productsForClientSlice";
import { GridLoader } from "react-spinners";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavouriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { ErrorBoundary } from "../ErrorBoundary";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ImageForCard } from "../DetailedProductPage.jsx/Images";
import ProductCard from "../ProductCard";

function ProductCards({ trendingProducts }) {
  return (
    <>
      {trendingProducts.map((product) => (
        <Grid>
          <ProductCard product={product} />
        </Grid>
      ))}
    </>
  );
}

function TrendingProducts() {
  const dispatch = useDispatch();
  const { products, isFetching, isError, message } = useSelector(
    (state) => state.productsForClient
  );

  let trendingProducts = [{}];

  for (let index = 0; index < 4; index++) {
    const randomProductIndex = Math.floor(Math.random() * products.length);
    trendingProducts[index] = products[randomProductIndex];
  }

  // console.log(trendingProducts);

  useEffect(() => {
    if (isError) {
      // toast.error(message);
    }

    if (products) {
      dispatch(fetchProducts());
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, dispatch]);

  if (isFetching) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "48%",
          transform: "translate(0, -50%)",
          padding: "10px",
        }}
      >
        <GridLoader color="#437b9f" speedMultiplier="0.75" />
      </div>
    );
  }

  return (
    <>
      <div>
        <h1 id="trending-product-title">Trending Products</h1>
      </div>
      <div
        className="productCards"
        style={{ width: "90%", marginLeft: "6%", marginTop: "40px" }}
      >
        <ErrorBoundary>
          <Grid container spacing={0}>
            <Grid container item spacing={0}>
              <ProductCards trendingProducts={trendingProducts} />
            </Grid>
          </Grid>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default TrendingProducts;

import React, { useEffect, useState } from "react";
import "./NewArrivals.css";
import { Grid } from "@mui/material";
import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavouriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { IconButton } from "@mui/material";
import {
  fetchProducts,
  addToCart,
  fetchWishList,
  reset,
  addToWishList,
} from "../../features/productsForClient/productsForClientSlice";
import { useDispatch, useSelector } from "react-redux";
import { ErrorBoundary } from "../ErrorBoundary";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ImageForCard } from "../DetailedProductPage.jsx/Images";
import { height } from "@mui/system";
import ProductCard from "../ProductCard";
import Spinner from "../Spinner";

function ProductCards({ NewArrivals }) {
  return (
    <>
      {NewArrivals.map((product) => (
        <Grid item spacing={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </>
  );
}

function NewArrivals() {
  const dispatch = useDispatch();

  const { products, isFetching, isError, message, isAddedCart } = useSelector(
    (state) => state.productsForClient
  );

  useEffect(() => {
    dispatch(fetchProducts());

    if (isError) {
      console.log("Error : ", message);
    }

    if (isAddedCart) {
      toast.success(message);
    }
    return () => {
      dispatch(reset());
    };
  }, [isError, isAddedCart, dispatch]);

  if (isFetching) {
    return <Spinner />;
  }

  // console.log("productsForClient : ", products);
  let NewArrivals = [{}];
  let indexNewArrivals = 0;
  for (let index = products.length - 1; index >= products.length - 4; index--) {
    NewArrivals[indexNewArrivals] = products[index];
    indexNewArrivals++;
  }

  // console.log("New Arrivals : ", NewArrivals);

  return (
    <>
      <div>
        <h1 id="new-arrivals-title">New Arrivals</h1>
      </div>
      <div
        className="productCards"
        style={{ width: "90%", marginLeft: "6%", marginTop: "35px" }}
      >
        <ErrorBoundary>
          <Grid container spacing={0}>
            <Grid container item spacing={0}>
              <ProductCards NewArrivals={NewArrivals} />
            </Grid>
          </Grid>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default NewArrivals;

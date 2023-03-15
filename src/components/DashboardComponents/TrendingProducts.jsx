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
  fetchProduct,
  reset,
} from "../../features/productsForClient/productsForClientSlice";
import { GridLoader } from "react-spinners";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavouriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { ErrorBoundary } from "../ErrorBoundary";

function ProductCard({ trendingProduct }) {
  const [wishlist, setWishlist] = useState(false);
  const [addToCart, setAddToCart] = useState(false);
  // console.log("ProductsCard : ", NewArrival);
  return (
    <>
      <Card
        sx={{
          maxWidth: 390,
          textAlign: "center",
          marginBottom: "30px",
          marginRight: "30px",
          border: "0.5px solid white",
          boxShadow: "none",
          borderRadius: "15px",
        }}
        // key={NewArrival._id}
        className="product-card"
      >
        <CardMedia
          component="img"
          alt="green iguana"
          image={trendingProduct.prodImage[0]}
          sx={{
            height: "fitContent",
            width: "fitContent",
            minHeight: "300px",
            maxHeight: "600px",
          }}
        />
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
              marginBottom: "8px",
            }}
          >
            {trendingProduct.prodName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={() => setAddToCart(!addToCart)}>
            {addToCart ? (
              <AddShoppingCartIcon color="primary" />
            ) : (
              <AddShoppingCartIcon />
            )}
          </IconButton>
          <IconButton onClick={() => setWishlist(!wishlist)}>
            {wishlist ? (
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

function ProductCards({ trendingProducts }) {
  return (
    <>
      {trendingProducts.map((trendingProduct) => (
        <Grid>
          <ProductCard trendingProduct={trendingProduct} />
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
      dispatch(fetchProduct());
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
        <h1 id="trending-product-title">Tranding Products</h1>
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

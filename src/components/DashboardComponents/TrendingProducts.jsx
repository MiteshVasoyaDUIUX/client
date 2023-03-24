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

function ProductCard({ trendingProduct }) {
  const [wishList, setWishList] = useState(false);
  // console.log("ProductsCard : ", NewArrival);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { wishlist, isAddedCart, isError, message } = useSelector(
    (state) => state.productsForClient
  );

  // console.log("UserId From Store : ", user.user._id);
  // console.log("WishList From Store : ", wishlist);

  useEffect(() => {
    if (user) {
      const userId = user.user._id;
      dispatch(fetchWishList(userId));
    }

    if (isAddedCart) {
      toast.success("Added to cart...");
    }

    // if (isError && message) {
    //   toast.error("Error : " + message);
    // }

    return () => {
      reset();
    };
  }, [dispatch, isAddedCart, isError, message]);

  const handleCartButton = (event) => {
    event.stopPropagation();
    if (user) {
      const productId = trendingProduct._id;
      const userData = user;
      const userId = userData.user._id;
      const data = {
        userId,
        productId,
      };
      console.log("Data : ", data);
      dispatch(addToCart(data));
    } else {
      toast.error("Not Logged In");
    }
  };

  const handleWishListButton = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (user) {
      setWishList(!wishList);
      const productId = trendingProduct._id;
      const userData = user;
      const userId = userData.user._id;
      const data = {
        userId,
        productId,
      };
      console.log("Data : ", data);
      dispatch(addToWishList(data));
    } else {
      toast.error("Not Logged In");
    }
  };

  const handleCardClick = () => {
    console.log(trendingProduct._id);
    navigate(`/product/${trendingProduct._id}`);
  };

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
          cursor: "pointer",
        }}
        // key={NewArrival._id}
        className="product-card"
        onClick={handleCardClick}
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
          <Typography
            variant="body2"
            color="text.secondary"
            align="justify"
            style={{ marginTop: "10px" }}
          >
            {trendingProduct.prodDesc}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="justify"
            style={{ fontSize: "17px", marginTop: "10px" }}
          >
            Price : {trendingProduct.prodPrice}
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
            {wishlist.includes(trendingProduct._id) ? (
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

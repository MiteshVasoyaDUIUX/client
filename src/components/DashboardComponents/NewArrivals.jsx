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
import { GridLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ImageForCard } from "../DetailedProductPage.jsx/Images";
import { height } from "@mui/system";

function ProductCard({ NewArrival }) {
  const [wishList, setWishList] = useState(false);
  const [addtoCart, setAddToCart] = useState(false);

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

    if (isError && message) {
      toast.error("Error : " + message);
    }

    reset();
  }, [dispatch, isAddedCart, isError, message]);

  const handleCartButton = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (user) {
      const productId = NewArrival._id;
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
      const productId = NewArrival._id;
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
    console.log("New Arrivals : ", NewArrival._id);
    navigate(`/product/${NewArrival._id}`);
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
        className="product-card"
        onClick={handleCardClick}
      >
        <div className="detailed-page-image">
          <ImageForCard prodImage={NewArrival.prodImage} />
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
              marginBottom: "8px",
            }}
          >
            {NewArrival.prodName}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="justify"
            style={{ marginTop: "10px" }}
          >
            {NewArrival.prodDesc}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="justify"
            style={{ fontSize: "17px", marginTop: "10px" }}
          >
            Price : {NewArrival.prodPrice}
          </Typography>
        </CardContent>

        <div
          style={{
            marginLeft : "20px",
            width : "fit-content",
            height : 'fit-content'
          }}
        >
          <IconButton onClick={handleCartButton}>
            {addtoCart ? (
              <AddShoppingCartIcon color="primary" />
            ) : (
              <AddShoppingCartIcon />
            )}
          </IconButton>
          <IconButton onClick={handleWishListButton}>
            {wishlist.includes(NewArrival._id) ? (
              <FavouriteRoundedIcon color="error" />
            ) : (
              <FavoriteBorderIcon color="error" />
            )}
          </IconButton>
        </div>
      </Card>
    </>
  );
}

function ProductCards({ NewArrivals }) {
  return (
    <>
      {NewArrivals.map((NewArrival) => (
        <Grid item spacing={3}>
          <ProductCard NewArrival={NewArrival} />
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

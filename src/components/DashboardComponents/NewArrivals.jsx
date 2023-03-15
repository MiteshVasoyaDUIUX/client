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
  fetchProduct,
  addToCart,
  reset,
} from "../../features/productsForClient/productsForClientSlice";
import { useDispatch, useSelector } from "react-redux";
import { ErrorBoundary } from "../ErrorBoundary";
import { GridLoader } from "react-spinners";
import {toast} from "react-toastify";

function ProductCard({ NewArrival }) {
  const [wishlist, setWishlist] = useState(false);
  const [addtoCart, setAddToCart] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleCartButton = () => {
    if (user) {
      setAddToCart(!addtoCart);
      const productId = NewArrival._id;
      const userId = user.userId;
      const data = {
        userId, 
        productId
      }
      console.log("Data : ", user);
      // dispatch(addToCart(data));
    } else {
      toast.error("Not Logged In");
    }
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
        }}
        className="product-card"
      >
        <CardMedia
          component="img"
          alt="green iguana"
          image={NewArrival.prodImage[0]}
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
            {NewArrival.prodName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={handleCartButton}>
            {addtoCart ? (
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

  const { products, isFetching, isError, message } = useSelector(
    (state) => state.productsForClient
  );

  useEffect(() => {
    dispatch(fetchProduct());
    if (isError) {
      console.log("Error : ", message);
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

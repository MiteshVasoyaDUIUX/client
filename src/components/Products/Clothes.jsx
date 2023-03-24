import React, { useEffect, useState } from "react";
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
import "../Products/Clothes.css";
import {
  addToWishList,
  fetchProducts,
  fetchWishList,
  addToCart,
  reset,
} from "../../features/productsForClient/productsForClientSlice";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../Filter";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const [wishList, setWishList] = useState(false);
  // console.log("Products : ", product.prodImage);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { wishlist, isAddedCart, isError, message } = useSelector(
    (state) => state.productsForClient
  );
  useEffect(() => {
    if (user) {
      const userId = user.user._id;
      dispatch(fetchWishList(userId));
    }

    // if (isAddedCart) {
    //   console.log("Added To Cart...");
    //   toast.success("Added to cart...");
    // }

    // if (isError && message) {
    //   toast.error("Error : " + message);
    // }

    return () => {
      reset();
    };
  }, [dispatch, isError]);

  const handleCartButton = (e) => {
    e.stopPropagation();
    if (user) {
      const productId = product._id;
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

  const handleCardClick = () => {
    console.log(product._id);
    navigate(`/product/${product._id}`);
  };

  const handleWishListButton = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (user) {
      setWishList(!wishList);
      const productId = product._id;
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

  return (
    <>
      <Card
        sx={{
          maxWidth: 400,
          textAlign: "center",
          marginBottom: "30px",
          marginRight: "30px",
          border: "0.5px solid white",
          boxShadow: "none",
          borderRadius: "15px",
          cursor: "pointer",
        }}
        key={product._id}
        className="product-card"
        onClick={handleCardClick}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          image={product.prodImage[0]}
          sx={{
            height: "fitContent",
            width: "fitContent",
            minHeight: "300px",
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
            {product.prodName}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="justify"
            style={{ marginTop: "10px" }}
          >
            {product.prodDesc}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="justify"
            style={{ fontSize: "17px", marginTop: "10px" }}
          >
            Price : {product.prodPrice}
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
            {wishlist.includes(product._id) ? (
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

function ProductCards({ newProdArray }) {
  return (
    <>
      {newProdArray.map((product) => (
        <Grid>
          <ProductCard product={product} />
        </Grid>
      ))}
    </>
  );
}

function ClothesItem({ newProdArray }) {
  return (
    <>
      <div>
        <h1 id="menswear-title">Menswear</h1>
      </div>
      <div
        className="productCards"
        style={{ width: "90%", marginLeft: "6.8%", marginTop: "40px" }}
      >
        <Grid container spacing={0}>
          <Grid container item spacing={0}>
            <ProductCards newProdArray={newProdArray} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

function Clothes() {
  const dispatch = useDispatch();
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.productsForClient
  );

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

  const [priceSliderValue, setPriceSliderValue] = useState([100, 5000]);
  const [ratingValue, setRatingValue] = useState();
  const [PODEligibility, setPODEligibility] = useState(false);
  const [discount, setDiscount] = useState();
  const [includeOutOfStock, setIncludeOutOfStock] = useState(false);

  let newProdArray = [];
  if (products.length > 0) {
    products.map((product) => {
      let category = product.prodCategory;
      if (
        category.includes("clothes") ||
        category.includes("Clothes") ||
        category.includes("cloth") ||
        category.includes("Cloth")
      ) {
        newProdArray.push(product);
        // console.log("category : ", category);
      }
    });
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <Filter
          priceSliderValue={priceSliderValue}
          setPriceSliderValue={setPriceSliderValue}
          ratingValue={ratingValue}
          setRatingValue={setRatingValue}
          PODEligibility={PODEligibility}
          setPODEligibility={setPODEligibility}
          discount={discount}
          setDiscount={setDiscount}
          includeOutOfStock={includeOutOfStock}
          setIncludeOutOfStock={setIncludeOutOfStock}
        />
        <div style={{ marginLeft: "100px", width: "fitContent" }}>
          <ClothesItem newProdArray={newProdArray} />
        </div>
      </div>
    </>
  );
}

export default Clothes;

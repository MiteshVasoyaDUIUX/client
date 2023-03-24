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
import "./Accessories.css";
import Filter from "../Filter";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  fetchProducts,
  fetchWishList,
  addToCart,
  reset,
} from "../../features/productsForClient/productsForClientSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ImageForCard } from "../DetailedProductPage.jsx/Images";

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

    if (isError && message) {
      toast.error("Error : " + message);
    }
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
        key={product._id}
        className="product-card"
        onClick={handleCardClick}
      >
        <div className="detailed-page-image">
          <ImageForCard prodImage={product.prodImage} />
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

function AccessoriesItems({ newProdArray }) {
  return (
    <>
      <div>
        <h1 id="accessories-title">Accessories</h1>
      </div>
      <div
        className="productCards"
        style={{ width: "90%", marginLeft: "10px", marginTop: "40px" }}
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

function Accessories() {
  const dispatch = useDispatch();
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.productsForClient
  );

  useEffect(() => {
    dispatch(fetchProducts());
    if (isError) {
      // toast.error(message);
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
        category.includes("Accessories") ||
        category.includes("accessories")
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
          <AccessoriesItems newProdArray={newProdArray} />
        </div>
      </div>
    </>
  );
}
export default Accessories;

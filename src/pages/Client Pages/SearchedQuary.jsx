import React, { useEffect, useState } from "react";
import "./SearchedQuary.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToWishList,
  fetchWishList,
  reset,
  searchProduct,
} from "../../features/productsForClient/productsForClientSlice";
import { toast } from "react-toastify";
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { ImageForCard } from "../../components/DetailedProductPage.jsx/Images";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavouriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import Filter from "../../components/Filter";

function ProductCard({ product }) {
  console.log("ProductCard");

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
      const productId = product._id;
      const userData = user;
      const userId = userData.user._id;
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
            Price : {product.prodPrice} ₹
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
  console.log("ProductCards : ", newProdArray);
  return (
    <>
      <Grid container spacing={3}>
        {newProdArray.map((product) => {
          return (
            <Grid item xs={4}>
              <ProductCard product={product} />
              {console.log("ProductCards")}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

function SearchedItems({ newProdArray }) {
  console.log("SearchedItems");
  return (
    <>
      <div>
        <h1 id="searched-results">Results</h1>
      </div>
      <div
        className="productCards"
        style={{ width: "90%", marginLeft: "10px", marginTop: "40px" }}
      >
        <ProductCards newProdArray={newProdArray} />
      </div>
    </>
  );
}

const filterByRating = (ratingValue, prodArray) => {
  let filteredArray = [];
  prodArray.map((product) => {
    if (product.rating >= ratingValue) {
      filteredArray.push(product);
    }
  });
  return filteredArray;
};

const filterByPrice = (lower, upper, prodArray) => {
  let filteredArray = [];
  prodArray.map((product) => {
    if (product.prodPrice > lower && product.prodPrice < upper) {
      filteredArray.push(product);
    }
  });
  return filteredArray;
};

const filterByPODEligibility = (prodArray) => {
  let filteredArray = [];
  prodArray.map((product) => {
    let deliveryType = product.deliveryType;
    if (deliveryType.includes("COD")) {
      filteredArray.push(product);
    }
  });
  return filteredArray;
};

const filterByDiscount = (discount, prodArray) => {
  let filteredArray = [];
  prodArray.map((product) => {
    if (product.discount > discount) {
      filteredArray.push(product);
    }
  });
  return filteredArray;
};

function SearchedQuary() {
  const params = useParams();
  const dispatch = useDispatch();

  const { searchedProducts, isLoading, isError, message } = useSelector(
    (state) => state.productsForClient
  );

  const quary = params.params;

  useEffect(() => {
    dispatch(searchProduct(quary));
  }, [quary]);

  const [priceSliderValue, setPriceSliderValue] = useState([100, 50000]);
  const [ratingValue, setRatingValue] = useState();
  const [PODEligibility, setPODEligibility] = useState(false);
  const [discount, setDiscount] = useState();
  const [includeOutOfStock, setIncludeOutOfStock] = useState(false);
  let searchProd = [];
  let newProdArray = [];

  console.log("searchedProducts : ", searchedProducts);

  if (searchedProducts.length > 0) {
    searchedProducts.map((product) => {
      let category = product.prodCategory;

      if (includeOutOfStock) {
        searchProd.push(product);
      } else {
        if (product.prodQuantity > 0) {
          searchProd.push(product);
        }
      }
    });

    if (ratingValue) {
      newProdArray = filterByRating(ratingValue, searchProd);
    } else {
      newProdArray = searchProd;
    }

    if (priceSliderValue) {
      newProdArray = filterByPrice(
        priceSliderValue[0],
        priceSliderValue[1],
        newProdArray
      );
    }

    if (PODEligibility) {
      newProdArray = filterByPODEligibility(newProdArray);
    }

    if (discount) {
      newProdArray = filterByDiscount(discount, newProdArray);
    }
  }

  return (
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
        <SearchedItems newProdArray={newProdArray} />
      {
        console.log("New Prod Array : ", newProdArray)
      }
      </div>
    </div>
  );
}

export default SearchedQuary;

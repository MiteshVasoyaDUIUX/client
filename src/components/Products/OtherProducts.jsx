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
import "./OtherProducts.css";
import Filter from "../Filter";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToWishList,
  fetchProducts,
  fetchWishList,
  reset,
} from "../../features/productsForClient/productsForClientSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ImageForCard } from "../DetailedProductPage.jsx/Images";
import ProductCard from "../ProductCard";
import { ProductCardsGrid } from "../ProductCardGrid";

function OtherProductsItem({ newProdArray, wishlist }) {
  return (
    <>
      <div>
        <h1 id="other-products-title">Products</h1>
      </div>
      <div
        className="productCards"
        style={{ width: "90%", marginLeft: "10px", marginTop: "40px" }}
      >
        {/* {console.log("Wishlist  :", wishlist)} */}
        <ProductCardsGrid products={newProdArray} wishlist={wishlist} />
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

function OtherProducts() {
  const [priceSliderValue, setPriceSliderValue] = useState([100, 200000]);
  const [ratingValue, setRatingValue] = useState();
  const [PODEligibility, setPODEligibility] = useState(false);
  const [discount, setDiscount] = useState();
  const [includeOutOfStock, setIncludeOutOfStock] = useState(false);
  let otherProducts = [];
  let newProdArray = [];

  const dispatch = useDispatch();
  const { products, wishlist, isLoading, isError, message } = useSelector(
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

  if (products.length > 0) {
    products.map((product) => {
      let category = product.prodCategory;

      if (includeOutOfStock) {
        if (
          category.includes("Phone") ||
          category.includes("phones") ||
          category.includes("Other") ||
          category.includes("accessories") ||
          category.includes("Accessories")
        ) {
          otherProducts.push(product);
        }
      } else {
        if (
          (category.includes("Phone") ||
            category.includes("phones") ||
            category.includes("Other") ||
            category.includes("accessories") ||
            category.includes("Accessories")) &&
          product.prodQuantity > 0
        ) {
          otherProducts.push(product);
        }
      }
    });

    if (ratingValue) {
      newProdArray = filterByRating(ratingValue, otherProducts);
      // console.log("Rating Value");
    } else {
      newProdArray = otherProducts;
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
          <OtherProductsItem newProdArray={newProdArray} wishlist={wishlist} />
        </div>
      </div>
    </>
  );
}

export default OtherProducts;

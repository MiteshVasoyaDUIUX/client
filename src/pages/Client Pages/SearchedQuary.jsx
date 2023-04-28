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
import ProductCard from "../../components/ProductCard";
import { ProductCardsGrid } from "../../components/ProductCardGrid";

function SearchedItems({ newProdArray }) {
  // console.log("SearchedItems");
  return (
    <>
      <div>
        <h1 id="searched-results">Results</h1>
      </div>
      <div
        className="productCards"
        style={{ width: "90%", marginLeft: "10px", marginTop: "40px" }}
      >
        <ProductCardsGrid products={newProdArray} />
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

  const [priceSliderValue, setPriceSliderValue] = useState([100, 200000]);
  const [ratingValue, setRatingValue] = useState();
  const [PODEligibility, setPODEligibility] = useState(false);
  const [discount, setDiscount] = useState();
  const [includeOutOfStock, setIncludeOutOfStock] = useState(false);
  let searchProd = [];
  let newProdArray = [];

  // console.log("searchedProducts : ", searchedProducts);

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
        // console.log("New Prod Array : ", newProdArray)
      }
      </div>
    </div>
  );
}

export default SearchedQuary;

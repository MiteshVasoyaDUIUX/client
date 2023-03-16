import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import "../Products/Clothes.css";
import ProductCard from "../ProductCard";
import { fetchProduct, reset } from "../../features/productsForClient/productsForClientSlice";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../Filter";

function ProductCards({ products }) {
  return (
    <>
      {products.map((product) => (
        <Grid>
          <ProductCard product={product} />
        </Grid>
      ))}
    </>
  );
}

function ClothesItem({ products }) {
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
            <ProductCards products={products}/>
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
      dispatch(fetchProduct());
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
          <ClothesItem products={products} />
        </div>
      </div>
    </>
  );
}

export default Clothes;
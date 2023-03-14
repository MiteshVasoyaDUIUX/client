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
import "./Accessories.css";
import Filter from "../Filter";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProduct, reset } from "../../features/product/productSlice";

function CardA() {
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          textAlign: "center",
          marginBottom: "30px",
          marginRight: "15px",
        }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton>
            <AddShoppingCartIcon />
          </IconButton>
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
function ProductCard() {
  return (
    <>
      <Grid item xs={3}>
        <CardA />
      </Grid>
      <Grid item xs={3}>
        <CardA />
      </Grid>
      <Grid item xs={3}>
        <CardA />
      </Grid>
      <Grid item xs={3}>
        <CardA />
      </Grid>
    </>
  );
}

function AccessoriesItems() {
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
            <ProductCard />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

function Accessories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  }, [dispatch]);

  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  console.log("Products : ", products);
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
        <div style={{ marginLeft: "80px", width: "fitContent" }}>
          <AccessoriesItems />
        </div>
      </div>
    </>
  );
}
export default Accessories;

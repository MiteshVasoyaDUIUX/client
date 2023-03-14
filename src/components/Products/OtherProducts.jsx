import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import "./OtherProducts.css";
import Filter from "../Filter";

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

function OtherProductsItem() {
  return (
    <>
      <div>
        <h1 id="other-products-title">
          {/* Add Title According to the Category of the Products... */}
          Add Title According to the Category of the Products...
        </h1>
      </div>
      <div
        className="productCards"
        style={{ width: "90%", marginLeft: "6.8%", marginTop: "60px" }}
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

function OtherProducts() {
  const [priceSliderValue, setPriceSliderValue] = useState([100, 5000]);
  const [ratingValue, setRatingValue] = useState();
  const [PODEligibility, setPODEligibility] = useState(false);
  const [discount, setDiscount] = useState();
  const [includeOutOfStock, setIncludeOutOfStock] = useState(false);

  // console.log("includeOutOfStock : ", includeOutOfStock);
  // console.log("Discount : ", discount);

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
          <OtherProductsItem />
        </div>
      </div>
    </>
  );
}

export default OtherProducts;

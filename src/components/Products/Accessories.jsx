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
import {
  fetchProduct,
  reset,
} from "../../features/productsForClient/productsForClientSlice";

function CardA({ product }) {
  console.log("Products : CardA : ", product);
  return (
    <>
      <Card
        sx={{
          maxWidth: 400,
          textAlign: "center",
          marginBottom: "30px",
          marginRight: "30px",
          border : "0.5px solid white",
          boxShadow : "none",
          borderRadius : "15px"
        }}
        className= "product-card"
      >
        <CardMedia
          component="img"
          alt="green iguana"
          image={product.prodImage}
          sx={{
            height: "fitContent",
            width: "fitContent",
            minHeight : "300px",
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
function ProductCard({ products }) {
  return (
    <>
      {products.map((product) => (
        <Grid>
          <CardA product={product} />
        </Grid>
      ))}
    </>
  );
}

function AccessoriesItems({ products }) {
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
            <ProductCard products={products} />
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
          <AccessoriesItems products={products} />
        </div>
      </div>
    </>
  );
}
export default Accessories;

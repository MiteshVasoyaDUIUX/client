import React from "react";
import "./TrendingProducts.css";
import { Grid } from "@mui/material";

import ProductCard from "../ProductCard";

function ProductCards() {
  return (
    <>
      <Grid item xs={3}>
        <ProductCard />
      </Grid>
      <Grid item xs={3}>
        <ProductCard />
      </Grid>
      <Grid item xs={3}>
        <ProductCard />
      </Grid>
      <Grid item xs={3}>
        <ProductCard />
      </Grid>
    </>
  );
}

function TrendingProducts() {
  return (
    <>
      <div>
        <h1 id="trending-product-title">Tranding Products</h1>
      </div>
      <div
        className="productCards"
        style={{ width: "90%", marginLeft: "6.8%", marginTop: "40px" }}
      >
        <Grid container spacing={0}>
          <Grid container item spacing={0}>
            <ProductCards />
          </Grid>
          
        </Grid>
      </div>
    </>
  );
}

export default TrendingProducts;

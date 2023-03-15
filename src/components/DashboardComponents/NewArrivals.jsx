import React, { useState } from "react";
import "./NewArrivals.css";
import { Grid } from "@mui/material";
import {
  fetchProduct,
  reset,
} from "../../features/productsForClient/productsForClientSlice";
import { useDispatch, useSelector } from "react-redux";
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
function NewArrivals() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productsForClient);
  return (
    <>
      <div>
        <h1 id="new-arrivals-title">New Arrivals</h1>
      </div>
      <div
        className="productCards"
        style={{ width: "90%", marginLeft: "6.8%", marginTop: "35px" }}
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

export default NewArrivals;

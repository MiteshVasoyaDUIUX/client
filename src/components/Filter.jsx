/* eslint-disable no-unused-vars */
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./Filter.css";

function Filter() {
  return (
    <>
      <div
        id="product-filter"
        style={{
          border: "1px solid black",
          padding: "10px",
          marginTop: "60px",
          marginLeft: "20px",
          width: "305px",
          height: "fit-content",
        }}
      >
        <div id="category-div">
          <div id="category-div-title">Category :</div>
          <div id="category-div-content">
            <div><button className="category-button">Clothes</button></div>
            <div><button className="category-button">Accessories</button></div>
            <div><button className="category-button">Footwear</button></div>
            <div><button className="category-button">Other</button></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;

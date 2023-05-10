/* eslint-disable no-unused-vars */
import {
  Button,
  Checkbox,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  Rating,
  Slider,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./Filter.css";

function Filter({
  priceRange,
  setPriceRange,
  price,
  setPrice,
  ratingValue,
  setRatingValue,
  PODEligibility,
  setPODEligibility,
  discount,
  setDiscount,
  includeOutOfStock,
  setIncludeOutOfStock,
}) {
  const initialPriceSliderValue = [100, 200000];

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handlePriceChange = () => {
    setPrice(priceRange);
  };
  const handleRatingButton = (event, ratingValue) => {
    setRatingValue(ratingValue);
  };

  const handlePODCheckBox = () => {
    setPODEligibility(!PODEligibility);
  };

  const handleIncludeOutOfStocks = () => {
    setIncludeOutOfStock(!includeOutOfStock);
  };

  const handleDiscountRadios = (e) => {
    setDiscount(e.target.value);
  };

  const handleClearRating = () => {
    setRatingValue(0);
  };

  const handleClearDiscount = () => {
    setDiscount();
  };

  const handleAllResetButton = () => {
    handlePODCheckBox();
    handleClearRating();
    handleClearDiscount();
    setIncludeOutOfStock(false);
    setPODEligibility(false);
    setPrice(initialPriceSliderValue)
    setPriceRange(initialPriceSliderValue);
  };

  return (
    <>
      <div id="product-filter">
        <div id="customer-rating-div">
          <div id="customer-rating-div-title">Customer Rating :</div>
          <div id="rating-clear-button">
            {ratingValue === 0 || ratingValue === null ? (
              <></>
            ) : (
              <>
                <input
                  type="button"
                  id="clear-rating-discount-button"
                  onClick={handleClearRating}
                  value="Clear"
                />
              </>
            )}
          </div>
          <div id="customer-rating-div-content">
            <Rating
              name="half-rating"
              precision={0.5}
              value={ratingValue}
              onChange={(event, newValue) => {
                handleRatingButton(event, newValue);
              }}
              sx={{
                fontSize: "30px",
              }}
            />
          </div>
        </div>
        <div id="price-div">
          <div id="price-div-title">Price :</div>
          <div id="price-div-content">
            <input
              type="text"
              name="slider-value"
              id="slider-min-value-textbox"
              value={priceRange[0]}
              readOnly
            />
            <input
              type="text"
              name="slider-value"
              id="slider-max-value-textbox"
              value={priceRange[1]}
              readOnly
            />
            <Box sx={{ width: 290 }} id="bolx">
              <Slider
                value={priceRange}
                valueLabelDisplay="auto"
                color="primary"
                min={100}
                max={200000}
                onChange={handleSliderChange}
                onChangeCommitted={handlePriceChange}
              />
            </Box>
          </div>
        </div>
        <div id="delivery-type-div">
          <div id="delivery-type-div-title">Pay On Delivery :</div>
          <div id="delivery-type-div-content">
            <FormControlLabel
              control={<Checkbox checked={PODEligibility} />}
              label="Eligible Pay On Delivery"
              onChange={handlePODCheckBox}
            />
          </div>
        </div>
        <div id="discount-div">
          <div id="discount-div-title">Discount :</div>
          <div id="discount-div-content">
            {discount !== undefined ? (
              <>
                <p
                  id="clear-rating-discount-button"
                  onClick={handleClearDiscount}
                >
                  Clear
                </p>
              </>
            ) : (
              ""
            )}
            <RadioGroup
              name="discount-buttons-group"
              onChange={handleDiscountRadios}
            >
              <FormControlLabel
                value="10"
                control={<Radio checked={discount === "10"} />}
                label="10% Off or more"
              />
              <FormControlLabel
                value="20"
                control={<Radio checked={discount === "20"} />}
                label="20% Off or more"
              />
              <FormControlLabel
                value="50"
                control={<Radio checked={discount === "50"} />}
                label="50% Off or more"
              />
              <FormControlLabel
                value="70"
                control={<Radio checked={discount === "70"} />}
                label="70% Off or more"
              />
            </RadioGroup>
          </div>
        </div>
        <div id="availability-div">
          <div id="availability-div-title">Availability :</div>
          <div id="availability-div-content">
            <div>
              <FormControlLabel
                control={<Checkbox checked={includeOutOfStock} />}
                label="Include Out Of Stock Products"
                onChange={handleIncludeOutOfStocks}
              />
            </div>
          </div>
        </div>
        {ratingValue !== 0 ||
        discount !== undefined ||
        includeOutOfStock === true ||
        PODEligibility === true ||
        JSON.stringify(priceRange) !==
          JSON.stringify(initialPriceSliderValue) ? (
          <>
            <div id="reset-all-filter">
              <input
                type="button"
                value="Reset All Filters"
                onClick={handleAllResetButton}
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Filter;

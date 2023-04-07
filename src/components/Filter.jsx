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
  priceSliderValue,
  setPriceSliderValue,
  ratingValue,
  setRatingValue,
  PODEligibility,
  setPODEligibility,
  discount,
  setDiscount,
  includeOutOfStock,
  setIncludeOutOfStock,
}) {
  const handleSliderChange = (event, newValue) => {
    setPriceSliderValue(newValue);
  };

  const handleRatingButton = (ratingValue) => {
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
    setRatingValue();
  };

  const handleClearDiscount = () => {
    setDiscount();
  };

  const handleMinValueBox = (e) => {
    const minValue = e.target.value;
  };

  return (
    <>
      <div id="product-filter">
        <div id="customer-rating-div">
          <div id="customer-rating-div-title">Customer Rating :</div>
          <div id="customer-rating-div-content">
            {ratingValue !== undefined ? (
              <>
                <p
                  id="clear-rating-discount-button"
                  onClick={handleClearRating}
                >
                  Clear
                </p>
              </>
            ) : (
              ""
            )}
            <div className="customer-rating-item">
              <Button
                sx={
                  ratingValue === 4
                    ? {
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "sans-serif",
                        color: "black",
                        fontSize: "16px",
                        backgroundColor: "rgba(66, 102, 122, 0.200)",
                      }
                    : {
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "sans-serif",
                        color: "black",
                        fontSize: "16px",
                      }
                }
                onClick={() => {
                  handleRatingButton(4);
                }}
              >
                <Rating name="read-only" value={4} readOnly />
                <Box sx={{ ml: 1 }}>& Up</Box>
              </Button>
            </div>
            <div className="customer-rating-item">
              <Button
                sx={
                  ratingValue === 3
                    ? {
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "sans-serif",
                        color: "black",
                        fontSize: "16px",
                        backgroundColor: "rgba(66, 102, 122, 0.200)",
                      }
                    : {
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "sans-serif",
                        color: "black",
                        fontSize: "16px",
                      }
                }
                onClick={() => {
                  handleRatingButton(3);
                }}
              >
                <Rating name="read-only" value={3} readOnly />
                <Box sx={{ ml: 1 }}>& Up</Box>
              </Button>
            </div>
            <div className="customer-rating-item">
              <Button
                sx={
                  ratingValue ===2
                    ? {
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "sans-serif",
                        color: "black",
                        fontSize: "16px",
                        backgroundColor: "rgba(66, 102, 122, 0.200)",
                      }
                    : {
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "sans-serif",
                        color: "black",
                        fontSize: "16px",
                      }
                }
                onClick={() => {
                  handleRatingButton(2);
                }}
              >
                <Rating name="read-only" value={2} readOnly />
                <Box sx={{ ml: 1 }}>& Up</Box>
              </Button>
            </div>
            <div className="customer-rating-item">
              <Button
                sx={
                  ratingValue ===1
                    ? {
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "sans-serif",
                        color: "black",
                        fontSize: "16px",
                        backgroundColor: "rgba(66, 102, 122, 0.200)",
                      }
                    : {
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "sans-serif",
                        color: "black",
                        fontSize: "16px",
                      }
                }
                onClick={() => {
                  handleRatingButton(1);
                }}
              >
                <Rating name="read-only" value={1} readOnly />
                <Box sx={{ ml: 1 }}>& Up</Box>
              </Button>
            </div>
          </div>
        </div>
        <div id="price-div">
          <div id="price-div-title">Price :</div>
          <div id="price-div-content">
            <input
              type="text"
              name="slider-value"
              id="slider-min-value-textbox"
              value={priceSliderValue[0]}
              readOnly
            />
            <input
              type="text"
              name="slider-value"
              id="slider-max-value-textbox"
              value={priceSliderValue[1]}
              readOnly
            />
            <Box sx={{ width: 290 }} id="bolx">
              <Slider
                value={priceSliderValue}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                color="primary"
                min={100}
                max={50000}
              />
            </Box>
          </div>
        </div>
        <div id="delivery-type-div">
          <div id="delivery-type-div-title">Pay On Delivery :</div>
          <div id="delivery-type-div-content">
            <FormControlLabel
              control={<Checkbox />}
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
                control={<Checkbox />}
                label="Include Out Of Stock Products"
                onChange={handleIncludeOutOfStocks}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;

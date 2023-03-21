import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import makeStyles from "@mui";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Images from "../components/DetailedProductPage.jsx/Images";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { fetchOneProduct } from "../features/productsForClient/productsForClientSlice";
import "./BuyProduct.css";

function BuyProduct() {
  const dispatch = useDispatch();
  const params = useParams();
  const [paymentOption, setPaymentOption] = React.useState("");
  let paymentDetailsForm = "";

  const { product } = useSelector((state) => state.productsForClient);
  
  const useStyles = makeStyles({
    label: {
      color: "darkred",
      "&.Mui-focused": {
        color: "darkred",
      },
    },
  });
  const classes = useStyles();
  
  let productId = params.id.split("&")[0];
  let quantity = params.id.split("&")[1];

  useEffect(() => {
    dispatch(fetchOneProduct(productId));
  }, []);

  const handleChange = (event) => {
    setPaymentOption(event.target.value);
  };
  console.log(paymentOption);

  const handlePayNowButton = () => {
    console.log("Paid");
  };
  return (
    <>
      <ErrorBoundary>
        {Object.keys(product).length > 0 ? (
          <>
            <div className="place-order-page">
              <div className="product-detail-page">
                <img
                  src={product.prodImage[0]}
                  className="product-image"
                  alt="asas"
                />
                {/* <img src={product.prodImage[0]} className="product-image" alt="asas"/> */}
                <div className="buy-product-page-name">{product.prodName}</div>
                <div className="buy-product-page-quantity">
                  Quantity : {quantity}
                </div>
                <div className="buy-product-page-amount">
                  ₹ {product.prodPrice}
                </div>
              </div>

              <div className="order-summary">
                <div className="total-bill-summary">
                  <div className="order-summary-title">Summary</div>
                  <div className="order-summary-details">
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        marginLeft: "100px",
                        marginTop: "30px",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                        }}
                      >
                        {product.prodName}
                      </div>
                      <div style={{ marginLeft: "100px", width: "70px" }}>
                        x{quantity}
                      </div>
                      <div style={{ marginLeft: "100px", width: "100px" }}>
                        ₹ {quantity * product.prodPrice}
                      </div>
                    </div>
                    <div className="products-total-amount">
                      Total :{quantity * product.prodPrice}
                    </div>
                  </div>
                </div>

                <div className="delivery-address">
                  <div className="delivery-address-title">Delivery Address</div>
                  <div className="delivery-address-details">
                    <div
                      style={{
                        display: "block",
                        width: "100%",
                        marginLeft: "100px",
                        marginTop: "30px",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          marginBottom: "10px",
                        }}
                      >
                        <b> Address : </b> F-304, Shreeji Avenue, Sayan Road,
                        Amroli
                      </div>
                      <div
                        style={{
                          width: "100%",
                          marginBottom: "10px",
                        }}
                      >
                        <b> City : </b> Surat
                      </div>
                      <div style={{display : "flex"}}>
                        <div
                          style={{
                            width: "100%",
                          }}
                        >
                          <b> State : </b> Gujarat
                        </div>
                        <div
                          style={{
                            width: "100%",
                          }}
                        >
                          <b> Pin Code : </b> 394107
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="payment-details">
                  <div className="payment-details-title">Payment Details :</div>
                  <div className="payment-type">
                    <Select
                      value={paymentOption}
                      onChange={handleChange}
                      className={classes.label}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="cod">Cash On Delivery</MenuItem>
                      <MenuItem value="upi">UPI ID</MenuItem>
                      <MenuItem value="card">
                        Pay with Credit Card/Debit Card/ ATM Card
                      </MenuItem>
                    </Select>
                  </div>
                  {/* <div className="payment-details-form" dangerouslySetInnerHTML={{__html: paymentDetailsForm}} /> */}

                  <div className="payment-details-form">
                    {paymentOption === "card" ? (
                      <>
                        <TextField
                          id="credit-debit-atm-card"
                          variant="standard"
                          placeholder="Card Number"
                          style={{ width: "300px" }}
                        />
                        <TextField
                          id="credit-debit-atm-card"
                          variant="standard"
                          placeholder="Card Holder Name"
                          style={{ marginLeft: "50px", width: "300px" }}
                        />
                        <TextField
                          id="credit-debit-atm-card"
                          variant="standard"
                          placeholder="CVV"
                          style={{ width: "300px", marginTop: "70px" }}
                        />
                        <TextField
                          id="credit-debit-atm-card"
                          variant="standard"
                          placeholder="Enter Card Holder Name"
                          style={{
                            marginLeft: "50px",
                            width: "300px",
                            marginTop: "70px",
                          }}
                        />
                      </>
                    ) : paymentOption === "cod" ? (
                      <></>
                    ) : paymentOption === "upi" ? (
                      <>
                        <TextField
                          id="upi-id"
                          variant="standard"
                          placeholder="Enter UPI Id"
                          style={{ width: "500px", marginLeft: "100px" }}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div>
                    <button
                      className="payment-button"
                      onClick={handlePayNowButton}
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </ErrorBoundary>
    </>
  );
}

export default BuyProduct;

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

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { fetchOneProduct } from "../features/productsForClient/productsForClientSlice";
import "./BuyProduct.css";
import { placeOrder } from "../features/order/orderSlice";
import Spinner from "../components/Spinner";
import { reset } from "../features/auth/authSlice";

function BuyProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [paymentOption, setPaymentOption] = React.useState("cod");

  const { product } = useSelector((state) => state.productsForClient);
  const { user } = useSelector((state) => state.auth);
  const { orderId, isPlaced, isPlacing } = useSelector((state) => state.order);

  let productId = params.id.split("&")[0];
  let quantity = params.id.split("&")[1];

  useEffect(() => {
    dispatch(fetchOneProduct(productId));

    if(isPlaced) {
      alert(`Your Order Id is  ${orderId.orderId}`);
      // console.log("Your Order Id is ", orderId.orderId)
      navigate('/myorders');
    }

    reset()
  }, [isPlaced]);

  if(isPlacing) {
    <Spinner />
  }

  const handleChange = (event) => {
    setPaymentOption(event.target.value);
  };
  // console.log(paymentOption);

  const handlePayNowButton = () => {
    const userId = user.user._id;

    const checkoutData = {
      userId, 
      productId,
      prodImage : product.prodImage,
      prodName : product.prodName,
      quantity,
      productPrice : product.prodPrice,
      paymentOption
    }
    console.log("User CheckOut : ", checkoutData);

    dispatch(placeOrder(checkoutData));
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
                      <div style={{ display: "flex" }}>
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
                      className="payment-select"
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

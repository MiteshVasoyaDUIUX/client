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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { fetchOneProduct } from "../../features/productsForClient/productsForClientSlice";
import { placeOrder } from "../../features/order/orderSlice";
import Spinner from "../../components/Spinner";
import { reset } from "../../features/auth/authSlice";
import { Image } from "../../components/DetailedProductPage.jsx/Images";
import EmailVerification from "../../components/EmailVerification";

import "./BuyProduct.css";

function BuyProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [emailVerPage, setEmailVerPage] = useState(false);
  const [paymentOption, setPaymentOption] = useState("cod");

  const [mainClass, setMainClass] = useState("place-order-page");
  const { product } = useSelector((state) => state.productsForClient);
  const { user } = useSelector((state) => state.auth);
  const { orderId, isPlaced, isPlacing } = useSelector((state) => state.order);
  const { isVerified } = useSelector((state) => state.auth);

  let productId = params.id.split("&")[0];
  let quantity = params.id.split("&")[1];

  useEffect(() => {
    dispatch(fetchOneProduct(productId));

    // if (!user) {
    //   navigate("/");
    // }

    if (isVerified) {
      setEmailVerPage(false);
      setMainClass("place-order-page");
      reset();
    }

    if (isPlaced) {
      alert(`Your Order is Placed...`);
      // console.log("Your Order Id is ", orderId.orderId)
      navigate("/myorders");
    }

    return () => {
      reset();
    };
  }, [isPlaced, isVerified, user]);

  // if(isVerified === true) {
  //   verificationStatus = false
  // }

  if (isPlacing) {
    <Spinner />;
  }

  const handlePaymentOptionChanges = (event) => {
    setPaymentOption(event.target.value);
  };
  // console.log(paymentOption);

  const handlePayNowButton = () => {
    if (paymentOption === "") {
      alert("Select Payment Option");
    } else {
      const userId = user.user._id;

      const newData = {
        userId,
        productId,
        prodImage: product.prodImage,
        prodName: product.prodName,
        quantity,
        productPrice: product.prodPrice,
        paymentOption,
      };

      let checkoutData = [];
      checkoutData.push(newData);
      console.log("User Checkout : ", checkoutData);

      if (!user.user.emailVerified) {
        setEmailVerPage(true);
        console.log("User is not verified...", user.emailVerified);

        if (!emailVerPage) {
          setMainClass("blur-place-order-page");
        }
        // navigate(`/user/verification/${user}`);
      } else {
        dispatch(placeOrder(checkoutData));
      }
    }
  };
  return (
    <>
      <ErrorBoundary>
        {Object.keys(product).length > 0 ? (
          <>
            <div className={mainClass}>
              <div className="product-detail-page">
                <Image prodImage={product.prodImage} />
                <div className="buy-product-page-name">{product.prodName}</div>
                <div className="buy-product-page-amount">
                  ₹ {product.prodPrice.toLocaleString("en-IN")}
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
                      <div className="summary-product-title">
                        {product.prodName}
                      </div>
                      <div style={{ marginLeft: "100px", width: "70px" }}>
                        x{quantity}
                      </div>
                    </div>
                    <div className="products-total-amount">
                      Total :{" "}
                      {(quantity * product.prodPrice).toLocaleString("en-IN")} ₹
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
                        <b> Address : </b> {user.user.address.street}
                      </div>
                      <div
                        style={{
                          width: "100%",
                          marginBottom: "10px",
                        }}
                      >
                        <b> City : </b> {user.user.address.city}
                      </div>
                      <div style={{ display: "flex" }}>
                        <div
                          style={{
                            width: "100%",
                          }}
                        >
                          <b> State : </b> {user.user.address.state}
                        </div>
                        <div
                          style={{
                            width: "100%",
                          }}
                        >
                          <b> Pin Code : </b> {user.user.address.pincode}
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
                      onChange={handlePaymentOptionChanges}
                      className="payment-select"
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="">Select Payment Option</MenuItem>
                      <MenuItem value="cod">Cash On Delivery</MenuItem>
                      <MenuItem value="upi">UPI ID</MenuItem>
                      <MenuItem value="card">
                        Pay with Credit Card/Debit Card/ ATM Card
                      </MenuItem>
                    </Select>
                  </div>

                  <div className="payment-details-form">
                    {paymentOption === "card" ? (
                      <>
                        <TextField
                          className="credit-debit-atm-card"
                          variant="standard"
                          placeholder="Card Number"
                          style={{ width: "300px" }}
                        />
                        <TextField
                          className="credit-debit-atm-card"
                          variant="standard"
                          placeholder="Card Holder Name"
                          style={{ marginLeft: "50px", width: "300px" }}
                        />
                        <TextField
                          className="credit-debit-atm-card"
                          variant="standard"
                          placeholder="CVV"
                          style={{ width: "300px", marginTop: "70px" }}
                        />
                        <TextField
                          className="credit-debit-atm-card"
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
                      className="payment-button-placeorder-page"
                      onClick={handlePayNowButton}
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {emailVerPage ? (
              <div className="email-verification">
                <EmailVerification
                  email={user.user.email}
                  emailVerPage={emailVerPage}
                  setEmailVerPage={setEmailVerPage}
                  setMainClass={setMainClass}
                />
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          ""
        )}
      </ErrorBoundary>
    </>
  );
}

export default BuyProduct;

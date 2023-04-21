import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
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

const userData = JSON.parse(localStorage.getItem("user"));

function DeliveryAddress({ address, setDeliveryAddress }) {
  const handleAddressChange = () => {
    setDeliveryAddress(address);
  };
  return (
    <>
      <div className="order-address" onClick={handleAddressChange}>
        <div>
          <input type="radio" name="address" onChange={handleAddressChange} />
        </div>
        <div>
          {address.street},
          <br />
          {address.city},
          <br />
          {address.state},
          <br />
          Pincode : {address.pincode}
          <br />
        </div>
      </div>
    </>
  );
}

function BuyProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [emailVerPage, setEmailVerPage] = useState(false);
  const [paymentOption, setPaymentOption] = useState("cod");
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [openNewAddress, setOpenNewAddress] = useState(false);
  const [newAddress, setAddressNew] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [mainClass, setMainClass] = useState("place-order-page");
  const { product } = useSelector((state) => state.productsForClient);
  const { user } = useSelector((state) => state.auth);
  const { orderId, isPlaced, isPlacing } = useSelector((state) => state.order);
  const { _id, email, emailVerified, address, name, phoneNumber } = user.user;
  const { isVerified } = useSelector((state) => state.auth);
  const { street, city, state, pincode } = newAddress;

  let productId = params.id.split("&")[0];
  let quantity = params.id.split("&")[1];

  useEffect(() => {
    dispatch(fetchOneProduct(productId));

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

  if (isPlacing) {
    <Spinner />;
  }

  const handlePaymentOptionChanges = (event) => {
    setPaymentOption(event.target.value);
  };

  const handleChanges = (e) => {
    setAddressNew((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePayNowButton = () => {
    if (paymentOption === "") {
      alert("Select Payment Option");
    } else {
      const userId = _id;

      const newData = {
        userId,
        productId,
        prodImage: product.prodImage,
        prodName: product.prodName,
        quantity,
        productPrice: product.prodPrice,
        paymentOption,
        deliveryAddress: deliveryAddress,
      };

      let allAddress = userData.user.address;
      let addressFound = false;

      for (let index = 0; index < allAddress.length; index++) {
        const element = allAddress[index];

        if (
          element.street === deliveryAddress.street &&
          element.city === deliveryAddress.city &&
          element.state === deliveryAddress.state &&
          element.pincode === deliveryAddress.pincode
        ) {
          addressFound = true;
        } else {
          continue;
        }
      }

      if (!addressFound) {
        allAddress.push(deliveryAddress);
        localStorage.setItem("user", JSON.stringify(userData));
      }

      let checkoutData = [];
      checkoutData.push(newData);

      if (!emailVerified) {
        setEmailVerPage(true);
        console.log("User is not verified...", user.emailVerified);

        if (!emailVerPage) {
          setMainClass("blur-place-order-page");
        }
      } else {
        dispatch(placeOrder(checkoutData));
      }
    }
  };

  const handleAddAddrButton = () => {
    setOpenNewAddress(true);
    setDeliveryAddress({});
    var addressRadio = document.getElementsByName("address");
    for (var i = 0; i < addressRadio.length; i++) {
      if (addressRadio[i].checked) addressRadio[i].checked = false;
    }
  };

  const handleCancelButton = () => {
    setOpenNewAddress(false);
  };

  const handleSaveNewAddress = (e) => {
    e.preventDefault();

    if (street && city && state && pincode) {
      const newAddress = { street, city, state, pincode };

      const addrArea = document.getElementById("order-select-id");

      const div = document.createElement("div");

      div.innerHTML = createRoot(div).render(
        DeliveryAddress({
          address: newAddress,
          setDeliveryAddress: setDeliveryAddress,
        })
      );

      addrArea.append(div);
      setDeliveryAddress(newAddress);
      setOpenNewAddress(false);
    } else {
      window.alert("Fill all the Fields...");
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
                      Total :
                      {(quantity * product.prodPrice).toLocaleString("en-IN")} ₹
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex" }}>
                  <div className="delivery-address">
                    <div className="delivery-address-title">
                      Delivery Address
                    </div>
                    <div className="order-select" id="order-select-id">
                      {address.map((address) => {
                        return (
                          <>
                            <DeliveryAddress
                              address={address}
                              setDeliveryAddress={setDeliveryAddress}
                              phoneNumber={phoneNumber}
                              userName={name}
                            />
                          </>
                        );
                      })}
                      {!openNewAddress ? (
                        <>
                          <input
                            type="button"
                            value="Add New Address"
                            className="add-new-address-button"
                            onClick={handleAddAddrButton}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    {openNewAddress === true ? (
                      <>
                        <div className="new-address-form">
                          <div
                            style={{
                              width: "fit-content",
                              marginLeft: "auto",
                              marginRight: "auto",
                            }}
                          >
                            <FormControl style={{ width: "600px" }}>
                              <InputLabel> Enter Address </InputLabel>
                              <Input
                                type="text"
                                value={street}
                                onChange={handleChanges}
                                name="street"
                                required
                              />
                            </FormControl>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              width: "600px",
                              justifyContent: "space-between",
                              marginTop: "20px",
                              marginLeft: "auto",
                              marginRight: "auto",
                            }}
                          >
                            <FormControl>
                              <InputLabel> Enter City </InputLabel>
                              <Input
                                type="text"
                                value={city}
                                onChange={handleChanges}
                                name="city"
                                required
                              />
                            </FormControl>

                            <FormControl>
                              <InputLabel> Enter State </InputLabel>
                              <Input
                                type="text"
                                value={state}
                                onChange={handleChanges}
                                name="state"
                                required
                              />
                            </FormControl>
                            <FormControl>
                              <InputLabel> Enter Pincode </InputLabel>
                              <Input
                                type="text"
                                value={pincode}
                                onChange={handleChanges}
                                name="pincode"
                                required
                              />
                            </FormControl>
                          </div>
                          <div className="new-address-form-button">
                            <input
                              type="button"
                              value="Save"
                              onClick={handleSaveNewAddress}
                            />
                            <input
                              type="button"
                              value="Cancel"
                              onClick={handleCancelButton}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="payment-details">
                    <div className="payment-details-title">
                      Payment Details :
                    </div>
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
                            style={{
                              width: "45%",
                              marginLeft: "2.5%",
                              marginBottom: "20px",
                            }}
                          />
                          <TextField
                            className="credit-debit-atm-card"
                            variant="standard"
                            placeholder="Card Holder Name"
                            style={{
                              marginLeft: "5%",
                              marginRight: "2.5%",
                              width: "45%",
                              marginBottom: "20px",
                            }}
                          />
                          <TextField
                            className="credit-debit-atm-card"
                            variant="standard"
                            placeholder="CVV"
                            style={{
                              width: "45%",
                              marginLeft: "2.5%",
                            }}
                          />
                          <TextField
                            className="credit-debit-atm-card"
                            variant="standard"
                            placeholder="Enter Card Holder Name"
                            style={{
                              marginLeft: "5%",
                              marginRight: "2.5%",
                              width: "45%",
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
                            style={{ width: "70%", marginLeft: "15%" }}
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
            </div>
            {emailVerPage ? (
              <div className="email-verification">
                <EmailVerification
                  email={email}
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

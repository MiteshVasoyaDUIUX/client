/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "./Cart.css";
import {
  fetchCart,
  removeFromCart,
  reset,
  updateCartQuantity,
} from "../../features/productsForClient/productsForClientSlice";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../../features/order/orderSlice";
import { createRoot } from "react-dom/client";
import EmailVerification from "../../components/EmailVerification";

function DeliveryAddress({ address, setDeliveryAddress }) {
  const handleAddressChange = () => {
    setDeliveryAddress(address);
  };
  return (
    <>
      <div className="cart-order-address" onClick={handleAddressChange}>
        <div>
          <input type="radio" name="address" onChange={handleAddressChange} />
        </div>
        <div style={{ marginLeft: "7px", marginTop: "1px" }}>
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

function PaymentDeliveryPage({
  handlePaymentButton,
  paymentOption,
  setPaymentOption,
  address,
  setDeliveryAddress,
  setAddressNew,
  newAddress,
  mainClass,
}) {
  const handlePaymentOptionChanges = (event) => {
    setPaymentOption(event.target.value);
  };
  const { street, city, state, pincode } = newAddress;
  const [openNewAddress, setOpenNewAddress] = useState(false);

  const handleAddAddrButton = () => {
    setOpenNewAddress(true);
    setDeliveryAddress({});
    var addressRadio = document.getElementsByName("address");
    for (var i = 0; i < addressRadio.length; i++) {
      if (addressRadio[i].checked) addressRadio[i].checked = false;
    }
  };

  const handleSaveNewAddress = (e) => {
    e.preventDefault();

    if (street && city && state && pincode) {
      const newAddress = { street, city, state, pincode };

      const addrArea = document.getElementById("address-select-id");

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

  const handleChanges = (e) => {
    setAddressNew((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancelButton = () => {
    setOpenNewAddress(false);
  };

  return (
    <>
      <div
        style={{
          width: "99.9%",
          height: "fit-content",
          paddingBottom: "20px",
          display: "flex",
          marginTop: "20px",
        }}
        className={mainClass}
      >
        <div className="cart-delivery-address">
          <div className="cart-delivery-all-address">
            <div className="delivery-address-title">Delivery Address</div>
            <div className="cart-address-select" id="address-select-id">
              {address.map((address) => {
                return (
                  <>
                    <DeliveryAddress
                      address={address}
                      setDeliveryAddress={setDeliveryAddress}
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
          </div>
          <div
            style={{
              marginTop: "40px",
              marginLeft: "5%",
            }}
          >
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
        </div>
        <div className="payment-info-div">
          <div className="payment-info-title">Payment Info :</div>
          <div className="accepted-cards-icons">
            Accepted Cards : <br />
            <i
              class="fa fa-cc-visa"
              style={{
                color: "navy",
                marginLeft: "0px",
                marginTop: "15px",
                fontSize: "40px",
              }}
            ></i>
            <i
              class="fa fa-cc-amex"
              style={{
                color: "blue",
                marginLeft: "15px",
                marginTop: "15px",
                fontSize: "40px",
              }}
            ></i>
            <i
              class="fa fa-cc-mastercard"
              style={{
                color: "red",
                marginLeft: "15px",
                marginTop: "15px",
                fontSize: "40px",
              }}
            ></i>
            <i
              class="fa fa-cc-discover"
              style={{
                color: "orange",
                marginLeft: "15px",
                marginTop: "15px",
                fontSize: "40px",
              }}
            ></i>
          </div>

          <div className="payment-details-payment-page">
            <div className="payment-details-payment-page-title">
              Payment Method :
            </div>
            <div className="payment-type-payment-page">
              <Select
                value={paymentOption}
                onChange={handlePaymentOptionChanges}
                className="payment-select-payment-page"
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
            <div style={{ marginTop: "25px", marginLeft: "10%" }}>
              {paymentOption === "card" ? (
                <>
                  <TextField
                    className="cart-payment-select"
                    variant="standard"
                    placeholder="Card Holder Name"
                    style={{ width: "300px" }}
                  />
                  <TextField
                    className="cart-payment-select"
                    variant="standard"
                    placeholder="Card Number"
                    style={{ marginLeft: "50px", width: "300px" }}
                  />
                  <TextField
                    className="cart-payment-select"
                    variant="standard"
                    placeholder="Enter CVV"
                    style={{ width: "300px", marginTop: "70px" }}
                  />
                  <TextField
                    className="cart-payment-select"
                    variant="standard"
                    placeholder="Enter Expiry Date & Year"
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
                    className="upi-payment-info"
                    variant="standard"
                    placeholder="Enter UPI Id"
                    style={{ width: "500px", marginLeft: "100px" }}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="payment-button-div">
              <button className="payment-button" onClick={handlePaymentButton}>
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ProductCard({ item }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [quantity, setQuantity] = useState(item.quantity);
  let subTotal = item.prodPrice * item.quantity;
  subTotal = subTotal.toLocaleString("en-IN");

  const handleRemoveButton = (id) => {
    console.log("Remove Button is Clicked...", id);

    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (sign, id) => {
    switch (sign) {
      case "+":
        {
          quantity < 10
            ? setQuantity(quantity + 1)
            : window.alert("You can Select Max 10 Quantity...");

          //Update Cart Quantity...
          if (quantity < 10) {
            const newData = {
              userId: user.user._id,
              productId: id,
              newQuantity: quantity + 1,
            };
            dispatch(updateCartQuantity(newData));
            // console.log(quantity + 1);
          }
        }
        break;
      case "-":
        {
          quantity > 1 ? setQuantity(quantity - 1) : setQuantity(quantity);
          console.log(sign, id);

          if (quantity > 1) {
            const newData = {
              userId: user.user._id,
              productId: id,
              newQuantity: quantity - 1,
            };
            dispatch(updateCartQuantity(newData));
          }
        }
        break;

      default:
        break;
    }
  };

  return (
    <Grid item xl={10} style={{ marginLeft: "7%" }}>
      <Card>
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "auto",
              height: "auto",
              borderRight: "1px solid rgb(100, 100, 100, 0.2)",
              padding: "20px",
            }}
          >
            <img
              src={item.prodImage[0]}
              className="card-image-content"
              alt=""
              style={{ width: "100px", height: "100px" }}
            />
          </div>
          <div
            style={{
              width: "73%",
              borderRight: "1px solid rgb(100, 100, 100, 0.2)",
              padding: "15px",
            }}
          >
            <Typography variant="h6" component="div">
              {item.prodName}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              style={{ marginTop: "5px" }}
            >
              Price : {item.prodPrice} ₹
            </Typography>
          </div>
          <div
            style={{ display: "block", position: "relative", padding: "15px" }}
          >
            {item.prodQuantity > 0 ? (
              <>
                <button
                  className="cart-item-decrease-button"
                  onClick={() => handleQuantityChange("-", item._id)}
                  style={{
                    marginLeft: "32%",
                    width: "12%",
                    marginTop: "1%",
                    marginBottom: "4%",
                  }}
                >
                  -
                </button>
                <input
                  type="text"
                  name="cart-quantity"
                  id="cart-quantity"
                  value={item.quantity}
                  style={{
                    width: "12%",
                    height: "26px",
                    outline: "none",
                    border: "1px solid grey",
                    fontSize: "18px",
                    textAlign: "center",
                  }}
                  disabled
                />
                <button
                  className="cart-item-icrease-button"
                  onClick={() => handleQuantityChange("+", item._id)}
                  style={{
                    width: "12%",
                  }}
                >
                  +
                </button>
              </>
            ) : (
              <>
                <button
                  className="cart-item-decrease-button"
                  onClick={() => handleQuantityChange("-", item._id)}
                  style={{
                    marginLeft: "32%",
                    width: "12%",
                    marginTop: "1%",
                    marginBottom: "4%",
                  }}
                  disabled
                >
                  -
                </button>
                <input
                  type="text"
                  name="cart-quantity"
                  id="cart-quantity"
                  value={item.quantity}
                  style={{
                    width: "12%",
                    height: "26px",
                    outline: "none",
                    border: "1px solid grey",
                    fontSize: "18px",
                    textAlign: "center",
                  }}
                  disabled
                />
                <button
                  className="cart-item-icrease-button"
                  onClick={() => handleQuantityChange("+", item._id)}
                  style={{
                    width: "12%",
                  }}
                  disabled
                >
                  +
                </button>
                <div
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "fit-content",
                    marginTop: "1%",
                    marginBottom: "4%",
                    fontSize: "25px",
                  }}
                >
                  Out Of Stock
                </div>
              </>
            )}
            <div>
              <div
                style={{
                  width: "fitContent",
                  marginTop: "10%",
                  marginLeft: "2%",
                  fontSize: "150%",
                  fontFamily: "sans-serif",
                }}
              >
                Subtotal : {subTotal} ₹
              </div>
            </div>
            <button
              className="remove-item-cart-button"
              onClick={() => {
                handleRemoveButton(item._id);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </Card>
    </Grid>
  );
}

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("user"));
  const [page, setPage] = useState(1);
  const [paymentOption, setPaymentOption] = useState("cod");

  const [emailVerPage, setEmailVerPage] = useState(false);
  const [mainClass, setMainClass] = useState("cart-payment-details");

  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.productsForClient);
  const { orderId, isPlaced, isPlacing } = useSelector((state) => state.order);
  const { _id, email, emailVerified, address, name, phoneNumber } = user.user;
  const [deliveryAddress, setDeliveryAddress] = useState({});

  const [newAddress, setAddressNew] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    if (user) {
      dispatch(fetchCart(userId));
    }

    if (isPlaced) {
      alert("Order Placed Successfully");
      navigate("/myorders");
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isPlaced]);

  let totalAmount = 0;

  for (let index = 0; index < cart.length; index++) {
    if (cart[index].prodQuantity !== 0) {
      totalAmount = totalAmount + cart[index].quantity * cart[index].prodPrice;
    }
  }

  totalAmount = totalAmount.toLocaleString("en-IN");

  const userId = user?.user._id;

  const handleCheckout = () => {
    setPage(!page);
  };

  const handlePaymentButton = () => {
    let checkoutData = [];

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

    if (paymentOption === "") {
      alert("Select Payment Option");
    } else {
      for (let index = 0; index < cart.length; index++) {
        if (cart[index].prodQuantity !== 0) {
          const newData = {
            userId,
            productId: cart[index]._id,
            prodImage: cart[index].prodImage,
            prodName: cart[index].prodName,
            quantity: cart[index].quantity,
            productPrice: cart[index].prodPrice,
            paymentOption,
            deliveryAddress: deliveryAddress,
          };
          checkoutData.push(newData);
        }
      }

      if (!emailVerified) {
        setEmailVerPage(true);

        if (!emailVerPage) {
          setMainClass("blur-cart-payment-details");
        }
      } else {
        dispatch(placeOrder(checkoutData));
      }
    }
  };

  return (
    <>
      {cart.length !== 0 ? (
        page ? (
          <>
            <div className="cart-table-title">Cart</div>
            <div style={{ border: "0px solid black", display: "flex" }}>
              <div className="cart-product-card">
                <Grid container rowSpacing={1}>
                  {cart.map((item) => {
                    return <ProductCard item={item} />;
                  })}
                </Grid>
              </div>
              <div className="cart-grand-total">
                <div className="grand-total-summary-title">Summary :</div>
                <div style={{ display: "flex", marginTop: "10px" }}>
                  <div className="total-title">Total :</div>
                  <div className="total-value">{totalAmount} ₹</div>
                </div>
                <div style={{ display: "flex" }}>
                  <div className="shipping-charge-title">Shipping Charge :</div>
                  <div className="shipping-charge-value">0 ₹</div>
                </div>
                <hr style={{ marginTop: "20px" }} />
                <div style={{ display: "flex" }}>
                  <div className="grand-total-title">Total Amount :</div>
                  <div className="grand-total-value">{totalAmount} ₹</div>
                </div>
                <div className="cart-page-checkout-button">
                  <button className="checkout-button" onClick={handleCheckout}>
                    CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <PaymentDeliveryPage
              handlePaymentButton={handlePaymentButton}
              paymentOption={paymentOption}
              setPaymentOption={setPaymentOption}
              address={address}
              setDeliveryAddress={setDeliveryAddress}
              setAddressNew={setAddressNew}
              newAddress={newAddress}
              mainClass={mainClass}
            />
            {mainClass === "blur-cart-payment-details" ? (
              <></>
            ) : (
              <>
                <div
                  style={{
                    width: "fit-content",
                    marginLeft: "auto",
                    marginRight: "20px",
                    marginTop: "35px",
                  }}
                >
                  <button
                    style={{
                      width: "70px",
                      height: "30px",
                      fontSize: "15px",
                      border: "1px solid black",
                      backgroundColor: "white",
                      fontWeight: "bold",
                      opacity: "0.7",
                    }}
                    onClick={handleCheckout}
                  >
                    Back
                  </button>
                </div>
              </>
            )}

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
        )
      ) : (
        <>
          <div align="center">
            <h1>Cart is Empty</h1>
          </div>
        </>
      )}
    </>
  );
}

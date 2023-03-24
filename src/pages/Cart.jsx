/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import "./Cart.css";
import {
  fetchCart,
  removeFromCart,
  reset,
  updateCartQuantity,
} from "../features/productsForClient/productsForClientSlice";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../features/order/orderSlice";

function PaymentDeliveryPage({
  handlePaymentButton,
  paymentOption,
  setPaymentOption,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product } = useSelector((state) => state.productsForClient);
  const { user } = useSelector((state) => state.auth);

  const handleChange = (event) => {
    setPaymentOption(event.target.value);
  };

  return (
    <>
      <div
        style={{
          border: "1px solid black",
          width: "99.9%",
          height: "fit-content",
          paddingBottom: "20px",
          display: "flex",
        }}
      >
        <div className="delivery-address-div">
          <div className="delivery-address-title-div">Shipping Details :</div>
          <div className="delivery-address-content">
            <div
              className="delivery-address-name"
              style={{ marginTop: "10px", padding: "2px" }}
            >
              Name : {user.user.name}
            </div>
            <div
              className="delivery-address-email"
              style={{ marginTop: "10px" }}
            >
              Email : {user.user.email}
            </div>
            <div
              className="delivery-address-address"
              style={{ marginTop: "10px" }}
            >
              Address : {user.user.address.street}
            </div>
            <div style={{ display: "flex" }}>
              <div
                className="delivery-address-city"
                style={{ marginTop: "10px" }}
              >
                City : {user.user.address.city}
              </div>
              <div
                className="delivery-address-state"
                style={{ marginTop: "10px", marginLeft: "40px" }}
              >
                State : {user.user.address.state}
              </div>
            </div>
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
                onChange={handleChange}
                className="payment-select-payment-page"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="COD">Cash On Delivery</MenuItem>
                <MenuItem value="UPI">UPI ID</MenuItem>
                <MenuItem value="CARD">
                  Pay with Credit Card/Debit Card/ ATM Card
                </MenuItem>
              </Select>
            </div>
            <div style={{ marginTop: "21px" }}>
              {paymentOption === "CARD" ? (
                <>
                  <div style={{ display: "flex" }}>
                    <div className="card-holder-name">
                      Card Holder Name
                      <br />
                      <input type="text" />
                    </div>
                    <div className="card-number">
                      Card Number
                      <br />
                      <input type="text" />
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div className="card-expiry-date-year">
                      Enter Exp Month & Year (mm/yyyy)
                      <br />
                      <input type="text" />
                    </div>
                    <div className="card-cvv-number">
                      Enter CVV
                      <br />
                      <input type="text" />
                    </div>
                  </div>
                </>
              ) : paymentOption === "COD" ? (
                <></>
              ) : paymentOption === "UPI" ? (
                <div>
                  <div className="upi-payment-info">
                    Enter UPI ID :
                    <br />
                    <input type="text" />
                  </div>
                </div>
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
    <Grid item xl={9} style={{ marginLeft: "11.5%" }}>
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

  const [page, setPage] = useState(1);
  const [paymentOption, setPaymentOption] = useState("COD");

  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.productsForClient);
  const { orderId, isPlaced, isPlacing } = useSelector((state) => state.order);

  let totalAmount = 0;

  for (let index = 0; index < cart.length; index++) {
    if (cart[index].prodQuantity !== 0) {
      totalAmount = totalAmount + cart[index].quantity * cart[index].prodPrice;
    }
  }

  totalAmount = totalAmount.toLocaleString("en-IN");

  // console.log(paymentOption);

  const userId = user.user._id;

  console.log("cart :", cart.length);

  const handleCheckout = () => {
    setPage(!page);
  };

  const handlePaymentButton = () => {
    // const userId = user.user._id;

    let checkoutData = [];

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
        };
        checkoutData.push(newData);
      }
    }

    console.log("User CheckOut : ", checkoutData);

    dispatch(placeOrder(checkoutData));
    console.log("Clicked Payment Button in Payment Page...");
  };

  useEffect(() => {
    if (user) {
      // console.log("User : ", user)
      dispatch(fetchCart(userId));
    }

    if (isPlaced) {
      alert("Order Placed Successfully");
      // console.log("Your Order Id is ", orderId.orderId)
      navigate("/myorders");
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isPlaced]);

  return (
    <>
      {cart.length !== 0 ? (
        page ? (
          <>
            <div className="buyers-orders-table-title">Cart</div>
            <Box sx={{ width: "100%", marginTop: "20px" }}>
              <Grid container rowSpacing={1}>
                {cart.map((item) => {
                  return <ProductCard item={item} />;
                })}
              </Grid>
            </Box>
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
          </>
        ) : (
          <>
            <PaymentDeliveryPage
              handlePaymentButton={handlePaymentButton}
              paymentOption={paymentOption}
              setPaymentOption={setPaymentOption}
            />
            <div
              style={{
                width: "fit-content",
                marginLeft: "auto",
                marginRight: "20px",
                marginTop: "50px",
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

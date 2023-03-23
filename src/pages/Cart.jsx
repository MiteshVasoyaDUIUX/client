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
  Typography,
} from "@mui/material";
import "./Cart.css";
import {
  fetchCart,
  updateCartQuantity,
} from "../features/productsForClient/productsForClientSlice";

const columns = [
  {
    id: "_id",
    label: "Order ID",
    titleAlign: "center",
  },
  {
    id: "prodName",
    label: "Product Name",
    titleAlign: "center",
  },
  {
    id: "quantity",
    label: "Quantity",
    titleAlign: "center",
    valueAlign: "center",
  },
];

function ProductCard({ item, setCart }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [quantity, setQuantity] = useState(item.quantity);
  let subTotal = item.prodPrice * quantity;
  subTotal = subTotal.toLocaleString("en-IN");

  let cartObj = [];

  const handleRemoveButton = (id) => {
    const productId = [id, quantity];

    setCart(productId);
    // console.log("Remove Button is Clicked...", cartObj);
  };

  const handleQuantityChange = (sign, id) => {
    switch (sign) {
      case "+":
        {
          quantity < 10
            ? setQuantity(quantity + 1)
            : window.alert("You can Select Max 10 Quantity...");

          //Update Cart Quantity...
          const newData = {
            userId: user.user._id,
            productId: id,
            newQuantity: quantity + 1,
          };
          dispatch(updateCartQuantity(newData));
          // console.log(quantity + 1);
        }
        break;
      case "-":
        {
          quantity > 1 ? setQuantity(quantity - 1) : setQuantity(quantity);
          console.log(sign, id);
          const newData = {
            userId: user.user._id,
            productId: id,
            newQuantity: quantity - 1,
          };
          dispatch(updateCartQuantity(newData));
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
            <div>
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
                value={quantity}
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

  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.productsForClient);
  const [cartData, setCartData] = useState([]);

  let totalAmount = 0;

  for (let index = 0; index < cart.length; index++) {
    totalAmount = totalAmount + cart[index].quantity * cart[index].prodPrice;
  }

  totalAmount = totalAmount.toLocaleString("en-IN");

  console.log(totalAmount);

  const userId = user.user._id;

  console.log("cart :", cart);
  const setCart = (newData) => {
    for (let i = 0; i < 5; i++) {
      if (!cartData[i][0].includes("s")) {
        console.log("Includes");
        console.log("Final Cart : ", cartData);
      } else {
        setCartData([...cartData, newData]);
      }
    }
    console.log("Final Cart : ", cartData);
  };

  const handleCheckout = () => {
    //Navigate to Payment Page...
  }

  useEffect(() => {
    if (user) {
      // console.log("User : ", user)
      dispatch(fetchCart(userId));
    }
  }, [dispatch, cartData]);

  return (
    <>
      <div className="buyers-orders-table-title">Cart</div>
      <Box sx={{ width: "100%", marginTop: "20px" }}>
        <Grid container rowSpacing={1}>
          {cart.map((item) => {
            return <ProductCard item={item} setCart={setCart} />;
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
          <button className="checkout-button" onClick={handleCheckout}>CHECKOUT</button>
        </div>
      </div>
    </>
  );
}

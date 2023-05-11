/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
/* eslint-disable no-lone-blocks */
import { IconButton, Rating } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Images from "../../components/Images/Images";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { TextField } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavouriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { toast } from "react-toastify";
import { fetchOneProduct } from "../../features/products/productsSlice";
import Tooltip from "@mui/material/Tooltip";
import {
  addToCart,
  addToWishList,
  applyCoupon,
  fetchWishList,
  reset,
  resetCoupon,
  resetIs,
} from "../../features/user/userSlice";
import "./DetailedProductPage.css";

function DetailedProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const [wishList, setWishList] = useState(false);
  const [quantity, setQuantity] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { wishlist, coupon, userSliceMessage } = useSelector(
    (state) => state.user
  );
  const { product, isAddedCart, isError, productMessage } = useSelector(
    (state) => state.products
  );
  const productId = params.id;
  let outOfStock;
  let couponData;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    dispatch(fetchOneProduct(productId));

    if (user) {
      const userId = user.user._id;
      dispatch(fetchWishList(userId));
    }
    if (isError) {
      toast.error("Error : " + productMessage);
    }

    return () => {
      reset();
    };
  }, [isError]);

  useEffect(() => {
    if (isAddedCart) {
      toast.success(userSliceMessage);
    }

    return () => {
      dispatch(resetIs());
    };
  }, [isAddedCart]);

  // if (product.prodQuantity === 0) {
  //   outOfStock = 0;
  // } else {
  //   outOfStock = 1;
  // }

  const handleQuantityChange = (sign) => {
    switch (sign) {
      case "+":
        {
          quantity < 15
            ? setQuantity(quantity + 1)
            : window.alert("You can Select Max 15 Quantity...");
        }
        break;
      case "-":
        {
          quantity > 1 ? setQuantity(quantity - 1) : setQuantity(quantity);
        }
        break;
    }
  };

  const handleWishListButton = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (user) {
      setWishList(!wishList);
      const productId = product._id;
      const userData = user;
      const userId = userData.user._id;
      const data = {
        userId,
        productId,
      };
      dispatch(addToWishList(data));
    } else {
      toast.error("Not LoggedIn");
    }
  };

  const handleCartButton = () => {
    if (user) {
      const userData = user;
      const userId = userData.user._id;
      const data = {
        userId,
        productId,
      };
      dispatch(addToCart(data));
    } else {
      toast.error("Not Logged In");
    }
  };

  const handleBuyNowButton = () => {
    if (product.prodQuantity !== 0 && quantity <= product.prodQuantity) {
      if (user) {
        navigate(`/product/placeorder/${productId}&${quantity}&${couponCode}`);
      } else {
        navigate("/login", { state: { from: location.pathname } });
      }
    } else {
      alert("Currently Product is out of stock...");
    }
  };

  const handleApplyCouponButton = () => {
    if (couponCode !== "") {
      setCouponApplied(true);
      dispatch(applyCoupon(couponCode));
      couponData = coupon;
    } else {
      alert("Enter Coupon Code...");
    }
  };

  const handleCouponChanges = (e) => {
    setCouponCode(e.target.value);
  };

  return (
    <>
      <ErrorBoundary>
        <div className="details-page">
          <div className="detailed-page-image">
            <Images prodImage={product.prodImage} />
          </div>

          <div className="page-details">
            <div style={{ display: "flex" }}>
              <Tooltip title={product.prodName} placement="top">
                <div className="detailed-page-title">
                  {product.prodName}
                  {/* <span className="title-tooltiptext">{product.prodName}</span> */}
                </div>
              </Tooltip>
              <div className="detailed-page-wishlist-button">
                <IconButton onClick={handleWishListButton}>
                  {wishlist.includes(product._id) ? (
                    <FavouriteRoundedIcon
                      color="error"
                      sx={{ fontSize: "40px" }}
                    />
                  ) : (
                    <FavoriteBorderIcon sx={{ fontSize: "40px" }} />
                  )}
                </IconButton>
              </div>
            </div>
            <div className="detailed-page-rating">
              <div style={{ marginRight: "10px", marginTop: "0px" }}>
                {product.rating !== undefined ? (
                  <>
                    <div style={{ display: "flex" }}>
                      <Rating
                        name="read-only"
                        value={product.rating}
                        readOnly
                      />{" "}
                      <div
                        style={{
                          fontSize: "14px",
                          marginTop: "auto",
                          marginBottom: "auto",
                          marginLeft: "7px",
                        }}
                      >
                        ({product.reviews.length} Reviews)
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div className="detailed-page-price">
                Price : {product.prodPrice?.toLocaleString("en-IN")} ₹
              </div>
              <div className="detailed-page-mrp">
                MRP : {product.prodMRP?.toLocaleString("en-IN")} ₹
              </div>
              <div className="detailed-page-discount">
                -
                {Math.floor(
                  ((product.prodMRP - product.prodPrice) * 100) /
                    product.prodMRP
                )}
                %
              </div>
            </div>
            <div className="detailed-page-description">
              <h2>Description :</h2>
              <ul>
                <li style={{ margin: "5px" }}>{product.prodDesc}</li>
              </ul>
            </div>
            <br />

            <div className="detailed-page-offers">
              <h2>Offers : </h2>
              <div style={{ display: "flex" }}>
                <div className="offers-card">
                  <b style={{ marginTop: "3px", fontSize: "15px" }}>
                    {" "}
                    Bank Offer{" "}
                  </b>
                  <p style={{ marginTop: "5px" }}>
                    Upto ₹3,000.00 discount on select Credit Cards, HDFC Bank
                    Debit Cards Upto ₹3,000.00 discount on select Credit Cards
                  </p>
                </div>
                <div className="offers-card">
                  <b style={{ marginTop: "3px", fontSize: "15px" }}>
                    Partner Offers
                  </b>
                  <p style={{ marginTop: "5px" }}>
                    Get GST invoice and save up to 28% on business purchases.
                    Sign up for freeGet GST invoice and save up to 28% on
                    business purchases.
                  </p>
                </div>
                <div className="offers-card">
                  <b style={{ marginTop: "3px", fontSize: "15px" }}>
                    No Cost EMI
                  </b>
                  <p style={{ marginTop: "5px" }}>
                    ₹ {(product.prodPrice / 12)?.toFixed(2)} EMI for 12 Months
                    on selected HDFC, ICICI, SBI, Axis Bank's Credit and Debit
                    Cards
                  </p>
                </div>
              </div>
            </div>

            <hr
              style={{ width: "750px", marginLeft: "30px", marginTop: "35px" }}
            />
            <div className="detail-page-features">
              <div className="replacement-feature">
                <img
                  src="data:image/png;base64,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"
                  style={{
                    height: "42%",
                    width: "44%",
                    marginLeft: "28%",
                    marginRight: "auto",
                  }}
                  alt=""
                />
                <p style={{ textAlign: "center", marginTop: "4px" }}>
                  7 Days Replacement
                </p>
              </div>
              <div className="free-delivery-feature">
                <img
                  src="data:image/png;base64,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AH5N/etvEfAN4OXEjqWT+ZGxFbH08DOUW9a3rrYEH/0PpM3LRNrmtcTOXm1yFVEzfwFx4d1EPDG4i5hDMIfI8Hdd1XZb9d+1xULi1cMltQORKtid2MynTdfk7cQ95f+I3VGvJe4ntxMrdMbuKdsT95S/on0rDV7N8OyPoBb5HPWz22FpK4knGVKfHUqdeTfD2r44scMvDW4W8W6p9kk+DO2tEzz20rB6B/Wvx2FovyG2KZfS7ED+xh7D3r6JlbmkMSPAqdS/LrvcrgW2m+iBlyZjL+J9e+2Tvovtp1jtT7q32cTM/NrXZxfbrUT9EqmYfYmJMbVP/i61tk14ktpkY2JVTO3rtEvtDuCxkznY0lQ9kXYspetCu4CoCCZp7eZSt+5Il9pi2r2Rmnrg8UTVvtoXQ5vbOcAWkzy+Ut9sRtlNuLrYbiaKo0nV7UGsma19UbSxfYt4vylpcDOBk6l//baxXUW5csbSQLYm9p2ufXG0qX0Gq/xJkzUd+Bj1r+M2tYtwtr9aaiPgy9S/SGq3O4lqXJKm7nnUravflvZ1Yv8SqdX6fMFejI/npKbtTvz6rX1912j+oFDn7EX/LtjP0fzuYpLCHGKXvdrXecl2IW4Vro6aQWSud1D/QspslwJPaeiYSVq3xxNP2mpf95ltMfB2YP1GjphU0c7A96h/UTXdlgIfwcp+UmmziS/INmxT3nQ7k9i5VBoqBzMcKwWWE48iH9Ds4ZE0QbsSE49XUP++MNX2a+CpzR4eqV2m0d1EYCXwHZzkJ7XNg4ikvIuJwHzgcOLeKPXCCHAI8D+0/6K9FTiOuMlIaq89gP8EbqP+fWNdbQXw38DTcGdQ9dzOwPuAa6h/Ya7ezgWOwXf8UtdsBLwEOI/695HV2zXAe4Gd8oYuddMIsA8xuef31MnKfwq8kXi3KKn7diCSge8QE3dL31cuIyYLPwkrg7aK71zabXdiq8v9iO2Hd6PZf7MlxMSbc4CfA2cBNzbYv6R22QJ4HPBo4p6yDzCrwf5HiSWK5wC/IH5Q/L7B/tUgE4Bu2QzYk3hlsDPxGG0nojzmBqv+7+xV//lW4gt+8ar/fCOwgMjGx9qFwLKiI5DUJusT95RdiHvJ2L1lc2Jr4g2IBGEucS+5k5hfsAhYyN33lLH/eyGxO6okSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIk3cP/B05HB8YrufVjAAAAAElFTkSuQmCC"
                  style={{
                    height: "42%",
                    width: "44%",
                    marginLeft: "28%",
                    marginRight: "auto",
                  }}
                  alt=""
                />
                <p style={{ textAlign: "center" }}>Free Delivery</p>
              </div>
              <div className="warranty-policy-feature">
                <img
                  src="data:image/png;base64,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"
                  style={{
                    height: "42%",
                    width: "44%",
                    marginLeft: "28%",
                    marginRight: "auto",
                  }}
                  alt=""
                />
                <p style={{ textAlign: "center", marginTop: "4px" }}>
                  Warranty Policy
                </p>
              </div>
              <div className="good-discount-feature">
                <img
                  src="data:image/png;base64,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"
                  style={{
                    height: "42%",
                    width: "44%",
                    marginLeft: "28%",
                    marginRight: "auto",
                  }}
                  alt=""
                />
                <p style={{ textAlign: "center", marginTop: "4px" }}>
                  Discount
                </p>
              </div>
            </div>
          </div>

          <div className="order-details-card">
            <div className="product-stock">
              {product.prodQuantity === 0 ? (
                <div style={{ color: "rgb(207, 10, 10)" }}>Out Of Stock</div>
              ) : product.prodQuantity < 5 ? (
                <div style={{ color: "#379237", fontSize: "19px" }}>
                  Hurry Up, Only {product.prodQuantity} left in Stock...
                </div>
              ) : (
                <>
                  <div style={{ color: "#379237" }}>In Stock</div>
                </>
              )}
            </div>
            <div className="detailed-page-quantity">
              {product.prodQuantity !== 0 ? (
                <>
                  <div style={{ width: "120px", marginTop: "2px" }}>
                    Quantity :
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div style={{ width: "150px" }}>
                    <button
                      id="quantity-decrease"
                      onClick={() => handleQuantityChange("-")}
                      disabled={product.prodQuantity === 0}
                    >
                      ‒
                    </button>
                    <input
                      type="text"
                      name="quantity"
                      id="quantity-text-field"
                      value={quantity}
                      max="10"
                      readOnly
                    />
                    <button
                      id="quantity-increase"
                      onClick={() => handleQuantityChange("+")}
                      disabled={
                        product.prodQuantity === 0 ||
                        quantity >= product.prodQuantity
                      }
                    >
                      +
                    </button>
                  </div>
                </>
              ) : (
                "Stay Tuned For more update..."
              )}
            </div>
            <div className="total-amount">
              <div style={{ width: "fitContent", marginTop: "1%" }}>
                {user ? (
                  <>
                    <div className="coupon-code-div">
                      <TextField
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "40px",
                            width: "230px",
                            backgroundColor: "white",
                            border: "1px solid black",
                            borderRadius: "0",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                        }}
                        className="coupon-code-text"
                        variant="outlined"
                        placeholder="Enter Coupon Code"
                        value={couponCode}
                        onChange={handleCouponChanges}
                      />
                      <input
                        type="button"
                        value="Apply"
                        onClick={handleApplyCouponButton}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {couponData?.discount !== undefined ? (
                  <>
                    <div className="coupon-applied-div">
                      <div>{coupon.message}</div>
                      <br />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>Subtotal :</div>
                        <div>
                          {(product.prodPrice * quantity)?.toLocaleString(
                            "en-IN"
                          )}{" "}
                          ₹
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>Coupon Discount :</div>
                        <div>{coupon.discount} %</div>
                      </div>
                      <hr />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>Total : </div>
                        <div>
                          {Math.ceil(
                            (product.prodPrice *
                              quantity *
                              (100 - coupon.discount)) /
                              100
                          )?.toLocaleString("en-IN")}{" "}
                          ₹
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {outOfStock !== 0 ? (
                      <>
                        Total &nbsp;: &nbsp;
                        {(product.prodPrice * quantity)?.toLocaleString(
                          "en-IN"
                        )}{" "}
                        ₹
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
            </div>

            {/* {openCouponBox ? (
              <>
                <div className="coupon-code-div">
                  <TextField
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "40px",
                        width: "230px",
                        // marginLeft: "25px",
                        // marginRight: "0",
                        backgroundColor: "white",
                        borderRadius : "0"
                      },
                    }}
                    className="coupon-code-text"
                    variant="outlined"
                    placeholder="Enter Coupon Code"
                    value={couponCode}
                    onChange={handleCouponChanges}
                  />
                  <input
                    type="button"
                    value="Apply"
                    onClick={handleApplyCouponButton}
                  />
                  <div className="coupon-code-div-buttons">
                    {showApplyCouponBtn ? (
                      <>
                        <input
                          type="button"
                          value="Apply"
                          onClick={handleApplyCouponButton}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                    <input
                      type="button"
                      value="cancel"
                      onClick={handleCouponBox}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  className="detailed-page-coupon-code"
                  onClick={handleCouponBox}
                >
                  Have Coupon Code ? Apply
                </div>
              </>
            )} */}
            <div className="prod-detailed-page-btn">
              <button id="add-to-cart-button" onClick={handleCartButton}>
                Add To Cart
              </button>
              <button id="buy-now-button" onClick={handleBuyNowButton}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}

export default DetailedProductPage;

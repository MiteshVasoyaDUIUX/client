import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Wishlist.css";
import { fetchWishListProducts } from "../../features/productsForClient/productsForClientSlice";

function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { wishlistProducts, isAddedCart, isError, message } = useSelector(
    (state) => state.productsForClient
  );

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    if (user) {
      const userId = user.user._id;
      dispatch(fetchWishListProducts(userId));
    }
  }, []);


  console.log("Wishlist : ", wishlistProducts)
  return (
    <>
      {wishlistProducts.map((wishlist) => {
      //   console.log("WishList : ", wishlist);
      //   return <div>{wishlist}</div>;
      })}
    </>
  );
}

export default Wishlist;

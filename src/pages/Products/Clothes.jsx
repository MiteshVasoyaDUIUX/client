import React, { useEffect, useState } from "react";
import "../Products/Clothes.css";
import { fetchProducts } from "../../features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";

import Filter from "../../components/Filter";
import { ProductCardsGrid } from "../../components/ProductCardGrid";
import { toast } from "react-toastify";
import { reset } from "../../features/user/userSlice";

function ClothesItem({ newProdArray }) {
  return (
    <>
      <div>
        <h1 id="menswear-title">Menswear</h1>
      </div>
      <div
        className="productCards"
        style={{ width: "90%", marginLeft: "10px", marginTop: "40px" }}
      >
        <ProductCardsGrid products={newProdArray} />
      </div>
    </>
  );
}

const filterByRating = (ratingValue, prodArray) => {
  let filteredArray = [];
  prodArray.map((product) => {
    if (product.rating >= ratingValue) {
      filteredArray.push(product);
    }
  });
  return filteredArray;
};

const filterByPrice = (lower, upper, prodArray) => {
  let filteredArray = [];
  prodArray.map((product) => {
    if (product.prodPrice > lower && product.prodPrice < upper) {
      filteredArray.push(product);
    }
  });
  return filteredArray;
};

const filterByPODEligibility = (prodArray) => {
  let filteredArray = [];
  prodArray.map((product) => {
    let paymentType = product.paymentType;
    if (paymentType.includes("COD")) {
      filteredArray.push(product);
    }
  });
  return filteredArray;
};

const filterByDiscount = (discount, prodArray) => {
  let filteredArray = [];
  prodArray.map((product) => {
    if (product.discount > discount) {
      filteredArray.push(product);
    }
  });
  return filteredArray;
};

function Clothes() {
  const dispatch = useDispatch();
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  const {isAddedCart, userSliceMessage} = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchProducts());
    if (isError) {
      toast.error(message);
    }

    if(isAddedCart) {
      toast.success(userSliceMessage);
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, dispatch, isAddedCart]);

  const [priceSliderValue, setPriceSliderValue] = useState([100, 200000]);
  const [ratingValue, setRatingValue] = useState();
  const [PODEligibility, setPODEligibility] = useState(false);
  const [discount, setDiscount] = useState();
  const [includeOutOfStock, setIncludeOutOfStock] = useState(false);
  let clothes = [];
  let newProdArray = [];

  if (products.length > 0) {
    products.map((product) => {
      let category = product.prodCategory;

      if (includeOutOfStock) {
        if (
          category.includes("clothes") ||
          category.includes("Clothes") ||
          category.includes("cloth") ||
          category.includes("Cloth")
        ) {
          clothes.push(product);
        }
      } else {
        if (
          (category.includes("clothes") ||
            category.includes("Clothes") ||
            category.includes("cloth") ||
            category.includes("Cloth")) &&
          product.prodQuantity > 0
        ) {
          clothes.push(product);
        }
      }
    });

    if (ratingValue) {
      newProdArray = filterByRating(ratingValue, clothes);
    } else {
      newProdArray = clothes;
    }

    if (priceSliderValue) {
      newProdArray = filterByPrice(
        priceSliderValue[0],
        priceSliderValue[1],
        newProdArray
      );
    }

    if (PODEligibility) {
      newProdArray = filterByPODEligibility(newProdArray);
    }

    if (discount) {
      newProdArray = filterByDiscount(discount, newProdArray);
    }
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <Filter
          priceSliderValue={priceSliderValue}
          setPriceSliderValue={setPriceSliderValue}
          ratingValue={ratingValue}
          setRatingValue={setRatingValue}
          PODEligibility={PODEligibility}
          setPODEligibility={setPODEligibility}
          discount={discount}
          setDiscount={setDiscount}
          includeOutOfStock={includeOutOfStock}
          setIncludeOutOfStock={setIncludeOutOfStock}
        />
        <div style={{ marginLeft: "100px", width: "fitContent" }}>
          <ClothesItem newProdArray={newProdArray} />
        </div>
      </div>
    </>
  );
}

export default Clothes;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchTrendingProducts,
  reset,
} from "../../features/products/productsSlice";
import discountCalcFunc from "../../../src/app/discountCalcFunc";
import Filter from "../../components/Filter";
import { ProductCardsGrid } from "../../components/ProductCardGrid";

import "./Accessories.css";

function AccessoriesItems({ newProdArray }) {
  return (
    <>
      <div>
        <h1 id="accessories-title">Trending Products</h1>
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
    if (paymentType?.includes("COD")) {
      filteredArray.push(product);
    }
  });
  return filteredArray;
};

const filterByDiscount = (discount, prodArray) => {
  let filteredArray = [];
  prodArray.map((product) => {
    const CalcDiscount = discountCalcFunc(product.prodPrice, product.prodMRP);
    if (Number(CalcDiscount) >= Number(discount)) {
      filteredArray.push(product);
    }
  });
  return filteredArray;
};

function Accessories() {
  const dispatch = useDispatch();
  const { products, isLoading, isError, productMessage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchTrendingProducts());
    if (isError) {
      // toast.error(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, dispatch]);

  const [priceSliderValue, setPriceSliderValue] = useState([100, 200000]);
  const [ratingValue, setRatingValue] = useState(0);
  const [PODEligibility, setPODEligibility] = useState(false);
  const [discount, setDiscount] = useState();
  const [includeOutOfStock, setIncludeOutOfStock] = useState(false);
  let newProdArray = [];

  if (products.length > 0) {
    

    if (ratingValue) {
      newProdArray = filterByRating(ratingValue, products);
    } else {
      newProdArray = products;
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
          <AccessoriesItems newProdArray={newProdArray} />
        </div>
      </div>
    </>
  );
}
export default Accessories;

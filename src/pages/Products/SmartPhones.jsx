import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, reset } from "../../features/products/productsSlice";
import Filter from "../../components/Filter";
import { ProductCardsGrid } from "../../components/ProductCardGrid";
import discountCalcFunc from "../../../src/app/discountCalcFunc";
import "./SmartPhones.css";
import { resetIs } from "../../features/user/userSlice";
import { toast } from "react-toastify";

function OtherProductsItem({ newProdArray, wishlist }) {
  return (
    <>
      <div>
        <h1 id="smartphones-title">Smart Phones</h1>
      </div>
      <div
        className="productCards"
        style={{ width: "90%", marginLeft: "10px", marginTop: "40px" }}
      >
        <ProductCardsGrid products={newProdArray} wishlist={wishlist} />
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
    const CalcDiscount = discountCalcFunc(product.prodPrice, product.prodMRP);
    if (Number(CalcDiscount) >= Number(discount)) {
      filteredArray.push(product);
    }
  });
  return filteredArray;
};

function SmartPhones() {
  const [priceSliderValue, setPriceSliderValue] = useState([100, 200000]);
  const [ratingValue, setRatingValue] = useState();
  const [PODEligibility, setPODEligibility] = useState(false);
  const [discount, setDiscount] = useState();
  const [includeOutOfStock, setIncludeOutOfStock] = useState(false);
  let otherProducts = [];
  let newProdArray = [];

  const dispatch = useDispatch();
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  const { wishlist, isAddedCart, userSliceMessage } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isError) {
      toast.error(message || userSliceMessage);
    }

    if (products) {
      dispatch(fetchProducts());
    }
  }, [isError, dispatch]);

  useEffect(() => {
    if (isAddedCart) {
      toast.success(userSliceMessage);
    }

    return () => {
      dispatch(resetIs());
    };
  }, [isAddedCart]);

  if (products.length > 0) {
    products.map((product) => {
      let category = product.prodCategory;

      if (includeOutOfStock) {
        if (category.includes("Phone") || category.includes("phones")) {
          otherProducts.push(product);
        }
      } else {
        if (
          (category.includes("Phone") || category.includes("phones")) &&
          product.prodQuantity > 0
        ) {
          otherProducts.push(product);
        }
      }
    });

    if (ratingValue) {
      newProdArray = filterByRating(ratingValue, otherProducts);
    } else {
      newProdArray = otherProducts;
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
          <OtherProductsItem newProdArray={newProdArray} wishlist={wishlist} />
        </div>
      </div>
    </>
  );
}

export default SmartPhones;

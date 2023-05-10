import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, reset } from "../../features/products/productsSlice";
import Filter from "../../components/Filter";
import { ProductCardsGrid } from "../../components/ProductCardGrid";
import discountCalcFunc from "../../../src/app/discountCalcFunc";
import "./SmartPhones.css";
import { resetIs } from "../../features/user/userSlice";
import { toast } from "react-toastify";

function SmartPhonesItem({ filteredProductArray, wishlist }) {
  return (
    <>
      <div>
        <h1 id="smartphones-title">Smart Phones</h1>
      </div>
      <div
        className="productCards"
        style={{ width: "90%", marginLeft: "10px", marginTop: "40px" }}
      >
        <ProductCardsGrid products={filteredProductArray} wishlist={wishlist} />
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
  const dispatch = useDispatch();

  // const [priceSliderValue, setPriceSliderValue] = useState([100, 200000]);
  // const [ratingValue, setRatingValue] = useState(0);
  // const [PODEligibility, setPODEligibility] = useState(false);
  // const [discount, setDiscount] = useState();
  // const [includeOutOfStock, setIncludeOutOfStock] = useState(false);

  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);

  const { products, isLoading, isError, productMessage } = useSelector(
    (state) => state.products
  );
  const { wishlist, isAddedCart, userSliceMessage } = useSelector(
    (state) => state.user
  );

  let productArray = [];
  let filteredProductArray = [];

  let productReqData = {
    page: 1,
    category: "smart phones",
  };

  const fetchProductData = () => {
    dispatch(fetchProducts(productReqData));
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(productMessage || userSliceMessage);
  //   }
  // }, [isError, dispatch]);

  useEffect(() => {
    if (isAddedCart) {
      toast.success(userSliceMessage);
    }

    if (products) {
      const prod = products.products;
      setProduct((prev) => [...prev, ...products.products]);
      console.log("Products : ", prod);
    }

    return () => {
      dispatch(resetIs());
    };
  }, [isAddedCart, products]);

  // if (products?.products?.length > 0) {
  //   product.map((product) => {
  //     if (includeOutOfStock) {
  //       productArray.push(product);
  //     } else {
  //       if (product.prodQuantity > 0) {
  //         productArray.push(product);
  //       }
  //     }
  //   });

  //   if (ratingValue) {
  //     filteredProductArray = filterByRating(ratingValue, productArray);
  //   } else {
  //     filteredProductArray = productArray;
  //   }

  //   if (priceSliderValue) {
  //     filteredProductArray = filterByPrice(
  //       priceSliderValue[0],
  //       priceSliderValue[1],
  //       filteredProductArray
  //     );
  //   }

  //   if (PODEligibility) {
  //     filteredProductArray = filterByPODEligibility(filteredProductArray);
  //   }

  //   if (discount) {
  //     filteredProductArray = filterByDiscount(discount, filteredProductArray);
  //   }
  // }

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        productReqData = {
          page: productReqData.page + 1,
          category: productReqData.category,
        };

        setPage((prev) => prev + 1);

        console.log("Fetching More Products_ : ", products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <Filter
          // priceSliderValue={priceSliderValue}
          // setPriceSliderValue={setPriceSliderValue}
          // ratingValue={ratingValue}
          // setRatingValue={setRatingValue}
          // PODEligibility={PODEligibility}
          // setPODEligibility={setPODEligibility}
          // discount={discount}
          // setDiscount={setDiscount}
          // includeOutOfStock={includeOutOfStock}
          // setIncludeOutOfStock={setIncludeOutOfStock}
        />
        <div
          style={{
            marginLeft: "100px",
            width: "fitContent",
            border: "1px solid black",
          }}
        >
          <SmartPhonesItem
            filteredProductArray={filteredProductArray}
            wishlist={wishlist}
          />
        </div>
      </div>
    </>
  );
}

export default SmartPhones;

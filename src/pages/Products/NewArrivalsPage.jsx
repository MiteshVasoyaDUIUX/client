import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewArrivals, reset } from "../../features/products/productsSlice";
import discountCalcFunc from "../../../src/app/discountCalcFunc";
import Filter from "../../components/Filter";
import { ProductCardsGrid } from "../../components/ProductCardGrid";

import "./Accessories.css";
import { ProductFetchingSpinner } from "../../components/Spinner";

function NewArrivalsProduct({ filteredProductArray }) {
  return (
    <>
      <div>
        <h1 id="accessories-title">New Arrivals</h1>
      </div>
      <div
        className="productCards"
        style={{ width: "90%", marginLeft: "10px", marginTop: "40px" }}
      >
        <ProductCardsGrid products={filteredProductArray} />
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
      console.log("CalcDiscount : ", CalcDiscount, "Discount : ", discount);
      filteredArray.push(product);
    }
  });
  return filteredArray;
};

function NewArrivalsProductsPage() {
  const dispatch = useDispatch();

  const [priceSliderValue, setPriceSliderValue] = useState([100, 200000]);
  const [ratingValue, setRatingValue] = useState(0);
  const [PODEligibility, setPODEligibility] = useState(false);
  const [discount, setDiscount] = useState();
  const [includeOutOfStock, setIncludeOutOfStock] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState([]);
  const [moreProducts, setMoreProducts] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);

  let productArray = [];
  let filteredProductArray = [];

  const { products, isLoading, isFetching, isError, productMessage } =
    useSelector((state) => state.products);

  const { wishlist, isAddedCart, userSliceMessage } = useSelector(
    (state) => state.user
  );

  let prodReqData = {
    page: page,
    // category: "smart phones",
  };

  useEffect(() => {
    if (isFetching) {
      setShowSpinner(true);
    } else {
      setShowSpinner(false);
    }
  }, [isFetching]);

  useEffect(() => {
    fetchProductsData();
  }, [page]);

  useEffect(() => {
    if (products.products?.length > 0) {
      setProduct((prev) => [...prev, ...products.products]);
      setNextPage(products.nextPage);
      setMoreProducts(products.moreProduct);
    }
  }, [products]);

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductsData = () => {
    if (moreProducts) {
      dispatch(fetchNewArrivals(prodReqData));
      prodReqData = {
        page: products.nextPage,
        // category: "smart phones",
      };
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  if (products?.products?.length > 0) {
    product.map((product) => {
      if (includeOutOfStock) {
        productArray.push(product);
      } else {
        if (product.prodQuantity > 0) {
          productArray.push(product);
        }
      }
    });

    if (ratingValue) {
      filteredProductArray = filterByRating(ratingValue, productArray);
    } else {
      filteredProductArray = productArray;
    }

    if (priceSliderValue) {
      filteredProductArray = filterByPrice(
        priceSliderValue[0],
        priceSliderValue[1],
        filteredProductArray
      );
    }

    if (PODEligibility) {
      filteredProductArray = filterByPODEligibility(filteredProductArray);
    }

    if (discount) {
      filteredProductArray = filterByDiscount(discount, filteredProductArray);
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
        <div>
          <div style={{ marginLeft: "100px", width: "fitContent" }}>
            <NewArrivalsProduct filteredProductArray={filteredProductArray} />
          </div>
          {showSpinner ? (
            <>
              <div className="product-fetching-spinner">
                <ProductFetchingSpinner />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
export default NewArrivalsProductsPage;

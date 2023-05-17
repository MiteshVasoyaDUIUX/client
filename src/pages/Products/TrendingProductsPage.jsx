import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrendingProducts,
  reset,
} from "../../features/products/productsSlice";
import discountCalcFunc from "../../../src/app/Functions/discountCalcFunc";
import Filter from "../../components/Filter";
import { ProductCardsGrid } from "../../components/ProductCardGrid";

import "./Accessories.css";
import { ProductFetchingSpinner } from "../../components/Spinner";
import {
  PodFilter,
  discountFilter,
  priceFilter,
  ratingFilter,
} from "../../app/Functions/filterFunc";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { resetIs } from "../../features/user/userSlice";

function TrendingProduct({ filteredProductArray }) {
  return (
    <>
      <div
        className="productCards"
        style={{ width: "90%", marginLeft: "10px", marginTop: "40px" }}
      >
        <ProductCardsGrid products={filteredProductArray} />
      </div>
    </>
  );
}

function TrendingProductsPage() {
  const location = useLocation();
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");

  const [priceSliderValue, setPriceSliderValue] = useState([100, 200000]);
  const [ratingValue, setRatingValue] = useState(null);
  const [PODEligibility, setPODEligibility] = useState(false);
  const [discount, setDiscount] = useState();
  const [includeOutOfStock, setIncludeOutOfStock] = useState(false);
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState([]);
  const [moreProducts, setMoreProducts] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [sortBy, setSortBy] = useState("newArrivals");

  let productArray = [];
  let filteredProductArray = [];

  const { products, isLoading, isFetching, isError, productMessage } =
    useSelector((state) => state.products);

  const { wishlist, isAddedCart, userSliceMessage } = useSelector(
    (state) => state.user
  );

  let prodReqData = {
    page: page,
    // category: category,
    sortBy: sortBy,
  };

  useEffect(() => {
    if (isFetching) {
      setShowSpinner(true);
    } else {
      setShowSpinner(false);
    }
  }, [isFetching]);

  useEffect(() => {
    if (page > 1) fetchProductsData();
  }, [page]);

  useEffect(() => {
    if (products.products?.length > 0) {
      setProduct((prev) => [...prev, ...products.products]);
      setMoreProducts(products.moreProduct);
      if (products.moreProduct === true) {
        setShowLoadMoreBtn(true);
      } else {
        setShowLoadMoreBtn(false);
      }
    }
  }, [products]);

  useEffect(() => {
    setProduct([]);
    fetchProductData();
  }, [sortBy]);

  useEffect(() => {
    if (isAddedCart) {
      toast.success("Added to Cart...");
    }
    return () => {
      dispatch(resetIs());
    };
  }, [isAddedCart]);

  const handleSorting = (newValue) => {
    setSortBy(newValue);
  };

  const handleLoadMoreProdButton = async () => {
    try {
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductsData = () => {
    if (moreProducts) {
      dispatch(fetchTrendingProducts(prodReqData));
      console.log("Dispatch More : ", prodReqData);
      prodReqData = {
        page: page,
        // category: category,
        sortBy: sortBy,
      };
    }
  };

  const fetchProductData = () => {
    setPage(1);
    prodReqData = {
      page: 1,
      // category: category,
      sortBy: sortBy,
    };
    dispatch(fetchTrendingProducts(prodReqData));
    prodReqData = {
      page: page,
      // category: category,
      sortBy: sortBy,
    };
  };

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
      filteredProductArray = ratingFilter(ratingValue, productArray);
    } else {
      filteredProductArray = productArray;
    }

    if (priceSliderValue) {
      filteredProductArray = priceFilter(
        priceSliderValue[0],
        priceSliderValue[1],
        filteredProductArray
      );
    }

    if (PODEligibility) {
      filteredProductArray = PodFilter(filteredProductArray);
    }

    if (discount) {
      filteredProductArray = discountFilter(discount, filteredProductArray);
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
        <div
          style={{
            width: "fit-content",
            height: "fit-content",
          }}
        >
          <div className="product-title-div">
            <div id="products-title">Trending Products</div>
            <div id="products-sort-box">
              <select
                value={sortBy}
                onChange={(e) => handleSorting(e.target.value)}
              >
                <option value="newArrivals">Newest Arrivals</option>
                <option value="priceHighToLow">Price : High to Low</option>
                <option value="priceLowToHigh">Price : Low to High</option>
                <option value="highRating">High Rating</option>
              </select>
            </div>
          </div>

          <div
            style={{
              marginLeft: "100px",
              width: "fitContent",
              display: "block",
            }}
          >
            <TrendingProduct filteredProductArray={filteredProductArray} />
          </div>
          {showLoadMoreBtn === true && filteredProductArray > 0 ? (
            <>
              <div className="load-more-prod-button">
                <input
                  type="button"
                  value="Load More..."
                  onClick={handleLoadMoreProdButton}
                />
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
export default TrendingProductsPage;

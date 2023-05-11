import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  PodFilter,
  discountFilter,
  priceFilter,
  ratingFilter,
} from "../../app/Functions/filterFunc";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  sortPriceLowToHigh,
} from "../../features/products/productsSlice";
import Filter from "../../components/Filter";
import { ProductCardsGrid } from "../../components/ProductCardGrid";
import { ProductFetchingSpinner } from "../../components/Spinner";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./Products.css";
import {
  RatingHighToLow,
  RatingLowToHigh,
  newArrivals,
  priceHighToLow,
  priceLowToHigh,
} from "../../app/Functions/SortFunc";

function ProductsList({
  filteredProductArray,
  wishlist,
  category,
  showProducts,
}) {
  const dispatch = useDispatch();

  const [openSortOpt, setOpenSortOpt] = useState(false);
  const [sortBy, setSortBy] = useState("New Arrivals");

  // console.log("Product Array : ", filteredProductArray);

  useEffect(() => {
    switch (sortBy) {
      case "newarrivals":
        // dispatch(sortNewArrivals())
        break;
      case "priceLowToHigh":
        // filteredProductArray = priceLowToHigh(filteredProductArray);
        dispatch(sortPriceLowToHigh(filteredProductArray));
        break;
      case "priceHighToLow":
        filteredProductArray = priceHighToLow(filteredProductArray);
        break;
      case "RatingLowToHigh":
        filteredProductArray = RatingLowToHigh(filteredProductArray);
        break;
      case "ratingHighToLow":
        filteredProductArray = RatingHighToLow(filteredProductArray);
        break;
      default:
        break;
    }
  }, [sortBy]);

  useEffect(() => {
    console.log("Array Updated...");
  }, [filteredProductArray]);

  const handleSorting = (newValue) => {
    setSortBy(newValue);
  };

  return (
    <>
      <div className="product-title-div">
        <div id="products-title">{category}</div>
        <div id="products-sort-box">
          <select
            value={sortBy}
            onChange={(e) => handleSorting(e.target.value)}
          >
            <option value="newarrivals">Newest Arrivals</option>
            <option value="priceHighToLow">Price : High to Low</option>
            <option value="priceLowToHigh">Price : Low to High</option>
          </select>
        </div>
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

function Products() {
  const location = useLocation();
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");

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
  const [showProducts, setShowProducts] = useState([]);

  let productArray = [];
  let filteredProductArray = [];

  const { products, isLoading, isFetching, isError, productMessage } =
    useSelector((state) => state.products);

  const { wishlist, isAddedCart, userSliceMessage } = useSelector(
    (state) => state.user
  );

  let prodReqData = {
    page: page,
    category: category,
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
    console.log("Array Updated...");
  }, [filteredProductArray]);

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
      dispatch(fetchProducts(prodReqData));

      prodReqData = {
        page: products.nextPage,
        category: "smart phones",
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
        <div>
          <div
            style={{
              marginLeft: "100px",
              width: "fitContent",
              display: "block",
            }}
          >
            <ProductsList
              filteredProductArray={filteredProductArray}
              wishlist={wishlist}
              category={category}
            />
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

export default Products;

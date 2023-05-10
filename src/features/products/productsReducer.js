/* eslint-disable no-unused-vars */
import axios from "axios";

const API_URL = "http://localhost:5555";

const fetchProducts = async (productReqData) => {
  // console.log("Fetching Product...", productReqData.filter);
  const response = await axios.get(
    API_URL +
      "/products?page=" +
      productReqData.page +
      "&category=" +
      productReqData.category
  );
  return response.data;
};

const fetchOneProduct = async (productId) => {
  const response = await axios.get(API_URL + "/product/" + productId);
  return response.data;
};

const searchProduct = async (productReqData) => {
  const response = await axios.get(
    API_URL +
      "/search?page=" +
      productReqData.page +
      "&&query=" +
      productReqData.query,
  );
  return response.data;
};

const fetchNewArrivals = async (productReqData) => {
  const response = await axios.get(
    API_URL + "/newarrivals?page=" + productReqData.page,
    productReqData.filter
  );
  console.log("Response : ", response.data);
  return response.data;
};

const fetchNewArrivalComp = async (quary) => {
  const response = await axios.get(API_URL + "/newarrivalscomp");
  console.log("Response : ", response.data);
  return response.data;
};

const fetchTrendingProducts = async (productReqData) => {
  const response = await axios.get(
    API_URL + "/trendingproducts?page=" + productReqData.page,
    productReqData.filter
  );
  // console.log("Trending Products : ", response.data);
  return response.data;
};

const fetchTrendingProductComp = async (quary) => {
  const response = await axios.get(API_URL + "/trendingproductscomp");
  // console.log("Trending Products : ", response.data);
  return response.data;
};

const products = {
  fetchProducts,
  fetchOneProduct,
  searchProduct,
  fetchNewArrivals,
  fetchNewArrivalComp,
  fetchTrendingProducts,
  fetchTrendingProductComp,
};

export default products;

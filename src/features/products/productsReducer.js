/* eslint-disable no-unused-vars */
import axios from "axios";

const API_URL = "http://localhost:5555";

const fetchProducts = async (productReqData) => {
  console.log("Fetching Product...");
  const response = await axios.get(
    API_URL + "/products?page=" +
    productReqData.page + "&category=" + productReqData.category
  );
  return response.data;
};

const fetchOneProduct = async (productId) => {
  const response = await axios.get(API_URL + "/product/" + productId);
  return response.data;
};

const searchProduct = async (quary) => {
  const response = await axios.get(API_URL + "/search/" + quary);
  return response.data;
};

const fetchNewArrivals = async (quary) => {
  const response = await axios.get(API_URL + "/newarrivals");
  console.log("Response : ", response.data);
  return response.data;
};

const fetchTrendingProducts = async (quary) => {
  const response = await axios.get(API_URL + "/trendingproducts");
  // console.log("Trending Products : ", response.data);
  return response.data;
};

const products = {
  fetchProducts,
  fetchOneProduct,
  searchProduct,
  fetchNewArrivals,
  fetchTrendingProducts,
};

export default products;

/* eslint-disable no-unused-vars */
import axios from "axios";

const API_URL = "http://localhost:5555";

const fetchProducts = async () => {
  const response = await axios.get(API_URL);
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

const products = {
  fetchProducts,
  fetchOneProduct,
  searchProduct,
};

export default products;

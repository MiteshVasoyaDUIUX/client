/* eslint-disable no-unused-vars */
import axios from "axios";

const API_URL = "http://localhost:5555";

const fetchProduct = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const addToCart = async (data, token) => {
  console.log("Token : ", token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + "/buyer/addtocart/" + data.userId,
    data,
    config
  );
  console.log("Data.ProductId: ", data.productId);
  return response.data;
};

const productServiceForClient = {
  fetchProduct,
  addToCart,
};

export default productServiceForClient;

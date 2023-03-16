/* eslint-disable no-unused-vars */
import axios from "axios";

const API_URL = "http://localhost:5555";

const fetchProduct = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const addToCart = async (data, token) => {
  // console.log("Token : ", data.userId);
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
  console.log("Data.ProductId: ", response.data);
  return response.data;
};

const fetchWishList = async (userId, token) => {
  // console.log("Token : ", data.userId);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    API_URL + "/buyer/fetchwishlist/" + userId,
    config
  );
  // console.log("Fetch Wishlist Initially : ", response.data);
  return response.data;
};

const addToWishList = async (data, token) => {
  // console.log("Token : ", data.userId);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + "/buyer/addtowishlist/" + data.userId,
    data,
    config
  );
  console.log("Data.ProductId: ", data.productId);
  return response.data;
};

const productServiceForClient = {
  fetchProduct,
  addToCart,
  fetchWishList,
  addToWishList
};

export default productServiceForClient;

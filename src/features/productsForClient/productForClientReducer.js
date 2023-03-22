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

const updateCart = async (newData, token) => {
  // console.log("Token : ", data.userId);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + "/buyer/updatecart/" + newData.userId,
    newData,
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

const fetchCart = async (userId, token) => {
  // console.log("Token : ", data.userId);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    API_URL + "/buyer/fetchcart/" + userId,
    config
  );
  // console.log("response.data Cart: ", response.data);

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
  console.log("Data.ProductId: ", response.data);
  return response.data;
};

const productServiceForClient = {
  fetchProducts,
  addToCart,
  fetchWishList,
  fetchCart,
  addToWishList,
  fetchOneProduct,
  updateCart
};

export default productServiceForClient;

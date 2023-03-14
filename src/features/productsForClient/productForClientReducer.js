/* eslint-disable no-unused-vars */
import axios from "axios";

const API_URL = "http://localhost:5555/";

const fetchProduct = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

const productServiceForClient = {
  fetchProduct,
};

export default productServiceForClient;

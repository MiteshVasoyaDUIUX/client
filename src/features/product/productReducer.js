/* eslint-disable no-unused-vars */
import axios from "axios";

const API_URL = "http://localhost:5555";

const API_URL_TO_REMOVE_PRODUCT = "/products";

const uploadProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + '/admin/addproducts', productData, config);

  console.log("Response : ", response.data);
  return response.data;
};

const productService = {
      uploadProduct,
}

export default productService;

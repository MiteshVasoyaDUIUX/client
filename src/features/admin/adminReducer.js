import axios from "axios";

const API_URL = "http://localhost:5555";

const acceptOrder = async (orderId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log("ORDER ID REDUCERS  : ", orderId);

  const order = {
    orderId: orderId,
  };
  const response = await axios.post(
    API_URL + "/admin/acceptorder",
    order,
    config
  );

  console.log("Response Reducer: ", response.data);
  return response.data;
};

const cancelOrder = async (orderId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log("ORDER ID REDUCERS  : ", orderId);

  const order = {
      orderId: orderId,
    };

  const response = await axios.post(
    API_URL + "/admin/cancelorder",
    order,
    config
  );

  console.log("Response Reducer: ", response.data);
  return response.data;
};

const fetchAllOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "/admin/allorders", config);

  return response.data;
};

const adminService = {
  acceptOrder,
  cancelOrder,
  fetchAllOrders
};

export default adminService;

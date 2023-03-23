import axios from "axios";

const API_URL = "http://localhost:5555";

const placeOrder = async (checkoutData, token) => {
      const config = {
            headers : {
                  Authorization : `Bearer ${token}`,
            }
      }

      console.log("CHECK OUT DATA IN REDUCERS  : ", checkoutData)


      const response = await axios.post(
            API_URL + "/buyer/placeorder",
            checkoutData,
            config
          );

      console.log("Check Out Response: ", response.data);
      return response.data;
};


const fetchAllOrders = async (userId, token) => {
      const config = {
            headers : {
                  Authorization : `Bearer ${token}`,
            }
      }

      // console.log("Config : ", config);

      const response = await axios.get(
            API_URL + "/buyer/fetchallorders/" + userId,
            config
          );

      // console.log("Order Of User Id: ", response.data);
      return response.data;
};

const orderService = {
      placeOrder,
      fetchAllOrders
};

export default orderService;
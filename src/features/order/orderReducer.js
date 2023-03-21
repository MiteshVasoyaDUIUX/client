import axios from "axios";

const API_URL = "http://localhost:5555";

const placeOrder = async (checkoutData, token) => {
      const config = {
            headers : {
                  Authorization : `Bearer ${token}`,
            }
      }

      const response = await axios.post(
            API_URL + "/buyer/placeorder",
            checkoutData,
            config
          );

      console.log("Check Out Response: ", response.data);
      return response.data;
};

const orderService = {
      placeOrder
};

export default orderService;
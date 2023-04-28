import axios from "axios";

const API_URL = "http://localhost:5555";

const resetPassword = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "/auth/resetpassword", config);
  console.log("Reset Password Reducer's Response : ", response.data);

  // return response.data;
};

const userService = {
  resetPassword,
};

export default userService;

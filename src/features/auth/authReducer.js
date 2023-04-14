import axios from "axios";

const API_URL = "http://localhost:5555/auth";

const register = async (userData) => {
  const response = await axios.post(API_URL + "/register/", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    console.log(response.data);
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "/login/", userData);

  const userCartResponse = {
    user: response.data,
  };
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    // console.log(response);
    // alert(response.data);
  }

  // console.log("Merge Response : ", userCartResponse);
  return userCartResponse;
};

const logout = async (userData) => {
  console.log("Log Out Red ");
  const response = await axios.post(API_URL + "/logout");
  console.log("Response : ", response.data);

  if (response.data.message === "Signed Out") {
    localStorage.removeItem("user");
  }
};

const verifyUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log("Reducers :", config);
  const response = await axios.get(API_URL + "/user/verification", config);

  console.log("RRESPONSE : ", response.data);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  verifyUser,
};

export default authService;

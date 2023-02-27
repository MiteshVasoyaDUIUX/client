import axios from "axios";

const API_URL = "http://localhost:5555/register/";

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    alert(response.data);
  }

  return response.data;
};

const authService = {
    register,
};

export default authService;

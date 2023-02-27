import axios from "axios";

const API_URL = "http://localhost:5555";

const register = async (userData) => {
    const response = await axios.post(API_URL + '/register/', userData);
  
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      alert(response.data);
    }
  
    return response.data;
  };

  const login = async (userData) => {
    const response = await axios.post(API_URL + '/login/', userData);
  
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      // alert(response.data);
    }
  
    return response.data;
  };

  const logout = async (userData) => {
    localStorage.removeItem('user');
  };


const authService = {
    register,
    login,
    logout
};

export default authService;

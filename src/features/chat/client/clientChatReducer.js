import axios from "axios";

const API_URL = "http://localhost:5555";

const fetchChat = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // console.log("Response : ");
  const response = await axios.get(API_URL + "/buyer/chat", config);


  return response.data;
};

const insertSocketID = async (socketID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log("Response : ", config);


  const response = await axios.post(
    API_URL + "/chat/insert/socketid",
    socketID,
    config
  );

  console.log("Response : ", response.data);

  // return response.data;
};

const clientChatService = {
  fetchChat,
  insertSocketID,
};

export default clientChatService;
